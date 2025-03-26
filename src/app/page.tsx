'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import StoryForm from '@/components/StoryForm'
import StoryDisplay from '@/components/StoryDisplay'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Story } from '@/lib/types'
import StoryIllustration from '@/components/StoryIllustration'
import AnimatedStoryCard from '@/components/AnimatedStoryCard'
import MagicTitle from '@/components/MagicTitle'
import MagicButton from '@/components/MagicButton'
import AnimatedBackground from '@/components/AnimatedBackground'

// Featured stories for the carousel
const featuredStories = [
  {
    id: '1',
    title: "The Princess and the Magic Garden",
    excerpt: "Once upon a time, there was a kind princess who discovered a magical garden filled with talking flowers and friendly creatures...",
    character: "princess",
    theme: "magic",
    readTime: "5"
  },
  {
    id: '2',
    title: "The Brave Knight's Quest",
    excerpt: "In a kingdom far away, a brave knight embarked on a dangerous quest to save the realm from an ancient curse...",
    character: "knight",
    theme: "adventure",
    readTime: "7"
  },
  {
    id: '3',
    title: "The Friendly Dragon's Secret",
    excerpt: "High in the misty mountains lived a dragon who was different from all others. Instead of hoarding gold, he collected books...",
    character: "dragon",
    theme: "friendship",
    readTime: "6"
  }
]

