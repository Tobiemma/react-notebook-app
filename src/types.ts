

export interface JournalEntry {
    id: number;
    title: string;
    content: string;
    created_at: string;
    is_important: boolean;
    keywords: string[];
  }
  
  export interface Keyword {
    id: number;
    keyword: string;
  }
  