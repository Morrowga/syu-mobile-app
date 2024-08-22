import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { AspectRatio, Stack, Box, Heading, FlatList, ScrollView, Button } from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import LazyLoadImage from "../../components/LazyLoadImage";
import { getThemeData } from "../../api/theme";
import { checkOrders } from "../../api/order";
import MainStyles from '../../components/styles/MainStyle';
import Slider from "../../components/Slider";
import HomeModal from "../../components/HomeModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotifications } from '../../api/notification';

const { width: viewportWidth } = Dimensions.get("window");

const HomeScreen = ({ navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  console.log(authData);
  const theme = useSelector((state) => state.theme);
  const data = [
    {
      id: 1,
      name: "Jump In !",
      url: "https://i.pinimg.com/564x/ed/33/66/ed33665b065b233baad83926a393a998.jpg",
      route: "Feeds",
    },
  ];

  const closeModal = () => {
    setIsOpen(false)
  };

  const checkAgreementAndAgeModal = async (currentMsisdn) => {
    try {
      let msisdnData = null;
      const storedMsisdns = await AsyncStorage.getItem('msisdns');
      let msisdnsArray = storedMsisdns ? JSON.parse(storedMsisdns) : [];
     
      if(msisdnsArray.length > 0)
      {
        msisdnData = msisdnsArray.find(
          (item) => item.msisdn === currentMsisdn
        );
      } 

      if (msisdnData !== null && msisdnData?.agreement_status == true) {
        setIsOpen(false);
      } else {
        setIsOpen(true);  
      }
    } catch (error) {
      console.error('Failed to check agreement status:', error);
      setIsOpen(true); 
    }
  };
  

  
  useFocusEffect(
    React.useCallback(() => {
      checkAgreementAndAgeModal(authData?.msisdn); 
      return () => {
        setIsOpen(false);
      };
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getThemeData());
      dispatch(checkOrders());
      dispatch(getNotifications());
    });
    return () => unsubscribe();
  }, [navigation]);


  const renderItem = ({ item }) => (
    <Box style={{ paddingVertical: 5 }}>
      <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
        <Box
          key={item}
          flex={1}
          width="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          style={{ backgroundColor: theme.app_bg_color }}
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 5}>
              <LazyLoadImage source={item.url} alt="image" />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack style={{...MainStyles.flexRowBetween}} space={2}>
              <Heading size="sm" style={[MainStyles.normalFont,{ color: '#fff' }]}>
                {item.name}
              </Heading>
            </Stack>
          </Stack>
        </Box>
      </TouchableOpacity>
    </Box>
  );

  return (
    <View style={[styles.container]}>
      <Slider items={theme.banners} />
      <Box textAlign="center" alignItems="left" mx={5} mt={5}>
      <Heading style={[MainStyles.titleFont, { 
        color: theme.app_text_color,
      }, MainStyles.textShadow]}>
          Welcome Alien...
        </Heading>
      </Box>
      <FlatList
        my={1}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id}
      />
      <HomeModal isOpen={isOpen} onClose={closeModal} theme={theme} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: "contain",
    // borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  testcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
