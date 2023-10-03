import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';

export default function App() {
  {useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []); }

  return (
    <Navigation />
  )
}
