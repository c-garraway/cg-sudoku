import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPuzzleComplete, selectSolveButtonSelected } from "../../features/gameData/gameDataSlice";
import { selectMessageBox, updateMessageBox } from "../../features/gameData/gameMessageSlice";

function Messages() {
    const dispatch = useDispatch()
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const messageBox = useSelector(selectMessageBox)
    const solveButtonSelected = useSelector(selectSolveButtonSelected)

    useEffect(()=> {
        if(puzzleComplete) {
            if(solveButtonSelected) {
                dispatch(updateMessageBox('The puzzle has been solved for you!'))
                return
            }
            dispatch(updateMessageBox('You successfully completed the puzzle!'))
        }
    }, [puzzleComplete, dispatch, solveButtonSelected])

    return (
        <Box sx={{mt: 1, mb: 1, fontSize: 18, border: '1px solid black', p: .75, width: {md: '39ch'}, textAlign: 'center'}}
            >{messageBox}
        </Box>
    );
}

export default Messages;
