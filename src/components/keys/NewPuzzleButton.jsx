import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell, loadOriginalPuzzle, loadResolvedPuzzle, updatePuzzleStatus, /* updateCompleteStatus,  */selectSelectedLevel, updatePuzzlePause, updateStopwatchActive, updateStopwatchReset, updateSolveButtonSelected, resetPuzzleErrors, updatePuzzleComplete, updatePuzzleFilled, selectPuzzleComplete, updateKeypadValue } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves } from "../../features/gameData/gameMovesSlice";
import { generateSudoku } from "../../helpers/generatePuzzle";
import { addPuzzleMask } from "../../helpers/addPuzzleMask";
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";
import { selectScoresExpanded, updateScoreUpdated, updateScoresExpanded } from "../../features/gameData/gameScoresSlice";
import { selectModalForComponent, selectModalResponse, updateModalForComponent, updateModalOpen, updateModalResponse } from "../../features/confirmationData/confirmationDataSlice";
import { useEffect } from "react";

function NewPuzzleButton({width}) {
    const dispatch = useDispatch();
    const selectedLevel = useSelector(selectSelectedLevel)
    const scoresExpanded = useSelector(selectScoresExpanded)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const forComponent = useSelector(selectModalForComponent)
    const modalResponse = useSelector(selectModalResponse)

    const levelAsString = selectedLevel === 0 ? 'easy' : selectedLevel === 1 ? 'medium' : 'hard'

    useEffect(()=> {
        if(forComponent[1] === 4 && modalResponse) {
            startNewGame()
            dispatch(updateModalResponse(false))
            dispatch(updateModalForComponent(['', 0]))
        }
    })

    function startNewGame() {
        dispatch(updatePuzzleFilled(false))
        dispatch(updatePuzzleComplete(false))

        dispatch(updateSelectedCell(null))
        dispatch(updateKeypadValue(null))

        dispatch(resetGameMoves())
        let puzzleValues = generateSudoku()
        dispatch(loadResolvedPuzzle(puzzleValues))
        let puzzleMaskValues = addPuzzleMask(puzzleValues, selectedLevel)
        dispatch(loadOriginalPuzzle(puzzleMaskValues))
        dispatch(loadPuzzleValues(puzzleMaskValues))


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

    function handleSelect() {
        if(puzzleComplete) {
            startNewGame()
        } else {
            dispatch(updateModalOpen(true))
            dispatch(updateModalForComponent(['Start New Game', 4]))

            dispatch(updatePuzzlePause(true))
            dispatch(updateMessageBox('Game paused, New Game?'))
            dispatch(updateStopwatchActive(false))
        }
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
