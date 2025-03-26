'use client';

import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

interface MagicTitleProps {
  text: string;
  subtitle?: string;
  color?: 'purple' | 'blue' | 'teal' | 'pink' | 'amber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  animated?: boolean;
  withSparkles?: boolean;
}

export default function MagicTitle({
  text,
  subtitle,
  color = 'blue',
  size = 'lg',
  align = 'center',
  animated = false,
  withSparkles = false,
}: MagicTitleProps) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [visibleChars, setVisibleChars] = useState<number[]>([]);
  const [subtitleVisible, setSubtitleVisible] = useState(true);
  const [underlineWidth, setUnderlineWidth] = useState(align === 'center' ? 60 : 100);

  // Color variations
  const colorMap = {
    purple: 'from-purple-600 to-indigo-600',
    blue: 'from-blue-600 to-cyan-600',
    teal: 'from-teal-500 to-blue-600',
    pink: 'from-pink-600 to-purple-600',
    amber: 'from-amber-600 to-orange-600',
  };

  // Size variations
  const sizeMap = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
  };

  // Alignment
  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Animation for letters appearing one by one
  useEffect(() => {
    if (!isInView || !animated) return;
    
    const chars: number[] = [];
    const timer = setInterval(() => {
      if (chars.length < text.length) {
        chars.push(chars.length);
        setVisibleChars([...chars]);
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setSubtitleVisible(true);
          setTimeout(() => {
            setUnderlineWidth(align === 'center' ? 60 : 100);
          }, 300);
        }, 200);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [isInView, animated, text, align]);

  // Generate random sparkles
  useEffect(() => {
    if (!withSparkles || !isInView) return;

    const handleSparkleAnimation = () => {
      if (!titleRef.current) return;
      const bounds = titleRef.current.getBoundingClientRect();
      
      // Add new sparkle
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height,
        size: Math.random() * 10 + 5,
        color: [
          'rgba(255, 215, 0, 0.8)',  // Gold
          'rgba(255, 255, 255, 0.8)', // White
          'rgba(173, 216, 230, 0.8)', // Light blue
          'rgba(255, 192, 203, 0.8)', // Pink
        ][Math.floor(Math.random() * 4)]
      };
      
      setSparkles(current => [...current, newSparkle]);
      
      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(current => current.filter(sparkle => sparkle.id !== newSparkle.id));
      }, 1000);
    };
    
    // Create sparkles periodically
    const interval = setInterval(handleSparkleAnimation, 300);
    return () => clearInterval(interval);
  }, [withSparkles, isInView]);

  // Check if title is in view
  useEffect(() => {
    if (!titleRef.current || !animated) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );
    
    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div className={`relative ${alignMap[align]} mb-8`} ref={titleRef}>
      <h1 className={`font-extrabold ${sizeMap[size]} tracking-tight bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent relative z-10`}>
        {text}
      </h1>
      
      {subtitle && (
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
      
      {/* Sparkles */}
      {withSparkles && sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none z-0 rounded-full animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
          }}
        />
      ))}
      
      {/* Gradient underline effect */}
      <div 
        className={`h-1 rounded-full bg-gradient-to-r ${colorMap[color]} mt-2 mx-auto`}
        style={{
          width: `${underlineWidth}%`,
          maxWidth: size === 'xl' ? '300px' : size === 'lg' ? '250px' : size === 'md' ? '200px' : '150px',
          marginLeft: align === 'center' ? 'auto' : align === 'right' ? 'auto' : '0',
          marginRight: align === 'center' ? 'auto' : align === 'left' ? 'auto' : '0',
        }}
      />
    </div>
  );
} 