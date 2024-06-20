import React, { useState, useEffect } from "react";

const EditItemForm = ({ item, onEditItem, onClose, onDeleteItem }) => {
  const [editedItem, setEditedItem] = useState({
    name: "",
    imageUrl: "",
    associatedEventID: "",
    totalOnHand: "",
    originalPurchaseDate: "",
    timesRented: "",
    cost: "",
    replacedCount: "",
    inventoryLocation: "",
    // Add other fields as necessary
  });

  useEffect(() => {
    if (item) {
      setEditedItem({
        ...item,
        associatedEventID: item.associatedEventID.join(", "), // Convert array to string
      });
    }
  }, [item]);

  const handleChange = (event) => {
    setEditedItem({ ...editedItem, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedItem = {
      ...editedItem,
      totalOnHand: parseInt(editedItem.totalOnHand, 10),
      timesRented: parseInt(editedItem.timesRented, 10),
      cost: parseFloat(editedItem.cost), // Convert cost to a float
      replacedCount: parseInt(editedItem.replacedCount, 10),
      associatedEventID: editedItem.associatedEventID
        .split(",")
        .map((id) => id.trim()), // Convert to array
    };
    onEditItem(updatedItem);
    onClose(); // Close the modal after submitting
  };

  const handleDelete = () => {
    onDeleteItem(item.id);
    onClose(); // Close the modal after deletion
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="itemName">Name</label>
        <input
          id="itemName"
          name="name"
          type="text"
          className="form-control"
          value={editedItem.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          className="form-control"
          value={editedItem.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="associatedEventID">Associated Event IDs</label>
        <input
          id="associatedEventID"
          name="associatedEventID"
          type="text"
          className="form-control"
          placeholder="Enter comma-separated IDs"
          value={editedItem.associatedEventID}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="totalOnHand">Total On Hand</label>
        <input
          id="totalOnHand"
          name="totalOnHand"
          type="number"
          className="form-control"
          value={editedItem.totalOnHand}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="originalPurchaseDate">Original Purchase Date</label>
        <input
          id="originalPurchaseDate"
          name="originalPurchaseDate"
          type="date"
          className="form-control"
          value={editedItem.originalPurchaseDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="timesRented">Times Rented</label>
        <input
          id="timesRented"
          name="timesRented"
          type="number"
          className="form-control"
          value={editedItem.timesRented}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cost">Cost</label>
        <input
          id="cost"
          name="cost"
          type="number"
          step="0.01"
          className="form-control"
          value={editedItem.cost}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="replacedCount">Replaced Count</label>
        <input
          id="replacedCount"
          name="replacedCount"
          type="number"
          className="form-control"
          value={editedItem.replacedCount}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="inventoryLocation">Inventory Location</label>
        <input
          id="inventoryLocation"
          name="inventoryLocation"
          type="text"
          className="form-control"
          value={editedItem.inventoryLocation}
          onChange={handleChange}
        />
      </div>
      {/* Add other inputs for imageUrl, associatedEventID, etc., similar to above */}
      <button className="btn btn-outline-success me-2" type="submit">
        Update Item
      </button>
      <button
        type="button"
        className="btn btn-outline-danger m-2"
        onClick={handleDelete}
      >
        Delete Item
      </button>
    </form>
  );
};

export default EditItemForm;
