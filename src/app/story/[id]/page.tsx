'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryDisplay from '@/components/StoryDisplay';
import { Story } from '@/lib/types';
import { useRouter } from 'next/navigation';

// Sample stories data (in a real app, this would come from an API)
const sampleStories = [
  {
    id: '1',
    title: "The Princess and the Magic Garden",
    content: `Once upon a time, there was a princess who discovered a magical garden behind the royal castle. The garden was unlike any other - flowers talked, butterflies sang, and trees danced in the wind.

Every day, the princess would visit the garden, learning its secrets and making friends with all the magical creatures that lived there.

One day, the princess discovered that an evil witch was planning to destroy the garden to build a tower of thorns. The princess knew she had to act quickly to save her friends.

Because of that, she gathered all the creatures of the garden and together they devised a plan. The flowers would release their sweetest perfume to put the witch to sleep, while the butterflies would create a sparkling distraction.

Because of that, when the witch arrived, their plan worked perfectly. The witch fell into a deep sleep surrounded by beauty instead of destruction.

Until finally, when the witch awoke, she saw the true beauty of the garden. Her heart, which had been cold and hard, began to soften. The princess offered her friendship, and the witch, having never known kindness before, accepted.

And ever since then, the princess and the reformed witch tended the magical garden together, adding new wonders and welcoming all who came with open hearts.`,
    character: "princess",
    theme: "magic",
    moral: "Beauty and kindness can transform even the coldest hearts."
  },
  {
    id: '2',
    title: "The Brave Knight's Quest",
    content: `In a kingdom far away, a brave knight embarked on a dangerous quest to save the realm from an ancient curse.

Every day, the knight trained hard, preparing for the challenges that lay ahead on the journey.

One day, the knight encountered a fearsome dragon guarding a bridge. But instead of fighting, the knight offered the dragon a gift - a shiny mirror that showed one's true self.

Because of that, the dragon saw itself not as a monster, but as a magnificent creature with the power to help others. The dragon decided to join the knight on the quest.

Because of that, when they faced the source of the curse - a lonely sorcerer who had been rejected by the kingdom - they approached with compassion rather than weapons.

Until finally, the sorcerer, moved by their kindness and understanding, lifted the curse willingly. The knight learned that sometimes the bravest thing is to choose understanding over conflict.

And ever since then, the knight, the dragon, and the sorcerer worked together to protect the kingdom, using their different strengths to create a better world for everyone.`,
    character: "knight",
    theme: "adventure",
    moral: "True courage sometimes means choosing compassion over conflict."
  },
  {
    id: '3',
    title: "The Friendly Dragon's Secret",
    content: `High in the misty mountains lived a dragon who was different from all others. Instead of hoarding gold, this dragon collected books.

Every day, the dragon would fly far and wide, searching for new stories to add to its growing library.

One day, a curious child climbed the mountain, seeking adventure. The child discovered the dragon's cave filled not with treasure, but with thousands of books.

Because of that, the dragon, initially frightened of being discovered, cautiously revealed itself to the child. To the dragon's surprise, the child was not afraid but fascinated.

Because of that, the dragon shared its love of stories with the child, reading tales of distant lands and magnificent adventures. The child returned day after day, bringing friends who were initially scared but soon enchanted by the storytelling dragon.

Until finally, the dragon's cave became a library for the entire village. Children and adults alike would climb the mountain to borrow books and listen to the dragon's stories.

And ever since then, the friendly dragon has been known as the Keeper of Stories, teaching generations of children the magic that can be found within the pages of a book.`,
    character: "dragon",
    theme: "friendship",
    moral: "Sharing what you love can create unexpected friendships and enrich many lives."
  },
  {
    id: '4',
    title: "The Wizard's Apprentice",
    content: `Young Timothy always dreamed of becoming a wizard. One day, his wish came true when he met a mysterious old man in the forest who agreed to take him as an apprentice.

Every day, Timothy studied magical scrolls and practiced spells under the wizard's watchful eye, often making mistakes but never giving up.

One day, while the wizard was away, a dark shadow fell over the nearby village. Timothy knew he wasn't ready, but he was the only one who could help.

Because of that, he gathered all his courage and the little magic he had learned, and headed to the village. His spells weren't perfect, but his determination was strong.

Because of that, when he faced the shadow creature, it wasn't his magic that saved the day, but his clever thinking and kind heart. He realized the creature was just lost and scared.

Until finally, Timothy helped the shadow creature find its way home. When the wizard returned, he wasn't angry as Timothy expected, but proud of his apprentice for understanding the true essence of magic - wisdom and compassion.

And ever since then, Timothy continued his studies with renewed dedication, knowing that becoming a great wizard was about more than just powerful spells.`,
    character: "wizard",
    theme: "fantasy",
    moral: "True wisdom comes not just from knowledge, but from having the courage to use it wisely and compassionately."
  },
  {
    id: '5',
    title: "The Fairy's Garden Party",
    content: `Deep in the enchanted forest, a tiny fairy decided to throw the biggest garden party ever seen. She wanted all the creatures of the forest to come together and celebrate the arrival of spring.

Every day, the fairy worked tirelessly, sending invitations, decorating trees with dewdrops and fireflies, and preparing acorn cakes and honeysuckle tea.

One day, a great storm threatened to ruin everything. The fairy was heartbroken as she watched the wind blow away her decorations and rain wash away the path markers for guests.

Because of that, she sat down on a mushroom and began to cry. But her tears didn't go unnoticed - a family of mice, a colony of ants, and a flock of birds all saw her distress.

Because of that, without being asked, they all began to help. The mice rebuilt the tiny tables, the ants rescued and replaced all the food, and the birds spread the word that the party would go on.

Until finally, when the storm cleared, not only was everything ready, but the party was even more magnificent than the fairy had planned. Every creature in the forest came to celebrate.

And ever since then, the Spring Garden Party has become an annual tradition, not organized by one fairy alone, but by all the forest creatures working together, showing that with friends, even the biggest setbacks can be overcome.`,
    character: "fairy",
    theme: "nature",
    moral: "When we work together, we can overcome any challenge and create something more beautiful than what one person could do alone."
  },
  {
    id: '6',
    title: "The Pirate's Hidden Treasure",
    content: `Captain Whiskers wasn't like other pirates. His most precious treasure wasn't gold or jewels, but something far more valuable - a magical map that could take him anywhere in the world.

Every day, Captain Whiskers and his loyal crew would sail to new and exciting places, discovering wonders beyond imagination.

One day, a storm like no other struck their ship. The magical map was torn and scattered by the fierce winds, its pieces flying in all directions.

Because of that, Captain Whiskers had to make a difficult decision. He divided his crew into teams, each heading to a different corner of the world to find the missing pieces.

Because of that, the pirates embarked on individual adventures, facing challenges that tested not just their bravery, but their kindness, intelligence, and teamwork.

Until finally, after many months, they all returned to their meeting place with the pieces they had found. But when they put the map back together, something amazing happened - it was now even more powerful, showing not just places, but the connections between them.

And ever since then, Captain Whiskers and his crew have used their enhanced map to help lost travelers find their way home, proving that sometimes losing something valuable can lead to gaining something even more precious - the opportunity to help others.`,
    character: "pirate",
    theme: "adventure",
    moral: "The greatest treasure isn't something you can hold in your hands, but the experiences you gain and the help you can offer to others."
  }
];

export default function StoryPage({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Find the story with the matching ID
    const foundStory = sampleStories.find(s => s.id === params.id);
    
    if (foundStory) {
      setStory(foundStory);
    }
    
    setLoading(false);
  }, [params.id]);

  const handleNewStory = () => {
    router.push('/create');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-r-transparent"></div>
            <p className="mt-4 text-lg text-purple-800">Loading story...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <span className="material-icons text-6xl text-gray-300 mb-4">
              error_outline
            </span>
            <h1 className="text-3xl font-bold text-purple-800 mb-4">Story Not Found</h1>
            <p className="text-lg text-gray-700 mb-8">
              We couldn't find the story you're looking for. It may have been removed or never existed.
            </p>
            <button
              onClick={() => router.push('/gallery')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Return to Gallery
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <StoryDisplay story={story} onNewStory={handleNewStory} />
      </main>
      <Footer />
    </div>
  );
} 