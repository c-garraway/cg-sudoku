import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { selectPuzzleComplete, selectPuzzlePause, selectStopwatchActive, selectStopwatchAtUnload, selectStopwatchReset, updatePuzzlePause, updateStopwatchActive, updateStopwatchAtUnload, updateStopwatchReset } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectHasMoves } from "../../features/gameData/gameMovesSlice";
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function Stopwatch() {
    const dispatch = useDispatch()
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const puzzlePause = useSelector(selectPuzzlePause)
    const moves = useSelector(selectHasMoves)
    const stopwatchActive = useSelector(selectStopwatchActive)
    const stopwatchReset = useSelector(selectStopwatchReset)
    const stopwatchAtUnload = useSelector(selectStopwatchAtUnload)
    const [totalSeconds, setTotalSeconds] = useState(0)

    useEffect(()=> {
        if(stopwatchAtUnload > 1 ) { //check stopwatch time was saved when page unloaded
            setTotalSeconds(stopwatchAtUnload) //set totalSeconds to saved value
            if(!puzzlePause) { //if user unpauses game
                dispatch(updateStopwatchAtUnload(0)) //set saved stopwatch time to 0
            }
        }

        let intervalId
        if(stopwatchActive) {
            intervalId = setInterval(()=> {
                setTotalSeconds(totalSeconds + 1)
            }, 1000)
        }

        if(stopwatchActive && stopwatchReset) { 
            setTotalSeconds(0)
            dispatch(updateStopwatchReset(false))
        }

        const handleBeforeUnload = (event) => { //commands to complete before page is unloaded (desktop only!)
            if(!puzzleComplete) {
                dispatch(updatePuzzlePause(true))
                dispatch(updateStopwatchActive(false))
                dispatch(updateMessageBox('Game auto-paused.'))
                dispatch(updateStopwatchAtUnload(totalSeconds)) 
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(intervalId)
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [totalSeconds, puzzleComplete, moves, stopwatchReset, dispatch, stopwatchActive, stopwatchAtUnload, puzzlePause])

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds / 60) % 60);

    const seconds = Math.floor((totalSeconds % 60));

    return( 
        <Box>
            <Typography>Stopwatch</Typography>
            <Typography >{hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}</Typography>
        </Box>
    );
}

export default Stopwatch;
