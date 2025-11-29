import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import TypeWriter from '../Components/TypeWriter';
import { callAiModel, createStoryPrompt } from '../Utilities/utilityFunctions';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

function GenerateStoryScreen({ navigation, route }) {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const storyDetails = route.params?.storyDetails || {};

  const generateStory = async () => {
    setIsLoading(true);
    setError(null);
    setStory('');

    try {
      // Create the prompt based on user preferences
      const prompt = createStoryPrompt({
        morals: storyDetails.moralsLessons?.join(', ') || 'kindness',
        interests: storyDetails.interests?.join(', ') || 'adventure',
        language: storyDetails.preferredLanguage || 'English',
        childName: storyDetails.childName,
        personalization: storyDetails.personalizeWithName ? 'yes' : 'no'
      });

      console.log('Generating story with prompt:', prompt);

      // Call the AI model
      const generatedStory = await callAiModel(prompt);

      if (generatedStory) {
        setStory(generatedStory);
        setIsTyping(true);
      } else {
        setError('Failed to generate story. Please try again.');
      }
    } catch (err) {
      console.error('Error generating story:', err);
      setError('An error occurred while generating the story.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateStory();
  }, []);

  const handleRegenerate = () => {
    generateStory();
  };

  const handleClose = () => {
    navigation.navigate('HomeScreen');
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
  };

  return (
      <View style={styles.container}>
        {/* Close Button - Top Left */}
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color={colors.neutral20} />
        </TouchableOpacity>

        {/* Content Area */}
        <ScrollView 
          style={styles.scrollContent} 
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Creating your magical story...</Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.error} />
              <Text style={styles.errorText}>{error}</Text>
              <AppButton
                title="Try Again"
                onPress={handleRegenerate}
                style={styles.retryButton}
              />
            </View>
          )}

          {!isLoading && !error && story && (
            <View style={styles.storyContainer}>
              <TypeWriter
                text={story}
                style={markdownStyles}
                onComplete={handleTypingComplete}
              />
            </View>
          )}

          {/* Bottom padding to ensure content doesn't hide behind button */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Regenerate Button - Fixed at bottom */}
        {!isLoading && !error && story && (
          <View style={styles.buttonContainer}>
            <AppButton
              title="Regenerate Story"
              onPress={handleRegenerate}
              type="secondary"
            />
          </View>
        )}
      </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral98,
    marginTop:30
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  scrollContent: {
    flex: 1
  },
  scrollContentContainer: {
    paddingTop: 72,
    paddingHorizontal: 24
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100
  },
  loadingText: {
    ...fonts.bodyLarge,
    color: colors.neutral40,
    marginTop: 16,
    textAlign: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 24
  },
  errorText: {
    ...fonts.bodyLarge,
    color: colors.neutral40,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  retryButton: {
    minWidth: 200
  },
  storyContainer: {
    paddingBottom: 24
  },
  bottomPadding: {
    height: 100
  },
  buttonContainer: {
    backgroundColor: colors.neutral98,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: colors.neutral90,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  }
});

// Markdown styles for the story
const markdownStyles = {
  body: {
    ...fonts.bodyLarge,
    color: colors.neutral20,
    lineHeight: 28
  },
  heading1: {
    ...fonts.headlineMedium,
    color: colors.neutral20,
    marginBottom: 16,
    marginTop: 24
  },
  heading2: {
    ...fonts.headlineSmall,
    color: colors.neutral20,
    marginBottom: 12,
    marginTop: 20
  },
  heading3: {
    ...fonts.titleLarge,
    color: colors.neutral20,
    marginBottom: 8,
    marginTop: 16
  },
  paragraph: {
    ...fonts.bodyLarge,
    color: colors.neutral20,
    marginBottom: 16,
    lineHeight: 28
  },
  strong: {
    fontFamily: 'Inter_600SemiBold',
    color: colors.neutral20
  },
  em: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    color: colors.neutral20
  },
  list_item: {
    ...fonts.bodyLarge,
    color: colors.neutral20,
    marginBottom: 8
  }
};

// Exports
export default GenerateStoryScreen;