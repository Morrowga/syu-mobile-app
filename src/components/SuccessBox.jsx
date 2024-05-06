import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { Modal, Text, Button as NBButton } from "native-base";

const SuccessBox = ({ isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsVisible(false);
  };
  return (
    <Modal isOpen={isVisible} onClose={closeModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Text>Success!</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Your order was successful.</Text>
        </Modal.Body>
        <Modal.Footer>
          <NBButton onPress={closeModal}>Close</NBButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default SuccessBox;
