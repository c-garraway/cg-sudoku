import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { selectPuzzleActive, selectPuzzleComplete } from "../../features/gameData/gameDataSlice";
import { useSelector } from "react-redux";
import { selectHasMoves } from "../../features/gameData/gameMovesSlice";

function Stopwatch() {
    const puzzleActive = useSelector(selectPuzzleActive)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const moves = useSelector(selectHasMoves)
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    //const [ resetNextStart, setResetNextStart] = useState(false)

    //const resetNextStart = puzzleComplete

    useEffect(()=> {
        let intervalId
        if(isRunning) {
            intervalId = setInterval(()=> {
                setTotalSeconds(totalSeconds + 1)
            }, 1000)
        }

        /* if(!moves && !puzzleActive && !puzzleComplete) {
            setTotalSeconds(0)
        } */

        if(puzzleActive && !puzzleComplete) {
            
            setIsRunning(true)
            
        } else { setIsRunning(false) }

        return ()=> clearInterval(intervalId)

    }, [isRunning, totalSeconds, setIsRunning, puzzleActive, puzzleComplete, moves])

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds / 60) % 60);

    const seconds = Math.floor((totalSeconds % 60));

    /* const startAndStop = () => {
        setIsRunning(!isRunning);
    }; */

    /* const reset = () => {
        setTotalSeconds(0);
    }; */

    return( 
        <Box>
            <Typography>Stopwatch</Typography>
            <Typography /* align="center" */>{hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}</Typography>
        </Box>
    );
}

export default Stopwatch;
