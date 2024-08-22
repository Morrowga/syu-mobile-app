import React from 'react';
import { Modal, Button, Text, Divider, Box, Image } from 'native-base';
import MainStyles from './styles/MainStyle';
import Icon from "react-native-vector-icons/Ionicons";

const ActionConfirmModalBox = ({ isOpen, onClose,onSubmit, theme, txt }) => {
  const submitModal = () => {
    onSubmit();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header style={{borderBottomWidth: 0}}>
          <Box style={{...MainStyles.flexRowStart}}>
            <Box marginY={0.9} marginX={1}>
              <Icon name="alert-circle-outline" size={22} />
            </Box>
            <Text style={{lineHeight: 28, ...MainStyles.titleFont}}>
              {txt} လုပ်ရန်အတည်ပြုပါ
            </Text>
          </Box>
        </Modal.Header>
        <Modal.Body>
        <Box>
            <Image
                source={require('../../assets/oops.png')}
                alt="Preview"
                w={"100%"}
                h={170}
            />
        </Box>
         
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
            <Button style={{backgroundColor: 'red'}} borderRadius={10} w={'50%'} onPress={onClose}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30,color: '#fff', fontSize: 12}}>မလုပ်ပါ</Text>
            </Button>
            <Button  w={'50%'} bg={theme.app_button_color} borderRadius={10} onPress={submitModal}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30,color: '#fff', fontSize: 12}}>အတည်ပြုမည်</Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ActionConfirmModalBox;
