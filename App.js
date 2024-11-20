import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import themes from './src/styles/themes';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerScreen from './src/navigation/DrawerScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [theme, setTheme] = useState(themes.dark);

  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
            <StatusBar backgroundColor={theme.colors.background}
            style={theme.dark ? 'light' : 'dark'}  />
              <DrawerScreen theme={theme} setTheme={setTheme}/>
            </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
  );
}