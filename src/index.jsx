import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GettingStarted from './Screens/GettingStarted';
import { Platform } from 'react-native';
import fonts from './Utilities/fonts';
import StoriesScreen from './Screens/StoriesScreen';

const Stack = createStackNavigator();


function Index() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={'GettingStarted'}
        screenOptions={{
          cardShadowEnabled: true,
          headerTitleAlign: 'left',
          headerBackTitleVisible: false,
          headerTitleStyle: fonts.titleMedium,
          headerLeftContainerStyle: { paddingLeft: (Platform.OS === 'ios') ? 8 : 0 },
        }}
      >
        {/* <Stack.Screen
          name='GettingStarted'
          component={GettingStarted}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name='StoriesScreen'
          component={StoriesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


// Exports
export default Index;

