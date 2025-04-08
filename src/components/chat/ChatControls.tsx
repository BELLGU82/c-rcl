
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatControlsProps {
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const ChatControls: React.FC<ChatControlsProps> = ({ isMobile, isOpen, onToggle }) => {
  const { t } = useLanguage();
  const chatPosition = t('dir') === 'rtl' ? 'left-4' : 'right-4';

  if (isMobile) {
    return (
      <Button
        onClick={onToggle}
        className={`fixed bottom-4 ${chatPosition} z-40 rounded-full w-12 h-12 bg-[#f7f7f7] hover:bg-[#e7e7e7] text-[#313131] border border-[#313131]/20 shadow-lg`}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Button
      onClick={onToggle}
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
  );
};

export default ChatControls;
