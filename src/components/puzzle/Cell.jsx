import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, selectPuzzleValues, selectSelectedCell, updatePuzzleCell, updateSelectedCell } from "../../features/gameData/gameDataSlice";
import { hasHorizontalDuplicateValue, hasVerticalDuplicateValue, hasSectionDuplicateValue } from "../../helpers/duplicateErrors";


function Cell({value, sectionValues, section, row, column}) {
    const dispatch = useDispatch();
    const currentSelectedCell = useSelector(selectSelectedCell)
    const currentKeypadValue = useSelector(selectKeypadValue)
    const puzzleValues = useSelector(selectPuzzleValues)
    const [selectedColor, setSelectedColor] = useState('white')
    const [selectedFontColor, setSelectedFontColor] = useState('black')
    const [hasError, setHasError] = useState(false)

    const puzzleRow = section <=3 ? row : section <=6 ? row + 3 : section <=9 ? row + 6 : ''
    const puzzleColumn = (section === 1 || section === 4 || section === 7) ? column : (section === 2 || section === 5 || section === 8) ? column + 3 : (section === 3 || section === 6 || section === 9) ? column + 6 : ''

    const cellID = useMemo(()=> ({
        row: puzzleRow, 
        column: puzzleColumn,
    }),[puzzleRow, puzzleColumn]) 

    useEffect(()=> {
        const horizontalErrors = hasHorizontalDuplicateValue(puzzleValues)
        const verticalErrors = hasVerticalDuplicateValue(puzzleValues)
        const sectionErrors = hasSectionDuplicateValue(sectionValues)

        async function checkForErrors() {
            if ( value !== null && (horizontalErrors || verticalErrors || sectionErrors)) {
                checkErrorType(horizontalErrors, cellID.row);
                checkErrorType(verticalErrors, cellID.column);
                checkErrorType(sectionErrors);
            } else {
                setHasError(false);
            }
        }
        
        function checkErrorType(errors, index) {
            if (errors) {
                errors.forEach((item) => {
                    if ((item[0] === index && value === item[1]) || (!index && item === value)) {
                        if (!hasError) {
                            setHasError(true);
                        }
                    }
                });
            }
        }

        if(cellID?.row !== currentSelectedCell?.row || cellID?.column !== currentSelectedCell?.column || value === null)  {setSelectedColor('white')}
        if(value === currentKeypadValue) {setSelectedColor('lightblue')} else {setSelectedColor('white')}
        if(currentSelectedCell === cellID) {setSelectedFontColor('blue')} else {setSelectedFontColor('black')}

        checkForErrors().then(()=> {
            if(hasError) {setSelectedColor('lightpink')}
        }) 

    },[currentSelectedCell, cellID, currentKeypadValue, value, hasError, puzzleValues, sectionValues ])

    function handleSelectedCell() {
        dispatch(updatePuzzleCell(cellID))
        dispatch(updateSelectedCell(cellID))
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
