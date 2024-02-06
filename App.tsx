import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import Home from './screens/Home';
import Details from './screens/Detail';
import TravelRequest from './screens/TravelRequest';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer
     options={{headerShown: false}} >
      <Stack.Navigator initialRouteName='Flights'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6BA4B8', // Replace with your desired color
        },
        headerTintColor: '#fff', // Text color in the header
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name='Flights' component={Home} />
        <Stack.Screen name='Detail' component={Details}/>
        <Stack.Screen name='Request' component={TravelRequest}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}