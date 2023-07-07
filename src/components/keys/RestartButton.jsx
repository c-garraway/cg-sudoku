import { Button } from "@mui/material";
import PropTypes from 'prop-types'
import { loadPuzzleValues, updateSelectedCell,  updatePuzzleStatus, selectPuzzleComplete, selectOriginalPuzzle, updateStopwatchReset, selectPuzzlePause } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetGameMoves, selectGameMoves } from "../../features/gameData/gameMovesSlice";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { updateMessageBox } from "../../features/gameData/gameMessageSlice";
import { selectModalForComponent, selectModalResponse, updateModalForComponent, updateModalOpen, updateModalResponse } from "../../features/confirmationData/confirmationDataSlice";
import { useEffect } from "react";

function RestartButton({width}) {
    const dispatch = useDispatch();
    const originalPuzzle = useSelector(selectOriginalPuzzle)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const gamePaused = useSelector(selectPuzzlePause)
    const moves = useSelector(selectGameMoves)
    const forComponent = useSelector(selectModalForComponent)
    const modalResponse = useSelector(selectModalResponse)

    const totalMoves = moves.length
    const disabled = puzzleComplete || totalMoves < 5 || gamePaused ? true : false

    useEffect(()=> {
        if(forComponent[1] === 2 && modalResponse) {
            dispatch(updateSelectedCell(null))

            dispatch(resetGameMoves())
            dispatch(loadPuzzleValues(originalPuzzle))
    
            dispatch(updatePuzzleStatus())
    
            dispatch(updateMessageBox('Game restarted, Better luck this time!'))
    
            dispatch(updateStopwatchReset(true))

            dispatch(updateModalResponse(false))
            dispatch(updateModalForComponent(['', 0]))
        }
    })

    function handleSelect() {
        dispatch(updateModalOpen(true))
        dispatch(updateModalForComponent(['Restart Game', 2]))
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
