import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black, } from '@expo-google-fonts/inter';
import { Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold, } from '@expo-google-fonts/quicksand';
import GettingStarted from './Screens/GettingStarted';
import { Platform } from 'react-native';
import fonts from './Utilities/fonts';
import StoriesScreen from './Screens/StoriesScreen';
import HomeScreen from './Screens/HomeScreen';
import GenerateStoryScreen from './Screens/GenerateStoryScreen';
import PreferredLanguageScreen from './Screens/PreferredLanguageScreen';
import ChildAgeScreen from './Screens/ChildAgeScreen';
import ChildGenderScreen from './Screens/ChildGenderScreen';
import MoralsLessonsScreen from './Screens/MoralsLessonsScreen';
import InterestsScreen from './Screens/InterestsScreen';
import NotificationTimeScreen from './Screens/NotificationTimeScreen';
import PersonalizeNameScreen from './Screens/PersonalizeNameScreen';
import { getUserDetails } from './libraries/asyncStorage';
import SelectNameScreen from './Screens/SelectNameScreen';

const Stack = createStackNavigator();


function Index() {

  const [initialRouteName, setInitialRouteName] = useState(null);
  let [fontsLoaded] = useFonts({ Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black, Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold });


  useEffect(() => {
    (async () => {
      const userDetails = await getUserDetails();
      if (userDetails) setInitialRouteName('HomeScreen');
      else setInitialRouteName('GettingStarted');
    })();
  }, []);

  // Wait for initial route to be determined
  if (!initialRouteName || !fontsLoaded) { return null }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          cardShadowEnabled: true,
          headerTitleAlign: 'left',
          headerBackTitleVisible: false,
          headerTitleStyle: fonts.titleMedium,
          headerLeftContainerStyle: { paddingLeft: (Platform.OS === 'ios') ? 8 : 0 },
        }}
      >
        <Stack.Screen
          name='GettingStarted'
          component={GettingStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PreferredLanguageScreen'
          component={PreferredLanguageScreen}
          options={{ title: 'Setup', headerShown: false }}
        />
        <Stack.Screen
          name='ChildAgeScreen'
          component={ChildAgeScreen}
          options={{ title: 'Setup', headerShown: false }}
        />
        <Stack.Screen
          name='ChildGenderScreen'
          component={ChildGenderScreen}
          options={{ title: 'Setup', headerShown: false }}
        />
        <Stack.Screen
          name='MoralsLessonsScreen'
          component={MoralsLessonsScreen}
          options={{ title: 'Setup', headerShown: false }}
        />
        <Stack.Screen
          name='InterestsScreen'
          component={InterestsScreen}
          options={{ title: 'Setup', headerShown: false }}
        />
        <Stack.Screen
          name='NotificationTimeScreen'
          component={NotificationTimeScreen}
          options={{ title: 'Setup', headerShown: false }}
        />
        <Stack.Screen
          name='PersonalizeNameScreen'
          component={PersonalizeNameScreen}
          options={{ title: 'Generate Story', headerShown: false }}
        />
        <Stack.Screen
          name='SelectNameScreen'
          component={SelectNameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='StoriesScreen'
          component={StoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='GenerateStoryScreen'
          component={GenerateStoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


// Exports
export default Index;

