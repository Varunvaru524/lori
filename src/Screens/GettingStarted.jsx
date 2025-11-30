import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import fonts from '../Utilities/fonts';
import colors from '../Utilities/colors';
import AppButton from '../Components/AppButton';

function GettingStarted({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('PreferredLanguageScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* App Name */}
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>DreamTales</Text>
        </View>

        {/* Top spacing */}
        <View style={styles.topSpacer} />

        {/* Centered Logo/Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://storage.googleapis.com/coozy-dev/Bed-time-stories/onboarding-intro.png' }}
            style={styles.image}
            contentFit="cover"
          />
        </View>

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            Magical bedtime stories, every night
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />

        {/* CTA Button */}
        <AppButton
          title="Get Started"
          onPress={handleGetStarted}
          style={styles.button}
        />

      </View>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
    marginTop:20
  },
  contentWrapper: {
    flex: 1,
    maxWidth: 448, // max-w-md equivalent
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48
  },
  appNameContainer: {
    alignItems: 'center',
    marginBottom: 32
  },
  appName: {
    fontSize: 36,
    fontWeight: '600',
    color: '#4F46E5', // indigo-700
    fontFamily: 'Quicksand'
  },
  topSpacer: {
    flex: 1
  },
  imageContainer: {
    marginBottom: 48,
    height: 320,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 24
  },
  tagline: {
    fontSize: 28,
    fontWeight: '600',
    color: '#312E81', // indigo-900
    textAlign: 'center',
    lineHeight: 36
  },
  bottomSpacer: {
    flex: 1
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5', // indigo-600
    borderRadius: 9999,
    paddingVertical: 16
  },
  safeArea: {
    height: 32
  }
})

// Exports
export default GettingStarted;