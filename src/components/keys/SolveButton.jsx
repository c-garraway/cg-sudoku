import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell,  selectResolvedPuzzle, updatePuzzleStatus, /* updateCompleteStatus, */ selectPuzzleComplete, selectPuzzlePause, updateSolveButtonSelected, resetPuzzleErrors, updateStopwatchReset, updatePuzzleComplete } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves, selectGameMoves } from "../../features/gameData/gameMovesSlice";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { selectModalForComponent, selectModalResponse, updateModalForComponent, updateModalOpen, updateModalResponse } from "../../features/confirmationData/confirmationDataSlice";
import { useEffect } from "react";

function SolveButton({width}) {
    const dispatch = useDispatch();
    const resolvedPuzzle = useSelector(selectResolvedPuzzle)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const gamePaused = useSelector(selectPuzzlePause)
    const moves = useSelector(selectGameMoves)
    const forComponent = useSelector(selectModalForComponent)
    const modalResponse = useSelector(selectModalResponse)

    const totalMoves = moves.length
    const disabled = puzzleComplete || totalMoves < 5 || gamePaused ? true : false

    useEffect(()=> {
        if(forComponent[1] === 3 && modalResponse) {
            dispatch(updateStopwatchReset(true))

            dispatch(updateSelectedCell(null))
            dispatch(resetGameMoves())
            dispatch(loadPuzzleValues(resolvedPuzzle))
    
            dispatch(updatePuzzleStatus())
            dispatch(updatePuzzleComplete(true))
    
            dispatch(resetPuzzleErrors())
            
            dispatch(updateSolveButtonSelected(true))

            dispatch(updateModalResponse(false))
            dispatch(updateModalForComponent(['', 0]))
        }
    })

    function handleSelect() {
        dispatch(updateModalOpen(true))
        dispatch(updateModalForComponent(['Solve Puzzle', 3]))
    }

    return (
        <Button 
            disabled={disabled}
            variant="contained"
            startIcon={<AutoFixHighIcon />}
            sx={{display: 'flex', width: width, cursor: 'pointer', mt: 1, borderRadius: 0 }}
            onClick={handleSelect}
            >solve
        </Button>
    );
}


SolveButton.propTypes = {
    width: PropTypes.string,
}

SolveButton.defaultProps = {
    width: 'fit-content',
}

export default SolveButton;
