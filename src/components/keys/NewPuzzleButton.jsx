import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell, loadOriginalPuzzle, loadResolvedPuzzle, updatePuzzleStatus, updateCompleteStatus, selectSelectedLevel, updatePuzzleActive, updatePuzzlePause } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves } from "../../features/gameData/gameMovesSlice";
import { generateSudoku } from "../../helpers/generatePuzzle";
import { addPuzzleMask } from "../../helpers/addPuzzleMask";
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function NewPuzzleButton({width}) {
    const dispatch = useDispatch();
    const selectedLevel = useSelector(selectSelectedLevel)

    function handleSelect() {
        dispatch(updateSelectedCell(null))

        dispatch(resetGameMoves())
        let puzzleValues = generateSudoku()
        dispatch(loadResolvedPuzzle(puzzleValues))
        let puzzleMaskValues = addPuzzleMask(puzzleValues, selectedLevel)
        dispatch(loadOriginalPuzzle(puzzleMaskValues))
        dispatch(loadPuzzleValues(puzzleMaskValues));
        dispatch(updatePuzzleActive(true))

        dispatch(updatePuzzleStatus())
        dispatch(updateCompleteStatus())

        dispatch(updatePuzzlePause(false))
        dispatch(updateMessageBox('New game started, best of luck!'))
    }

    return (
        <Button 
            sx={{display: 'flex', width: width, cursor: 'pointer', border: '1px solid black', mt: 1, color: 'black'}}
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
