import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import themes from './src/styles/themes';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerScreen from './src/navigation/DrawerScreen';
import ScreenShot from './src/components/ShareButton';


export default function App() {

  const [theme, setTheme] = useState(themes.dark);

  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
            <StatusBar style="auto" />
              <DrawerScreen theme={theme} setTheme={setTheme}/>
        </NavigationContainer>
      </PaperProvider>
  );
}