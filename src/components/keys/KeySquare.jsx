import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, selectPuzzleStatus, updateKeypadValue } from "../../features/gameData/gameDataSlice";

function KeySquare({value}) {
    const dispatch = useDispatch();
    const currentKeypadValue = useSelector(selectKeypadValue)
    const [selectedColor, setSelectedColor] = useState('white')
    const puzzleStatus = useSelector(selectPuzzleStatus)
    const [fontColor, setFontColor] = useState('black')
    const selected = value === currentKeypadValue ? true : false

    useEffect(()=> {
        if(selected) {setSelectedColor('MediumAquaMarine')} else {setSelectedColor('white')}

        if(puzzleStatus[value] === 9) { // ADD: selected cell hasError = false
            setFontColor('crimson')
        } else {
            setFontColor('black')
        }

    },[value, currentKeypadValue, puzzleStatus, selected])

    function handleSelect() {
        dispatch(updateKeypadValue(value))
    }

    return (
        <Button 
            sx={{display: 'flex', backgroundColor: selectedColor, fontWeight: 'bold', fontSize: 'large', border: '1px solid black', color: fontColor, mt: 1, p: 0}}
            onClick={handleSelect}
            size="small"
            variant="contained"
        >{value}</Button>
    );
}

KeySquare.propTypes = {
    value: PropTypes.number,
}

KeySquare.defaultProps = {
    value: null,
}

export default KeySquare;
