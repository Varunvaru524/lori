import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import CheckboxButton from '../Components/CheckboxButton';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const morals = [
  'Kindness',
  'Sharing',
  'Bravery',
  'Honesty',
  'Patience',
  'Responsibility',
  'Friendship'
];

function MoralsLessonsScreen({ navigation, route }) {
  const [selectedMorals, setSelectedMorals] = useState([]);

  const toggleMoral = (moral) => {
    if (selectedMorals.includes(moral)) {
      setSelectedMorals(selectedMorals.filter(m => m !== moral));
    } else {
      setSelectedMorals([...selectedMorals, moral]);
    }
  };

  const handleNext = () => {
    navigation.navigate('InterestsScreen', {
      ...route.params,
      moralsLessons: selectedMorals
    });
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Morals & Lessons</Text>
          <Text style={styles.subtitle}>Select values you'd like to teach (multiple)</Text>

          <View style={styles.optionsContainer}>
            {morals.map((moral) => (
              <CheckboxButton
                key={moral}
                label={moral}
                selected={selectedMorals.includes(moral)}
                onPress={() => toggleMoral(moral)}
                style={styles.option}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Next"
            onPress={handleNext}
            disabled={selectedMorals.length === 0}
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

export default MoralsLessonsScreen;

