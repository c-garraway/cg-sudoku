import { Box, Button, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Notes() {
    const [notesExpanded, setNotesExpanded] = useState(false)

    function handleExpandClick() {
        setNotesExpanded(!notesExpanded)
    }

    return (
        <Box sx={{mb: {xs: 1, sm: 0}}}>
            <Button 
                onClick={handleExpandClick} 
                /* sx={{width: {xs: '100%', md: '376px'},margin: 'auto 0', textAlign: 'right'}}  */
                endIcon={notesExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>} size="small"> GAME NOTES
            </Button>
            <Collapse in={notesExpanded}>
                <Box sx={{border: '1px solid black', p: 1}}>
                    <Typography>1. Restart / Solve available after 5 plays</Typography>
                    <Typography>2. Game will auto-pause when not active</Typography>
                    <Typography>2. Game pauses when My Best Times is open</Typography>
                </Box>
            </Collapse>
            
        </Box>
    );
}

export default Notes;
