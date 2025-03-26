'use client'

import { useState } from 'react'
import StoryIllustration from './StoryIllustration'

interface StoryFormProps {
  onSubmit: (formData: {
    character: string;
    theme: string;
    storyType: string;
    ageGroup: string;
    description: string;
  }) => void;
  isLoading: boolean;
}

export default function StoryForm({ onSubmit, isLoading }: StoryFormProps) {
  const [formData, setFormData] = useState({
    character: 'princess',
    theme: 'adventure',
    storyType: 'fairytale',
    ageGroup: 'elementary',
    description: '',
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }
  
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Preview Section */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 order-2 lg:order-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-800">Story Preview</h2>
          <StoryIllustration character={formData.character} theme={formData.theme} />
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Character:</span> {formData.character}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Theme:</span> {formData.theme}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Type:</span> {formData.storyType}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">Age Group:</span> {formData.ageGroup}
            </p>
            {formData.description && (
              <div>
                <p className="font-semibold text-gray-700 text-sm sm:text-base">Your Story Idea:</p>
                <p className="text-gray-600 italic text-sm sm:text-base">{formData.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 order-1 lg:order-2">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-800">Create Your Story</h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="character" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Choose your character
              </label>
              <select
                id="character"
                name="character"
                value={formData.character}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              >
                <option value="princess">Princess</option>
                <option value="knight">Knight</option>
                <option value="dragon">Dragon</option>
                <option value="wizard">Wizard</option>
                <option value="fairy">Fairy</option>
                <option value="pirate">Pirate</option>
              </select>
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Choose your theme
              </label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              >
                <option value="adventure">Adventure</option>
                <option value="fantasy">Fantasy</option>
                <option value="mystery">Mystery</option>
                <option value="friendship">Friendship</option>
                <option value="nature">Nature</option>
                <option value="magic">Magic</option>
              </select>
            </div>

            <div>
              <label htmlFor="storyType" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Choose story type
              </label>
              <select
                id="storyType"
                name="storyType"
                value={formData.storyType}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              >
                <option value="fairytale">Fairy Tale</option>
                <option value="adventure">Adventure Story</option>
                <option value="bedtime">Bedtime Story</option>
                <option value="fable">Fable</option>
                <option value="fantasy">Fantasy Story</option>
              </select>
            </div>

            <div>
              <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Choose age group
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              >
                <option value="preschool">Preschool (3-5 years)</option>
                <option value="elementary">Elementary (6-10 years)</option>
                <option value="middle-school">Middle School (11-13 years)</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Describe your story idea
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us what you want in your story! For example: 'A brave princess who saves a dragon from hunters and they become friends'"
                rows={3}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              />
              <p className="text-xs text-gray-500 mt-1">
                The more details you share, the better your story will be!
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200 ease-in-out ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Story...
                </span>
              ) : (
                'Generate Story with AI'
              )}
            </button>
            
            <p className="text-xs text-center text-gray-500 mt-2">
              Powered by Groq AI - Stories are generated in seconds!
            </p>
          </div>
        </form>
      </div>
    </div>
  )
} 