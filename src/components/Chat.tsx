import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, ChevronUp, ChevronDown, Send, Minimize } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WEBHOOK_URL = 'https://primary-production-6fe5.up.railway.app/webhook/rag';

const Chat: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

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

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = {
      role: 'user',
      content: userInput
    };

    setMessages([...messages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          currentUrl: window.location.href,
          language: language
        }),
      });

      const data = await response.json();
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: data.text || "I'm sorry, I couldn't process your request."
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to connect to the assistant. Please try again.",
        variant: "destructive",
      });
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I couldn't process your request due to a connection error. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
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
    handleSend();
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
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </CardContent>
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
            onClick={handleSend} 
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
