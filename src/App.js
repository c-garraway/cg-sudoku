import React, { useEffect } from 'react';
import Puzzle from './components/puzzle/Puzzle';
import KeyPad from './components/keys/KeyPad';
import ControlPad from './components/keys/ControlPad';
import Messages from './components/messages/Messages';
import Timer from './components/stopwatch/Stopwatch';
import MoveCounter from './components/moveCounter/MoveCounter';
import Scores from './components/scores/Scores';
import Notes from './components/appNotes/Notes'
import ConfirmationModal from './components/confirmation/ConfirmationModal';
import ShareModal from './components/sharing/ShareModal';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { theme } from './theme/theme'
import { useDispatch, useSelector } from 'react-redux';
import { selectPuzzleComplete, updatePuzzlePause, updateStopwatchActive } from './features/gameData/gameDataSlice';
import { updateMessageBox } from './features/gameData/gameMessageSlice';


function App() {
    const dispatch = useDispatch()
    const puzzleComplete =  useSelector(selectPuzzleComplete)
    const fontColor = theme.palette.highlightFont.main

    useEffect(() => {
        const handleVisibilityChange = () => {
          if (document.hidden && !puzzleComplete) { //commands to execute if visibility changes when puzzle not complete (page placed in background of reloaded)
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
            <Box sx={{display: 'flex', border: {sm:'1px solid black'}, p: {xs: 0, sm: 2}, alignItems: 'center', flexDirection: 'column', width: 'fit-content', margin: {xs:'5px auto', sm: '40px auto'} }} >
                <Box sx={{display: 'flex', width: {xs: '100%', sm:'100%'}, justifyContent: 'space-between', alignItems: 'center', borderTop: 'none' /* {xs:'1px solid black', sm: 'none'} */, borderBottom: {xs:'1px solid black', sm: 'none'}}}>
                    <Timer />
                    <Typography
                        variant='h3'
                        sx={{color: fontColor, fontFamily: 'Bebas Neue', letterSpacing: {sm:'5px'}}}
                    >CG Sudoku</Typography>
                    <MoveCounter />
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: {xs:'column', md: 'row'}, width: '100%'}}>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Scores />
                    </Box>
                    <Box sx={{ width: ' 100%', ml: {sm: 2}}}>
                        <Notes />
                    </Box>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between',flexDirection: {xs:'column', md: 'row'}, /* width: '100%', */ /* border: '1px solid red' */}}>
                    <Box sx={{mr: {sm: 1}}}>
                        <Puzzle />
                    </Box>
                    <Box sx={{display: {sm: 'none', width: '100%'}}}>
                        <Scores />
                    </Box>
                    <Box  sx={{ml: {sm: 1}}}>
                        <Messages />
                        <KeyPad />
                        <ControlPad />
                    </Box>
                    
                </Box>
                
                <ConfirmationModal />
                <ShareModal />
            </Box>
        </ThemeProvider>
    );
}

export default App;
