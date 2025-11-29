import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';


const AppButton = ({ title = 'title', onPress, style, disabled, type = 'primary', isActive, Icon, iconSize, isChip, isHapticsDisabled, textStyle }) => {

  // Styles
  const secondaryContainerStyle = {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    justifyContent: 'center',
    borderWidth: isChip ? 0 : isActive ? 0 : 1,
    borderColor: isChip ? 'transparent' : isActive ? 'transparent' : colors.black,
    backgroundColor: isActive ? colors.black : isChip ? colors.primary90 : colors.neutral98,
    ...style
  }

  // Function handlers
  const handlePress = () => {
    onPress()
    !isHapticsDisabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  // Screen
  return (
    <>
      {type === 'primary' && <TouchableOpacity
        style={[styles.primaryContainer, { backgroundColor: disabled ? colors.primary60 : colors.primary }, style]}
        onPress={handlePress} disabled={disabled}
      >
        {Icon && <Icon size={iconSize} color={colors.white} />}
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </TouchableOpacity>}
      {type === 'secondary' && <TouchableOpacity
        style={secondaryContainerStyle}
        onPress={handlePress} disabled={disabled}
      >
        {Icon && <Icon size={iconSize} color={isActive ? colors.neutral98 : colors.black} style={styles.iconStyle} />}
        <Text style={[styles.title, { color: isActive ? colors.neutral98 : colors.black }, textStyle]}>{title}</Text>
      </TouchableOpacity>}
    </>
  );
};


// Styles
const styles = StyleSheet.create({
  primaryContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  title: {
    ...fonts.labelLarge,
    color: colors.white,
    textAlign: 'center'
  },
  iconStyle: {
    position: 'absolute',
    left: 20
  }
});


// Exports
export default AppButton;
