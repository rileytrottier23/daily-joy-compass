
import React, { useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SuggestedPrompts from '@/components/SuggestedPrompts';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  isProcessing: boolean;
  onSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  setInput, 
  isProcessing, 
  onSendMessage 
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Suggested Prompts */}
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="max-w-lg mx-auto">
          <SuggestedPrompts onSelectPrompt={handlePromptSelect} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3 sticky bottom-16">
        <div className="max-w-lg mx-auto flex space-x-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="resize-none min-h-[50px] max-h-[150px]"
            disabled={isProcessing}
          />
          <Button 
            onClick={onSendMessage} 
            disabled={!input.trim() || isProcessing}
            className="self-end"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
