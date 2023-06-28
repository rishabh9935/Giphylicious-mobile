import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import StackNavigator from "./src/StackNavigator";
import { EventRegister } from 'react-native-event-listeners';
import theme from './src/components/theme';
import themeContext from './src/components/themeContext';

export default function App() {
  const[darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data)
      console.log(data)
    })
    return ()=>{
      EventRegister.removeAllListeners(listener);
    }
  }, [darkMode])

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
          <StackNavigator/>
      </NavigationContainer>
    </themeContext.Provider>

 
  );
}



// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Randi-Chay-putram</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
