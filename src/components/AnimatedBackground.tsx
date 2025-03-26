'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'stars' | 'bubbles' | 'confetti';
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  color?: 'rainbow' | 'theme' | 'blue' | 'purple' | 'pink';
}

export default function AnimatedBackground({
  variant = 'default',
  density = 'medium',
  interactive = true,
  color = 'rainbow'
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Update dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Generate elements based on variant and density
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const count = density === 'low' ? 15 : density === 'medium' ? 30 : 50;
    const newElements: JSX.Element[] = [];
    
    const getRandomColor = () => {
      if (color === 'rainbow') {
        const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F8B7CD'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      if (color === 'theme') {
        const colors = ['#C4B5FD', '#DDD6FE', '#F5D0FE', '#FBCFE8', '#FDE68A'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      if (color === 'blue') return `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.3})`;
      if (color === 'purple') return `rgba(167, 139, 250, ${Math.random() * 0.5 + 0.3})`;
      return `rgba(244, 114, 182, ${Math.random() * 0.5 + 0.3})`;
    };
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 40 + 10; // 10-50px
      const xPos = Math.random() * dimensions.width;
      const yPos = Math.random() * dimensions.height;
      const animDuration = Math.random() * 20 + 10; // 10-30s
      const delay = Math.random() * 5;
      
      if (variant === 'stars') {
        // Stars
        newElements.push(
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: xPos,
              top: yPos,
              animationDuration: `${animDuration}s`,
              animationDelay: `${delay}s`
            }}
          >
            <div
              className="transform rotate-45"
              style={{ color: getRandomColor(), fontSize: `${size}px` }}
            >
              ✦
            </div>
          </div>
        );
      } else if (variant === 'bubbles') {
        // Bubbles
        newElements.push(
          <div
            key={i}
            className="absolute rounded-full animate-float opacity-70"
            style={{
              left: xPos,
              top: yPos,
              width: `${size}px`,
              height: `${size}px`,
              background: getRandomColor(),
              animationDuration: `${animDuration}s`,
              animationDelay: `${delay}s`
            }}
          />
        );
      } else if (variant === 'confetti') {
        // Confetti
        const rotate = Math.random() * 360;
        newElements.push(
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: xPos,
              top: yPos,
              width: `${size / 3}px`,
              height: `${size}px`,
              background: getRandomColor(),
              transform: `rotate(${rotate}deg)`,
              animationDuration: `${animDuration}s`,
              animationDelay: `${delay}s`
            }}
          />
        );
      } else {
        // Default - mix of icons
        const icons = ['✨', '🌟', '⭐', '🎈', '🎀', '🎁', '🦄', '🌈', '📚', '🧸', '🦋', '🐾'];
        const icon = icons[Math.floor(Math.random() * icons.length)];
        newElements.push(
          <div
            key={i}
            className="absolute animate-float cursor-pointer transform transition-transform hover:scale-150"
            style={{
              left: xPos,
              top: yPos,
              fontSize: `${size}px`,
              animationDuration: `${animDuration}s`,
              animationDelay: `${delay}s`
            }}
          >
            {icon}
          </div>
        );
      }
    }
    
    setElements(newElements);
  }, [variant, density, dimensions, color]);
  
  // Add interactivity
  useEffect(() => {
    if (!interactive || !containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const { left, top } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const items = container.querySelectorAll('div > div');
      items.forEach((item) => {
        const itemX = parseFloat(getComputedStyle(item).left);
        const itemY = parseFloat(getComputedStyle(item).top);
        
        const distX = x - itemX;
        const distY = y - itemY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 100) {
          const angle = Math.atan2(distY, distX);
          const force = (100 - distance) / 10;
          
          const moveX = Math.cos(angle) * force * -1;
          const moveY = Math.sin(angle) * force * -1;
          
          (item as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        } else {
          (item as HTMLElement).style.transform = '';
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive]);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements}
    </div>
  );
} 