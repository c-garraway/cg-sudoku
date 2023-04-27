import { Box } from "@mui/material";
import PropTypes from 'prop-types'
import { resetGameData, restorePuzzleCell } from "../../features/gameData/gameDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteLastGameMove, resetGameMoves, selectHasMoves, selectLastGameMove } from "../../features/gameData/gameMovesSlice";

function ControlSquare({value}) {
    const dispatch = useDispatch();
    const lastGameMove = useSelector(selectLastGameMove)
    const hasMoves = useSelector(selectHasMoves)
    //const disabled = hasMoves ? 'flex' : 'none'
    //console.log(lastGameMove)

    function handleSelect() {
        if(value === 'Reset') {
            dispatch(resetGameData())
            dispatch(resetGameMoves())
        }
        if(value === '<' && hasMoves) {
            dispatch(restorePuzzleCell(lastGameMove))
            dispatch(deleteLastGameMove())
        }
    }

    return (
        <Box 
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', /* backgroundColor: selectedColor, */ width: '80px', height: '40px', alignItems: 'center', cursor: 'pointer', /* fontWeight: 'bold', */ fontSize: 'large', border: '1px solid black'}}
            onClick={handleSelect}
        >{value}</Box>
    );
}

ControlSquare.propTypes = {
    value: PropTypes.string,
}

ControlSquare.defaultProps = {
    value: null,
}

export default ControlSquare;