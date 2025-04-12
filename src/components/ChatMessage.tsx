
import React from 'react';
import { format } from 'date-fns';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-[80%] rounded-lg p-3 shadow-sm
          ${isUser 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-white text-gray-800 rounded-tl-none'
          }
        `}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-gray-500'}`}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
