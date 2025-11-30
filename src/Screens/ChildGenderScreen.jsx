import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const genders = ['He', 'She'];

function ChildGenderScreen({ navigation, route }) {
  const [selectedGender, setSelectedGender] = useState('He');

  const handleNext = () => {
    navigation.navigate('PersonalizeNameScreen', {
      ...route.params,
      childGender: selectedGender
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
            <MaterialCommunityIcons name="arrow-left" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step 3 of 7</Text>
          <View style={styles.spacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(3 / 7) * 100}%` }]} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Child's gender</Text>

          <View style={styles.optionsContainer}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                onPress={() => setSelectedGender(gender)}
                style={[
                  styles.optionCard,
                  selectedGender === gender && styles.optionCardSelected
                ]}
              >
                <Text style={[
                  styles.optionText,
                  selectedGender === gender && styles.optionTextSelected
                ]}>
                  {gender}
                </Text>
                <View style={[
                  styles.radioOuter,
                  selectedGender === gender && styles.radioOuterSelected
                ]}>
                  {selectedGender === gender && (
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
            disabled={!selectedGender}
            style={[styles.button, !selectedGender && styles.buttonDisabled]}
          >
            <Text style={[styles.buttonText, !selectedGender && styles.buttonTextDisabled]}>
              Continue
            </Text>
            <MaterialCommunityIcons 
              name="arrow-right" 
              size={20} 
              color={!selectedGender ? colors.neutral60 : colors.white} 
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
  optionsContainer: {
    gap: 16,
    maxWidth: 384,
    alignSelf: 'center',
    width: '100%'
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.neutral90,
    backgroundColor: colors.white
  },
  optionCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  optionText: {
    ...fonts.headLineXs,
    color: colors.neutral20,
    fontWeight: '400'
  },
  optionTextSelected: {
    color: colors.white
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral80,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioOuterSelected: {
    borderColor: colors.white,
    backgroundColor: colors.white
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary
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

export default ChildGenderScreen;

