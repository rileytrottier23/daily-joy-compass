
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useJournal } from '../contexts/JournalContext';
import { useAuth } from '../contexts/AuthContext';
import HappinessRating from '../components/HappinessRating';
import BottomNav from '../components/BottomNav';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Save } from 'lucide-react';

const HomePage: React.FC = () => {
  const [content, setContent] = useState('');
  const [happinessRating, setHappinessRating] = useState(5);
  const [todayEntry, setTodayEntry] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { entries, addEntry, updateEntry, getEntry } = useJournal();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const existingEntry = getEntry(today);
    if (existingEntry) {
      setTodayEntry(existingEntry);
      setContent(existingEntry.content);
      setHappinessRating(existingEntry.happinessRating);
      setIsEditing(false);
    } else {
      setTodayEntry(null);
      setContent('');
      setHappinessRating(5);
      setIsEditing(true);
    }
  }, [getEntry, today, entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Entry cannot be empty",
        description: "Please write something about your day.",
        variant: "destructive",
      });
      return;
    }

    if (todayEntry) {
      // Update existing entry
      updateEntry(todayEntry.id, {
        content,
        happinessRating
      });
      
      toast({
        title: "Entry updated!",
        description: "Your journal entry has been saved.",
      });
    } else {
      // Create new entry
      addEntry({
        date: today,
        content,
        happinessRating,
      });
      
      toast({
        title: "Entry added!",
        description: "Your new journal entry has been saved.",
      });
    }
    
    setIsEditing(false);
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Daily Joy Compass</h1>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              {user?.email?.[0].toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </h2>
          <p className="text-gray-600">How was your day?</p>
        </div>

        {todayEntry && !isEditing ? (
          <div className="space-y-4">
            <div className="journal-card">
              <p className="mb-4">{todayEntry.content}</p>
              <HappinessRating value={todayEntry.happinessRating} onChange={() => {}} readOnly />
            </div>
            <Button 
              onClick={() => setIsEditing(true)} 
              className="w-full flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              Edit Today's Entry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="content" className="block font-medium">
                Journal Entry
              </label>
              <Textarea
                id="content"
                placeholder="Write about your day..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[150px] p-3"
              />
            </div>

            <HappinessRating 
              value={happinessRating} 
              onChange={setHappinessRating} 
            />

            <Button 
              type="submit" 
              className="primary-button w-full flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save Entry
            </Button>
          </form>
        )}

        {entries.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Recent Entries</h3>
            <div className="space-y-2">
              {entries
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map(entry => (
                  <div 
                    key={entry.id}
                    className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/entry/${entry.date}`)}
                  >
                    <div>
                      <p className="font-medium">{format(new Date(entry.date), 'MMM d, yyyy')}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{entry.content}</p>
                    </div>
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {entry.happinessRating}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
