// src/EditForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditForm from '../components/editform/EditForm';
import { JournalEntry } from '../types';

const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();
const mockAddKeyword = jest.fn();

const sampleNote: JournalEntry = {
  id: 1,
  title: 'Sample Note',
  content: 'This is a sample note.',
  created_at: new Date().toISOString(),
  is_important: false,
  keywords: ['sample', 'note'],
};

describe('EditForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with initial note data', () => {
    render(
      <EditForm
        note={sampleNote}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        keywords={['sample', 'note']}
        addKeyword={mockAddKeyword}
      />
    );

    expect(screen.getByPlaceholderText('Note Title')).toHaveValue(sampleNote.title);
    expect(screen.getByPlaceholderText('Note Content')).toHaveValue(sampleNote.content);
    expect(screen.getByDisplayValue(sampleNote.created_at.split('T')[0])).toBeInTheDocument();
    expect(screen.getByLabelText('Important')).not.toBeChecked();
    expect(screen.getByPlaceholderText('Keywords (comma separated)')).toHaveValue(sampleNote.keywords.join(', '));
  });

  test('calls onSave with correct data when Save button is clicked', () => {
    render(
      <EditForm
        note={sampleNote}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        keywords={['sample', 'note']}
        addKeyword={mockAddKeyword}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Note Title'), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByPlaceholderText('Note Content'), { target: { value: 'Updated Content' } });
    fireEvent.change(screen.getByPlaceholderText('Keywords (comma separated)'), { target: { value: 'updated, keywords' } });
    fireEvent.click(screen.getByText('Save'));

    expect(mockOnSave).toHaveBeenCalledWith({
      title: 'Updated Title',
      content: 'Updated Content',
      created_at: expect.any(String), // Created_at should be a string in ISO format
      is_important: false,
      keywords: ['updated', 'keywords'],
    });

    // Check if addKeyword is called with new keywords
    expect(mockAddKeyword).toHaveBeenCalledWith('updated');
    expect(mockAddKeyword).toHaveBeenCalledWith('keywords');
  });

  test('calls onCancel when Cancel button is clicked', () => {
    render(
      <EditForm
        note={sampleNote}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        keywords={['sample', 'note']}
        addKeyword={mockAddKeyword}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('handles date input change correctly', () => {
    render(
      <EditForm
        note={sampleNote}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        keywords={['sample', 'note']}
        addKeyword={mockAddKeyword}
      />
    );

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-08-31' } });
    expect(screen.getByLabelText('Date')).toHaveValue('2024-08-31');
  });

  test('handles checkbox state change correctly', () => {
    render(
      <EditForm
        note={sampleNote}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        keywords={['sample', 'note']}
        addKeyword={mockAddKeyword}
      />
    );

    fireEvent.click(screen.getByLabelText('Important'));
    expect(screen.getByLabelText('Important')).toBeChecked();
  });
});
