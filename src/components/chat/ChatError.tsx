
import React from 'react';

interface ChatErrorProps {
  errorMessage: string | null;
}

const ChatError: React.FC<ChatErrorProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  
  return (
    <div className="px-3 py-2 bg-red-100 text-red-800 text-sm">
      <div className="flex items-center justify-between">
        <div>Error: Failed to connect to the assistant. Please try again.</div>
      </div>
    </div>
  );
};

export default ChatError;
