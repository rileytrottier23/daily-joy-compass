
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface HappinessRatingProps {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
}

const HappinessRating: React.FC<HappinessRatingProps> = ({ value, onChange, readOnly = false }) => {
  const handleValueChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const getRatingLabel = (rating: number) => {
    if (rating <= 2) return 'Very Unhappy';
    if (rating <= 4) return 'Unhappy';
    if (rating <= 6) return 'Neutral';
    if (rating <= 8) return 'Happy';
    return 'Very Happy';
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 2) return 'bg-red-500';
    if (rating <= 4) return 'bg-orange-500';
    if (rating <= 6) return 'bg-yellow-500';
    if (rating <= 8) return 'bg-lime-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Happiness Rating</span>
        <div className="flex items-center">
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${getRatingColor(value)}`}>
            {value}
          </span>
          <span className="ml-2 text-sm">{getRatingLabel(value)}</span>
        </div>
      </div>
      
      <Slider
        value={[value]}
        min={1}
        max={10}
        step={1}
        onValueChange={handleValueChange}
        disabled={readOnly}
        className="happiness-slider"
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
      </div>
    </div>
  );
};

export default HappinessRating;
