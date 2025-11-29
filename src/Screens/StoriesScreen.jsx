import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import PagerView from 'react-native-pager-view';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';
import AppLayout from '../Components/AppLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons'


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = (SCREEN_WIDTH * 5) / 4; // 4:5 ratio

function StoriesScreen({ navigation, route }) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Get story from navigation params or use default
  const story = route?.params?.story || defaultStory;

  const handlePageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        {/* Header with Page Counter and Close Button */}
        <View style={styles.pageCounterContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={colors.neutral40}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Text style={styles.pageCounter}>
            Page {currentPage + 1}/{story.pages.length}
          </Text>
        </View>

        {/* Pager View */}
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={handlePageSelected}
        >
          {story.pages.map((page) => (
            <View key={page.id} style={styles.pageContainer}>
              {/* Image */}
              <Image
                source={{ uri: page.image }}
                style={styles.image}
                contentFit="cover"
              />

              {/* Content */}
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{page.content}</Text>
              </View>
            </View>
          ))}
        </PagerView>
      </View>
    </AppLayout>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral98
  },
  pageCounterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.neutral98,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral90
  },
  pageCounter: {
    ...fonts.titleMedium,
    color: colors.neutral40
  },
  pagerView: {
    flex: 1
  },
  pageContainer: {
    flex: 1
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: colors.neutral95
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: colors.neutral98
  },
  contentText: {
    ...fonts.bodyLarge,
    color: colors.neutral20,
    lineHeight: 28
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