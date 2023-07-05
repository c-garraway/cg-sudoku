import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell,  selectResolvedPuzzle, updatePuzzleStatus, /* updateCompleteStatus, */ selectPuzzleComplete, selectPuzzlePause, updateSolveButtonSelected, resetPuzzleErrors, updateStopwatchReset, updatePuzzleComplete } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves, selectGameMoves } from "../../features/gameData/gameMovesSlice";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

function SolveButton({width}) {
    const dispatch = useDispatch();
    const resolvedPuzzle = useSelector(selectResolvedPuzzle)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const gamePaused = useSelector(selectPuzzlePause)
    const moves = useSelector(selectGameMoves)
    const totalMoves = moves.length
    const disabled = puzzleComplete || totalMoves < 5 || gamePaused ? true : false

    function handleSelect() {
        dispatch(updateStopwatchReset(true))

        dispatch(updateSelectedCell(null))
        dispatch(resetGameMoves())
        dispatch(loadPuzzleValues(resolvedPuzzle))

        dispatch(updatePuzzleStatus())
        dispatch(updatePuzzleComplete(true))

        dispatch(resetPuzzleErrors())
        
        dispatch(updateSolveButtonSelected(true))
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
