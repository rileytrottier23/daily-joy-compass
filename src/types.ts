
export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  happinessRating: number;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}
