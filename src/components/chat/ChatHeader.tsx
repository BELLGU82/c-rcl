
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minimize, RefreshCw, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
  onReset: () => void;
  showResetButton: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onMinimize, 
  onClose, 
  onReset,
  showResetButton 
}) => {
  const { t } = useLanguage();

  return (
    <CardHeader className="py-3 px-4 bg-[#f7f7f7] text-[#313131] border-b">
      <div className="flex justify-between items-center">
        <CardTitle className="text-md font-medium">{t('chat.title')}</CardTitle>
        <div className="flex space-x-1">
          {showResetButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onReset} 
              className="h-8 w-8 text-[#313131] hover:bg-black/5"
              title="Reset chat"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMinimize} 
            className="h-8 w-8 text-[#313131] hover:bg-black/5"
          >
            <Minimize className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 text-[#313131] hover:bg-black/5"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
