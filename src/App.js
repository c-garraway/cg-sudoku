import React, { useEffect } from 'react';
import Puzzle from './components/puzzle/Puzzle';
import KeyPad from './components/keys/KeyPad';
import ControlPad from './components/keys/ControlPad';
import Messages from './components/messages/Messages';
import Timer from './components/stopwatch/Stopwatch';
import MoveCounter from './components/moveCounter/MoveCounter';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { theme } from './theme/theme'
import { useDispatch } from 'react-redux';
import { updatePuzzlePause, updateStopwatchActive } from './features/gameData/gameDataSlice';
import { updateMessageBox } from './features/gameData/gameMessageSlice';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const handleVisibilityChange = () => {
          if (document.hidden) {
            dispatch(updatePuzzlePause(true))
            dispatch(updateStopwatchActive(false))
            dispatch(updateMessageBox('Game auto-paused.'))
          }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      });
      
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', border: {sm:'1px solid black'}, p: {xs: 0, sm: 2}, alignItems: 'center', flexDirection: 'column', width: 'fit-content', margin: {xs:'10px auto', sm: '40px auto'} }} >
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'/* , border: '1px solid blue' */}}>
                    <Timer />
                    <Typography
                        variant='h3'
                        sx={{color: 'crimson', fontFamily: 'Bebas Neue', letterSpacing: {sm:'5px'}}}
                    >CG Sudoku</Typography>
                    <MoveCounter />
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: {xs:'column', md: 'row'}}}>
                    <Puzzle />
                    <Box sx={{ml: {md: 2}}}>
                        <Messages />
                        <KeyPad />
                        <ControlPad />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
