import React, { useState, useContext } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Typography,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DeleteForeverOutlined, RestoreFromTrashOutlined } from '@mui/icons-material';
import { DataContext } from '../../Context/DataProvider';
import { hasRTLCharacters } from '../../helpers/Validations.js';
import NotePopup from '../Popups/NotePopup.jsx';

const TrashCard = styled(Card)`
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  white-space: pre-line;
`;

const TrashNote = ({ trashNote }) => {
    const [showActions, setShowActions] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedDeletedNote, setSelectedDeletedNote] = useState(null); // State to track the selected deleted note

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const { setNotes, deletedNotes, setDeletedNotes } = useContext(DataContext);

    const handleDeleteNote = (noteId) => {
        // Filter out the note with the given id and update the deletedNotes state
        setDeletedNotes((prevDeletedNotes) => prevDeletedNotes.filter((note) => note.id !== noteId));
        handleCloseModal();
    };

    const handleSaveNote = (editedNote) => {
        // Update the deleted notes array with the edited note
        setDeletedNotes((prevDeletedNotes) =>
            prevDeletedNotes.map((note) => (note.id === editedNote.id ? { ...note, ...editedNote } : note))
        );
    };
    const handleClosePopup = () => {
        setSelectedDeletedNote(null);
    };
    const handleNoteDelete = (noteId) => {
        setDeletedNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };

    const restoreNote = (note) => {
        // Filter out the note with the given id and update the deletedNotes and notes state
        setDeletedNotes((prevDeletedNotes) => prevDeletedNotes.filter((n) => n.id !== note.id));
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        <React.Fragment>
            <TrashCard
                sx={{ backgroundColor: trashNote.bgColor }}
                onMouseEnter={() => setShowActions(true)}
                onMouseLeave={() => setShowActions(false)}
            >
                <CardContent
                    sx={{ wordWrap: 'break-word', '&:hover': { cursor: 'pointer' } }}
                    onClick={() => {
                        setSelectedDeletedNote(trashNote);
                    }}
                >
                    <Typography dir={hasRTLCharacters(trashNote.title) ? 'rtl' : 'ltr'}>
                        {trashNote.title}
                    </Typography>
                    <Typography dir={hasRTLCharacters(trashNote.text) ? 'rtl' : 'ltr'}>
                        {truncateText(trashNote.text, 400)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title='Delete Forever'>
                        <IconButton
                            sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                            onClick={handleOpenModal}
                        >
                            <DeleteForeverOutlined fontSize='small' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Restore'>
                        <IconButton
                            sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                            onClick={() => restoreNote(trashNote)}
                        >
                            <RestoreFromTrashOutlined fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </TrashCard>

            {selectedDeletedNote && (
                <NotePopup
                    note={selectedDeletedNote}
                    noteTitle='Deleted Note'
                    onClose={() => setSelectedDeletedNote(null)}
                    onSave={handleSaveNote} // Implement the handleSaveNote function to update the deleted notes
                    onDelete={(noteId) => handleDeleteNote(noteId)} // Implement the handleDeleteNote function to delete the note permanently
                />
            )}

            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    '& .MuiDialog-paper': {
                        width: { xs: '300px', sm: '300px', md: '400px' },
                        maxWidth: { sm: '50%', md: '70%', lg: '90%' },
                    },
                }}
            >
                <DialogTitle sx={{ fontSize: '.875rem', color: '#3c4043' }}>Delete note forever?</DialogTitle>
                <DialogActions>
                    <Button variant='dark' onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteNote(trashNote.id)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            {selectedDeletedNote && (
                <NotePopup
                    note={selectedDeletedNote}
                    noteTitle='title'
                    onClose={handleClosePopup}
                    onSave={handleSaveNote}
                    onDelete={handleNoteDelete}
                />
            )}
        </React.Fragment>
    );
};

export default TrashNote;
