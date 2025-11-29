import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

const ageRanges = [
  '0-6 Months',
  '6-12 Months',
  '1-2 Years',
  '2-3 Years',
  '3-4 Years',
  '4-5 Years',
  '5-6 Years',
  '6-7 Years'
];

function ChildAgeScreen({ navigation, route }) {
  const [selectedAge, setSelectedAge] = useState(ageRanges[0]);

  const handleNext = () => {
    navigation.navigate('ChildGenderScreen', {
      ...route.params,
      childAge: selectedAge
    });
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Child's Age</Text>
          <Text style={styles.subtitle}>Select your child's age range</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAge}
              onValueChange={(itemValue) => setSelectedAge(itemValue)}
              style={styles.picker}
            >
              {ageRanges.map((age) => (
                <Picker.Item key={age} label={age} value={age} />
              ))}
            </Picker>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Next"
            onPress={handleNext}
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
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral90,
    overflow: 'hidden'
  },
  picker: {
    height: 200
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

export default ChildAgeScreen;

