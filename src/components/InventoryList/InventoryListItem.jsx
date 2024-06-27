import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import QRCodeGenerator from "../Utils/QRCodeGenerator";

const InventoryListItem = ({ item, onEdit }) => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEventIDs, setShowEventIDs] = useState(false);

  const handleShowQRModal = () => setShowQRModal(true);
  const handleCloseQRModal = () => setShowQRModal(false);

  const baseUrl = "https://baeandblue.com/inventory";
  const qrCodeUrl = `${baseUrl}?location=${encodeURIComponent(item.inventoryLocation)}`;

  const toggleExpanded = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsExpanded(!isExpanded);
  };

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

  return (
    <Row className="align-items-center mb-3">
      <Col xs={12} md={4} lg={3} onClick={toggleExpanded}>
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{ width: "100%", height: "auto" }}
        />
      </Col>
      <Col xs={12} md={8} lg={9}>
        <h3>{item.name}</h3>
        {isExpanded && (
          <div style={{ marginTop: "10px" }}>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Item ID</th>
                  <td>{item.id}</td>
                </tr>
                <tr>
                  <th scope="row">Associated Event ID</th>
                  <td>
                    <button
                      className="btn btn-outline-dark"
                      onClick={toggleEventIDs}
                      style={{ marginBottom: "5px" }}
                    >
                      {showEventIDs ? "Hide IDs" : "Show IDs"}
                    </button>
                    {showEventIDs &&
                      renderEventIDsSubTable(item.associatedEventID)}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Total On Hand</th>
                  <td>{item.totalOnHand}</td>
                </tr>
                <tr>
                  <th scope="row">Purchase Date</th>
                  <td>{getFormattedDate(item.originalPurchaseDate)}</td>
                </tr>
                <tr>
                  <th scope="row">Times Rented</th>
                  <td>{item.timesRented}</td>
                </tr>
                <tr>
                  <th scope="row">Cost</th>
                  <td>
                    {item.cost !== "NULL" ? `$${item.cost.toFixed(2)}` : "NULL"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Replaced Count</th>
                  <td>{item.replacedCount}</td>
                </tr>
                <tr>
                  <th scope="row">Inventory Location</th>
                  <td>{item.inventoryLocation}</td>
                </tr>
              </tbody>
            </table>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
            >
              Edit
            </Button>
            <Button className="m-2 btn btn-info" onClick={handleShowQRModal}>
              Generate QR Code
            </Button>
            <Modal show={showQRModal} onHide={handleCloseQRModal}>
              <Modal.Header closeButton>
                <Modal.Title>QR Code for {item.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <QRCodeGenerator url={qrCodeUrl} />
                <p>
                  Scan this QR code to view items at location:{" "}
                  {item.inventoryLocation}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseQRModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default InventoryListItem;
