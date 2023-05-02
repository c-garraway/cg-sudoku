import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPuzzleComplete } from "../../features/gameData/gameDataSlice";

function Messages() {
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const [message, setMessage] = useState('')

    useEffect(()=> {
        if(puzzleComplete) {
            setMessage('The puzzle has been successfully completed!')
        } else {
            setMessage('Sudoku')
        }
    }, [puzzleComplete])

    return (
        <Box sx={{mb: 1, fontSize: 18, fontWeight: 'bold', color: 'crimson'}}>{message}</Box>
    );
}

export default Messages;
