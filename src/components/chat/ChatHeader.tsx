
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ChatHeaderProps {
  onNewConversation: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewConversation }) => {
  const { toast } = useToast();

  const handleNewConversation = () => {
    onNewConversation();
    
    toast({
      title: "New conversation started",
      description: "Previous messages have been cleared.",
    });
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">Joy Assistant</h1>
        <p className="text-sm text-white/80">Get insights from your journal</p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-white hover:bg-white/20"
        onClick={handleNewConversation}
      >
        <RefreshCw size={20} />
      </Button>
    </header>
  );
};

export default ChatHeader;
