'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StoryIllustration from '@/components/StoryIllustration'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-pink-100 to-purple-100 py-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-yellow-300 opacity-10 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-pink-500 opacity-10 blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-purple-800 mb-6">
                About Us
              </h1>
              <p className="text-xl text-purple-700 mb-8">
                We're on a mission to inspire the next generation of readers through personalized storytelling.
              </p>
            </div>
          </div>
          
          {/* Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                className="fill-white"
                opacity=".25"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                className="fill-white"
                opacity=".5"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-white"
              ></path>
            </svg>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-purple-800 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  At Kids Story Generator, we believe that every child deserves stories that speak directly to their interests, spark their imagination, and teach valuable life lessons.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Our interactive story platform allows parents, teachers, and children to create personalized tales featuring characters, themes, and adventures that resonate with young readers.
                </p>
                <p className="text-lg text-gray-700">
                  We combine the magic of storytelling with modern technology to make reading an engaging, interactive experience that children will look forward to time and again.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 transform rotate-3 rounded-2xl bg-yellow-400 opacity-20"></div>
                <div className="absolute inset-0 transform -rotate-3 rounded-2xl bg-pink-400 opacity-20"></div>
                <div className="relative h-96 rounded-2xl overflow-hidden border-8 border-white shadow-xl">
                  <StoryIllustration character="fairy" theme="magic" />
                </div>
                <div className="absolute -bottom-5 -right-5 text-6xl">✨</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">
              How Our Stories Come to Life
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-3xl text-purple-600">
                    create
                  </span>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  1. Customize Your Story
                </h3>
                <p className="text-gray-700">
                  Choose your favorite character, theme, and story type to create a unique adventure tailored just for you.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="rounded-full bg-pink-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-3xl text-pink-600">
                    auto_stories
                  </span>
                </div>
                <h3 className="text-xl font-bold text-pink-800 mb-2">
                  2. Generate Your Tale
                </h3>
                <p className="text-gray-700">
                  Our story engine crafts a unique narrative complete with vibrant illustrations and age-appropriate content.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-3xl text-blue-600">
                    headphones
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  3. Read, Listen & Enjoy
                </h3>
                <p className="text-gray-700">
                  Read the story yourself, or use our read-aloud feature to bring the adventure to life with narration.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Educational Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute inset-0 transform rotate-3 rounded-2xl bg-blue-400 opacity-20"></div>
                <div className="absolute inset-0 transform -rotate-3 rounded-2xl bg-green-400 opacity-20"></div>
                <div className="relative h-96 rounded-2xl overflow-hidden border-8 border-white shadow-xl">
                  <StoryIllustration character="wizard" theme="fantasy" />
                </div>
                <div className="absolute -top-5 -left-5 text-5xl">🌟</div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-purple-800 mb-6">
                  Educational Benefits
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-full p-2 mt-1">
                      <span className="material-icons text-purple-600">
                        school
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-800 mb-1">
                        Literacy Development
                      </h3>
                      <p className="text-gray-700">
                        Our stories help children develop vocabulary, reading comprehension, and a love for literature.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 rounded-full p-2 mt-1">
                      <span className="material-icons text-pink-600">
                        psychology
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-pink-800 mb-1">
                        Critical Thinking
                      </h3>
                      <p className="text-gray-700">
                        Stories with moral lessons encourage children to think critically about their own decisions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 rounded-full p-2 mt-1">
                      <span className="material-icons text-blue-600">
                        diversity_3
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-1">
                        Emotional Intelligence
                      </h3>
                      <p className="text-gray-700">
                        Characters face challenges and emotions that help children develop empathy and emotional understanding.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 rounded-full p-2 mt-1">
                      <span className="material-icons text-green-600">
                        lightbulb
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-1">
                        Creative Imagination
                      </h3>
                      <p className="text-gray-700">
                        Our vibrant stories spark imagination and encourage children to create their own stories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Start Your Storytelling Adventure Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Create your first personalized story in minutes and watch the magic unfold!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/create" 
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg inline-flex items-center gap-2 transform transition-all hover:scale-105"
              >
                <span className="material-icons">auto_stories</span>
                Create a Story
              </Link>
              
              <Link 
                href="/gallery" 
                className="px-8 py-4 bg-white hover:bg-gray-100 text-purple-700 font-bold rounded-xl shadow-lg inline-flex items-center gap-2 transform transition-all hover:scale-105"
              >
                <span className="material-icons">collections_bookmark</span>
                Browse Gallery
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 