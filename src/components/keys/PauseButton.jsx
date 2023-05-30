import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { selectPuzzlePause, updatePuzzleActive, updatePuzzlePause, selectPuzzleComplete } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function PauseButton({width}) {
    const dispatch = useDispatch();
    const isPaused = useSelector(selectPuzzlePause)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const disabled = puzzleComplete ? true : false

    function handleSelect() {
        dispatch(updatePuzzlePause(isPaused ? false : true))
        dispatch(updatePuzzleActive(isPaused ? true : false))
        dispatch(updateMessageBox(isPaused ? 'Continue game...' : 'Game paused!'))
    }

    return (
        <Button 
            disabled={disabled}
            sx={{display: 'flex', width: width, cursor: 'pointer', border: '1px solid black', mt: 1, color: 'black'}}
            onClick={handleSelect}
            >{isPaused ? <PlayArrowIcon/> : <PauseIcon/> }
        </Button>
    );
}

PauseButton.propTypes = {
    width: PropTypes.string,
}

PauseButton.defaultProps = {
    width: 'fit-content',
}

export default PauseButton;
