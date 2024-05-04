import React from "react";
import { Modal, Button, Image } from "native-base";

const DetailModalBox = ({ isOpen, onClose, imageSrc }) => {
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
