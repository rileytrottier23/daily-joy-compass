
import React, { createContext, useState, useContext, useEffect } from 'react';
import { JournalEntry } from '../types';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface JournalContextType {
  entries: JournalEntry[];
  getEntry: (date: string) => JournalEntry | undefined;
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => Promise<void>;
  updateEntry: (id: string, entry: Partial<JournalEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  isLoading: boolean;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchEntries();
    } else {
      setEntries([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('entry_date', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Transform data to match JournalEntry type
        const transformedEntries: JournalEntry[] = data.map(entry => ({
          id: entry.id,
          date: entry.entry_date,
          content: entry.content || '',
          happinessRating: entry.happiness_rating || 5,
          createdAt: entry.created_at
        }));
        setEntries(transformedEntries);
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast({
        title: "Error fetching entries",
        description: "Failed to load your journal entries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getEntry = (date: string) => {
    return entries.find(entry => entry.date === date);
  };

  const addEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([{
          user_id: user?.id,
          entry_date: entry.date,
          content: entry.content,
          happiness_rating: entry.happinessRating
        }])
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const newEntry: JournalEntry = {
          id: data[0].id,
          date: data[0].entry_date,
          content: data[0].content || '',
          happinessRating: data[0].happiness_rating || 5,
          createdAt: data[0].created_at
        };
        setEntries(prev => [newEntry, ...prev]);
      }
    } catch (error) {
      console.error('Error adding journal entry:', error);
      toast({
        title: "Failed to save",
        description: "Could not save your journal entry",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateEntry = async (id: string, updatedFields: Partial<JournalEntry>) => {
    try {
      const updates: Record<string, any> = {};
      
      if (updatedFields.content !== undefined) {
        updates.content = updatedFields.content;
      }
      
      if (updatedFields.happinessRating !== undefined) {
        updates.happiness_rating = updatedFields.happinessRating;
      }

      const { error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', id);

      if (error) {
        throw error;
      }

      setEntries(prev => 
        prev.map(entry => 
          entry.id === id 
            ? { ...entry, ...updatedFields } 
            : entry
        )
      );
    } catch (error) {
      console.error('Error updating journal entry:', error);
      toast({
        title: "Update failed",
        description: "Could not update your journal entry",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      toast({
        title: "Delete failed",
        description: "Could not delete your journal entry",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <JournalContext.Provider value={{ 
      entries, 
      getEntry,
      addEntry,
      updateEntry,
      deleteEntry,
      isLoading
    }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
