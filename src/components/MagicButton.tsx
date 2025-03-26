'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface MagicButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  color?: 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | 'rainbow';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  animated?: boolean;
}

export default function MagicButton({
  children,
  href,
  onClick,
  color = 'blue',
  size = 'md',
  icon,
  animated = true,
}: MagicButtonProps) {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [sparkles, setSparkles] = useState<JSX.Element[]>([]);

  // Get background color based on color prop
  const getBackgroundColor = () => {
    if (color === 'purple') return 'from-purple-500 to-purple-700';
    if (color === 'pink') return 'from-pink-500 to-pink-700';
    if (color === 'blue') return 'from-blue-500 to-blue-700';
    if (color === 'green') return 'from-green-500 to-green-700';
    if (color === 'yellow') return 'from-yellow-400 to-yellow-600';
    if (color === 'rainbow') return 'from-purple-500 via-pink-500 to-yellow-500';
    return 'from-purple-500 to-purple-700';
  };

  // Get button size based on size prop
  const getButtonSize = () => {
    if (size === 'sm') return 'px-4 py-2 text-sm';
    if (size === 'lg') return 'px-8 py-4 text-xl';
    return 'px-6 py-3 text-base';
  };

  // Create sparkle effect on button press
  const createSparkles = () => {
    if (!buttonRef.current || !animated) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;

    const newSparkles = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 8 + 3;
      const startX = buttonWidth * Math.random();
      const startY = buttonHeight * Math.random();
      const duration = Math.random() * 1000 + 500;
      const angle = Math.random() * 360;
      const distance = Math.random() * 100 + 50;

      const sparkleColor = getSparkleColor();

      newSparkles.push(
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: sparkleColor,
            left: startX,
            top: startY,
            transform: `translate(-50%, -50%)`,
            animation: `fly-out ${duration}ms forwards ease-out`,
          }}
        />
      );
    }

    setSparkles(newSparkles);

    // Clear sparkles after animation
    setTimeout(() => {
      setSparkles([]);
    }, 1000);
  };

  // Get random sparkle color
  const getSparkleColor = () => {
    if (color === 'rainbow') {
      const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    if (color === 'purple') return '#C4B5FD';
    if (color === 'pink') return '#FBCFE8';
    if (color === 'blue') return '#BFDBFE';
    if (color === 'green') return '#A7F3D0';
    if (color === 'yellow') return '#FDE68A';
    return '#C4B5FD';
  };

  // Handle button click
  const handleClick = (e: React.MouseEvent) => {
    createSparkles();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);

    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-xl font-bold shadow-lg
        text-white transition-all duration-300
        bg-gradient-to-br ${getBackgroundColor()}
        ${getButtonSize()}
        transform ${isPressed ? 'scale-95' : isHovered && animated ? 'scale-105' : ''}
        ${animated ? 'hover:shadow-xl active:shadow-md' : ''}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="material-icons">{icon}</span>}
        {children}
        {sparkles.length > 0 && <div className="absolute inset-0">{sparkles}</div>}
      </span>

      {/* Animated background effect */}
      {animated && isHovered && (
        <div className="absolute inset-0 -z-0">
          <div
            className="absolute inset-0 opacity-20 bg-white"
            style={{
              backgroundImage:
                'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), white 0%, transparent 65%)',
            }}
            onMouseMove={(e) => {
              if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }
            }}
          />
        </div>
      )}

      {/* Add CSS for sparkle animation */}
      <style jsx>{`
        @keyframes fly-out {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--fly-x, 0px)), calc(-50% + var(--fly-y, 0px))) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
} 