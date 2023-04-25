import React from 'react';
import './App.css';
import Puzzle from './components/puzzle/Puzzle';
import KeyPad from './components/keys/KeyPad';
import { Box } from '@mui/material';

function App() {
    return (
        <Box className="App" sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 10}}>
            <Puzzle />
            <KeyPad />
        </Box>
    );
}

export default App;
