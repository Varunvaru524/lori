import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AppLayout from '../Components/AppLayout';
import StoryCard from '../Components/StoryCard';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';
import { storiesCategories } from '../Utilities/appConstants';
import stories from '../content/stories';
import AppButton from '../Components/AppButton';
import { clearAllAsyncStorage } from '../libraries/asyncStorage';

function HomeScreen({ navigation }) {

  // Get story of the day (first story for now)
  const storyOfTheDay = stories[0];

  // Group stories by category
  const getStoriesByCategory = (category) => {
    return stories.filter(story => story.category === category);
  };

  const handleStoryPress = (story) => {
    navigation.navigate('StoriesScreen', { story });
  };

  return (
    <View style={styles.container}>
      {/* Header - Fixed at top */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={['#93C5FD', '#818CF8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            <MaterialCommunityIcons name="weather-night" size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={styles.appName}>DreamTales</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => clearAllAsyncStorage()} style={styles.profileButton}>
          <MaterialCommunityIcons name="account" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Featured Story Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tonight's story ✨</Text>
          <FeaturedStoryCard
            story={storyOfTheDay}
            onPress={() => handleStoryPress(storyOfTheDay)}
          />
        </View>

        {/* Category Sections */}
        {storiesCategories.map((category, index) => {
          const categoryStories = getStoriesByCategory(category);
          if (categoryStories.length === 0) return null;

          // Map category to emoji
          const categoryEmojis = {
            'Favourites': '💕',
            'Honesty': '🤝',
            'Bravery': '🦁',
            'Friendship': '🌈',
            'Kindness': '💕',
            'Adventure': '🗺️'
          };

          return (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{category} {categoryEmojis[category] || ''}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {categoryStories.map((story, storyIndex) => (
                  <StoryCard
                    key={storyIndex}
                    title={story.title}
                    thumbnail={story.image}
                    onCardPress={() => handleStoryPress(story)}
                    style={storyIndex !== categoryStories.length - 1 && styles.cardMargin}
                  />
                ))}
              </ScrollView>
            </View>
          );
        })}

        {/* Bottom padding to ensure content doesn't hide behind button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Generate Button */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MoralsLessonsScreen', { isStoryGeneration: true })}
          style={styles.floatingButton}
        >
          <MaterialCommunityIcons name="sparkles" size={16} color="#1F2937" />
          <Text style={styles.floatingButtonText}>Generate Story</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Featured Story Card Component
function FeaturedStoryCard({ story, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['rgba(251, 207, 232, 0.6)', 'rgba(219, 234, 254, 0.6)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={featuredStoryStyles.container}
      >
        {/* Story Thumbnail */}
        <View style={featuredStoryStyles.thumbnailContainer}>
          <Image
            source={{ uri: story.image }}
            style={featuredStoryStyles.thumbnail}
            contentFit="cover"
          />
        </View>

        {/* Story Details */}
        <View style={featuredStoryStyles.content}>
          <View style={featuredStoryStyles.textContent}>
            <Text style={featuredStoryStyles.title}>{story.title}</Text>
            <Text style={featuredStoryStyles.description} numberOfLines={2}>
              {story.description}
            </Text>
          </View>

          <View style={featuredStoryStyles.metadata}>
            <View style={featuredStoryStyles.metadataItem}>
              <MaterialCommunityIcons name="clock-outline" size={16} color="#4F46E5" />
              <Text style={featuredStoryStyles.metadataText}>8 min</Text>
            </View>
            <View style={featuredStoryStyles.metadataItem}>
              <MaterialCommunityIcons name="sparkles" size={16} color="#EC4899" />
              <Text style={featuredStoryStyles.metadataTextSmall}>Fantasy</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    marginTop: 40,
    backgroundColor: 'rgba(255, 249, 245, 0.95)',
    zIndex: 1
  },
  scrollContent: {
    flex: 1
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  logoGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  appName: {
    fontSize: 20,
    fontWeight: '400',
    color: '#312E81'
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  section: {
    marginTop: 32
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#312E81',
    marginBottom: 16,
    marginLeft: 20
  },
  horizontalScroll: {
    paddingHorizontal: 20
  },
  cardMargin: {
    marginRight: 12
  },
  bottomPadding: {
    height: 120
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  floatingButtonText: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '400'
  }
});

const featuredStoryStyles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  thumbnailContainer: {
    width: 96,
    height: 128,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral95
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  textContent: {
    gap: 8
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: '#312E81',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    color: '#4F46E5',
    lineHeight: 20,
    marginBottom: 12
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  metadataText: {
    fontSize: 14,
    color: '#4F46E5'
  },
  metadataTextSmall: {
    fontSize: 12,
    color: '#EC4899'
  }
});

export default HomeScreen;