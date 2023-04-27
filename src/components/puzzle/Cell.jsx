import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, selectPuzzleValues, selectSelectedCell, updatePuzzleCell, updateSelectedCell } from "../../features/gameData/gameDataSlice";
import { hasHorizontalDuplicateValue, hasVerticalDuplicateValue, hasSectionDuplicateValue } from "../../helpers/duplicateErrors";
import { addGameMove } from "../../features/gameData/gameMovesSlice";

function Cell({value, sectionValues, section, row, column}) {
    const dispatch = useDispatch();
    const currentSelectedCell = useSelector(selectSelectedCell)
    const currentKeypadValue = useSelector(selectKeypadValue)
    const puzzleValues = useSelector(selectPuzzleValues)
    const updatedValue = useSelector(selectKeypadValue)
    const [selectedColor, setSelectedColor] = useState('white')
    const [selectedFontColor, setSelectedFontColor] = useState('black')
    const [hasError, setHasError] = useState(false)

    const puzzleRow = section <=3 ? row : section <=6 ? row + 3 : section <=9 ? row + 6 : ''
    const puzzleColumn = (section === 1 || section === 4 || section === 7) ? column : (section === 2 || section === 5 || section === 8) ? column + 3 : (section === 3 || section === 6 || section === 9) ? column + 6 : ''

    const cellInfo = useMemo(()=> ({
        row: puzzleRow, 
        column: puzzleColumn,
        previousValue: value,
        updatedValue: updatedValue,
        section: section,
        hasError: hasError
    }),[puzzleRow, puzzleColumn, value, updatedValue, section, hasError]) 

    useEffect(()=> {
        const horizontalErrors = hasHorizontalDuplicateValue(puzzleValues)
        const verticalErrors = hasVerticalDuplicateValue(puzzleValues)
        const sectionErrors = hasSectionDuplicateValue(sectionValues)

        async function checkForErrors() {
            
            if ( value !== null && (horizontalErrors || verticalErrors || sectionErrors)) {
                checkErrorType(horizontalErrors, cellInfo.row);
                checkErrorType(verticalErrors, cellInfo.column);
                checkErrorType(sectionErrors);
            }
            else {
                setHasError(false);
            }
        }
        
        function checkErrorType(errors, index) {
            if (errors) {
                errors.forEach((item) => {
                    if ((item[0] === index && item[1] === value) || (!index && item === value)) {
                        if (!hasError) {
                            setHasError(true);
                        }
                    }
                });
            } 
        }
        checkForErrors().then(()=> {
            if(hasError) {
                setSelectedColor('lightpink')}
        }) 

        if(cellInfo?.row !== currentSelectedCell?.row || cellInfo?.column !== currentSelectedCell?.column || value === null)  {setSelectedColor('white')}
        if(value === currentKeypadValue) {setSelectedColor('lightblue')} else {setSelectedColor('white')}
        if(currentSelectedCell === cellInfo) {setSelectedFontColor('blue')} else {setSelectedFontColor('black')}

    },[currentSelectedCell, cellInfo, currentKeypadValue, value, hasError, puzzleValues, sectionValues ])

    function handleSelectedCell() {
        dispatch(updatePuzzleCell(cellInfo))
        dispatch(updateSelectedCell(cellInfo))
        dispatch(addGameMove(cellInfo))
        setHasError(false)
    }

    return (
        <Box 
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', border: '1px solid black', width: '40px', height: '40px', alignItems: 'center', cursor: 'pointer', backgroundColor: selectedColor, color: selectedFontColor, fontWeight: 'bold' }}
            onClick={handleSelectedCell}
        >{value}</Box>
    );
}

Cell.propTypes = {
    value: PropTypes.number,
    sectionValues: PropTypes.array,
    section: PropTypes.number,
    row: PropTypes.number,
    column: PropTypes.number
}

Cell.defaultProps = {
    value: '',
    sectionValues: [],
    section: '',
    row: '',
    column: ''
}

export default Cell;
