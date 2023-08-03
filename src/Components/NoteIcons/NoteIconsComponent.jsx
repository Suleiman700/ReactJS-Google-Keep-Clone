import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { PaletteOutlined } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';
import ColorPicker from '../Pickers/ColorPicker.jsx';

const BackgroundColorIcon = styled(PaletteOutlined)(({ theme}) => ({
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

const NoteIconsComponent = ({ isVisible, onClick, onNoteBGColorSelect }) => {
    const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);

    if (!isVisible) return null

    const handleColorIconClick = (event) => {
        setColorPickerAnchorEl(event.currentTarget);
    };

    const handleColorSelect = (color) => {
        // Do something with the selected color
        onNoteBGColorSelect(color)
        // setColorPickerAnchorEl(null); // Close the color picker
    };

    return (
        <div>
            <Tooltip title="Background color">
                {/*<IconButton onClick={handleColorIconClick}>*/}
                {/*    <BackgroundColorIcon hoverBGColor="" onClick={onClick} />}
                {/*</IconButton>*/}
                <BackgroundColorIcon onClick={handleColorIconClick} />
            </Tooltip>
            <ColorPicker
                anchorEl={colorPickerAnchorEl}
                onClose={() => setColorPickerAnchorEl(null)}
                onColorSelect={handleColorSelect}
            />
        </div>
    );
};

export default NoteIconsComponent;
