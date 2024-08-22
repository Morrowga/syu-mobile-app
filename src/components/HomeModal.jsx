import React, { useState } from 'react';
import { Modal, Button, Text, Divider, Box, Checkbox } from 'native-base';
import MainStyles from './styles/MainStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setAge } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeModal = ({ isOpen, onClose, theme }) => {
  const [isAgree, setIsAgree] = useState(false);
  const [isAboveEighteen, setIsAboveEighteen] = useState(false);
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const currentMsisdn = authData?.msisdn ?? '';
  const [error, setError] = useState('');

  const updateAge = () => {
    dispatch(setAge(isAboveEighteen))
  }

  const handleConfirm = async () => {
    if (!isAgree) {
      setError('You must agree to the terms & conditions.');
    } else {
      setError('');
      const storedMsisdns = await AsyncStorage.getItem('msisdns');
      let msisdnsArray = storedMsisdns ? JSON.parse(storedMsisdns) : [];

      const msisdnExists = msisdnsArray.some(
        (item) => item.msisdn === currentMsisdn
      );

      if (!msisdnExists) {
        msisdnsArray.push({ msisdn: currentMsisdn, agreement_status: true });
        await AsyncStorage.setItem('msisdns', JSON.stringify(msisdnsArray));
      }

      updateAge();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false}>
      <Modal.Content maxWidth="400px">
        <Modal.Header style={{borderBottomWidth: 0}}>
          <Text style={{...MainStyles.titleFont, lineHeight: 35, fontSize: 18}}>
                Terms & Conditions
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, et corrupti. Nesciunt quis autem magnam porro necessitatibus quod magni iure neque earum suscipit distinctio, quaerat dolores quas, saepe consequatur. Eaque?
          </Box>
           <Box>
            <Checkbox isChecked={isAgree} onChange={() => setIsAgree(!isAgree)} colorScheme={'green'} mt={5} mb={2}>
              <Text style={{...MainStyles.normalFont}}>
                I agree to these terms & conditions
              </Text>
            </Checkbox>
            <Box
            style={{
                marginTop: 10,
                marginBottom: 10,
                ...MainStyles.centerAll
            }}
            >
                <Divider width={"100%"} height={0.4} bg="#000" style={{ opacity: 0.2 }} />
            </Box>
            <Box style={{...MainStyles.flexRowBetween}} mt={2}>
              <Checkbox isChecked={!isAboveEighteen} onChange={() => setIsAboveEighteen(false)} colorScheme={'green'}>
                <Text style={{...MainStyles.normalFont, lineHeight: 30}}>
                  ၁၈ နှစ်အောက် 
                </Text>
              </Checkbox>
              <Checkbox isChecked={isAboveEighteen} onChange={() => setIsAboveEighteen(true)} colorScheme={'green'}>
                <Text style={{...MainStyles.normalFont, lineHeight: 30}}>
                  ၁၈ နှစ်အထက်
                </Text>
              </Checkbox>
            </Box>
          </Box>
            {error && (
              <Box mt={3} style={{width: 300}}>
                <Text style={{color: 'red', ...MainStyles.normalFont}}>{error}</Text>
              </Box>
            )}
        </Modal.Body>
        <Box
          style={{
            marginBottom: 10,
            ...MainStyles.centerAll
          }}
        >
          <Divider width={"85%"} height={0.4} bg="#000" style={{ opacity: 0.2 }} />
        </Box>
        <Modal.Footer style={{borderTopWidth: 0, marginHorizontal: 10}}>
          <Button.Group space={2}>
            <Button  w={'100%'} bg={theme.app_button_color} borderRadius={10} onPress={() => handleConfirm()}>
              <Text style={{...MainStyles.normalFont, lineHeight: 30,color: '#fff', fontSize: 12}}>ပိတ်မည်</Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default HomeModal;
