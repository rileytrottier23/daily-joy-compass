
import React, { createContext, useState, useContext, useEffect } from 'react';
import { JournalEntry } from '../types';
import { useAuth } from './AuthContext';

interface JournalContextType {
  entries: JournalEntry[];
  getEntry: (date: string) => JournalEntry | undefined;
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  updateEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  isLoading: boolean;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Load entries from localStorage
      const storedEntries = localStorage.getItem('joyCompassEntries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } else {
      setEntries([]);
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('joyCompassEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const getEntry = (date: string) => {
    return entries.find(entry => entry.date === date);
  };

  const addEntry = (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `entry_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setEntries(prev => [...prev, newEntry]);
  };

  const updateEntry = (id: string, updatedFields: Partial<JournalEntry>) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id 
          ? { ...entry, ...updatedFields } 
          : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
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
