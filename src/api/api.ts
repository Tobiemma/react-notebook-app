// src/api.ts
import axios from 'axios';
import { JournalEntry, Keyword } from '../types';

const API_URL = 'http://localhost:3000';

// Fetch notes with pagination and filter for important notes
export const fetchNotes = async (page: number, filterImportant: boolean): Promise<JournalEntry[]> => {
  const response = await axios.get<JournalEntry[]>(`${API_URL}/journal_entries`, {
    params: {
      _page: page,
      _limit: 10,
      ...(filterImportant ? { is_important: true } : {}),
    },
  });
  return response.data;
};

// Add a new note
export const addNote = async (note: Omit<JournalEntry, 'id'>): Promise<JournalEntry> => {
  const response = await axios.post<JournalEntry>(`${API_URL}/journal_entries`, note);
  return response.data;
};

// Delete a note by ID
export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/journal_entries/${id}`);
};

// Update a note by ID
export const updateNote = async (id: number, note: Partial<Omit<JournalEntry, 'id'>>): Promise<JournalEntry> => {
  const response = await axios.put<JournalEntry>(`${API_URL}/journal_entries/${id}`, note);
  return response.data;
};

// Fetch keywords
export const fetchKeywords = async (): Promise<Keyword[]> => {
  const response = await axios.get<Keyword[]>(`${API_URL}/keywords`);
  return response.data;
};

// Add a new keyword
export const addKeyword = async (keyword: Omit<Keyword, 'id'>): Promise<Keyword> => {
  const response = await axios.post<Keyword>(`${API_URL}/keywords`, keyword);
  return response.data;
};
