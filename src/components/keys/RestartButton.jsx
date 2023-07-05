import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell,  updatePuzzleStatus, /* updateCompleteStatus, */ selectPuzzleComplete, selectOriginalPuzzle, updateStopwatchReset, selectPuzzlePause, /* updatePuzzleComplete */ } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves, selectGameMoves } from "../../features/gameData/gameMovesSlice";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function RestartButton({width}) {
    const dispatch = useDispatch();
    const originalPuzzle = useSelector(selectOriginalPuzzle)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const gamePaused = useSelector(selectPuzzlePause)
    const moves = useSelector(selectGameMoves)
    const totalMoves = moves.length
    const disabled = puzzleComplete || totalMoves < 5 || gamePaused ? true : false

    function handleSelect() {
        dispatch(updateSelectedCell(null))

        dispatch(resetGameMoves())
        dispatch(loadPuzzleValues(originalPuzzle))

        dispatch(updatePuzzleStatus())
        //dispatch(updatePuzzleComplete(false))

        dispatch(updateMessageBox('Game restarted, Better luck this time!'))

        dispatch(updateStopwatchReset(true))
    }

    return (
        <Button 
            disabled={disabled}
            variant="contained"
            startIcon={<RestartAltIcon/>}
            sx={{display: 'flex', width: width, cursor: 'pointer', mt: 1, borderRadius: 0 }}
            onClick={handleSelect}
            >restart
        </Button>
    );
}

RestartButton.propTypes = {
    width: PropTypes.string,
}

RestartButton.defaultProps = {
    width: 'fit-content',
}

export default RestartButton;
