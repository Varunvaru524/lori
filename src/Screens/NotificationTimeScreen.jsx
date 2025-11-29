import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import { setUserDetails } from '../libraries/asyncStorage';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

function NotificationTimeScreen({ navigation, route }) {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleFinish = async () => {
    try {
      const userDetails = {
        ...route.params,
        notificationTime: selectedTime.toISOString(),
        onboardingCompleted: true
      };

      await setUserDetails(userDetails);
      
      // Navigate to Home Screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } catch (error) {
      console.error('Error saving user details:', error);
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
    }
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Story of the Day</Text>
          <Text style={styles.subtitle}>When should we notify you?</Text>

          <TouchableOpacity onPress={showTimePicker} style={styles.timePickerButton}>
            <MaterialCommunityIcons name="clock-outline" size={24} color={colors.primary} />
            <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.neutral40} />
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <MaterialCommunityIcons name="information-outline" size={20} color={colors.neutral40} />
            <Text style={styles.infoText}>
              We'll send you a daily reminder to read a bedtime story with your child
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Finish"
            onPress={handleFinish}
          />
        </View>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
          date={selectedTime}
        />
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
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral90,
    backgroundColor: colors.white,
    gap: 12
  },
  timeText: {
    ...fonts.headLineXs,
    color: colors.neutral20,
    flex: 1
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.primary95,
    gap: 12
  },
  infoText: {
    ...fonts.bodyMedium,
    color: colors.neutral40,
    flex: 1,
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

export default NotificationTimeScreen;

