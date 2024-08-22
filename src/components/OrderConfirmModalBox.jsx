import React, { useState } from 'react';
import { Modal, HStack, Button, Text, Divider, Box, Radio } from 'native-base';
import MainStyles from './styles/MainStyle';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const OrderConfirmModalBox = ({ isOpen, onClose,onSubmit, theme }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const submitOrder = () => {
    onSubmit(selectedValue);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header style={{borderBottomWidth: 0}}>
          <Text style={{...MainStyles.titleFont, lineHeight: 35, fontSize: 18}}>
            ငွေချေစနစ်ရွေးပါ
          </Text>
        </Modal.Header>
        <Modal.Body>
          <HStack space={4} justifyContent="center" alignItems="center">
          <Radio.Group 
           defaultValue={0}
           size="lg" 
           name="exampleGroup" 
           accessibilityLabel="pick a choice"
           onChange={handleValueChange}
          >
              <Radio 
              _text={{
                mx: 2
              }} 
              colorScheme="green" 
              value={0}
              icon={<MaterialCommunityIcons name="truck-delivery" style={{color: 'green'}} size={20} />} 
              my={1}
              size={10}
            >
              <Text style={{...MainStyles.normalFont, lineHeight: 30}}>အိမ်အရောက်ငွေချေ ( COD )</Text>
            </Radio>
            <Radio 
              _text={{
                mx: 2
              }} 
              colorScheme="green" 
              value={1}
              icon={<MaterialIcons name="paid" style={{color: 'green'}} size={20} />} 
              my={1}
              size={10}
            >
              <Text style={{...MainStyles.normalFont, lineHeight: 30}}>ငွေကြိုရှင်း ( Prepaid )</Text>
            </Radio>
            </Radio.Group>
          </HStack>
        </Modal.Body>
        <Box
          style={{
            marginTop: 10,
            marginBottom: 10,
            ...MainStyles.centerAll
          }}
        >
          <Divider width={"85%"} height={0.4} bg="#000" style={{ opacity: 0.5 }} />
        </Box>
        <Modal.Footer style={{borderTopWidth: 0, marginHorizontal: 10}}>
          <Button.Group space={2}>
            <Button disabled={selectedValue == null ? true : false}  w={'100%'} bg={theme.app_button_color} borderRadius={10} onPress={submitOrder}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30,color: '#fff', fontSize: 12}}>ဆက်လက်လုပ်ဆောင်မည်</Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default OrderConfirmModalBox;
