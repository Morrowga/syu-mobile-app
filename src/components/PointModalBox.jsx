import React, { useState } from 'react';
import { Modal, HStack, IconButton, Input, Button, Text, Divider, Box } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainStyles from './styles/MainStyle';

const PointModalBox = ({ isOpen, onClose, points,onSubmit,onCancel, theme }) => {
  const originalPoint = points;
  const [usedPoints, setUsedPoints] = useState(0);

  const handleIncrease = () => {
    if (usedPoints < originalPoint) {
      setUsedPoints(prevPoints => prevPoints + 100);
    }
  };

  const handleDecrease = () => {
      setUsedPoints(prevPoints => prevPoints - 100);
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
        <Modal.Header style={{borderBottomWidth: 0}}>
          <Text style={{...MainStyles.titleFont, lineHeight: 35, fontSize: 18}}>
            Points အသုံးပြုရန်
          </Text>
        </Modal.Header>
        <Modal.Body>
          <HStack space={4} justifyContent="center" alignItems="center">
          <IconButton
              size="sm"
              rounded="full"
              variant="solid"
              bg={theme.app_button_color}
              onPress={handleDecrease}
              _icon={{
                as: MaterialIcons,
                name: "remove",
              }}
              isDisabled={usedPoints <= 0}
            />
            <Input w="35%" readOnly type="number" fontSize={20} value={String(usedPoints)} />
            <IconButton
              size="sm"
              rounded="full"
              variant="solid"
              bg={theme.app_button_color}
              onPress={handleIncrease}
              _icon={{
                as: MaterialIcons,
                name: "add",
              }}
              isDisabled={usedPoints >= originalPoint}
            />
          </HStack>
        </Modal.Body>
        <Box
          style={{
            marginTop: 10,
            marginBottom: 10,
            ...MainStyles.centerAll
          }}
        >
          <Divider width={"85%"} height={0.4} bg="#000" style={{ opacity: 0.2 }} />
        </Box>
        <Modal.Footer style={{borderTopWidth: 0, marginHorizontal: 10}}>
          <Button.Group space={2}>
            <Button style={{backgroundColor: 'red'}} borderRadius={10} w={'50%'} onPress={cancelPoints}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30,color: '#fff', fontSize: 12}}>ဖယ်ရှားမည်။</Text>
            </Button>
            <Button  w={'50%'} bg={theme.app_button_color} borderRadius={10} onPress={submitPoints}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30,color: '#fff', fontSize: 12}}>အသုံးပြုမည်</Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default PointModalBox;
