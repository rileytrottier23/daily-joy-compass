
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import { useJournal } from '../contexts/JournalContext';
import { Button } from '@/components/ui/button';
import HappinessRating from '../components/HappinessRating';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const EntryDetailPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const { entries, deleteEntry } = useJournal();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const entry = entries.find(e => e.date === date);

  useEffect(() => {
    if (!entry) {
      navigate('/calendar');
    }
  }, [entry, navigate]);

  if (!entry) {
    return null;
  }

  const handleDelete = () => {
    deleteEntry(entry.id);
    toast({
      title: "Entry deleted",
      description: "Your journal entry has been permanently deleted.",
    });
    navigate('/calendar');
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
          <h1 className="text-xl font-bold">Journal Entry</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {format(entryDate, 'EEEE, MMMM d, yyyy')}
          </h2>
          <p className="text-gray-600">
            Created at {format(new Date(entry.createdAt), 'h:mm a')}
          </p>
        </div>

        <div className="journal-card mb-6">
          <p className="whitespace-pre-wrap">{entry.content}</p>
        </div>

        <div className="journal-card mb-6">
          <HappinessRating value={entry.happinessRating} onChange={() => {}} readOnly />
        </div>

        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => navigate(`/edit/${entry.date}`)}
          >
            <Edit size={18} />
            Edit
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 size={18} />
            Delete
          </Button>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              journal entry from {format(entryDate, 'MMMM d, yyyy')}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EntryDetailPage;
