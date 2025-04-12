
import React from 'react';
import { Button } from '@/components/ui/button';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt }) => {
  const prompts = [
    { category: "Mood Analysis", text: "How has my mood changed this month?" },
    { category: "Trends", text: "What topics appear in my happiest entries?" },
    { category: "Insights", text: "What patterns do you see in my journal?" },
    { category: "Advice", text: "Give me 3 tips based on my journal entries" },
    { category: "Summary", text: "Summarize my mood for the past week" }
  ];

  return (
    <div className="overflow-x-auto py-2">
      <div className="flex space-x-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="whitespace-nowrap text-sm bg-white hover:bg-gray-50"
            onClick={() => onSelectPrompt(prompt.text)}
          >
            {prompt.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
