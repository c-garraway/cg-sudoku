import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { restorePuzzleCell, updateSelectedCell, updatePuzzleStatus, updateCompleteStatus, selectPuzzlePause, selectPuzzleComplete } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteLastGameMove, selectHasMoves, selectLastGameMove } from "../../features/gameData/gameMovesSlice";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function BackButton({width}) {
    const dispatch = useDispatch();
    const lastGameMove = useSelector(selectLastGameMove)
    const hasMoves = useSelector(selectHasMoves)
    const gamePaused = useSelector(selectPuzzlePause)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const disabled = hasMoves && !gamePaused && !puzzleComplete ? false : true

    function handleSelect() {
        dispatch(updateSelectedCell(null))
        if(hasMoves) {
            dispatch(restorePuzzleCell(lastGameMove))
            dispatch(deleteLastGameMove())
            /* If(!haveErrors) */
        }

        dispatch(updatePuzzleStatus())
        dispatch(updateCompleteStatus())
    }

    return (
        <Button 
            disabled = {disabled}
            variant="contained"
            sx={{display: 'flex', width: width, cursor: 'pointer', mt: 1}}
            onClick={handleSelect}
            ><ArrowBackIosNewIcon fontSize="small"/>
        </Button>
    );
}

BackButton.propTypes = {
    width: PropTypes.string,
}

BackButton.defaultProps = {
    width: 'fit-content',
}

export default BackButton;
