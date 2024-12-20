import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import themes from './src/styles/themes';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerScreen from './src/navigation/DrawerScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import Splash from './src/components/SplashScreen';
import mobileAds  from 'react-native-google-mobile-ads';

export default function App() {

  const [theme, setTheme] = useState(themes.dark);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsAppReady(true);
      SplashScreen.hideAsync();
    };

    prepare();

    mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log('Google Mobile Ads SDK inicializado', adapterStatuses);
    })
    .catch(error => {
      console.error('Error inicializando Google Mobile Ads SDK', error);
    });
  }, []);
  
  if (!isAppReady) {
    return <Splash />;
  }
  
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