
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatControls from './ChatControls';
import ChatError from './ChatError';
import { Message, ChatProps } from './types';

const WEBHOOK_URL = 'https://primary-production-6fe5.up.railway.app/webhook/rag';
const SESSION_ID_KEY = 'chat_session_id';

const Chat: React.FC<ChatProps> = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  // Initialize sessionId on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem(SESSION_ID_KEY);
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      // Generate a new session ID if none exists
      const newSessionId = generateSessionId();
      localStorage.setItem(SESSION_ID_KEY, newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Generate a random session ID
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    
    const newUserMessage: Message = {
      role: 'user',
      content: userInput
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setLastError(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          currentUrl: window.location.href,
          language: language,
          sessionId: sessionId // Send sessionId with each message
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response:", data); // Debug log
      
      let responseText = '';
      
      if (data.text) {
        responseText = data.text;
      } else if (data.output) {
        responseText = data.output;
      } else if (Array.isArray(data) && data.length > 0 && data[0].output) {
        responseText = data[0].output;
      } else if (data.message) {
        throw new Error(data.message);
      } else {
        console.log('Unexpected response format:', data);
        throw new Error("Received an unexpected response format from the server");
      }
      
      if (responseText) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            role: 'assistant',
            content: responseText
          }
        ]);
      } else {
        throw new Error("No response text found in the server response");
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setLastError(errorMessage);
      
      toast({
        title: "Error",
        description: "Failed to connect to the assistant. Please try again.",
        variant: "destructive",
      });
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I couldn't process your request due to a connection error. Please try again later.",
          error: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastMessage = () => {
    if (messages.length < 1) return;
    
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length > 0) {
      const lastUserMessage = userMessages[userMessages.length - 1].content;
      
      // Remove the last two messages (user question and error response)
      setMessages(messages.slice(0, -2));
      
      // Set the input to the last user message and send it again
      setUserInput(lastUserMessage);
      setTimeout(() => {
        handleSend();
      }, 300);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const minimizeChat = () => {
    setIsOpen(false);
  };

  const resetChat = () => {
    setMessages([]);
    setUserInput('');
    setLastError(null);
  };

  const renderChat = () => (
    <Card className={`${isMobile ? 'w-full h-full max-h-[85vh]' : 'w-80 md:w-96 h-[600px]'} flex flex-col overflow-hidden shadow-lg animate-scale-in`}>
      <ChatHeader 
        onMinimize={minimizeChat} 
        onClose={toggleChat} 
        onReset={resetChat}
        showResetButton={messages.length > 0}
      />
      <ChatMessages 
        messages={messages} 
        isLoading={isLoading}
        onRetry={retryLastMessage}
      />
      <ChatError errorMessage={lastError} />
      <ChatInput 
        value={userInput}
        onChange={setUserInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </Card>
  );

  return (
    <>
      {isMobile ? (
        <>
          {isOpen ? (
            <div className="fixed inset-0 z-50 bg-background flex flex-col">
              {renderChat()}
            </div>
          ) : (
            <ChatControls 
              isMobile={true} 
              isOpen={isOpen} 
              onToggle={toggleChat}
            />
          )}
        </>
      ) : (
        <div className={`fixed ${isOpen ? 'bottom-0' : '-bottom-[540px]'} ${language === 'he' ? 'left-4' : 'right-4'} transition-all duration-300 ease-in-out z-40`}>
          <div className="flex flex-col">
            <ChatControls 
              isMobile={false} 
              isOpen={isOpen} 
              onToggle={toggleChat}
            />
            {renderChat()}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
