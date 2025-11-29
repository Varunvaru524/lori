import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import { setUserDetails } from '../libraries/asyncStorage';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

function NotificationTimeScreen({ navigation, route }) {
  // Set default time to 8:00 PM (20:00)
  const defaultTime = new Date();
  defaultTime.setHours(20, 0, 0, 0);
  
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (event, time) => {
    if (Platform.OS === 'android') {
      setTimePickerVisible(false);
    }
    
    if (event.type === 'set' && time) {
      setSelectedTime(time);
      if (Platform.OS === 'ios') {
        // iOS will handle closing via the modal
      }
    } else if (event.type === 'dismissed') {
      hideTimePicker();
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
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
          <Text style={styles.stepIndicator}>Step 7 of 7</Text>
          <View style={styles.spacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Story of the Day</Text>

          <TouchableOpacity onPress={showTimePicker} style={styles.timeCard}>
            <Text style={styles.timeDisplay}>{formatTime(selectedTime)}</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleFinish}
            style={styles.button}
          >
            <MaterialCommunityIcons name="check" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Complete Setup</Text>
          </TouchableOpacity>
          <View style={styles.safeArea} />
        </View>

        {/* Date Time Picker */}
        {Platform.OS === 'ios' ? (
          <Modal
            visible={isTimePickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={hideTimePicker}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={hideTimePicker}>
                    <Text style={styles.modalButton}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Select Time</Text>
                  <TouchableOpacity onPress={hideTimePicker}>
                    <Text style={[styles.modalButton, styles.modalButtonDone]}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="spinner"
                  onChange={handleConfirm}
                  textColor="#312E81"
                  style={{alignSelf:'center'}}
                />
              </View>
            </View>
          </Modal>
        ) : (
          isTimePickerVisible && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={handleConfirm}
            />
          )
        )}
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
  timeCard: {
    maxWidth: 384,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 32,
    alignItems: 'center'
  },
  timeDisplay: {
    fontSize: 32,
    color: '#312E81',
    fontWeight: '400',
    textAlign: 'center'
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
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  safeArea: {
    height: 32
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#312E81'
  },
  modalButton: {
    fontSize: 17,
    color: '#4F46E5'
  },
  modalButtonDone: {
    fontWeight: '600'
  }
});

export default NotificationTimeScreen;

