import React from 'react';
import { Popover, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PaletteOutlined } from '@mui/icons-material';
import { NotesColors } from '../../config/NotesColors.js';

const ColorBox = styled(Box)(({ theme, color }) => ({
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: theme.spacing(1),
    cursor: 'pointer',
    border: '1px solid gray',
}));

const ColorPicker = ({ anchorEl, onClose, onColorSelect }) => {

    const handleColorClick = (color) => {
        onColorSelect(color);
        // onClose(); // close color picker after selecting color
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Box display="flex" p={1}>
                {NotesColors.map((NoteBGColor) => (
                    <ColorBox
                        key={NoteBGColor.name}
                        color={NoteBGColor.bgColor}
                        onClick={() => handleColorClick(NoteBGColor.bgColor)}
                        sx={{ marginBottom: 1, ':hover': { opacity: 0.8 } }}
                    />
                ))}
            </Box>
        </Popover>
    );
};

export default ColorPicker;
