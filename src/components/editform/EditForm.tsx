// src/EditForm.tsx
import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../../types';
import './editForm.css';

interface EditFormProps {
  note: JournalEntry | null;
  onSave: (updatedNote: Partial<Omit<JournalEntry, 'id'>>) => void;
  onCancel: () => void;
  keywords: string[];
  addKeyword: (keyword: string) => void;
}

const EditForm: React.FC<EditFormProps> = ({ note, onSave, onCancel, keywords, addKeyword }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [date, setDate] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setIsImportant(note.is_important);
      setDate(note.created_at.split('T')[0]); // Assuming ISO string
      setKeywordsInput(note.keywords.join(', '));
    }
  }, [note]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      const keywordsArray = keywordsInput
        .split(',')
        .map(kw => kw.trim())
        .filter(kw => kw.length > 0);

      onSave({
        title: title.trim(),
        content: content.trim(),
        created_at: date ? new Date(date).toISOString() : new Date().toISOString(),
        is_important: isImportant,
        keywords: keywordsArray,
      });

      // Add new keywords if they don't exist
      keywordsArray.forEach(kw => {
        if (!keywords.includes(kw)) {
          addKeyword(kw);
        }
      });
    }
  };

  return (
    <div className="edit-note">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isImportant}
          onChange={(e) => setIsImportant(e.target.checked)}
        />
        Important
      </label>
      <input
        type="text"
        value={keywordsInput}
        onChange={(e) => setKeywordsInput(e.target.value)}
        placeholder="Keywords (comma separated)"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditForm;
