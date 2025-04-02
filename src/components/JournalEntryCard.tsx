
import React from 'react';
import { format } from 'date-fns';
import { JournalEntry } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import HappinessRating from './HappinessRating';

interface JournalEntryCardProps {
  entry: JournalEntry;
  onClick?: () => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onClick }) => {
  return (
    <Card 
      className="journal-card cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold">
              {format(new Date(entry.date), 'EEEE, MMMM d, yyyy')}
            </h3>
            <p className="text-sm text-gray-500">
              {format(new Date(entry.createdAt), 'h:mm a')}
            </p>
          </div>
          <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {entry.happinessRating}
          </div>
        </div>
        
        <p className="text-gray-700 line-clamp-3">{entry.content}</p>
        
        <div className="mt-3">
          <HappinessRating value={entry.happinessRating} onChange={() => {}} readOnly />
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalEntryCard;
