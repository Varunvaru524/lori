import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AppLayout from '../Components/AppLayout';
import AppButton from '../Components/AppButton';
import TypeWriter from '../Components/TypeWriter';
import { callAiModel, createStoryPrompt, NewAiChatIcon } from '../Utilities/utilityFunctions';
import colors from '../Utilities/colors';
import fonts from '../Utilities/fonts';

function GenerateStoryScreen({ navigation, route }) {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim1 = useRef(new Animated.Value(0)).current;
  const bounceAnim2 = useRef(new Animated.Value(0)).current;
  const bounceAnim3 = useRef(new Animated.Value(0)).current;

  const storyDetails = route.params?.storyDetails || {};

  // Start animations when loading
  useEffect(() => {
    if (isLoading) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      ).start();

      // Spin animation
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ).start();

      // Bounce animations with delays
      const createBounceAnimation = (animValue, delay) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: -10,
              duration: 400,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true
            }),
            Animated.timing(animValue, {
              toValue: 0,
              duration: 400,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true
            })
          ])
        );
      };

      createBounceAnimation(bounceAnim1, 0).start();
      createBounceAnimation(bounceAnim2, 200).start();
      createBounceAnimation(bounceAnim3, 400).start();
    }
  }, [isLoading]);

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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
      <View style={styles.container}>
        {/* Header with Close and Favorite buttons */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
            <MaterialCommunityIcons name="close" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFavorite} style={styles.headerButton}>
            <MaterialCommunityIcons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? "#EC4899" : colors.primary} 
            />
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <ScrollView 
          style={styles.scrollContent} 
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {isLoading && (
            <View style={styles.loadingContainer}>
              {/* Animated Icon Container */}
              <View style={styles.animationWrapper}>
                {/* Spinning Border */}
                <Animated.View
                  style={[
                    styles.spinningBorder,
                    {
                      transform: [
                        {
                          rotate: spinAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                          })
                        }
                      ]
                    }
                  ]}
                >
                  <View style={styles.spinningBorderInner} />
                </Animated.View>

                {/* Pulsing Gradient Circle with Icon */}
                <Animated.View
                  style={[
                    styles.pulsingCircle,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primary30]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientCircle}
                  >
                    <NewAiChatIcon color={colors.white} size={46} />
                  </LinearGradient>
                </Animated.View>
              </View>

              {/* Loading Text */}
              <Text style={styles.loadingTitle}>Creating your magical story...</Text>
              <Text style={styles.loadingSubtitle}>
                Our storyteller is weaving together the perfect bedtime tale just for you!
              </Text>

              {/* Bouncing Dots */}
              <View style={styles.bouncingDotsContainer}>
                <Animated.View
                  style={[
                    styles.bouncingDot,
                    styles.bouncingDotIndigo,
                    { transform: [{ translateY: bounceAnim1 }] }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.bouncingDot,
                    styles.bouncingDotPink,
                    { transform: [{ translateY: bounceAnim2 }] }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.bouncingDot,
                    styles.bouncingDotIndigo,
                    { transform: [{ translateY: bounceAnim3 }] }
                  ]}
                />
              </View>
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
    marginTop: 30
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
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  scrollContent: {
    flex: 1
  },
  scrollContentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 20
  },
  animationWrapper: {
    width: 128,
    height: 128,
    marginBottom: 32,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinningBorder: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: colors.primary,
    borderRightColor: colors.primary80
  },
  spinningBorderInner: {
    width: '100%',
    height: '100%'
  },
  pulsingCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingTitle: {
    ...fonts.headlineSmall,
    fontWeight: '400',
    color: colors.neutral20,
    marginBottom: 16,
    textAlign: 'center'
  },
  loadingSubtitle: {
    ...fonts.bodyLarge,
    color: colors.primary,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  bouncingDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    gap: 8
  },
  bouncingDot: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  bouncingDotIndigo: {
    backgroundColor: colors.primary50
  },
  bouncingDotPink: {
    backgroundColor: colors.primary
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