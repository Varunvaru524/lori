import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const interestsOptions = [
  { id: 'animals', label: 'Animals', emoji: '🦊' },
  { id: 'adventure', label: 'Adventure', emoji: '🗺️' },
  { id: 'magic', label: 'Magic', emoji: '✨' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'space', label: 'Space', emoji: '🚀' },
  { id: 'cars', label: 'Cars/Trucks', emoji: '🚗' },
  { id: 'princesses', label: 'Princesses', emoji: '👑' },
  { id: 'dinosaurs', label: 'Dinosaurs', emoji: '🦕' }
];

function InterestsScreen({ navigation, route }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  // Check if we're in story generation mode or onboarding mode
  const isStoryGeneration = route.params?.isStoryGeneration;

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleNext = () => {
    if (isStoryGeneration) {
      navigation.navigate('PreferredLanguageScreen', {
        ...route.params,
        interests: selectedInterests,
        isStoryGeneration: true
      });
    } else {
      navigation.navigate('NotificationTimeScreen', {
        ...route.params,
        interests: selectedInterests
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
        {!isStoryGeneration && <Text style={styles.stepIndicator}>Step 6 of 7</Text>}
        <View style={styles.spacer} />
      </View>

      {/* Progress Bar - Only show in onboarding */}
      {!isStoryGeneration && (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(6 / 7) * 100}%` }]} />
        </View>
      )}

      {/* Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What does your child love?</Text>

        <View style={styles.gridContainer}>
          {interestsOptions.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              onPress={() => toggleInterest(interest.id)}
              style={[
                styles.gridCard,
                selectedInterests.includes(interest.id) && styles.gridCardSelected
              ]}
            >
              <Text style={styles.emoji}>{interest.emoji}</Text>
              <Text style={styles.gridLabel}>{interest.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={selectedInterests.length === 0}
          style={[styles.button, selectedInterests.length === 0 && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText, selectedInterests.length === 0 && styles.buttonTextDisabled]}>
            Continue
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color={selectedInterests.length === 0 ? colors.neutral60 : colors.white}
          />
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
    color: 'colors.primary'
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 24
  },
  gridCard: {
    width: '48%',
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.neutral90,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  gridCardSelected: {
    backgroundColor: colors.primary95,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
    textAlign: 'center'
  },
  gridLabel: {
    ...fonts.labelLarge,
    color: colors.neutral20,
    textAlign: 'center',
    fontWeight: '400'
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

export default InterestsScreen;

