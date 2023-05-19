import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, restorePuzzleCell, updateSelectedCell, loadOriginalPuzzle, loadResolvedPuzzle, selectResolvedPuzzle, selectOriginalPuzzle, updatePuzzleStatus, updateCompleteStatus, selectSelectedLevel } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteLastGameMove, resetGameMoves, selectHasMoves, selectLastGameMove } from "../../features/gameData/gameMovesSlice";
import { generateSudoku } from "../../helpers/generatePuzzle";
import { addPuzzleMask } from "../../helpers/addPuzzleMask";

function ControlSquare({value}) {
    const dispatch = useDispatch();
    const lastGameMove = useSelector(selectLastGameMove)
    const hasMoves = useSelector(selectHasMoves)
    const resolvedPuzzle = useSelector(selectResolvedPuzzle)
    const originalPuzzle = useSelector(selectOriginalPuzzle)
    const selectedLevel = useSelector(selectSelectedLevel)

    function handleSelect() {
        dispatch(updateSelectedCell(null))
        if(value === 'Re-Start') {
            dispatch(resetGameMoves())
            dispatch(loadPuzzleValues(originalPuzzle))
        }
        if(value === '<' && hasMoves) {
            dispatch(restorePuzzleCell(lastGameMove))
            dispatch(deleteLastGameMove())
        }
        if(value === 'New Puzzle') {
            let puzzleValues = generateSudoku()
            dispatch(loadResolvedPuzzle(puzzleValues))
            let puzzleMaskValues = addPuzzleMask(puzzleValues, selectedLevel)
            dispatch(loadOriginalPuzzle(puzzleMaskValues))
            dispatch(loadPuzzleValues(puzzleMaskValues));
        }
        if(value === 'Solve') {
            dispatch(loadPuzzleValues(resolvedPuzzle))
        }
        dispatch(updatePuzzleStatus())
        dispatch(updateCompleteStatus())
    }

    return (
        <Button 
            sx={{display: 'flex', width: '32%', cursor: 'pointer', border: '1px solid black', mt: 1, color: 'black'}}
            onClick={handleSelect}
        >{value}</Button>
    );
}


ControlSquare.propTypes = {
    value: PropTypes.string,
}

ControlSquare.defaultProps = {
    value: null,
}

export default ControlSquare;
