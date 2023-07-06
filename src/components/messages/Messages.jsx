import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPuzzleComplete, selectSolveButtonSelected } from "../../features/gameData/gameDataSlice";
import { selectMessageBox, updateMessageBox } from "../../features/gameData/gameMessageSlice";
import { selectScoreUpdated } from "../../features/gameData/gameScoresSlice";
import { theme } from "../../theme/theme";

function Messages() {
    const dispatch = useDispatch()
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const messageBox = useSelector(selectMessageBox)
    const solveButtonSelected = useSelector(selectSolveButtonSelected)
    const scoreUpdated = useSelector(selectScoreUpdated)
    const fontColor = scoreUpdated ? theme.palette.messageFont.bestTime : theme.palette.messageFont.main
    const fontBold = scoreUpdated ? '600' : 'normal'

    useEffect(()=> {
        if(puzzleComplete) {
            if(solveButtonSelected) {
                dispatch(updateMessageBox('The puzzle has been solved for you!'))
                return
            }
            if(!scoreUpdated) {
                dispatch(updateMessageBox('You successfully completed the puzzle!'))
            }
        }
    }, [puzzleComplete, dispatch, solveButtonSelected, scoreUpdated])

    return (
        <Box sx={{mt: 1, mb: 1, fontSize: 18, border: '1px solid black', p: .75, width: {md: '39ch'}, textAlign: 'center', color: fontColor, fontWeight: fontBold}}
            >{messageBox}
        </Box>
    );
}

export default Messages;
