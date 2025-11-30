import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

function PersonalizeNameScreen({ navigation, route }) {
  const [childName, setChildName] = useState('');

  // Check if we're in story generation mode or onboarding mode
  const isStoryGeneration = route.params?.isStoryGeneration;

  const handleNext = () => {
    if (isStoryGeneration) {
      // Story generation flow
      const storyDetails = {
        moralsLessons: route.params?.moralsLessons || [],
        interests: route.params?.interests || [],
        preferredLanguage: route.params?.preferredLanguage || 'English',
        childName: childName.trim() || null
      };
      navigation.navigate('GenerateStoryScreen', { storyDetails });
    } else {
      // Onboarding flow
      navigation.navigate('MoralsLessonsScreen', {
        ...route.params,
        childName: childName.trim() || null
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step 4 of 7</Text>
          <View style={styles.spacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(4 / 7) * 100}%` }]} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            What's your child's name?{' '}
            <Text style={styles.optional}>(Optional)</Text>
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name"
              placeholderTextColor={colors.primary80}
              value={childName}
              onChangeText={setChildName}
              autoCapitalize="words"
              autoCorrect={false}
              textAlign="center"
            />
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleNext}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.safeArea} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  appLayout: {
    backgroundColor: colors.neutral98
  },
  container: {
    flex: 1,
    backgroundColor: colors.neutral98,
    marginTop:36,
    marginBottom: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 249, 245, 0.95)'
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  stepIndicator: {
    ...fonts.labelLarge,
    color: colors.primary
  },
  spacer: {
    width: 40
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 4,
    marginHorizontal: 20,
    overflow: 'hidden',
    marginBottom: 24
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24
  },
  title: {
    ...fonts.headlineMedium,
    fontWeight: '400',
    color: colors.neutral20,
    textAlign: 'center',
    marginBottom: 48
  },
  optional: {
    ...fonts.headLineXs,
    color: colors.neutral20
  },
  inputContainer: {
    maxWidth: 384,
    alignSelf: 'center',
    width: '100%'
  },
  textInput: {
    ...fonts.titleLarge,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.neutral90,
    backgroundColor: colors.white,
    color: colors.neutral20,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: 'rgba(255, 249, 245, 0.95)',
    paddingHorizontal: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  buttonText: {
    ...fonts.labelLarge,
    fontWeight: '500',
    color: colors.white
  },
  safeArea: {
    height: 32
  }
});

export default PersonalizeNameScreen;

