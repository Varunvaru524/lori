import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import RadioButton from '../Components/RadioButton';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';


function PersonalizeNameScreen({ navigation, route }) {
  const [useChildName, setUseChildName] = useState('No');
  const [childName, setChildName] = useState('');

  const handleFinish = () => {
    // Collect all the story generation details
    const storyDetails = {
      moralsLessons: route.params?.moralsLessons || [],
      interests: route.params?.interests || [],
      preferredLanguage: route.params?.preferredLanguage || 'English',
      personalizeWithName: useChildName === 'Yes',
      childName: useChildName === 'Yes' ? childName.trim() : null
    };

    // Navigate to Generate Story Screen with the collected details
    navigation.navigate('GenerateStoryScreen', { storyDetails });
  };

  const isFinishDisabled = useChildName === 'Yes' && childName.trim() === '';

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Personalize with Child's Name</Text>
          <Text style={styles.subtitle}>Would you like to include your child's name in the story?</Text>

          <View style={styles.optionsContainer}>
            <RadioButton
              label="Yes"
              selected={useChildName === 'Yes'}
              onPress={() => setUseChildName('Yes')}
              style={styles.option}
            />
            <RadioButton
              label="No"
              selected={useChildName === 'No'}
              onPress={() => setUseChildName('No')}
              style={styles.option}
            />
          </View>

          {useChildName === 'Yes' && (
            <View style={styles.nameInputContainer}>
              <Text style={styles.inputLabel}>Child's Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your child's name"
                placeholderTextColor={colors.neutral60}
                value={childName}
                onChangeText={setChildName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {useChildName === 'Yes' 
                ? "Your child's name will be used as the main character in the story, making it more personal and engaging!"
                : "The story will feature a generic character that your child can imagine themselves as."}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Finish"
            onPress={handleFinish}
            disabled={isFinishDisabled}
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
    marginBottom: 24
  },
  option: {
    marginBottom: 0
  },
  nameInputContainer: {
    marginBottom: 24
  },
  inputLabel: {
    ...fonts.titleMedium,
    color: colors.neutral20,
    marginBottom: 12
  },
  textInput: {
    ...fonts.bodyLarge,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral90,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: colors.neutral20
  },
  infoContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.primary95
  },
  infoText: {
    ...fonts.bodyMedium,
    color: colors.neutral40,
    lineHeight: 20
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

export default PersonalizeNameScreen;

