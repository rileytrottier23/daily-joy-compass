
import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import BottomNav from '@/components/BottomNav';
import ChatMessage from '@/components/ChatMessage';
import SuggestedPrompts from '@/components/SuggestedPrompts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { useJournal } from '../contexts/JournalContext';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const ChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { entries } = useJournal();
  const { user } = useAuth();

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: "Welcome to Joy Assistant! I can analyze your journal entries and happiness ratings to provide personalized insights. Your data remains private and secure. What would you like to know today?",
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Convert messages to OpenAI format
      const lastMessages = messages.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // Add latest user message
      lastMessages.push({
        role: 'user',
        content: input
      });
      
      // If there are journal entries, add a brief summary to help the AI
      let journalContext = '';
      if (entries && entries.length > 0) {
        const recentEntries = entries.slice(0, 3);
        journalContext = `\n\nUser has ${entries.length} journal entries. Recent happiness ratings: ${
          recentEntries.map(e => e.happinessRating).join(', ')
        }. Recent topics: ${
          recentEntries.map(e => e.content.substring(0, 30) + '...').join(' | ')
        }`;
        
        // Add the journal context to the user's message
        if (journalContext) {
          lastMessages[lastMessages.length - 1].content += journalContext;
        }
      }
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { messages: lastMessages }
      });
      
      if (error) throw error;
      
      // Add AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      
      // Add error message as AI response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to get a response from the AI.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: "I've started a new conversation. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    
    toast({
      title: "New conversation started",
      description: "Previous messages have been cleared.",
    });
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
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

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 p-2">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

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
            onClick={handleSendMessage} 
            disabled={!input.trim() || isProcessing}
            className="self-end"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChatPage;
