import React from "react";
import { Toast } from "react-bootstrap";

const ToastNotification = ({ show, message, onClose, type }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
      <Toast show={show} onClose={onClose}>
        <Toast.Header>
          <img
            src="src/Utils/submit-update-icon-2048x2048-nv9keuce.png"
            className="rounded me-2"
            alt="Icon"
          />
          <strong className="me-auto">{type}</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotification;
