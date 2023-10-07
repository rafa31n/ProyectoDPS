import React, { useEffect, useState } from 'react';
import Navigation from './src/navigation/Navigation.js';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  {useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []); }

  return (
    <Navigation />
  )
}
