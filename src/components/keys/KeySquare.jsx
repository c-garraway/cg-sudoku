import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, updateKeypadValue } from "../../features/gameData/gameDataSlice";

function KeySquare({value}) {
    const dispatch = useDispatch();
    const currentKeypadValue = useSelector(selectKeypadValue)
    const [selectedColor, setSelectedColor] = useState('white')

    useEffect(()=> {
        if(value !== currentKeypadValue) {setSelectedColor('white')} else {setSelectedColor('lightblue')}
    },[value, currentKeypadValue])

    function handleSelect() {
        dispatch(updateKeypadValue(value))
    }

    return (
        <Box 
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', backgroundColor: selectedColor, width: '40px', height: '40px', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: 'large', border: '1px solid black'}}
            onClick={handleSelect}
        >{value}</Box>
    );
}

KeySquare.propTypes = {
    value: PropTypes.number,
}

KeySquare.defaultProps = {
    value: '',
}

export default KeySquare;
