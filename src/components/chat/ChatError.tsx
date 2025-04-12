
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ChatErrorProps {
  error: string | null;
}

const ChatError: React.FC<ChatErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mx-4 mt-4">
      <AlertTitle>AI Service Unavailable</AlertTitle>
      <AlertDescription>
        {error} <br />
        <span className="text-sm">You can still chat with the most recent responses or try again later.</span>
      </AlertDescription>
    </Alert>
  );
};

export default ChatError;
