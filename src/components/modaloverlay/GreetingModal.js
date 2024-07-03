
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './GreetingModal.css';

const GreetingModal = ({ show, onHide, description }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Hey, there!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GreetingModal;