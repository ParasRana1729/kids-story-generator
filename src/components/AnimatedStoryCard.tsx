'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { motion } from 'framer-motion';

interface AnimatedStoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  character: string;
  theme: string;
  readTime: string;
  color?: string;
}

export default function AnimatedStoryCard({
  id,
  title,
  excerpt,
  character,
  theme,
  readTime,
  color,
}: AnimatedStoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Effect to animate in on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get background colors based on theme
  const getBackgroundGradient = () => {
    if (color) return color;
    
    const themeColors: Record<string, string> = {
      'adventure': 'from-blue-400 to-teal-500',
      'fantasy': 'from-blue-500 to-indigo-600',
      'mystery': 'from-indigo-500 to-blue-600',
      'friendship': 'from-teal-400 to-blue-500',
      'nature': 'from-teal-500 to-blue-600',
      'magic': 'from-blue-400 to-indigo-600',
    };
    
    return themeColors[theme] || 'from-blue-400 to-indigo-500';
  };

  // Get character emoji
  const getCharacterEmoji = () => {
    const characterEmojis: Record<string, string> = {
      'princess': '👸',
      'knight': '🤺',
      'dragon': '🐉',
      'wizard': '🧙‍♂️',
      'fairy': '🧚‍♀️',
      'pirate': '🏴‍☠️',
    };
    
    return characterEmojis[character] || '📚';
  };

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateY = ((mouseX - width / 2) / width) * 10; // -10 to 10 degrees
    const rotateX = ((height / 2 - mouseY) / height) * 10; // -10 to 10 degrees
    
    setRotateX(rotateX);
    setRotateY(rotateY);
    setMouseX(mouseX / width); // 0 to 1
    setMouseY(mouseY / height); // 0 to 1
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`h-full cursor-pointer perspective-1000 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? 'scale(1.02)' : '',
      }}
    >
      <Link href={`/story/${id}`} className="block h-full">
        <div
          className="relative h-full rounded-2xl overflow-hidden bg-white shadow-xl will-change-transform"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Card Header with Image */}
          <div className={`relative h-52 bg-gradient-to-br ${getBackgroundGradient()}`}>
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-30" 
                style={{
                  backgroundImage: 'url("/images/patterns/pattern.svg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: isHovered 
                  ? `translate(${(mouseX - 0.5) * 20}px, ${(mouseY - 0.5) * 20}px)` 
                  : '',
                transition: 'transform 0.2s ease-out',
              }}
            >
              <span className="text-8xl">{getCharacterEmoji()}</span>
            </div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
              <div className="flex items-center mt-1 text-white/80 text-sm">
                <span className="material-icons text-sm mr-1">schedule</span>
                {readTime} min read
              </div>
            </div>
            
            {/* Glow effect */}
            <div 
              className="absolute inset-0 opacity-60 mix-blend-soft-light pointer-events-none"
              style={{
                background: isHovered 
                  ? `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(255,255,255,0.8), transparent 40%)` 
                  : '',
              }}
            />
          </div>
          
          {/* Card Content */}
          <div className="p-4 flex flex-col flex-grow">
            <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
            
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {character}
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                  {theme}
                </span>
              </div>
              
              <div className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                Read Now
                <span 
                  className="material-icons text-base transition-transform duration-300"
                  style={{
                    transform: isHovered ? 'translateX(4px)' : '',
                  }}
                >
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
          
          {/* Corner fold effect */}
          <div 
            className="absolute top-0 right-0 w-12 h-12 bg-white shadow-md transform rotate-45 translate-x-2/3 -translate-y-2/3"
            style={{
              transform: `rotate(45deg) translate(${isHovered ? '30%' : '40%'}, -${isHovered ? '30%' : '40%'})`,
              transition: 'transform 0.3s ease-out',
            }}
          />
        </div>
      </Link>
    </div>
  );
} 