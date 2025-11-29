import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import CheckboxButton from '../Components/CheckboxButton';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const interests = [
  'Animals',
  'Adventure',
  'Magic',
  'Family',
  'Nature',
  'Space',
  'Cars/Trucks',
  'Princesses',
  'Dinosaurs'
];

function InterestsScreen({ navigation, route }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
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

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Interests</Text>
          <Text style={styles.subtitle}>What does your child love? (multiple)</Text>

          <View style={styles.optionsContainer}>
            {interests.map((interest) => (
              <CheckboxButton
                key={interest}
                label={interest}
                selected={selectedInterests.includes(interest)}
                onPress={() => toggleInterest(interest)}
                style={styles.option}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Next"
            onPress={handleNext}
            disabled={selectedInterests.length === 0}
          />
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral98
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24
  },
  title: {
    ...fonts.headlineLarge,
    color: colors.neutral20,
    marginBottom: 8
  },
  subtitle: {
    ...fonts.bodyLarge,
    color: colors.neutral40,
    marginBottom: 32
  },
  optionsContainer: {
    gap: 12,
    paddingBottom: 24
  },
  option: {
    marginBottom: 0
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 34,
    backgroundColor: colors.neutral98,
    borderTopWidth: 1,
    borderTopColor: colors.neutral90
  }
});

export default InterestsScreen;

