import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import themes from './src/styles/themes';
import { useState } from 'react';
import RandomMixGenerator from './src/screens/RandomMixGenerator';
import RandomName from './src/screens/RandomName';
import RandomNumber from './src/screens/RandomNumber';

export default function App() {
  const [theme, setTheme] = useState(themes.dark);

  return (
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        {/* <RandomNumber /> */}
        {/* <RandomName /> */}
        <RandomMixGenerator />
      </PaperProvider>
  );
}
