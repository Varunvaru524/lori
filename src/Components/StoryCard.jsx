import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';
import { StoryEmptyStateImage } from '../../assets/graphics';

// Gradient colors for different story cards
const gradientColors = [
  ['rgba(147, 197, 253, 0.5)', 'rgba(165, 180, 252, 0.5)'], // blue-indigo
  ['rgba(165, 243, 252, 0.5)', 'rgba(147, 197, 253, 0.5)'], // cyan-blue
  ['rgba(167, 243, 208, 0.5)', 'rgba(110, 231, 183, 0.5)'], // green-emerald
  ['rgba(254, 215, 170, 0.5)', 'rgba(251, 191, 36, 0.5)'],  // orange-amber
  ['rgba(251, 207, 232, 0.5)', 'rgba(244, 114, 182, 0.5)'], // pink
  ['rgba(216, 180, 254, 0.5)', 'rgba(251, 207, 232, 0.5)'], // purple-pink
];

function StoryCard({ title, style, onCardPress, isFavorite, onCheckPress, thumbnail }) {

  // Hooks
  const [formattedTitle, setFormattedTitle] = useState(undefined);

  // Get a consistent gradient based on title
  const getGradientForTitle = (title) => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradientColors[hash % gradientColors.length];
  };

  const gradient = getGradientForTitle(title);

  // Function handlers
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
    <TouchableOpacity onPress={onCardPress} activeOpacity={0.8}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBorder, style]}
      >
        <View style={styles.cardInner}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: thumbnail || StoryEmptyStateImage }}
              cachePolicy='disk'
              contentFit="cover"
            />
            {/* Dark gradient overlay at bottom */}
            <LinearGradient
              colors={['rgba(49, 46, 129, 0)', 'rgba(49, 46, 129, 0.6)']}
              style={styles.imageOverlay}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            {/* Title at bottom */}
            <View style={styles.titleContainer}>
              <Text style={styles.title} onTextLayout={handleTitleLayout} numberOfLines={2}>
                {formattedTitle || title}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}


// Styles
const styles = StyleSheet.create({
  gradientBorder: {
    width: 160,
    borderRadius: 24,
    padding: 2,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  cardInner: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: 22,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral95
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%'
  },
  titleContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  }
});


// Exports
export default StoryCard;