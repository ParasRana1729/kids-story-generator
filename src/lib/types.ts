export interface Story {
  id: string;
  title: string;
  content: string;
  character: string;
  theme: string;
  moral?: string;
}

export interface StoryFormData {
  character: string;
  theme: string;
  type: string;
  length: string;
}

export interface StoryOption {
  value: string;
  label: string;
} 