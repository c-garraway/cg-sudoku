import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, selectPuzzleValues, selectSelectedCell, updatePuzzleCell, updateSelectedCell, updatePuzzleStatus, updateCompleteStatus, selectOriginalPuzzle } from "../../features/gameData/gameDataSlice";
import { addGameMove } from "../../features/gameData/gameMovesSlice";
import { checkDuplicate } from "../../helpers/checkDuplicateErrors";
import { theme } from "../../theme/theme";
import { selectPuzzleComplete } from "../../features/gameData/gameDataSlice";

function Cell({value, sectionValues, section, row, column}) {
    const dispatch = useDispatch();
    const currentSelectedCell = useSelector(selectSelectedCell)
    const currentKeypadValue = useSelector(selectKeypadValue)
    const puzzleValues = useSelector(selectPuzzleValues)
    const updatedValue = useSelector(selectKeypadValue)
    const originalPuzzle = useSelector(selectOriginalPuzzle)
    const puzzleComplete =  useSelector(selectPuzzleComplete)
    const [selectedColor, setSelectedColor] = useState(theme.palette.cell.standard)
    const [selectedFontColor, setSelectedFontColor] = useState(theme.palette.cellFont.standard)
    const [hasError, setHasError] = useState(false)
    const [canEdit, setCanEdit] = useState()
    const selectedFontWeight = canEdit ? '300' : '700'

    const puzzleRow = section <=3 ? row : section <=6 ? row + 3 : section <=9 ? row + 6 : ''
    const puzzleColumn = (section === 1 || section === 4 || section === 7) ? column : (section === 2 || section === 5 || section === 8) ? column + 3 : (section === 3 || section === 6 || section === 9) ? column + 6 : ''

    const cellInfo = useMemo(()=> ({
        row: puzzleRow, 
        column: puzzleColumn,
        previousValue: value,
        updatedValue: updatedValue,
        section: section,
        hasError: hasError,
        canEdit: canEdit
    }),[puzzleRow, puzzleColumn, value, updatedValue, section, hasError, canEdit]) 

    //console.log(cellInfo)

    useEffect(()=> {
        if(originalPuzzle[cellInfo.row][cellInfo.column] === null) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
        async function checkForErrors() {
            const isDuplicate = checkDuplicate(puzzleValues, sectionValues, cellInfo.row, cellInfo.column, cellInfo.previousValue)
            if(isDuplicate) {
                setHasError(true);
            } else {
                setHasError(false);
            }
        }

        if(value === currentKeypadValue) {
            setSelectedColor(theme.palette.cell.selected)
        } else {
            setSelectedColor(theme.palette.cell.standard)
        }

        if(puzzleComplete) {
            setSelectedColor(theme.palette.cell.complete)
        }

        if(currentSelectedCell?.column === cellInfo?.column && currentSelectedCell?.row === cellInfo?.row) {
            //checkPuzzleComplete(puzzleValues)
            setSelectedFontColor(theme.palette.cellFont.selected)
        } else {
            setSelectedFontColor(theme.palette.cellFont.standard)
        }

        checkForErrors().then(()=> {
            if(hasError) {
                setSelectedColor(theme.palette.cell.error)
            }
        })

    },[currentSelectedCell, cellInfo, currentKeypadValue, value, hasError, puzzleValues, sectionValues, originalPuzzle ])

    function handleSelectedCell() {
        if(cellInfo.canEdit){
            dispatch(updatePuzzleCell(cellInfo))
            dispatch(updateSelectedCell(cellInfo))
            dispatch(addGameMove(cellInfo))
            dispatch(updatePuzzleStatus())
            dispatch(updateCompleteStatus())
            setHasError(false)
            return
        }
        return
    }

    return (
        <Box 
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', border: '1px solid black', width: '40px', height: '40px', alignItems: 'center', cursor: 'pointer', backgroundColor: selectedColor, color: selectedFontColor, fontWeight: selectedFontWeight }}
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
