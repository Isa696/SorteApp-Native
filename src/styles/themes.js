import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#9992a0',
    secondary: '#B8C9CC',
    accent: '#363a2c',
    background: '#ffffff',
    text: '#000000',
    elevation:{
      level1: '#000000',
      level2: '#363a2c',
      },
  },
};

const darkTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#9992a0',
    secondary: '#363a2c',
    accent: '#B8C9CC',
    background: '#000000',
    text: '#ffffff',
    elevation:{
      level1: '#ffffff',
      level2: '#B8C9CC',
      },
  },
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;