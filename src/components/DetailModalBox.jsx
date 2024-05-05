import React from "react";
import { Modal, Button, Image } from "native-base";

const DetailModalBox = ({ isOpen, onClose, imageSrc = 'https://i.pinimg.com/564x/d0/9e/99/d09e99ca67004c353063e7e4c20642c4.jpg' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Item Detail</Modal.Header>
        <Modal.Body>
          <Image
            source={{ uri: imageSrc }}
            alt="Preview"
            style={{ width: "100%", height: 300 }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default DetailModalBox;
