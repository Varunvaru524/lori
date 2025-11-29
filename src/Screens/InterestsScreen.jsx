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

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleNext = () => {
    // Check if we're in story generation mode or onboarding mode
    const isStoryGeneration = route.params?.isStoryGeneration;
    
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
    <AppLayout style={styles.appLayout}>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={20} color="#4F46E5" />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step 6 of 7</Text>
          <View style={styles.spacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(6 / 7) * 100}%` }]} />
        </View>

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
              color={selectedInterests.length === 0 ? '#9CA3AF' : '#FFFFFF'} 
            />
          </TouchableOpacity>
          <View style={styles.safeArea} />
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  appLayout: {
    backgroundColor: '#FFF9F5'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5'
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
    paddingTop: 24
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
    color: '#312E81',
    textAlign: 'center',
    marginBottom: 48,
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

export default InterestsScreen;

