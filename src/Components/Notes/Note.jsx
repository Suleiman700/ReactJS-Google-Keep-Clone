import React, { useState, useContext } from 'react';

import { Card, CardActions, CardContent, IconButton, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ArchiveOutlined, DeleteOutlineOutlined } from '@mui/icons-material';

import { DataContext } from '../../Context/DataProvider';
import NotePopup from '../Popups/NotePopup.jsx';
import { hasRTLCharacters } from '../../helpers/Validations.js';

const NoteCard = styled(Card)`
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    white-space: pre-line;

    &:hover {
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
    }
`;

const Note = ({ note }) => {

    const [showActions, setShowActions] = useState(false);

    const { notes, setNotes, setArchivedNotes, setDeletedNotes } = useContext(DataContext);

    const [selectedNote, setSelectedNote] = useState(null); // State to track the selected note

    // handle note clicking
    const handleNoteClick = (note) => {
        setSelectedNote(note); // Set the selected note in the state when a note is clicked
    };
    const handleSaveNote = (editedNote) => {
        // Update the notes array with the edited note
        setNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === editedNote.id ? {...note, ...editedNote} : note))
        );
    };
    // handle note popup closing
    const handleClosePopup = () => {
        setSelectedNote(null); // Close the popup by resetting the selected note
    };
    const handleNoteDelete = (noteId) => {
        // Filter out the note with the given id and update the notes state
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };
    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setArchivedNotes(prevArr => [...prevArr, note]);
    }
    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setDeletedNotes(prevArr => [...prevArr, note]);
    }

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    return (
        <NoteCard sx={{ backgroundColor: note.bgColor }}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <CardContent
                sx={{ wordWrap: "break-word", '&:hover': {cursor: 'pointer'}}}
                onClick={() => {
                    setSelectedNote(note)
                }}
            >
                <Typography dir={hasRTLCharacters(note.title) ? 'rtl' : 'ltr'} >
                    {note.title}
                </Typography>
                <Typography dir={hasRTLCharacters(note.text) ? 'rtl' : 'ltr' }>
                    {truncateText(note.text, 400)}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}>
                <Tooltip title="Archive">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => archiveNote(note)}
                    >
                        <ArchiveOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => deleteNote(note)}
                    >
                        <DeleteOutlineOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
            </CardActions>
            {selectedNote && (
                <NotePopup note={selectedNote} noteTitle="title" onClose={handleClosePopup} onSave={handleSaveNote} onDelete={handleNoteDelete} />
            )}
        </NoteCard>
    )
}

export default Note;
