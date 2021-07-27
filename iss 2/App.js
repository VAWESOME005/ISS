import 'react-native-gesture-handler' 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import {createSwitchNavigator} from 'react-navigation'
import HomeScreen from './Screens/Home';
import MeteorScreen from './Screens/Meteor'; 
import ISSLocationScreen from './Screens/ISSLocation'  
const Stack = createStackNavigator()    

export default function App() {   
  return (  
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Home" screenOptions = {{headerShown: false}}>
        <Stack.Screen name = "Home" component = {HomeScreen} />
        <Stack.Screen name = "Meteor" component = {MeteorScreen} />
        <Stack.Screen name = "ISSLocation" component = {ISSLocationScreen} />
      </Stack.Navigator> 
    </NavigationContainer>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});