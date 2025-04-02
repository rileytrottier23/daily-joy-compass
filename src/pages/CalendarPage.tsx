
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import JournalCalendar from '../components/JournalCalendar';
import JournalEntryCard from '../components/JournalEntryCard';
import { useJournal } from '../contexts/JournalContext';
import BottomNav from '../components/BottomNav';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { entries } = useJournal();
  const navigate = useNavigate();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  const entriesForSelectedDate = entries.filter(
    entry => entry.date === formatDate(selectedDate)
  );

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Calendar View</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-lg mx-auto">
        <JournalCalendar onSelectDate={handleDateSelect} />

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h2>

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
              {formatDate(selectedDate) === formatDate(new Date()) && (
                <button 
                  className="mt-4 text-primary font-medium"
                  onClick={() => navigate('/')}
                >
                  Add entry for today
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;
