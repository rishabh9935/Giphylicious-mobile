import { NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import StackNavigator from "./src/StackNavigator";
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {

  return (
    <ThemeProvider>
      <NavigationContainer>
          <StackNavigator/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
