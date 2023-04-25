import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, selectSelectedCell, updatePuzzleCell, updateSelectedCell } from "../../features/gameData/gameDataSlice";
import { selectHorizontalErrors } from "../../features/gameData/gameErrorsSlice";

function Square({value, section, row, column}) {
    const dispatch = useDispatch();
    const currentSelectedCell = useSelector(selectSelectedCell)
    const currentKeypadValue = useSelector(selectKeypadValue)
    const horizontalErrors = useSelector(selectHorizontalErrors)
    const [selected, setSelected] = useState('white')
    const [hasError, setHasError] = useState(false)

    const puzzleRow = section <=3 ? row : section <=6 ? row + 3 : section <=9 ? row + 6 : ''
    const puzzleColumn = (section === 1 || section === 4 || section === 7) ? column : (section === 2 || section === 5 || section === 8) ? column + 3 : (section === 3 || section === 6 || section === 9) ? column + 6 : ''
    
    const cellID = useMemo(()=> ({
        row: puzzleRow, 
        column: puzzleColumn
    }),[puzzleRow, puzzleColumn]) 

    

    useEffect(()=> {
        async function checkForErrors() {
            horizontalErrors.forEach((item) => {
                if(item[0] === cellID.row && value === item[1]) {
                    //console.log(cellID)
                    setHasError(true)
                }
            })
        }

        if(cellID?.row !== currentSelectedCell?.row || cellID?.column !== currentSelectedCell?.column)  {setSelected('white')}
        if(value === currentKeypadValue) {setSelected('lightblue')}
        if(currentSelectedCell === cellID) {setSelected('lightgreen')}
        checkForErrors().then(()=> {
            if(hasError) {setSelected('lightpink')}
        }) 

    },[currentSelectedCell, cellID, currentKeypadValue, value, hasError, horizontalErrors ])

    function handleHightLight() {
        dispatch(updatePuzzleCell(cellID))
        dispatch(updateSelectedCell(cellID))

    }

    return (
        <Box 
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', border: '1px solid black', width: '40px', height: '40px', alignItems: 'center', cursor: 'pointer', backgroundColor: selected}}
            onClick={handleHightLight}
        >{value}</Box>
    );
}

Square.propTypes = {
    value: PropTypes.number,
    section: PropTypes.number,
    row: PropTypes.number,
    column: PropTypes.number
}

Square.defaultProps = {
    value: '',
    section: '',
    row: '',
    column: ''
}

export default Square;
