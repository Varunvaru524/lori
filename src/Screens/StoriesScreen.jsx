import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import PagerView from 'react-native-pager-view';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';
import AppLayout from '../Components/AppLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function StoriesScreen({ navigation, route }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const pagerRef = useRef(null);
  
  // Get story from navigation params or use default
  const story = route?.params?.story || defaultStory;
  const totalPages = story.pages.length;

  const handlePageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      pagerRef.current?.setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <AppLayout style={styles.appLayout}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <MaterialCommunityIcons name="arrow-left" size={20} color="#4F46E5" />
          </TouchableOpacity>

          <Text style={styles.pageCounter}>
            {currentPage + 1} / {totalPages}
          </Text>

          <TouchableOpacity onPress={toggleFavorite} style={styles.headerButton}>
            <MaterialCommunityIcons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? "#EC4899" : "#4F46E5"} 
            />
          </TouchableOpacity>
        </View>

        {/* Story Content */}
        <ScrollView 
          style={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {/* Story Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.storyTitle}>{story.title}</Text>
          </View>

          {/* Story Card Container */}
          <View style={styles.storyCardWrapper}>
            <PagerView
              ref={pagerRef}
              style={styles.pagerView}
              initialPage={0}
              onPageSelected={handlePageSelected}
            >
              {story.pages.map((page, index) => (
                <View key={page.id} style={styles.pageContainer}>
                  <View style={styles.storyCard}>
                    {/* Story Illustration */}
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: page.image }}
                        style={styles.image}
                        contentFit="cover"
                      />
                    </View>

                    {/* Story Text */}
                    <View style={styles.textContainer}>
                      <Text style={styles.storyText}>{page.content}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </PagerView>
          </View>

          {/* Navigation Controls */}
          <View style={styles.navigationContainer}>
            {/* Previous Button */}
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentPage === 0}
              style={[
                styles.navButton,
                currentPage === 0 && styles.navButtonDisabled
              ]}
            >
              <MaterialCommunityIcons 
                name="chevron-left" 
                size={24} 
                color={currentPage === 0 ? '#9CA3AF' : '#4F46E5'} 
              />
            </TouchableOpacity>

            {/* Page Indicators */}
            {/* <View style={styles.pageIndicators}>
              {story.pages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.pageIndicator,
                    index === currentPage ? styles.pageIndicatorActive : styles.pageIndicatorInactive
                  ]}
                />
              ))}
            </View> */}

            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={currentPage === totalPages - 1}
              style={[
                styles.navButton,
                currentPage === totalPages - 1 && styles.navButtonDisabled
              ]}
            >
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={currentPage === totalPages - 1 ? '#9CA3AF' : '#4F46E5'} 
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </AppLayout>
  );
}

// Styles
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
    backgroundColor: 'rgba(255, 249, 245, 0.95)',
    zIndex: 10
  },
  headerButton: {
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
  pageCounter: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500'
  },
  scrollContent: {
    flex: 1
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32
  },
  titleContainer: {
    marginBottom: 16,
    marginTop: 8
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#312E81',
    textAlign: 'center'
  },
  storyCardWrapper: {
    height: SCREEN_WIDTH * 1.4, // Approximate height for card
    marginBottom: 20
  },
  pagerView: {
    flex: 1
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  storyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: colors.neutral95
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    padding: 24,
    paddingBottom: 32
  },
  storyText: {
    fontSize: 20,
    lineHeight: 32,
    color: '#4F46E5',
    textAlign: 'center',
    fontWeight: '400'
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  navButtonDisabled: {
    backgroundColor: '#E5E7EB'
  },
  pageIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  pageIndicator: {
    height: 8,
    borderRadius: 4
  },
  pageIndicatorActive: {
    width: 32,
    backgroundColor: '#4F46E5'
  },
  pageIndicatorInactive: {
    width: 8,
    backgroundColor: '#C7D2FE'
  }
});

// Exports
export default StoriesScreen;

// Default Story Data (fallback)
const defaultStory = {
  title: 'The Scarlet Macaw',
  description: 'A beautiful scarlet macaw named Ruby who loves to fly high above the trees.',
  image: 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80',
  pages: [
    {
      id: 1,
      content: 'Once upon a time, in a magical forest far away, there lived a beautiful scarlet macaw named Ruby. Ruby had the most vibrant red feathers that shimmered in the sunlight, and she loved to fly high above the trees.',
      image: 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: 2,
      content: 'Every morning, Ruby would wake up early and greet all her forest friends. She would sing the most beautiful songs that echoed through the trees, bringing joy to everyone who heard them.',
      image: 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: 3,
      content: 'One day, Ruby discovered a hidden waterfall deep in the forest. The water sparkled like diamonds, and the sound was so peaceful that it made her feel calm and happy.',
      image: 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80'
    },
    {
      id: 4,
      content: 'As the sun began to set, Ruby flew back to her cozy nest in the tallest tree. She tucked her head under her wing and dreamed of all the adventures that tomorrow would bring. The end.',
      image: 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80'
    }
  ]
}