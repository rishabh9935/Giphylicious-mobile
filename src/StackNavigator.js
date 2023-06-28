import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
// import NewsDetailsScreen from "./screens/NewsDetailsScreen";
 
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            {/* <Stack.Screen name="NewsDetails" component={NewsDetailsScreen}/> */}
        </Stack.Navigator>
    )
}

export default StackNavigator
