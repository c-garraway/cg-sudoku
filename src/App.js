import React from 'react';
import './App.css';
import Puzzle from './components/puzzle/Puzzle';
import KeyPad from './components/keys/KeyPad';
import ControlPad from './components/keys/ControlPad';
import { Box } from '@mui/material';

function App() {
    return (
        <Box className="App" sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 10}}>
            <Puzzle />
            <KeyPad />
            <ControlPad />
        </Box>
    );
}

export default App;
