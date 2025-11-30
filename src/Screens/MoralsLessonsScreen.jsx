import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const moralsOptions = [
  { id: 'kindness', label: 'Kindness', emoji: '💕' },
  { id: 'sharing', label: 'Sharing', emoji: '🎁' },
  { id: 'bravery', label: 'Bravery', emoji: '🦁' },
  { id: 'honesty', label: 'Honesty', emoji: '🤝' },
  { id: 'patience', label: 'Patience', emoji: '⏳' },
  { id: 'responsibility', label: 'Responsibility', emoji: '🎯' },
  { id: 'friendship', label: 'Friendship', emoji: '🌈' }
];

function MoralsLessonsScreen({ navigation, route }) {
  const [selectedMorals, setSelectedMorals] = useState([]);

  const toggleMoral = (moralId) => {
    if (selectedMorals.includes(moralId)) {
      setSelectedMorals(selectedMorals.filter(m => m !== moralId));
    } else {
      setSelectedMorals([...selectedMorals, moralId]);
    }
  };

  const handleNext = () => {
    // Check if we're in story generation mode or onboarding mode
    const isStoryGeneration = route.params?.isStoryGeneration;

    if (isStoryGeneration) {
      navigation.navigate('InterestsScreen', {
        ...route.params,
        moralsLessons: selectedMorals,
        isStoryGeneration: true
      });
    } else {
      navigation.navigate('InterestsScreen', {
        ...route.params,
        moralsLessons: selectedMorals
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
          <MaterialCommunityIcons name="arrow-left" size={20} color="#4F46E5" />
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>Step 5 of 7</Text>
        <View style={styles.spacer} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(5 / 7) * 100}%` }]} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What values matter most?</Text>

        <View style={styles.gridContainer}>
          {moralsOptions.map((moral) => (
            <TouchableOpacity
              key={moral.id}
              onPress={() => toggleMoral(moral.id)}
              style={[
                styles.gridCard,
                selectedMorals.includes(moral.id) && styles.gridCardSelected
              ]}
            >
              <Text style={styles.emoji}>{moral.emoji}</Text>
              <Text style={styles.gridLabel}>{moral.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleNext}
          disabled={selectedMorals.length === 0}
          style={[styles.button, selectedMorals.length === 0 && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText, selectedMorals.length === 0 && styles.buttonTextDisabled]}>
            Continue
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color={selectedMorals.length === 0 ? '#9CA3AF' : '#FFFFFF'}
          />
        </TouchableOpacity>
        <View style={styles.safeArea} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
    marginTop: 36,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  stepIndicator: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500'
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
    backgroundColor: '#4F46E5',
    borderRadius: 4
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
    color: '#312E81',
    textAlign: 'center',
    marginBottom: 38,
    lineHeight: 36
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
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  gridCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
    shadowColor: '#4F46E5',
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
    fontSize: 14,
    color: '#312E81',
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
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 9999,
    gap: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  buttonTextDisabled: {
    color: '#9CA3AF'
  },
  safeArea: {
    height: 32
  }
});

export default MoralsLessonsScreen;

