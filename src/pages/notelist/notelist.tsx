// src/ListPage.tsx
import React, { useState, useEffect } from 'react';
import { fetchNotes, addNote, deleteNote, updateNote, fetchKeywords, addKeyword } from '../../api/api';
import { JournalEntry } from '../../types';
import './notelist.css';
import EditForm from '../../components/editform/EditForm';

// const PAGE_SIZE = 10; // Number of entries per page

const ListPage: React.FC = () => {
  const [notes, setNotes] = useState<JournalEntry[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteImportant, setNewNoteImportant] = useState(false);
  const [newNoteDate, setNewNoteDate] = useState('');
  const [newNoteKeywords, setNewNoteKeywords] = useState('');
  const [filterImportant, setFilterImportant] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);

  // Editing form states 
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      const initialNotes = await fetchNotes(page, filterImportant);
      setNotes(initialNotes.reverse());
      const existingKeywords = await fetchKeywords();
      setKeywords(existingKeywords.map((k:any) => k.keyword));
    };
    fetchInitialData();
  }, [page, filterImportant]);

  const loadMoreNotes = async () => {
    setLoading(true);
    const moreNotes = await fetchNotes(page + 1, filterImportant);
    const newNotes = [...notes,...moreNotes].reverse();
    setNotes(newNotes);
    // setNotes(prevNotes => [...prevNotes, ...moreNotes]);
    setPage(page + 1);
    setLoading(false);
  };

  const handleAddNote = async () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const keywordsArray = newNoteKeywords
        .split(',')
        .map(kw => kw.trim())
        .filter(kw => kw.length > 0);

      const addedNote = await addNote({
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
        created_at: newNoteDate ? new Date(newNoteDate).toISOString() : new Date().toISOString(),
        is_important: newNoteImportant,
        keywords: keywordsArray,
      });

      setNotes([addedNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setNewNoteImportant(false);
      setNewNoteDate('');
      setNewNoteKeywords('');

      keywordsArray.forEach(async (keyword) => {
        if (!keywords.includes(keyword)) {
          await addKeyword({ keyword });
          setKeywords(prevKeywords => [...prevKeywords, keyword]);
        }
      });
    }
  };

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    setNotes(notes.filter(note => note.id !== id));
  };

  // const handleEditNote = async (id: number, updatedNote: Partial<Omit<JournalEntry, 'id'>>) => {
  //   const editedNote = await updateNote(id, updatedNote);
  //   setNotes(notes.map(note => (note.id === id ? editedNote : note)));
  // };

  const toggleExpandNote = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

const handleSaveEdit = async (updatedNote: Partial<Omit<JournalEntry, 'id'>>) => {
  if (editingNoteId !== null) {
    try {
      const editedNoteData = await updateNote(editingNoteId, updatedNote);
      setNotes(prevNotes =>
        prevNotes.map(note => (note.id === editingNoteId ? editedNoteData : note))
      );
      setEditingNoteId(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }
};

const handleCancelEdit = () => {
  setEditingNoteId(null);
};

const handleEditInitiate = (note: JournalEntry) => {
  setEditingNoteId(note.id);
};



  return (
    <div className="list-page">
      <header className="header">
        <h1 className="app-title">Your Notes</h1>
      </header>

      <section className="notes-section">
        <div className="add-note">
          <input
            type="text"
            placeholder="Note Title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <textarea
            placeholder="Note Content"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
          />
          <input
            type="date"
            placeholder="Set Date"
            value={newNoteDate}
            onChange={(e) => setNewNoteDate(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={newNoteImportant}
              onChange={(e) => setNewNoteImportant(e.target.checked)}
            />
            Important
          </label>
          <input
            type="text"
            placeholder="Keywords (comma separated)"
            value={newNoteKeywords}
            onChange={(e) => setNewNoteKeywords(e.target.value)}
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>

        <div className="filter-notes">
          <label>
            <input
              type="checkbox"
              checked={filterImportant}
              onChange={(e) => {
                setNotes([]);
                setPage(1);
                setFilterImportant(e.target.checked);
              }}
            />
            Show Important Only
          </label>
        </div>

        <div className="notes-list">
          {notes.map((note, index) => (
            <div key={note.id} className="note-item">

            {editingNoteId === note.id ? (
              // Use EditForm component
              <EditForm
                note={note}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                keywords={keywords}
                addKeyword={(kw:any) => addKeyword({ keyword: kw })}
              />
            ) :
              
             ( <div
                className="note-details"
                onClick={() => toggleExpandNote(index)}
              >
                <h3>
                  {note.title} {note.is_important && <span>⭐</span>}
                </h3>
                <p>
                  {expandedIndex === index || note.content.length <= 500
                    ? note.content
                    : `${note.content.substring(0, 500)}...`}
                </p>
                <small>{new Date(note.created_at).toLocaleString()}</small>
                {note.content.length > 500 && (
                  <button
                    onClick={() => toggleExpandNote(index)}
                    className="expand-button"
                  >
                    {expandedIndex === index ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div> )}
              {!editingNoteId && (
                <div>
                <button onClick={() => handleEditInitiate(note)}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                </div>
              )}
              
              
              {/* Implement an edit button if editing is needed */}
            </div>
          ))}
        </div>

        <button
          onClick={loadMoreNotes}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </section>
    </div>
  );
};

export default ListPage;
