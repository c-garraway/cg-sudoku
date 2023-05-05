import { Box } from "@mui/material";
import PropTypes from 'prop-types'
/* import { loadPuzzleValues, restorePuzzleCell, updateSelectedCell, loadOriginalPuzzle, loadResolvedPuzzle, selectResolvedPuzzle, selectOriginalPuzzle, updatePuzzleStatus, updateCompleteStatus } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteLastGameMove, resetGameMoves, selectHasMoves, selectLastGameMove } from "../../features/gameData/gameMovesSlice";
import { generateSudoku } from "../../helpers/generatePuzzle";
import { addPuzzleMask } from "../../helpers/addPuzzleMask"; */
import LevelSelect from "./LevelSelector";

function ControlSquare({value}) {
    /* const dispatch = useDispatch();
    const lastGameMove = useSelector(selectLastGameMove)
    const hasMoves = useSelector(selectHasMoves)
    const resolvedPuzzle = useSelector(selectResolvedPuzzle)
    const originalPuzzle = useSelector(selectOriginalPuzzle) */

    /* function handleSelect() {
        dispatch(updateSelectedCell(null))
        if(value === 'Reset') {
            dispatch(resetGameMoves())
            dispatch(loadPuzzleValues(originalPuzzle))
        }
        if(value === '<' && hasMoves) {
            dispatch(restorePuzzleCell(lastGameMove))
            dispatch(deleteLastGameMove())
        }
        if(value === 'New') {
            let puzzleValues = generateSudoku()
            dispatch(loadResolvedPuzzle(puzzleValues))
            let puzzleMaskValues = addPuzzleMask(puzzleValues, 0)
            dispatch(loadOriginalPuzzle(puzzleMaskValues))
            dispatch(loadPuzzleValues(puzzleMaskValues));
        }
        if(value === 'Resolve') {
            dispatch(loadPuzzleValues(resolvedPuzzle))
        }
        dispatch(updatePuzzleStatus())
        dispatch(updateCompleteStatus())
    } */

    return (
        <Box 
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', /* backgroundColor: selectedColor, */ width: '120px', height: '40px', alignItems: 'center', cursor: 'pointer', /* fontWeight: 'bold', */ fontSize: 'large', border: '1px solid black'}}
            /* onClick={handleSelect} */
        >
            <LevelSelect />
        </Box>
    );
}


ControlSquare.propTypes = {
    value: PropTypes.string,
}

ControlSquare.defaultProps = {
    value: null,
}

export default ControlSquare;
