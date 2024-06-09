import React, { useState } from 'react';
import { Modal, HStack, IconButton, Input, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PointModalBox = ({ isOpen, onClose, points,onSubmit,onCancel }) => {
  const originalPoint = points;
  const [usedPoints, setUsedPoints] = useState(0);

  const handleIncrease = () => {
    if (usedPoints < originalPoint) {
      setUsedPoints(prevPoints => prevPoints + 100);
    }
  };

  const handleDecrease = () => {
    if (usedPoints > 0) {
      setUsedPoints(prevPoints => prevPoints - 100);
    }
  };

  const cancelPoints = () => {
    setUsedPoints(0);
    onCancel();
  }

  const submitPoints = () => {
    onSubmit(usedPoints);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Use Your Points</Modal.Header>
        <Modal.Body>
          <HStack space={4} justifyContent="center" alignItems="center">
            <IconButton
              size="sm"
              rounded="full"
              variant="solid"
              onPress={handleIncrease}
              _icon={{
                as: MaterialIcons,
                name: "add",
              }}
              isDisabled={usedPoints >= originalPoint} // Disable button if usedPoints >= originalPoint
            />
            <Input w="35%" readOnly type="number" value={String(usedPoints)} />
            <IconButton
              size="sm"
              rounded="full"
              variant="solid"
              onPress={handleDecrease}
              _icon={{
                as: MaterialIcons,
                name: "remove",
              }}
              isDisabled={usedPoints <= 0} // Disable button if usedPoints <= 0
            />
          </HStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button background="red.400" onPress={cancelPoints}>
              Cancel Point
            </Button>
            <Button onPress={submitPoints}>Use Point</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default PointModalBox;
