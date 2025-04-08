
import React, { useRef, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingAnimation from '@/components/LoadingAnimation';
import { Message } from './types';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onRetry: () => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  isLoading,
  onRetry 
}) => {
  const { t } = useLanguage();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <CardContent className="flex-1 overflow-y-auto p-3 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center text-center text-muted-foreground">
          <MessageCircle className="h-12 w-12 mb-4 text-[#313131]" />
          <p>{t('chat.title')}</p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-[#f7f7f7] text-[#313131] border border-[#313131]/20'
                  : message.error
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-muted'
              }`}
            >
              {message.content}
              {message.error && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onRetry}
                    className="text-xs flex items-center gap-1 bg-white"
                  >
                    <RefreshCw className="h-3 w-3" /> Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
            <LoadingAnimation size="sm" color="primary" />
          </div>
        </div>
      )}
      <div ref={messageEndRef} />
    </CardContent>
  );
};

export default ChatMessages;
