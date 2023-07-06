import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell, loadOriginalPuzzle, loadResolvedPuzzle, updatePuzzleStatus, /* updateCompleteStatus,  */selectSelectedLevel, updatePuzzlePause, updateStopwatchActive, updateStopwatchReset, updateSolveButtonSelected, resetPuzzleErrors, updatePuzzleComplete, updatePuzzleFilled } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves } from "../../features/gameData/gameMovesSlice";
import { generateSudoku } from "../../helpers/generatePuzzle";
import { addPuzzleMask } from "../../helpers/addPuzzleMask";
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";
import { selectScoresExpanded, updateScoreUpdated, updateScoresExpanded } from "../../features/gameData/gameScoresSlice";

function NewPuzzleButton({width}) {
    const dispatch = useDispatch();
    const selectedLevel = useSelector(selectSelectedLevel)
    const scoresExpanded = useSelector(selectScoresExpanded)
    const levelAsString = selectedLevel === 0 ? 'easy' : selectedLevel === 1 ? 'medium' : 'hard'

    function handleSelect() {
        dispatch(updatePuzzleFilled(false))
        dispatch(updatePuzzleComplete(false))

        dispatch(updateSelectedCell(null))

        dispatch(resetGameMoves())
        let puzzleValues = generateSudoku()
        dispatch(loadResolvedPuzzle(puzzleValues))
        let puzzleMaskValues = addPuzzleMask(puzzleValues, selectedLevel)
        dispatch(loadOriginalPuzzle(puzzleMaskValues))
        dispatch(loadPuzzleValues(puzzleMaskValues));

        dispatch(updatePuzzleStatus())

        dispatch(updatePuzzlePause(false))
        dispatch(updateMessageBox(`New game started [${levelAsString}], best of luck!`))

        dispatch(updateStopwatchActive(true))
        dispatch(updateStopwatchReset(true))

        dispatch(updateSolveButtonSelected(false))
        dispatch(resetPuzzleErrors())

        dispatch(updateScoreUpdated(false))

        dispatch(updateScoresExpanded(scoresExpanded ? false : false))

    }

    return (
        <Button 
            variant="contained"
            sx={{display: 'flex', width: '49%', cursor: 'pointer', mt: 1, borderRadius: 0}}
            onClick={handleSelect}
        >   New Puzzle
        </Button>
    );
}


NewPuzzleButton.propTypes = {
    width: PropTypes.string,
}

NewPuzzleButton.defaultProps = {
    width: 'fit-content',
}

export default NewPuzzleButton;
