import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { restorePuzzleCell, updateSelectedCell, updatePuzzleStatus, updateCompleteStatus } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteLastGameMove, selectHasMoves, selectLastGameMove } from "../../features/gameData/gameMovesSlice";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//import { updateMessageBox } from "../../features/gameData/gameMessageSlice";

function BackButton({width}) {
    const dispatch = useDispatch();
    const lastGameMove = useSelector(selectLastGameMove)
    const hasMoves = useSelector(selectHasMoves)
    const disabled = hasMoves ? false : true

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
            sx={{display: 'flex', width: width, cursor: 'pointer', border: '1px solid black', mt: 1, color: 'black'}}
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
