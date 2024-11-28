// src/components/SplashScreen.jsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/splash.png')} // La imagen que deseas mostrar en el splash
        style={styles.splashImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splashImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  }
});
