import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, ChevronUp, ChevronDown, Send, Minimize, RefreshCw } from 'lucide-react';
import LoadingAnimation from '@/components/LoadingAnimation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

const WEBHOOK_URL = 'https://primary-production-6fe5.up.railway.app/webhook/rag';
const SESSION_ID_KEY = 'chat_session_id';

const Chat: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const messageEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (inputMessage?: string) => {
    const messageToSend = inputMessage || userInput;
    if (!messageToSend.trim()) return;

    const newUserMessage: Message = {
      role: 'user',
      content: messageToSend
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
          message: messageToSend,
          currentUrl: window.location.href,
          language: language,
          sessionId: sessionId // Send sessionId with each message
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
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
      
      setMessages(messages.slice(0, -2));
      
      setTimeout(() => {
        handleSend(lastUserMessage);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const askQuestion = (question: string) => {
    setUserInput(question);
    handleSend(question);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const minimizeChat = () => {
    setIsOpen(false);
  };

  const renderChat = () => (
    <Card className={`${isMobile ? 'w-full h-full max-h-[85vh]' : 'w-80 md:w-96 h-[600px]'} flex flex-col overflow-hidden shadow-lg animate-scale-in`}>
      <CardHeader className="py-3 px-4 bg-[#f7f7f7] text-[#313131] border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-medium">{t('chat.title')}</CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={minimizeChat} 
              className="h-8 w-8 text-[#313131] hover:bg-black/5"
            >
              <Minimize className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat} 
              className="h-8 w-8 text-[#313131] hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
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
                      onClick={retryLastMessage}
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
      {lastError && (
        <div className="px-3 py-2 bg-red-100 text-red-800 text-sm">
          <div className="flex items-center justify-between">
            <div>Error: Failed to connect to the assistant. Please try again.</div>
          </div>
        </div>
      )}
      <div className="p-3 border-t">
        {messages.length === 0 && (
          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-2">{t('chat.suggested')}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => askQuestion(t('chat.question1'))}
              >
                {t('chat.question1')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => askQuestion(t('chat.question2'))}
              >
                {t('chat.question2')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => askQuestion(t('chat.question3'))}
              >
                {t('chat.question3')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => askQuestion(t('chat.question4'))}
              >
                {t('chat.question4')}
              </Button>
            </div>
          </div>
        )}
        <div className="flex space-x-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.placeholder')}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={() => handleSend()} 
            disabled={isLoading || !userInput.trim()} 
            size="icon"
            className="bg-[#f7f7f7] hover:bg-[#e7e7e7] text-[#313131] border border-[#313131]/20"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const chatPosition = language === 'he' ? 'left-4' : 'right-4';

  return (
    <>
      {isMobile ? (
        <>
          {isOpen ? (
            <div className="fixed inset-0 z-50 bg-background flex flex-col">
              {renderChat()}
            </div>
          ) : (
            <Button
              onClick={toggleChat}
              className={`fixed bottom-4 ${chatPosition} z-40 rounded-full w-12 h-12 bg-[#f7f7f7] hover:bg-[#e7e7e7] text-[#313131] border border-[#313131]/20 shadow-lg`}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          )}
        </>
      ) : (
        <div className={`fixed ${isOpen ? 'bottom-0' : '-bottom-[540px]'} ${chatPosition} transition-all duration-300 ease-in-out z-40`}>
          <div className="flex flex-col">
            <Button
              onClick={toggleChat}
              variant="ghost"
              className={`self-end mb-2 bg-[#f7f7f7] text-[#313131] rounded-t-lg rounded-b-none py-2 px-4 hover:bg-[#e7e7e7] border border-[#313131]/20 border-b-0`}
            >
              {isOpen ? (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  {t('chat.title')}
                </>
              ) : (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  {t('chat.title')}
                </>
              )}
            </Button>
            {renderChat()}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
