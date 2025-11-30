import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import { NewAiChatIcon } from '../Utilities/utilityFunctions';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

function SelectNameScreen({ navigation, route }) {
  const [personalize, setPersonalize] = useState(null);

  // Check if we're in story generation mode
  const isStoryGeneration = route.params?.isStoryGeneration;

  const handleToggle = (value) => {
    setPersonalize(value);
  };

  const handleNext = () => {
    // Navigate to GenerateStoryScreen with all collected data
    navigation.navigate('GenerateStoryScreen', {
      ...route.params,
      personalize
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <AppLayout style={styles.appLayout}>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={20} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.spacer} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Make it personal?</Text>
          <Text style={styles.subtitle}>Add your child's name to the story</Text>

          <View style={styles.optionsContainer}>
            {/* Yes, personalize option */}
            <TouchableOpacity
              onPress={() => handleToggle(true)}
              style={[
                styles.optionCard,
                personalize === true && styles.optionCardSelected
              ]}
            >
              <Text style={[
                styles.optionText,
                personalize === true && styles.optionTextSelected
              ]}>
                ✨ Yes, personalize it!
              </Text>
            </TouchableOpacity>

            {/* No, keep it generic option */}
            <TouchableOpacity
              onPress={() => handleToggle(false)}
              style={[
                styles.optionCard,
                personalize === false && styles.optionCardSelected
              ]}
            >
              <Text style={[
                styles.optionText,
                personalize === false && styles.optionTextSelected
              ]}>
                📖 No, keep it generic
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={personalize === null}
            style={[styles.button, personalize === null && styles.buttonDisabled]}
          >
            {isStoryGeneration ? (
              <>
                <NewAiChatIcon color={colors.white} size={20} />
                <Text style={[styles.buttonText, personalize === null && styles.buttonTextDisabled]}>
                  Generate Story
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.buttonText, personalize === null && styles.buttonTextDisabled]}>
                  Continue
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color={personalize === null ? colors.neutral60 : colors.white}
                />
              </>
            )}
          </TouchableOpacity>
          <View style={styles.safeArea} />
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  appLayout: {
    backgroundColor: colors.neutral98
  },
  container: {
    flex: 1,
    backgroundColor: colors.neutral98
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
  spacer: {
    width: 40
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24
  },
  title: {
    ...fonts.headlineLarge,
    fontWeight: '400',
    color: colors.neutral20,
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    ...fonts.bodyLarge,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 32
  },
  optionsContainer: {
    gap: 16,
    maxWidth: 384,
    alignSelf: 'center',
    width: '100%'
  },
  optionCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  optionCardSelected: {
    backgroundColor: colors.primary95,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  optionText: {
    ...fonts.titleLarge,
    color: colors.neutral20,
    textAlign: 'center',
    fontWeight: '400'
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '500'
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
  buttonDisabled: {
    backgroundColor: colors.neutral90,
    shadowOpacity: 0
  },
  buttonText: {
    ...fonts.labelLarge,
    fontWeight: '500',
    color: colors.white
  },
  buttonTextDisabled: {
    color: colors.neutral60
  },
  safeArea: {
    height: 32
  }
});

export default SelectNameScreen;