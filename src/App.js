import React from 'react';
import Puzzle from './components/puzzle/Puzzle';
import KeyPad from './components/keys/KeyPad';
import ControlPad from './components/keys/ControlPad';
import Messages from './components/messages/Messages';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { theme } from './theme/theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box className="App" sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 10, width: 'fit-content', margin: '0 auto'}}>
                <Typography
                    variant='h3'
                    sx={{color: 'crimson'}}
                >CG Sudoku</Typography>
                <Puzzle />
                <Messages />
                <KeyPad />
                <ControlPad />
            </Box>
        </ThemeProvider>
    );
}

export default App;
