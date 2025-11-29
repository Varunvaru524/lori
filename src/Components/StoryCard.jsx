import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';
import { StoryEmptyStateImage } from '../../assets/graphics';


function StoryCard({ title, style, onCardPress, isFavorite, onCheckPress, thumbnail }) {

  // Hooks
  const [formattedTitle, setFormattedTitle] = useState(undefined);

  // Function hanlders
  const handleTitleLayout = (e) => {
    if (e.nativeEvent.lines.length === 1 && title.includes(' ')) {
      const words = title.split(' ');
      const lastWord = words.pop();
      const newTitle = words.join(' ') + '\n' + lastWord;
      setFormattedTitle(newTitle);
    }
  }

  // Screen
  return (
    <TouchableOpacity onPress={onCardPress}>
      <View style={[styles.container, style]}>
        <ImageBackground
          style={styles.image}
          source={{ uri: thumbnail || StoryEmptyStateImage }}
          cachePolicy='disk'
        >
          <LinearGradient
            colors={['rgba(41, 37, 34, 0)', 'rgba(31, 27, 24, 0.8)']}
            style={styles.gradient}
            start={{ x: 0.5, y: 0.41 }}
            end={{ x: 0.5, y: 0.78 }}
          >
            <TouchableOpacity onPress={onCheckPress}>
              <View style={[styles.checkContainer]}>
                {isFavorite ? <MaterialCommunityIcons name='heart' size={20} color={colors.white} /> : <MaterialCommunityIcons name='heart-outline' size={20} color={colors.white} />}
              </View>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title} onTextLayout={handleTitleLayout}>{formattedTitle || title}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}


// Styles
const styles = StyleSheet.create({
  container: {
    width: 168,
    height: 244,
    borderRadius: 12,
    backgroundColor: colors.primary90,
  },
  image: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  checkContainer: {
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  title: {
    ...fonts.titleMedium,
    color: colors.neutral100,
  },
  titleContainer: {
    gap: 2
  },
  premiumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  premiumText: {
    ...fonts.labelSmall,
    color: colors.primary50,
  }
});


// Exports
export default StoryCard;