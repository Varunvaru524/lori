import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import RadioButton from '../Components/RadioButton';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const genders = ['He', 'She'];

function ChildGenderScreen({ navigation, route }) {
  const [selectedGender, setSelectedGender] = useState('');

  const handleNext = () => {
    navigation.navigate('MoralsLessonsScreen', {
      ...route.params,
      childGender: selectedGender
    });
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Child's Gender</Text>
          <Text style={styles.subtitle}>Select your child's pronoun preference</Text>

          <View style={styles.optionsContainer}>
            {genders.map((gender) => (
              <RadioButton
                key={gender}
                label={gender}
                selected={selectedGender === gender}
                onPress={() => setSelectedGender(gender)}
                style={styles.option}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Next"
            onPress={handleNext}
            disabled={!selectedGender}
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
    gap: 12
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

export default ChildGenderScreen;

