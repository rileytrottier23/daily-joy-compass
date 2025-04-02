
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

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}
