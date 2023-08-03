import React, { useState, useContext } from 'react';
import { Card, CardActions, CardContent, IconButton, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { DataContext } from '../../Context/DataProvider';
import NotePopup from '../Popups/NotePopup.jsx';
import {hasRTLCharacters} from '../../helpers/Validations.js';

const ArchiveCard = styled(Card)`
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  white-space: pre-line;
`;

const Archive = ({ archiveNote }) => {
    const [showActions, setShowActions] = useState(false);
    const { setNotes, archivedNotes, setArchivedNotes, setDeletedNotes } = useContext(DataContext);
    const [selectedArchivedNote, setSelectedArchivedNote] = useState(null);

    const handleNoteClick = (archivedNote) => {
        setSelectedArchivedNote(archivedNote);
    };
    const handleSaveNote = (archivedNote) => {
        setArchivedNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === archivedNote.id ? { ...note, ...archivedNote } : note))
        );
    };
    const handleClosePopup = () => {
        setSelectedArchivedNote(null);
    };
    const handleNoteDelete = (noteId) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };

    const unarchiveNote = (archiveNote) => {
        const updatedNotes = archivedNotes.filter((data) => data.id !== archiveNote.id);
        setArchivedNotes(updatedNotes);
        setNotes((prevArr) => [...prevArr, archiveNote]);
    };

    const deleteNote = (archiveNote) => {
        const updatedNotes = archivedNotes.filter((data) => data.id !== archiveNote.id);
        setArchivedNotes(updatedNotes);
        setDeletedNotes((prevArr) => [...prevArr, archiveNote]);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    return (
        <ArchiveCard
            sx={{ backgroundColor: archiveNote.bgColor }}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <CardContent
                sx={{ wordWrap: 'break-word', '&:hover': { cursor: 'pointer' } }}
                onClick={() => {
                    setSelectedArchivedNote(archiveNote);
                }}
            >
                <Typography dir={hasRTLCharacters(archiveNote.title) ? 'rtl' : 'ltr'}>
                    {archiveNote.title}
                </Typography>
                <Typography dir={hasRTLCharacters(archiveNote.text) ? 'rtl' : 'ltr'}>
                    {truncateText(archiveNote.text, 400)}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end', marginLeft: 'auto' }}>
                <Tooltip title='Unarchive'>
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => unarchiveNote(archiveNote)}
                    >
                        <UnarchiveOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                    <IconButton
                        sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                        onClick={() => deleteNote(archiveNote)}
                    >
                        <DeleteOutlineOutlined fontSize='small' />
                    </IconButton>
                </Tooltip>
            </CardActions>
            {selectedArchivedNote && (
                <NotePopup
                    note={selectedArchivedNote}
                    noteTitle='title'
                    onClose={handleClosePopup}
                    onSave={handleSaveNote}
                    onDelete={handleNoteDelete}
                />
            )}
        </ArchiveCard>
    );
};

export default Archive;
