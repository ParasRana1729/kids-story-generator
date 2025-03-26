import Image from 'next/image';
import Link from 'next/link';
import StoryIllustration from './StoryIllustration';

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  character: string;
  theme: string;
  readTime: string;
}

export default function StoryCard({ id, title, excerpt, character, theme, readTime }: StoryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <StoryIllustration character={character} theme={theme} size="small" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{title}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <span className="material-icons text-base">schedule</span>
            {readTime} min read
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {character}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {theme}
            </span>
          </div>
          <Link
            href={`/story/${id}`}
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
          >
            Read Story
            <span className="material-icons text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 