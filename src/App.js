import React from 'react';
import './App.css';
import Puzzle from './components/puzzle/Puzzle';
import KeyPad from './components/keys/KeyPad';
import ControlPad from './components/keys/ControlPad';
import Messages from './components/messages/Messages';
import { Box, Typography } from '@mui/material';

function App() {
    return (
        <Box className="App" sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 10, /* border: '2px solid red', */ width: 'fit-content', margin: '0 auto'}}>
            <Typography
                variant='h3'
                sx={{color: 'crimson'}}
            >CG Sudoku</Typography>
            <Puzzle />
            <Messages />
            <KeyPad />
            <ControlPad />
        </Box>
    );
}

export default App;
