
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useJournal } from '../contexts/JournalContext';
import { format } from 'date-fns';

interface JournalCalendarProps {
  onSelectDate: (date: Date) => void;
}

const JournalCalendar: React.FC<JournalCalendarProps> = ({ onSelectDate }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { entries } = useJournal();

  // Function to handle date change
  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onSelectDate(newDate);
    }
  };

  // Function to get entry for a specific date
  const getEntryForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return entries.find(entry => entry.date === dateString);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        className="rounded-md border pointer-events-auto"
        modifiers={{
          highlight: entries.map(entry => new Date(entry.date)),
        }}
        modifiersStyles={{
          highlight: {
            backgroundColor: '#E67E22',
            color: 'white',
            borderRadius: '50%',
          },
        }}
      />
    </div>
  );
};

export default JournalCalendar;
