import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell,  selectResolvedPuzzle, updatePuzzleStatus, updateCompleteStatus, updatePuzzleActive, selectPuzzleComplete } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves } from "../../features/gameData/gameMovesSlice";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

function SolveButton({width}) {
    const dispatch = useDispatch();
    const resolvedPuzzle = useSelector(selectResolvedPuzzle)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const disabled = puzzleComplete ? true : false

    function handleSelect() {
        dispatch(updateSelectedCell(null))
        
        dispatch(resetGameMoves())
        dispatch(loadPuzzleValues(resolvedPuzzle))
        dispatch(updatePuzzleActive(false))

        dispatch(updatePuzzleStatus())
        dispatch(updateCompleteStatus())
    }

    return (
        <Button 
            disabled={disabled}
            startIcon={<AutoFixHighIcon />}
            sx={{display: 'flex', width: width, cursor: 'pointer', border: '1px solid black', mt: 1, color: 'black'}}
            onClick={handleSelect}
            >solve
        </Button>
    );
}


SolveButton.propTypes = {
    width: PropTypes.string,
}

SolveButton.defaultProps = {
    width: 'fit-content',
}

export default SolveButton;
