import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell,  updatePuzzleStatus, updateCompleteStatus, selectPuzzleComplete, selectOriginalPuzzle } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves } from "../../features/gameData/gameMovesSlice";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function RestartButton({width}) {
    const dispatch = useDispatch();
    const originalPuzzle = useSelector(selectOriginalPuzzle)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const disabled = puzzleComplete ? true : false

    function handleSelect() {
        dispatch(updateSelectedCell(null))

        dispatch(resetGameMoves())
        dispatch(loadPuzzleValues(originalPuzzle))

        dispatch(updatePuzzleStatus())
        dispatch(updateCompleteStatus())

        dispatch(updateMessageBox('Game restarted, Better luck this time!'))
    }

    return (
        <Button 
            disabled={disabled}
            startIcon={<RestartAltIcon/>}
            sx={{display: 'flex', width: width, cursor: 'pointer', border: '1px solid black', mt: 1, color: 'black'}}
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
