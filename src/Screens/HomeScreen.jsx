import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import AppLayout from '../Components/AppLayout';
import StoryCard from '../Components/StoryCard';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';
import { storiesCategories } from '../Utilities/appConstants';
import stories from '../content/stories';

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
    <AppLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.appLogo}
              contentFit="contain"
            />
            <Text style={styles.appName}>Bedtime Stories</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>U</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Story of the Day Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story of the Day</Text>
          <StoryOfTheDayCard
            story={storyOfTheDay}
            onPress={() => handleStoryPress(storyOfTheDay)}
          />
        </View>

        {/* Category Sections */}
        {storiesCategories.map((category, index) => {
          const categoryStories = getStoriesByCategory(category);
          if (categoryStories.length === 0) return null;

          return (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{category}</Text>
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
      </ScrollView>
    </AppLayout>
  );
}

// Story of the Day Card Component
function StoryOfTheDayCard({ story, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={storyOfDayStyles.container}>
        <Image
          source={{ uri: story.image }}
          style={storyOfDayStyles.image}
          contentFit="cover"
        />
        <View style={storyOfDayStyles.content}>
          <Text style={storyOfDayStyles.title}>{story.title}</Text>
          <Text style={storyOfDayStyles.description} numberOfLines={2}>
            {story.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral98
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral90
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  appLogo: {
    width: 40,
    height: 40
  },
  appName: {
    ...fonts.titleLarge,
    color: colors.neutral20
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    ...fonts.titleMedium,
    color: colors.white
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24
  },
  sectionTitle: {
    ...fonts.headlineSmall,
    color: colors.neutral20,
    marginBottom: 16
  },
  horizontalScroll: {
    paddingRight: 24
  },
  cardMargin: {
    marginRight: 16
  }
});

const storyOfDayStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
    backgroundColor: colors.neutral95
  },
  content: {
    padding: 16,
    gap: 8
  },
  title: {
    ...fonts.headLineXs,
    color: colors.neutral20
  },
  description: {
    ...fonts.bodyMedium,
    color: colors.neutral40
  }
});

export default HomeScreen;