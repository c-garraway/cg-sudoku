import { Box } from "@mui/material";
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

    useEffect(()=> {
        if(value !== currentKeypadValue) {setSelectedColor('white')} else {setSelectedColor('MediumAquaMarine')}

        if(puzzleStatus[value] === 9) { // ADD: selected cell hasError = false
            setFontColor('crimson')
        } else {
            setFontColor('black')
        }

    },[value, currentKeypadValue, puzzleStatus])

    function handleSelect() {
        dispatch(updateKeypadValue(value))
    }

    return (
        <Box 
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', backgroundColor: selectedColor, width: '40px', height: '40px', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: 'large', border: '1px solid black', color: fontColor}}
            onClick={handleSelect}
        >{value}</Box>
    );
}

KeySquare.propTypes = {
    value: PropTypes.number,
}

KeySquare.defaultProps = {
    value: null,
}

export default KeySquare;
