import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import EditItemForm from "../Item/EditItemForm"; // Adjust the import path as needed
import QRCodeGenerator from "../Utils/QRCodeGenerator";

const ItemDetail = () => {
  const { itemID } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowQRModal = () => setShowQRModal(true);
  const handleCloseQRModal = () => setShowQRModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const [showEventIDs, setShowEventIDs] = useState(false);

  const baseUrl = "https://baeandblue.com/inventory";
  const qrCodeUrl = `${baseUrl}/${itemID}`;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `https://server.baeandblue.com/api/items/${itemID}`,
        );
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemID]);

  const getFormattedDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const toggleEventIDs = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowEventIDs(!showEventIDs);
  };

  const renderEventIDsSubTable = (eventIDs) => {
    return (
      <table className="table">
        <tbody>
          {eventIDs.map((id) => (
            <tr key={id}>
              <td>{id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const response = await axios.put(
        `https://server.baeandblue.com/api/items/${itemID}`,
        updatedItem,
      );
      setItem(response.data);
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!item) return <div>Item not found</div>;

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2 className="text-center">{item.name}</h2>
            </Card.Header>
            <Card.Body>
              <Card.Img
                variant="top"
                src={item.imageUrl || "https://via.placeholder.com/400"}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
              <Card.Text>
                <strong>ID:</strong> {item.id}
              </Card.Text>
              <Card.Text>
                <strong>Associated Events:</strong>
                <button
                  className=" ms-2 btn btn-outline-dark btn-sm"
                  onClick={toggleEventIDs}
                  style={{ marginBottom: "5px" }}
                >
                  {showEventIDs ? "Hide IDs" : "Show IDs"}
                </button>
                {showEventIDs && renderEventIDsSubTable(item.associatedEventID)}
              </Card.Text>
              <Card.Text>
                <strong>Total On Hand:</strong> {item.totalOnHand}
              </Card.Text>
              <Card.Text>
                <strong>Purchase Date:</strong>{" "}
                {getFormattedDate(item.originalPurchaseDate)}
              </Card.Text>
              <Card.Text>
                <strong>Times Rented:</strong> {item.timesRented}
              </Card.Text>
              <Card.Text>
                <strong>Original Cost:</strong>{" "}
                {item.cost !== "NULL" ? `$${item.cost.toFixed(2)}` : "NULL"}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {item.replacedCount}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {item.inventoryLocation}
              </Card.Text>

              <Button
                className="btn btn-secondary"
                onClick={handleShowEditModal}
              >
                Edit
              </Button>
              <Button
                className="m-2 btn btn-danger"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
              <Button className="m-2 btn btn-info" onClick={handleShowQRModal}>
                Generate Item QR
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditItemForm item={item} onEditItem={handleEditItem} />
        </Modal.Body>
      </Modal>

      <Modal show={showQRModal} onHide={handleCloseQRModal}>
        <Modal.Header closeButton>
          <Modal.Title>QR Code for {item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QRCodeGenerator url={qrCodeUrl} />
          <p>Scan this QR code to view the item details for: {item.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseQRModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ItemDetail;
