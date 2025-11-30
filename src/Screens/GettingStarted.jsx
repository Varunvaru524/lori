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
          <Image
            source={require('../../assets/logo.png')}
            style={styles.appLogo}
            contentFit="contain"
          />
          <Text style={styles.appName}>Lori</Text>
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
    marginTop: 20
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
    marginBottom: 32
  },
  appLogo: {
    width: 48,
    height: 48,
    borderRadius: 24, // Rounded corners
    marginBottom: 4, // 4px gap between logo and text
  },
  appName: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 36,
    letterSpacing: 0,
    color: colors.neutral20, // indigo-700
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
    fontFamily: 'Quicksand_700Bold',
    fontSize: 28,
    color: '#34302D', // indigo-900
    textAlign: 'center'
  },
  bottomSpacer: {
    flex: 1
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary, // indigo-600
    borderRadius: 9999,
    paddingVertical: 16
  },
  safeArea: {
    height: 32
  }
})

// Exports
export default GettingStarted;