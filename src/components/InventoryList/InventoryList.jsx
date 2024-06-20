import React, { useState, useEffect } from "react";
import {
  Pagination,
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import InventoryListItem from "./InventoryListItem";
import AddItemForm from "../Item/AddItemForm";
import EditItemForm from "../Item/EditItemForm";
import ToastNotification from "../common/ToastNotification";
import "./InventoryList.css"; // Import the CSS file

const ITEMS_PER_PAGE = 10;

const InventoryList = () => {
  const [items, setItems] = useState([]); // Initialize with an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("name"); // Default search field
  const [costRange, setCostRange] = useState({ min: "", max: "" });
  const [replacementRange, setReplacementRange] = useState({
    min: "",
    max: "",
  });
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const apiUrl = "https://server.baeandblue.com/api/items"; // Your API URL

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(apiUrl);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [apiUrl]);

  const handleShowAddItemModal = () => setShowAddItemModal(true);
  const handleCloseAddItemModal = () => setShowAddItemModal(false);

  const handleSelectSearchField = (field) => {
    setSearchField(field);
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const response = await axios.put(
        `${apiUrl}/${updatedItem.id}`,
        updatedItem,
      );
      console.log("API response data:", response.data); // Debugging: log API response

      // Use a functional state update to ensure the new state is based on the previous state
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === response.data.id ? response.data : item,
        );
        console.log("Updated items array:", updatedItems); // Debugging: log updated items array
        return updatedItems;
      });

      setToastMessage("Item updated successfully");
      setToastType("Item Updated!");
      setShowToast(true);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setToastMessage("Item added successfully");
    setToastType("Item Added!");
    setShowToast(true);
    setShowAddItemModal(false); // Close the modal after adding the item
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setToastMessage("Item deleted successfully");
      setToastType("Item Deleted!");
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Function to change the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ensure filtered items are re-evaluated on state changes
  const filteredItems = items.filter((item) => {
    if (searchField === "cost") {
      const cost = parseFloat(item.cost);
      const minCost = costRange.min ? parseFloat(costRange.min) : -Infinity;
      const maxCost = costRange.max ? parseFloat(costRange.max) : Infinity;
      return cost >= minCost && cost <= maxCost;
    } else if (searchField === "replacedCount") {
      const replacedCount = parseInt(item.replacedCount, 10);
      const minReplacement = replacementRange.min
        ? parseInt(replacementRange.min, 10)
        : -Infinity;
      return replacedCount >= minReplacement;
    } else {
      const itemField = item[searchField]?.toString().toLowerCase();
      return itemField && itemField.includes(searchQuery);
    }
  });

  const formatCamelCaseToReadable = (str) => {
    return (
      str
        // Insert a space before a capital letter that is either at the start of the string or preceded by a lowercase letter
        .replace(
          /(^|[a-z])([A-Z])/g,
          (match, p1, p2) => p1 + (p1 ? " " : "") + p2,
        )
        // Uppercase the first character
        .replace(/^./, (firstChar) => firstChar.toUpperCase())
    );
  };

  // Pagination should be based on filtered items
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditItemClick = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingItem(null);
  };

  return (
    <div>
      <Container className="my-4">
        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <InputGroup>
              <DropdownButton
                variant="outline-secondary"
                title={formatCamelCaseToReadable(searchField)}
                onSelect={handleSelectSearchField}
              >
                <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                <Dropdown.Item eventKey="id">Item ID</Dropdown.Item>
                <Dropdown.Item eventKey="associatedEventID">
                  Associated Event ID
                </Dropdown.Item>
                <Dropdown.Item eventKey="inventoryLocation">
                  Inventory Location
                </Dropdown.Item>
                <Dropdown.Item eventKey="cost">Cost</Dropdown.Item>
                <Dropdown.Item eventKey="replacedCount">
                  Number of Times Replaced
                </Dropdown.Item>
              </DropdownButton>
              {searchField === "cost" ? (
                <>
                  <FormControl
                    placeholder="Min Cost"
                    onChange={(e) =>
                      setCostRange({ ...costRange, min: e.target.value })
                    }
                    type="number"
                  />
                  <FormControl
                    placeholder="Max Cost"
                    onChange={(e) =>
                      setCostRange({ ...costRange, max: e.target.value })
                    }
                    type="number"
                  />
                </>
              ) : searchField === "replacedCount" ? (
                <FormControl
                  placeholder="Min Number of Replacements"
                  onChange={(e) => setReplacementRange({ min: e.target.value })}
                  type="number"
                />
              ) : (
                <FormControl
                  placeholder={`Search by ${formatCamelCaseToReadable(
                    searchField,
                  )}...`}
                  onChange={handleSearchChange}
                />
              )}
            </InputGroup>
          </Col>
        </Row>

        <Row>
          {currentItems.map((item) => (
            <Col md={6} key={item.id}>
              <InventoryListItem
                item={item}
                onEdit={() => handleEditItemClick(item)}
                onDelete={() => handleDeleteItem(item.id)}
              />
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center my-4">
          <Col xs={12} sm={8} md={6} lg={6} xl={6}>
            <Pagination className="justify-content-center dark">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                ),
              )}
            </Pagination>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} xl={3}>
            <Button
              variant="dark"
              onClick={handleShowAddItemModal}
              className="w-100"
            >
              Add New Item
            </Button>
          </Col>
        </Row>

        <Modal show={showAddItemModal} onHide={handleCloseAddItemModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddItemForm onAddItem={handleAddItem} />
          </Modal.Body>
        </Modal>

        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditItemForm
              item={editingItem}
              onEditItem={handleEditItem}
              onClose={handleCloseEditModal}
              onDeleteItem={handleDeleteItem}
            />
          </Modal.Body>
        </Modal>
      </Container>

      <ToastNotification
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
        type={toastType}
      />
    </div>
  );
};

export default InventoryList;
