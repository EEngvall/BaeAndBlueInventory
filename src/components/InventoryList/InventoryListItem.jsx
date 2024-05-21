import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const InventoryListItem = ({ item, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEventIDs, setShowEventIDs] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getFormattedDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const toggleEventIDs = () => {
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
            <Button variant="secondary" onClick={() => onEdit(item)}>
              Edit
            </Button>
          </div>
        )}
      </Col>
    </Row>
  );
};
export default InventoryListItem;
