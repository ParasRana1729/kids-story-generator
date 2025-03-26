'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      {/* Decorative Wave */}
      <div className="h-5 w-full overflow-hidden rotate-180">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kids Story Generator</h3>
            <p className="text-white/80 mb-4">
              Create beautiful, personalized stories for children aged 4-10. Our stories
              help foster imagination, learning, and a love for reading.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-200">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-white hover:text-yellow-200">
                <span className="material-icons">alternate_email</span>
              </a>
              <a href="#" className="text-white hover:text-yellow-200">
                <span className="material-icons">school</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-yellow-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-white/80 hover:text-yellow-200 transition-colors">
                  Create Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/80 hover:text-yellow-200 transition-colors">
                  Story Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-yellow-200 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the latest stories and updates!
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>© {new Date().getFullYear()} Kids Story Generator. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute -top-4 left-1/4 text-4xl opacity-30">✨</div>
        <div className="absolute -top-2 left-1/2 text-4xl opacity-30">🌟</div>
        <div className="absolute -top-4 right-1/4 text-4xl opacity-30">⭐</div>
        <div className="absolute -top-6 right-1/3 text-4xl opacity-30">✨</div>
        <div className="absolute -top-2 left-1/3 text-4xl opacity-30">🌟</div>
      </div>
    </footer>
  );
} 