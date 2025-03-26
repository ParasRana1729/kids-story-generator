'use client'

import { useState, useRef, useEffect } from 'react'
import { Story } from '@/lib/types'
import StoryIllustration from './StoryIllustration'

interface StoryDisplayProps {
  story: Story
  onNewStory: () => void
}

export default function StoryDisplay({ story, onNewStory }: StoryDisplayProps) {
  const [isReading, setIsReading] = useState(false)
  const speechSynthesis = useRef<SpeechSynthesis | null>(null)
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)
  
  useEffect(() => {
    speechSynthesis.current = window.speechSynthesis
    return () => {
      if (speechSynthesis.current && utterance.current) {
        speechSynthesis.current.cancel()
      }
    }
  }, [])
  
  const readStory = () => {
    if (!speechSynthesis.current) return

    if (isReading) {
      speechSynthesis.current.cancel()
      setIsReading(false)
      return
    }

    utterance.current = new SpeechSynthesisUtterance(story.content)
    utterance.current.onend = () => setIsReading(false)
    utterance.current.rate = 0.9
    speechSynthesis.current.speak(utterance.current)
    setIsReading(true)
  }
  
  const handlePrint = () => {
    window.print()
  }
  
  // Format story content for display
  const formattedContent = story.content
    .split('\n\n')
    .map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-800 leading-relaxed text-base sm:text-lg">
        {paragraph}
      </p>
    ));
  
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Story Header */}
        <div className="bg-blue-100 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center mb-4">{story.title}</h1>
          <StoryIllustration character={story.character} theme={story.theme} />
        </div>
        
        {/* Story Content */}
        <div className="p-4 sm:p-8">
          {/* Continuous Story Content */}
          <div className="prose prose-lg max-w-none">
            {formattedContent}
            
            {/* Show moral at the end */}
            {story.moral && (
              <div className="mt-6 p-4 sm:p-6 bg-blue-50 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Moral of the Story</h3>
                <p className="text-blue-900">{story.moral}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={readStory}
              className="flex items-center gap-1 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              {isReading ? (
                <>
                  <span className="material-icons">stop</span>
                  <span className="hidden sm:inline">Stop Reading</span>
                  <span className="sm:hidden">Stop</span>
                </>
              ) : (
                <>
                  <span className="material-icons">play_arrow</span>
                  <span className="hidden sm:inline">Read Aloud</span>
                  <span className="sm:hidden">Read</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-4 py-2 sm:px-6 sm:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              <span className="material-icons">print</span>
              <span className="hidden sm:inline">Print Story</span>
              <span className="sm:hidden">Print</span>
            </button>
            <button
              onClick={onNewStory}
              className="flex items-center gap-1 px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              <span className="material-icons">add</span>
              <span className="hidden sm:inline">Create New Story</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 