export default function Home() {
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [testimonials] = useState([
    {
      quote: "My daughter absolutely loves the stories we create together. It's become our special bedtime routine!",
      author: "Sarah M., Parent",
      avatar: "/images/characters/princess.png"
    },
    {
      quote: "As a teacher, I've found these stories to be wonderful tools for engaging my students and teaching valuable lessons.",
      author: "Michael T., Educator",
      avatar: "/images/characters/wizard.png"
    },
    {
      quote: "The stories are amazing and I love choosing my own characters and adventures!",
      author: "Jamie, Age 7",
      avatar: "/images/characters/dragon.png"
    }
  ])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const handleGenerateStory = async (formData: any) => {
    setIsLoading(true)
    
    try {
      // In a real app, we would call an API here
      // For now, we'll simulate a delay and generate a simple story
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a more custom story if the user provided a description
      let storyContent = '';
      
      if (formData.description && formData.description.trim().length > 0) {
        // Use the description to enhance the story
        storyContent = `Once upon a time, there was a ${formData.character} who loved adventures.
        
${formData.description}

As the ${formData.character} explored the world of ${formData.theme}, they discovered many wonders and faced challenges.

"This is more amazing than I ever imagined!" exclaimed the ${formData.character}.

The journey taught the ${formData.character} an important lesson: ${getLesson(formData.theme)}.

The end.`;
      } else {
        // Use the default template if no description provided
        storyContent = `Once upon a time, there was a ${formData.character} who loved adventures.
        
One day, the ${formData.character} discovered a magical world where everything was about ${formData.theme}.

"I've never seen anything like this before!" exclaimed the ${formData.character}.

The ${formData.character} spent the whole day exploring and learning about ${formData.theme}.

Along the way, the ${formData.character} made new friends who taught an important lesson: ${getLesson(formData.theme)}.

The end.`;
      }
      
      const story: Story = {
        title: `${formData.character}'s ${formData.storyType} About ${formData.theme}`,
        content: storyContent,
        moral: getLesson(formData.theme),
        character: formData.character,
        theme: formData.theme,
        id: '123'
      }
      
      setGeneratedStory(story)
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredStories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredStories.length) % featuredStories.length)
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-b from-blue-100 to-sky-100">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2 text-center md:text-left">
                <MagicTitle 
                  text="Create Magical Stories for Your Children" 
                  subtitle="Design customized stories featuring your child's favorite characters and themes. Perfect for bedtime reading, learning, and imagination!"
                  color="blue"
                  size="xl"
                  align="left"
                />
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
                  <MagicButton 
                    href="/create"
                    color="blue"
                    size="lg"
                    animated
                  >
                    Create Your Story
                  </MagicButton>
                  
                  <MagicButton 
                    href="/gallery"
                    color="blue"
                    size="lg"
                  >
                    Browse Gallery
                  </MagicButton>
                </div>
              </div>
              
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative h-72 sm:h-96 max-w-md mx-auto">
                  <div className="absolute inset-0 transform rotate-3 rounded-2xl bg-blue-400 opacity-20"></div>
                  <div className="absolute inset-0 transform -rotate-3 rounded-2xl bg-teal-400 opacity-20"></div>
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border-8 border-white shadow-xl">
                    <StoryIllustration 
                      character="princess" 
                      theme="fantasy"
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-5 text-6xl">✨</div>
                  <div className="absolute -top-5 -left-5 text-5xl">🌟</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MagicTitle 
              text="Magical Features Just for Kids"
              color="blue"
              size="lg"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-blue-50 rounded-2xl p-6 text-center shadow-md transform transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-blue-200 rounded-full mb-4">
                  <span className="material-icons text-4xl text-blue-700">auto_stories</span>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Personalized Stories
                </h3>
                <p className="text-blue-700">
                  Choose characters, themes, and story types to create a unique tale that's perfect for your child.
                </p>
              </div>
              
              <div className="bg-teal-50 rounded-2xl p-6 text-center shadow-md transform transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-teal-200 rounded-full mb-4">
                  <span className="material-icons text-4xl text-teal-700">record_voice_over</span>
                </div>
                <h3 className="text-xl font-bold text-teal-800 mb-2">
                  Read Aloud
                </h3>
                <p className="text-teal-700">
                  Let our voice narration read the story to your child while they follow along with colorful illustrations.
                </p>
              </div>
              
              <div className="bg-sky-50 rounded-2xl p-6 text-center shadow-md transform transition-transform hover:scale-105">
                <div className="inline-block p-4 bg-sky-200 rounded-full mb-4">
                  <span className="material-icons text-4xl text-sky-700">library_books</span>
                </div>
                <h3 className="text-xl font-bold text-sky-800 mb-2">
                  Growing Library
                </h3>
                <p className="text-sky-700">
                  Explore our collection of stories or save your creations to read again and again.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Stories Carousel */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MagicTitle 
              text="Featured Stories"
              subtitle="Get inspired by these magical tales created on our platform"
              color="blue"
              size="lg"
            />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredStories.map((story) => (
                <div key={story.id} className="h-96">
                  <AnimatedStoryCard
                    id={story.id}
                    title={story.title}
                    excerpt={story.excerpt}
                    character={story.character}
                    theme={story.theme}
                    readTime={story.readTime}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MagicTitle 
              text="What Families Say"
              color="teal"
              size="lg"
            />
            
            <div className="max-w-3xl mx-auto mt-12">
              <div className="relative bg-gradient-to-r from-blue-100 to-sky-100 rounded-2xl p-8 shadow-lg">
                <div className="absolute -top-5 -left-5 h-10 w-10 text-4xl">❝</div>
                <div className="absolute -bottom-5 -right-5 h-10 w-10 text-4xl">❞</div>
                
                <div className="relative">
                  <div className="overflow-hidden h-[200px]">
                    <div 
                      className="flex flex-col transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateY(-${currentTestimonial * 200}px)` }}
                    >
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="h-[200px] flex flex-col justify-center">
                          <p className="text-lg text-blue-800 mb-6 text-center italic">
                            "{testimonial.quote}"
                          </p>
                          <div className="flex items-center justify-center gap-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.author} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="font-medium text-blue-700">
                              {testimonial.author}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6 gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`h-3 w-3 rounded-full ${index === currentTestimonial ? 'bg-blue-600' : 'bg-blue-200'}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white relative overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Ready to Create Your Own Magical Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your storytelling adventure today and bring imagination to life!
            </p>
            
            <div className="mt-8">
              <MagicButton 
                href="/create"
                color="yellow"
                size="lg"
                animated
                icon="auto_stories"
              >
                Create Your Story Now
              </MagicButton>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

function getLesson(theme: string): string {
  const lessons = {
    'friendship': "True friends are always there for each other, no matter what.",
    'courage': "Being brave doesn't mean you're not scared; it means doing something even though you are scared.",
    'kindness': "A little kindness can make a big difference in someone's day.",
    'magic': "The most powerful magic of all is believing in yourself.",
    'adventure': "The greatest adventures begin with a single step of courage.",
    'animals': "Every creature, big or small, has something special to teach us.",
    'space': "The universe is vast and full of wonders waiting to be discovered.",
    'ocean': "Like the ocean, our hearts are deep and full of treasures.",
    'dinosaurs': "Even the mightiest creatures were once small, just like you."
  }
  
  return lessons[theme as keyof typeof lessons] || "Always be kind and brave in your adventures."
} 