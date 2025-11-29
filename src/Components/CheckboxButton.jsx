import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

function CheckboxButton({ label, selected, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, selected && styles.containerSelected, style]}>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && (
          <MaterialCommunityIcons name="check" size={16} color={colors.white} />
        )}
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral90,
    backgroundColor: colors.white
  },
  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary95
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.neutral60,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },
  label: {
    ...fonts.bodyLarge,
    color: colors.neutral20,
    flex: 1
  },
  labelSelected: {
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold'
  }
});

export default CheckboxButton;

