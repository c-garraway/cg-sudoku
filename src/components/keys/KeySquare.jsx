import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, /* selectPuzzleActive, */ selectPuzzleComplete, selectPuzzleErrors, selectPuzzlePause, selectPuzzleStatus, updateKeypadValue } from "../../features/gameData/gameDataSlice";
import { theme } from "../../theme/theme";

function KeySquare({value}) {
    const dispatch = useDispatch();
    const currentKeypadValue = useSelector(selectKeypadValue)
    const puzzleErrors = useSelector(selectPuzzleErrors)
    const puzzleComplete = useSelector(selectPuzzleComplete)
    const [selectedColor, setSelectedColor] = useState(theme.palette.cell.standard)
    const puzzleStatus = useSelector(selectPuzzleStatus)
    const [fontColor, setFontColor] = useState(theme.palette.keyFont.standard)
    //const puzzleActive = useSelector(selectPuzzleActive)
    const isPaused = useSelector(selectPuzzlePause)
    const selected = value === currentKeypadValue ? true : false
    const disabled = isPaused || puzzleComplete ? true : false

    useEffect(()=> {
        //check if key has puzzle errors
        function searchObject(obj, value) {
            for (let key in obj) {
                if (obj[key] === value && value !== null && key !== 'count') {
                    return true;
                }
            }
            return false;
        }

        const hasError = searchObject(puzzleErrors, value)
        //set key background color
        if(selected) {setFontColor(theme.palette.keyFont.completed)} 
        else {setFontColor(theme.palette.keyFont.standard)}

        //set font and border color
        if(puzzleStatus[value] === 9 && !hasError && value !== null) {
            setSelectedColor(theme.palette.cell.complete)
        } else {
            setSelectedColor(theme.palette.cell.standard)
        }
        if(hasError) {setSelectedColor(theme.palette.cell.error)}

    },[value, currentKeypadValue, puzzleStatus, selected, puzzleErrors])

    function handleSelect() {
        dispatch(updateKeypadValue(value))
    }

    return (
        <Button 
            disabled={disabled}
            sx={{display: 'flex', backgroundColor: selectedColor, fontWeight: 'bold', fontSize: 'large', border: `3px solid ${fontColor}`, color: fontColor, mt: 1, p: 0, height: 50, borderRadius: 0, '&.Mui-disabled': { border: '2px solid black'}}}
            onClick={handleSelect}
            size="small"
            variant="contained"
            color="cell"
            >{value}
        </Button>
    );
}

KeySquare.propTypes = {
    value: PropTypes.number,
}

KeySquare.defaultProps = {
    value: null,
}

export default KeySquare;
