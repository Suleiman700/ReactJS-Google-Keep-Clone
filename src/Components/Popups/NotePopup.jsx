import React, { useState } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tooltip} from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteIconsComponent from '../NoteIcons/NoteIconsComponent.jsx';
import {DeleteOutlined, SaveOutlined} from '@mui/icons-material';
import { hasRTLCharacters } from '../../helpers/Validations.js';

const SaveIconStyling = styled(SaveOutlined)(({ theme}) => ({
    backgroundSize: '120px 120px',
    // margin: '5px',
    padding: '5px',
    opacity: '.5',
    width: '24px',
    height: '24px',
    borderRadius: '50px',
    '&:hover': {
        backgroundColor: theme.palette.grey[300], // Use the provided default gray color
        cursor: 'pointer',
    },
}));

const DeleteIconStyling = styled(DeleteOutlined)(({ theme}) => ({
    backgroundSize: '120px 120px',
    // margin: '5px',
    padding: '5px',
    opacity: '.5',
    width: '24px',
    height: '24px',
    borderRadius: '50px',
    '&:hover': {
        backgroundColor: theme.palette.grey[300], // Use the provided default gray color
        cursor: 'pointer',
    },
}));

const NotePopup = ({ note, onClose, onSave, onDelete }) => {
    const [editedNote, setEditedNote] = useState({ ...note });
    const [selectedNoteBGColor, setSelectedNoteBGColor] = useState(note.bgColor || ''); // Initialize the selectedNoteBGColor with the note's color

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setEditedNote((prevNote) => ({ ...prevNote, [name]: value }));
    };
    const handleNoteBGColorSelect = (bgColor) => {
        setSelectedNoteBGColor(bgColor); // Set the selected background color
        setEditedNote((prevNote) => ({ ...prevNote, bgColor: bgColor })); // Set the color property in the editedNote
    };
    const handleSave = () => {
        onSave(editedNote);
        onClose();
    };
    const handleDelete = () => {
        onDelete(note.id); // Call the onDelete prop with the note's id
        onClose(); // Close the dialog after deleting
    };

    return (
        <Dialog open={Boolean(note)} onClose={onClose} >
            {/*<DialogTitle>Edit Note</DialogTitle>*/}
            <div style={{ backgroundColor: selectedNoteBGColor }}>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        placeholder='Title'
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        onChange={handleTextChange}
                        name='title'
                        value={editedNote.title}
                        sx={{ fontSize: '36px' }} // Apply the font size to the TextField
                        dir={hasRTLCharacters(editedNote.title) ? 'rtl' : 'ltr'}
                        style={{ borderBottom: '1px solid gray', marginBottom: '10px' }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        placeholder='Take a note...'
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        onChange={handleTextChange}
                        name='text'
                        value={editedNote.text}
                        dir={hasRTLCharacters(editedNote.text) ? 'rtl' : 'ltr'}
                    />
                    <NoteIconsComponent
                        isVisible={true}
                        onNoteBGColorSelect={handleNoteBGColorSelect}
                    />
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={handleSave} color='primary'>Save</Button>*/}
                    <Tooltip title="Delete note" color='warning'>
                        <DeleteIconStyling onClick={handleDelete}>
                            <DeleteOutlined>Save</DeleteOutlined>
                        </DeleteIconStyling>
                    </Tooltip>
                    <Tooltip title="Save changes">
                        <SaveIconStyling onClick={handleSave}>
                            <SaveOutlined>Save</SaveOutlined>
                        </SaveIconStyling>
                    </Tooltip>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default NotePopup;
