import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import RadioButton from '../Components/RadioButton';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const languages = ['English', 'Hindi'];

function PreferredLanguageScreen({ navigation, route }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleNext = () => {
    navigation.navigate('ChildAgeScreen', {
      ...route.params,
      preferredLanguage: selectedLanguage
    });
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Preferred Language</Text>
          <Text style={styles.subtitle}>Choose the language for bedtime stories</Text>

          <View style={styles.optionsContainer}>
            {languages.map((language) => (
              <RadioButton
                key={language}
                label={language}
                selected={selectedLanguage === language}
                onPress={() => setSelectedLanguage(language)}
                style={styles.option}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Next"
            onPress={handleNext}
            disabled={!selectedLanguage}
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

export default PreferredLanguageScreen;

