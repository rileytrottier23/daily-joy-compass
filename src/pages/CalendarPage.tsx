
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isToday } from 'date-fns';
import { Plus } from 'lucide-react';
import JournalCalendar from '../components/JournalCalendar';
import JournalEntryCard from '../components/JournalEntryCard';
import { useJournal } from '../contexts/JournalContext';
import BottomNav from '../components/BottomNav';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import HappinessRating from '@/components/HappinessRating';
import { useToast } from '@/components/ui/use-toast';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newEntryContent, setNewEntryContent] = useState('');
  const [happinessRating, setHappinessRating] = useState(5);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { entries, addEntry } = useJournal();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  const entriesForSelectedDate = entries.filter(
    entry => entry.date === formatDate(selectedDate)
  );

  const handleCreateEntry = async () => {
    if (!newEntryContent.trim()) {
      toast({
        title: "Entry cannot be empty",
        description: "Please write something about your day.",
        variant: "destructive",
        className: "bg-white border-red-400 text-gray-800",
      });
      return;
    }

    try {
      await addEntry({
        date: formatDate(selectedDate),
        content: newEntryContent,
        happinessRating,
      });
      
      setIsDialogOpen(false);
      setNewEntryContent('');
      setHappinessRating(5);
      
      toast({
        title: "Entry created!",
        description: "Your journal entry has been saved.",
        className: "bg-white border-green-400 text-gray-800",
      });
    } catch (error) {
      console.error('Error creating entry:', error);
      toast({
        title: "Failed to save",
        description: "Could not save your journal entry",
        variant: "destructive",
        className: "bg-white border-red-400 text-gray-800",
      });
    }
  };

  const addEntryForDate = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Calendar View</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 main-content">
        <JournalCalendar onSelectDate={handleDateSelect} />

        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            {entriesForSelectedDate.length === 0 && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={addEntryForDate}
              >
                <Plus size={16} />
                Add Entry
              </Button>
            )}
          </div>

          {entriesForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {entriesForSelectedDate.map(entry => (
                <JournalEntryCard 
                  key={entry.id} 
                  entry={entry} 
                  onClick={() => navigate(`/entry/${entry.date}`)}
                />
              ))}
            </div>
          ) : (
            <div className="journal-card text-center py-8">
              <p className="text-gray-500">No entries for this date.</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="mt-4 flex items-center gap-1"
                    onClick={addEntryForDate}
                  >
                    <Plus size={16} />
                    Add new entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white border-0 text-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-800">Create Entry for {format(selectedDate, 'MMMM d, yyyy')}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="content" className="block font-medium text-gray-800">
                        Journal Entry
                      </label>
                      <Textarea
                        id="content"
                        placeholder="Write about your day..."
                        value={newEntryContent}
                        onChange={(e) => setNewEntryContent(e.target.value)}
                        className="min-h-[150px] p-3 bg-gray-50 text-gray-800"
                      />
                    </div>

                    <HappinessRating 
                      value={happinessRating} 
                      onChange={setHappinessRating} 
                    />

                    <Button 
                      onClick={handleCreateEntry}
                      className="w-full"
                    >
                      Save Entry
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;
