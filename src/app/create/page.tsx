'use client';

import { useState } from 'react';
import StoryForm from '@/components/StoryForm';
import StoryDisplay from '@/components/StoryDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Story } from '@/lib/types';
import { generateStory } from '@/services/groqService';

export default function CreateStoryPage() {
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = async (formData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call the Groq API service
      const story = await generateStory({
        character: formData.character,
        theme: formData.theme,
        storyType: formData.storyType,
        ageGroup: formData.ageGroup,
        description: formData.description
      });
      
      setGeneratedStory(story);
    } catch (error) {
      console.error('Error generating story:', error);
      setError('There was an error generating your story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 sm:py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!generatedStory ? (
            <div className="mb-8 sm:mb-12">
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4 sm:mb-6">
                  Create Your Magical Story
                </h1>
                <p className="text-lg sm:text-xl text-blue-700">
                  Choose a character, theme, and story type below to generate a unique story for your child!
                </p>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <StoryForm onSubmit={handleGenerateStory} isLoading={isLoading} />
                
                {/* Decorative Elements */}
                <div className="hidden md:block absolute -top-12 -left-12 text-4xl sm:text-6xl animate-bounce-slow">🧚‍♀️</div>
                <div className="hidden md:block absolute top-1/4 -right-12 text-4xl sm:text-6xl animate-float">🌟</div>
                <div className="hidden md:block absolute -bottom-12 -left-12 text-4xl sm:text-6xl animate-sparkle">✨</div>
              </div>
            </div>
          ) : (
            <div>
              <StoryDisplay story={generatedStory} onNewStory={() => setGeneratedStory(null)} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 