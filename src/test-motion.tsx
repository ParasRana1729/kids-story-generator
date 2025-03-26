'use client';

// import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TestMotion() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      Test animation works!
    </div>
  );
} 