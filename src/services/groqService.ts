const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface StoryParams {
  character: string;
  theme: string;
  storyType: string;
  ageGroup?: 'preschool' | 'elementary' | 'middle-school';
  description?: string;
}

export async function generateStory(params: StoryParams) {
  const { character, theme, storyType, ageGroup = 'elementary', description = '' } = params;
  
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a creative children's story writer. Create engaging, age-appropriate stories with clear morals that are fun to read."
          },
          {
            role: "user",
            content: `Create a ${storyType} story for ${ageGroup} children featuring a ${character} character with a theme of ${theme}.
            ${description ? `The child has described the story they want: "${description}". Please incorporate these ideas into the story.` : ''}
            Include a title, a beginning, middle, and end, and a clear moral lesson related to the theme.
            The story should be about 300-500 words, easy to understand, and engaging for children.
            Format the story with:
            1. A title at the top
            2. The story content with paragraphs
            3. A clear moral at the end.
            Do not include any additional commentary.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const storyText = data.choices[0].message.content.trim();
    
    // Extract title, content and moral
    const lines = storyText.split('\n').filter((line: string) => line.trim() !== '');
    const title = lines[0].replace(/^#\s*/, '').trim();
    
    // Find the moral - typically starts with "Moral:" or is the last paragraph
    let moralIndex = lines.findIndex((line: string) => 
      line.toLowerCase().includes('moral:') || 
      line.toLowerCase().includes('lesson:')
    );
    
    if (moralIndex === -1) {
      // If no explicit moral marker, assume it's the last paragraph
      moralIndex = lines.length - 1;
    }
    
    const moral = lines[moralIndex].replace(/^(moral|lesson):\s*/i, '').trim();
    
    // Content is everything between title and moral
    const content = lines.slice(1, moralIndex).join('\n\n');
    
    return {
      title,
      content,
      moral,
      character,
      theme, 
      id: Date.now().toString()
    };
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
} 