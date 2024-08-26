// MainStyle.jsx
import { Platform, StyleSheet } from 'react-native';

const MainStyles = StyleSheet.create({
  titleFont: {
    fontFamily: Platform.select({
      android: 'MatemasieRegular',
      ios: 'MatemasieRegular',
    }),
    fontWeight: 700, 
  },
  normalFont: {
    fontFamily: 'Overpass',
    fontWeight: '400', 
  },
  fabStyle: {
    backgroundColor: '#1e5781',
    marginBottom: 10,
  },
  flexRowCenter: {
    flexDirection: "row", 
    justifyContent: 'center'
  },
  flexRowStart: {
    flexDirection: "row", 
    justifyContent: 'start'
  },
  flexRowBetween: {
    flexDirection: "row", 
    justifyContent: 'space-between'
  },
  centerAll: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textShadow: {
    textShadowColor: '#09614e', 
    textShadowOffset: { width: 0.2, height: 0.2 },
    textShadowRadius: 0.5,
  }
});

export default MainStyles;
