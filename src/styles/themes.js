import { MD3LightTheme as DefaultTheme, MD3DarkTheme  } from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9992a0',
    onPrimary: '#000000',
    secondary: '#B8C9CC',
    onSecondary: '#000000',
    secondaryContainer: '#B8C9CC',
    onSecondaryContainer: '#000000',
    outline: '#363a2c',
    accent: '#363a2c',
    background: '#ffffff',
    text: '#000000',
    error: '#D80032',
    onError: '#60435F',
    onSurface: '#000000',
    onSurfaceVariant: '#817988',
    surfaceDisabled: '#3a373e',
    onSurfaceDisabled: '#817988',
    inverseOnSurface: '#60435F',
    elevation:{
      level1: '#363a2c',
      level2: '#000000',
    },
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#9992a0',
    onPrimary: '#ffffff',
    secondary: '#363a2c',
    onSecondary: '#ffffff',
    secondaryContainer: '#363a2c',
    onSecondaryContainer: '#ffffff',
    outline: '#B8C9CC',
    accent: '#B8C9CC',
    background: '#000000',
    text: '#ffffff',
    error: '#EF233C',
    onError: '#60435F',
    onSurface: '#ffffff',
    onSurfaceVariant: '#817988',
    surfaceDisabled: '#3a373e',
    onSurfaceDisabled: '#817988',
    inverseOnSurface: '#60435F',
    elevation:{
      level1: '#B8C9CC',
      level2: '#ffffff',
      },
  },
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;