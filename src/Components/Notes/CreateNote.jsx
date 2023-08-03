import React, { useState, useRef, useContext } from 'react';

import {
    Box,
    Container as MuiContainer,
    ClickAwayListener,
    TextField
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { v4 as uuid } from 'uuid';

import { DataContext } from '../../Context/DataProvider';
import {LightbulbOutlined, PaletteOutlined} from '@mui/icons-material';
import NoteIconsComponent from '../NoteIcons/NoteIconsComponent.jsx';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    padding: 10px 15px;
    border-radius: 8px;
    border-color: "#e0e0e0";
    margin: auto;
    margin-bottom: 2rem;
    min-height: 30px;
`;

const note = {
    id: '',
    title: '',
    text: '',
    bgColor: '',
}

const CreateNote = () => {

    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({ ...note, id: uuid() });
    const [selectedNoteBGColor, setSelectedNoteBGColor] = useState(''); // New state variable for selected color

    const { setNotes } = useContext(DataContext);

    const containerRef = useRef();

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value }
        setAddNote(changedNote);
    }

    const handleNoteBGColorSelect = (bgColor) => {
        setSelectedNoteBGColor(bgColor);
        setAddNote({
            ...addNote,
            bgColor: bgColor // Add the selected background color to the addNote object
        });
    };

    return (
        <ClickAwayListener onClickAway={() => {
            setShowTextField(false);
            containerRef.current.style.minHeight = '30px';

            setAddNote({ ...note, id: uuid() });
            if (addNote.title || addNote.text) {
                setNotes(prevArr => [addNote, ...prevArr]);
            }

            // Reset the selectedNoteBGColor state to empty string for white background
            setSelectedNoteBGColor('');
        }}>
            <MuiContainer maxWidth='sm'>
                <Container ref={containerRef} style={{ backgroundColor: selectedNoteBGColor }}>
                    {
                        showTextField && (
                            <div>
                                <TextField
                                    size='small'
                                    placeholder='Title'
                                    variant='standard'
                                    InputProps={{ disableUnderline: true }}
                                    style={{ marginBottom: 10 }}
                                    onChange={(e) => onTextChange(e)}
                                    name='title'
                                    value={addNote.title}
                                />
                            </div>
                        )
                    }
                    <TextField
                        multiline
                        placeholder='Take a note...'
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        onClick={() => {
                            setShowTextField(true);
                            containerRef.current.style.minHeight = '70px';
                        }}
                        onChange={(e) => onTextChange(e)}
                        name='text'
                        value={addNote.text}
                    />
                    <NoteIconsComponent
                        isVisible={showTextField}
                        onClick={(element) => {
                            // element.target.style.backgroundColor = 'red';
                            console.log('clicked')
                        }}
                        onNoteBGColorSelect={handleNoteBGColorSelect}
                    />

                </Container>
            </MuiContainer>
        </ClickAwayListener>
    )
}

export default CreateNote;
