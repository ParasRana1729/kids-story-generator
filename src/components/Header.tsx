'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 relative">
              <Image 
                src="/images/characters/default.png" 
                alt="Kids Story Generator" 
                width={48} 
                height={48}
                className="rounded-full border-2 border-white"
              />
            </div>
            <div>
              <Link href="/" className="text-2xl font-bold tracking-tight">
                Kids Story Generator
              </Link>
              <p className="text-xs text-white/80">Magical stories for children</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/create" className="nav-link">
              Create Story
            </Link>
            <Link href="/gallery" className="nav-link">
              Story Gallery
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-icons text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 pb-6 space-y-3">
            <Link 
              href="/"
              className="block py-2 px-4 text-center rounded-lg bg-white/20 hover:bg-white/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/create"
              className="block py-2 px-4 text-center rounded-lg bg-white/20 hover:bg-white/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Story
            </Link>
            <Link 
              href="/gallery"
              className="block py-2 px-4 text-center rounded-lg bg-white/20 hover:bg-white/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              Story Gallery
            </Link>
            <Link 
              href="/about"
              className="block py-2 px-4 text-center rounded-lg bg-white/20 hover:bg-white/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>

      {/* Decorative Wave */}
      <div className="h-5 w-full overflow-hidden">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-gray-50"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        .nav-link {
          @apply font-medium hover:text-sky-200 transition-colors;
        }
      `}</style>
    </header>
  )
} 