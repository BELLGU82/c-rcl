
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

export interface ChatProps {
  className?: string;
}
