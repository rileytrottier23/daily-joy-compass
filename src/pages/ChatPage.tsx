
import React from 'react';
import BottomNav from '@/components/BottomNav';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatError from '@/components/chat/ChatError';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';

const ChatPage: React.FC = () => {
  const {
    input,
    setInput,
    messages,
    isProcessing,
    apiError,
    handleSendMessage,
    handleNewConversation
  } = useChat();

  return (
    <div className="pb-20 min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader onNewConversation={handleNewConversation} />
      <ChatError error={apiError} />
      <MessageList messages={messages} isProcessing={isProcessing} />
      <ChatInput 
        input={input} 
        setInput={setInput} 
        isProcessing={isProcessing} 
        onSendMessage={handleSendMessage} 
      />
      <BottomNav />
    </div>
  );
};

export default ChatPage;
