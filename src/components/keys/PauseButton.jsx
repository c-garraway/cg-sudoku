import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { selectPuzzlePause, updatePuzzlePause, selectPuzzleComplete, updateStopwatchActive } from "../../features/gameData/gameDataSlice";
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
        dispatch(updateMessageBox(isPaused ? 'Game resumed...' : 'Game paused!'))
        
        //stopwatch
        dispatch(updateStopwatchActive(isPaused ? true : false))
    }

    return (
        <Button 
            disabled={disabled}
            variant="contained"
            sx={{display: 'flex', width: width, cursor: 'pointer', mt: 1, borderRadius: 0 }}
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
