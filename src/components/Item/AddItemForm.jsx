import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    imageUrl: "",
    associatedEventID: "",
    totalOnHand: "",
    originalPurchaseDate: "",
    timesRented: "",
    cost: "",
    replacedCount: "",
    inventoryLocation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    let imageUrl = newItem.imageUrl || "NULL";
    if (selectedFile) {
      setIsUploading(true);
      const fileName = `${Date.now()}_${selectedFile.name}`;
      const fileType = selectedFile.type;

      try {
        // Request presigned URL from the server
        const response = await axios.post(
          "https://server.baeandblue.com/generate-presigned-url",
          {
            fileName,
            fileType,
          }
        );

        const { url } = response.data;

        // Upload the file to S3 using the presigned URL
        await axios.put(url, selectedFile, {
          headers: {
            "Content-Type": fileType,
          },
        });

        imageUrl = url.split("?")[0]; // Use the URL without query parameters
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsUploading(false);
      }
    }

    const itemToAdd = {
      name: newItem.name || "NULL",
      imageUrl: imageUrl,
      associatedEventID: newItem.associatedEventID
        ? newItem.associatedEventID
            .split(",")
            .map((id) => parseInt(id.trim(), 10))
        : ["NULL"],
      totalOnHand:
        newItem.totalOnHand !== "" ? parseInt(newItem.totalOnHand, 10) : "NULL",
      originalPurchaseDate: newItem.originalPurchaseDate || "NULL",
      timesRented:
        newItem.timesRented !== "" ? parseInt(newItem.timesRented, 10) : "NULL",
      cost: newItem.cost !== "" ? parseFloat(newItem.cost) : "NULL",
      replacedCount:
        newItem.replacedCount !== ""
          ? parseInt(newItem.replacedCount, 10)
          : "NULL",
      inventoryLocation: newItem.inventoryLocation || "NULL",
    };

    try {
      const response = await axios.post(
        "https://server.baeandblue.com/api/items",
        itemToAdd
      );
      onAddItem(response.data);
      setNewItem({
        name: "",
        imageUrl: "",
        associatedEventID: "",
        totalOnHand: "",
        originalPurchaseDate: "",
        timesRented: "",
        cost: "",
        replacedCount: "",
        inventoryLocation: "",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Name</label>
          <input
            id="itemName"
            name="name"
            type="text"
            className="form-control"
            value={newItem.name}
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
            value={newItem.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileInput">Upload Image</label>
          <input
            id="fileInput"
            type="file"
            {/* accept="image/*"
            capture="environment" // Optional: specify "environment" or "user" */}
            className="form-control"
            onChange={handleFileChange}
          />
          {isUploading && <p>Uploading...</p>}
        </div>

        <div className="form-group">
          <label htmlFor="associatedEventID">Associated Event IDs</label>
          <input
            id="associatedEventID"
            name="associatedEventID"
            type="text"
            className="form-control"
            placeholder="Enter comma-separated IDs"
            value={newItem.associatedEventID}
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
            value={newItem.totalOnHand}
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
            value={newItem.originalPurchaseDate}
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
            value={newItem.timesRented}
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
            value={newItem.cost}
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
            value={newItem.replacedCount}
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
            value={newItem.inventoryLocation}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-outline-success"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
