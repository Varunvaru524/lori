import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const ageRanges = [
  '1-2 Years',
  '2-3 Years',
  '3-4 Years',
  '4-5 Years',
  '5-6 Years',
  '6-7 Years'
];

function ChildAgeScreen({ navigation, route }) {
  const [selectedAge, setSelectedAge] = useState('');

  const handleNext = () => {
    navigation.navigate('ChildGenderScreen', {
      ...route.params,
      childAge: selectedAge
    });
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
          <Text style={styles.stepIndicator}>Step 2 of 7</Text>
          <View style={styles.spacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(2 / 7) * 100}%` }]} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>How old is your child?</Text>

          <View style={styles.optionsContainer}>
            {ageRanges.map((age) => (
              <TouchableOpacity
                key={age}
                onPress={() => setSelectedAge(age)}
                style={[
                  styles.optionCard,
                  selectedAge === age && styles.optionCardSelected
                ]}
              >
                <Text style={[
                  styles.optionText,
                  selectedAge === age && styles.optionTextSelected
                ]}>
                  {age}
                </Text>
                <View style={[
                  styles.radioOuter,
                  selectedAge === age && styles.radioOuterSelected
                ]}>
                  {selectedAge === age && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={!selectedAge}
            style={[styles.button, !selectedAge && styles.buttonDisabled]}
          >
            <Text style={[styles.buttonText, !selectedAge && styles.buttonTextDisabled]}>
              Continue
            </Text>
            <MaterialCommunityIcons 
              name="arrow-right" 
              size={20} 
              color={!selectedAge ? '#9CA3AF' : '#FFFFFF'} 
            />
          </TouchableOpacity>
          <View style={styles.safeArea} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  appLayout: {
    backgroundColor: '#FFF9F5'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
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
  optionsContainer: {
    gap: 12,
    maxWidth: 384,
    alignSelf: 'center',
    width: '100%'
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF'
  },
  optionCardSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  optionText: {
    fontSize: 18,
    color: '#312E81',
    fontWeight: '400'
  },
  optionTextSelected: {
    color: '#FFFFFF'
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioOuterSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF'
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F46E5'
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

export default ChildAgeScreen;

