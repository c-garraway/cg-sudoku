import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPuzzleComplete } from "../../features/gameData/gameDataSlice";
import { selectMessageBox, updateMessageBox } from "../../features/gameData/gameMessageSlice";

function Messages() {
    const dispatch = useDispatch()
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const messageBox = useSelector(selectMessageBox)

    useEffect(()=> {
        if(puzzleComplete) {
            dispatch(updateMessageBox('The puzzle has been completed!'))
        }
    }, [puzzleComplete, dispatch])

    return (
        <Box sx={{mt: 2, mb: 1, fontSize: 18, color: 'crimson', width: {md: '39ch'}}}
            >{messageBox}
        </Box>
    );
}

export default Messages;
