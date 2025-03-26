'use client';

import { useState } from 'react';
import StoryCard from '@/components/StoryCard';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Sample stories data (in a real app, this would come from an API or database)
const sampleStories = [
  {
    id: '1',
    title: "The Princess and the Magic Garden",
    excerpt: "Once upon a time, there was a kind princess who discovered a magical garden filled with talking flowers and friendly creatures...",
    character: "princess",
    theme: "magic",
    readTime: "5"
  },
  {
    id: '2',
    title: "The Brave Knight's Quest",
    excerpt: "In a kingdom far away, a brave knight embarked on a dangerous quest to save the realm from an ancient curse...",
    character: "knight",
    theme: "adventure",
    readTime: "7"
  },
  {
    id: '3',
    title: "The Friendly Dragon's Secret",
    excerpt: "High in the misty mountains lived a dragon who was different from all others. Instead of hoarding gold, he collected books...",
    character: "dragon",
    theme: "friendship",
    readTime: "6"
  },
  {
    id: '4',
    title: "The Wizard's Apprentice",
    excerpt: "Young Timothy always dreamed of becoming a wizard. One day, his wish came true when he met a mysterious old man in the forest...",
    character: "wizard",
    theme: "fantasy",
    readTime: "8"
  },
  {
    id: '5',
    title: "The Fairy's Garden Party",
    excerpt: "Deep in the enchanted forest, a tiny fairy decided to throw the biggest garden party ever seen...",
    character: "fairy",
    theme: "nature",
    readTime: "5"
  },
  {
    id: '6',
    title: "The Pirate's Hidden Treasure",
    excerpt: "Captain Whiskers wasn't like other pirates. His most precious treasure wasn't gold or jewels, but something far more valuable...",
    character: "pirate",
    theme: "adventure",
    readTime: "7"
  }
];

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');

  const filteredStories = sampleStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = selectedTheme === 'all' || story.theme === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  const uniqueThemes = Array.from(new Set(sampleStories.map(story => story.theme)));
  const themes = ['all', ...uniqueThemes];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-purple-800 text-center mb-8">
            Story Gallery
          </h1>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <span className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Filter by theme:</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              >
                {themes.map(theme => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map(story => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                excerpt={story.excerpt}
                character={story.character}
                theme={story.theme}
                readTime={story.readTime}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredStories.length === 0 && (
            <div className="text-center py-12">
              <span className="material-icons text-6xl text-gray-300 mb-4">
                search_off
              </span>
              <p className="text-xl text-gray-500">
                No stories found matching your search criteria
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 