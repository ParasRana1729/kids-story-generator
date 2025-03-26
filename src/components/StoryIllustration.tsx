'use client'

import Image from 'next/image'
import { useState } from 'react'

interface StoryIllustrationProps {
  character: string
  theme: string
  size?: 'small' | 'large'
}

const characterImages = {
  'princess': '/images/characters/princess.png',
  'knight': '/images/characters/knight.png',
  'dragon': '/images/characters/dragon.png',
  'wizard': '/images/characters/wizard.png',
  'fairy': '/images/characters/fairy.png',
  'pirate': '/images/characters/pirate.png',
}

const themeColors = {
  'adventure': 'bg-blue-100',
  'fantasy': 'bg-indigo-100',
  'mystery': 'bg-sky-100',
  'friendship': 'bg-teal-100',
  'nature': 'bg-cyan-100',
  'magic': 'bg-blue-200',
}

const characterEmojis = {
  'princess': '👸',
  'knight': '🤺',
  'dragon': '🐉',
  'wizard': '🧙‍♂️',
  'fairy': '🧚‍♀️',
  'pirate': '🏴‍☠️',
}

export default function StoryIllustration({ character, theme, size = 'large' }: StoryIllustrationProps) {
  const [imageError, setImageError] = useState(false)
  const themeColor = themeColors[theme as keyof typeof themeColors] || 'bg-blue-50'
  const containerSize = size === 'large' ? 'h-96 w-full' : 'h-48 w-full'

  return (
    <div className={`relative ${containerSize} rounded-xl ${themeColor} overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl`}>
      {!imageError ? (
        <div className="absolute inset-0">
          <Image
            src={characterImages[character as keyof typeof characterImages] || '/images/characters/default.png'}
            alt={`${character} character illustration`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
          {characterEmojis[character as keyof typeof characterEmojis] || '📚'}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent h-1/4" />
    </div>
  )
} 