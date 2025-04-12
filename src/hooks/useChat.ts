
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useJournal } from '../contexts/JournalContext';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export const useChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { toast } = useToast();
  const { entries } = useJournal();

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

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Clear any previous errors
    setApiError(null);
    
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
      
      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to call AI service");
      }
      
      if (data.error) {
        console.error("AI service error:", data.error);
        throw new Error(data.error);
      }
      
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
      
      // Set the API error message
      setApiError(
        error.message.includes("quota") || error.message.includes("exceeded") 
          ? "The AI service has reached its usage limit. Please try again later."
          : "There was an issue connecting to the AI service. Please try again later."
      );
      
      // Add error message as AI response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. The AI service may be temporarily unavailable.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "AI Service Error",
        description: "Failed to get a response from the AI service.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
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
    
    // Clear any errors
    setApiError(null);
  };

  return {
    input,
    setInput,
    messages,
    isProcessing,
    apiError,
    handleSendMessage,
    handleNewConversation
  };
};
