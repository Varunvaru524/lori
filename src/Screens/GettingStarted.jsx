import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import fonts from '../Utilities/fonts';
import colors from '../Utilities/colors';
import AppButton from '../Components/AppButton';

function GettingStarted({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://www.themanthanschool.co.in/blog/wp-content/uploads/2022/07/Bedtime-Stories-for-Children-800x576.jpg' }}
        style={styles.image}
        contentFit="contain"
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Bedtime Stories</Text>
        <Text style={styles.subtitle}>
          Create magical bedtime stories for your little ones with the power of AI
        </Text>
      </View>

      <AppButton
        title="Get Started"
        onPress={handleGetStarted}
        style={styles.button}
      />
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.neutral98
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32
  },
  textContainer: {
    marginBottom: 40,
    alignItems: 'center'
  },
  title: {
    ...fonts.headlineMedium,
    textAlign: 'center',
    marginBottom: 12
  },
  subtitle: {
    ...fonts.bodyLarge,
    textAlign: 'center',
    color: colors.neutral40
  },
  button: {
    width: '100%',
    maxWidth: 300
  }
})

// Exports
export default GettingStarted;