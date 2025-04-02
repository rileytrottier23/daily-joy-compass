
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { useJournal } from '../contexts/JournalContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import HappinessRating from '../components/HappinessRating';
import { useToast } from '@/components/ui/use-toast';

const EditEntryPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const { entries, updateEntry } = useJournal();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [content, setContent] = useState('');
  const [happinessRating, setHappinessRating] = useState(5);
  
  const entry = entries.find(e => e.date === date);

  useEffect(() => {
    if (!entry) {
      navigate('/calendar');
      return;
    }
    
    setContent(entry.content);
    setHappinessRating(entry.happinessRating);
  }, [entry, navigate]);

  if (!entry) {
    return null;
  }

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
    
    updateEntry(entry.id, {
      content,
      happinessRating
    });
    
    toast({
      title: "Entry updated!",
      description: "Your journal entry has been saved.",
    });
    
    navigate(`/entry/${date}`);
  };

  const entryDate = new Date(entry.date);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-white hover:bg-primary/50"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-bold">Edit Entry</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {format(entryDate, 'EEEE, MMMM d, yyyy')}
          </h2>
        </div>

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
              className="min-h-[200px] p-3"
            />
          </div>

          <HappinessRating 
            value={happinessRating} 
            onChange={setHappinessRating} 
          />

          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="primary-button flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditEntryPage;
