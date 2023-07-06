import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { selectKeypadValue, selectPuzzleValues, selectSelectedCell, updatePuzzleCell, updateSelectedCell, updatePuzzleStatus, selectOriginalPuzzle, selectPuzzlePause, updateStopwatchActive,  addPuzzleError, removePuzzleError} from "../../features/gameData/gameDataSlice";
import { addGameMove, selectLastGameMove } from "../../features/gameData/gameMovesSlice";
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
    const isPaused = useSelector(selectPuzzlePause)
    const lastGameMove = useSelector(selectLastGameMove)

    const [selectedColor, setSelectedColor] = useState(theme.palette.cell.standard)
    const [selectedFontColor, setSelectedFontColor] = useState(theme.palette.cellFont.standard)
    const [hasError, setHasError] = useState(false)
    const [errorValue, setErrorValue] = useState()
    const [canEdit, setCanEdit] = useState()
    const [cellBorder, setCellBorder] = useState('1px')

    const selectedFontWeight = canEdit ? '700' : '300'
    const disabled = isPaused || puzzleComplete ? true : false
    
    const puzzleRow = section <=3 ? row : section <=6 ? row + 3 : section <=9 ? row + 6 : ''
    const puzzleColumn = (section === 1 || section === 4 || section === 7) ? column : (section === 2 || section === 5 || section === 8) ? column + 3 : (section === 3 || section === 6 || section === 9) ? column + 6 : ''

    const cellInfo = useMemo(()=> ({
        row: puzzleRow, 
        column: puzzleColumn,
        previousValue: value,
        updatedValue: updatedValue,
        section: section,
        hasError: hasError,
        errorValue: errorValue,
        canEdit: canEdit
    }),[puzzleRow, puzzleColumn, value, updatedValue, section, hasError, errorValue, canEdit]) 

    if(isPaused) {
        value = null
    }

    //game play error handling useEffect
    useEffect(()=> {
        async function checkForErrors() {
            const isDuplicate = checkDuplicate(puzzleValues, sectionValues, cellInfo.row, cellInfo.column, cellInfo.previousValue)
            if(isDuplicate) {
                setHasError(true);
            } else {
                setHasError(false);
            }
        }

        checkForErrors().then(()=> {
            if(hasError && !isPaused) {
                setSelectedColor(theme.palette.cell.error)
            } 
        })
    })

    // add/remove error & check if puzzle grid is filled
    useEffect(() => {
        const cellID = "".concat(cellInfo.row, cellInfo.column);
      
        if (cellInfo.hasError && value !== cellInfo.errorValue && value !== null) {
            dispatch(addPuzzleError({cellID: cellID, value: value}));
            setErrorValue(value)
            }
            if (!cellInfo.hasError && cellInfo.errorValue) {
            dispatch(removePuzzleError({cellID: cellID}));
            setErrorValue(null)
        }
    
    }, [cellInfo, dispatch, value, /* puzzleStatus,  *//* puzzleErrors, puzzleFilled */]);

    useEffect(()=> {
        //define editable cells (cells without initial provided value [null])
        if(originalPuzzle[cellInfo.row][cellInfo.column] === null) { 
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }, [originalPuzzle, cellInfo])

    //color setting useEffect
    useEffect(()=> {
        //set cell background color if keypad value is selected
        if(value === currentKeypadValue ) {
            setSelectedColor(theme.palette.cell.selected)
        } else {
            setSelectedColor(theme.palette.cell.standard)
        }

        //set cell background color when puzzle is complete
        if(puzzleComplete) {
            setSelectedColor(theme.palette.cell.complete)
            dispatch(updateStopwatchActive(false))
        }
        
        //check if selected cell is current cell and set appropriate color
        if(lastGameMove?.column === cellInfo?.column && lastGameMove?.row === cellInfo?.row && !isPaused && !puzzleComplete) {
            setSelectedFontColor(theme.palette.cellFont.selected)
            setCellBorder('3px')
        } else {
            setSelectedFontColor(theme.palette.cellFont.standard)
            setCellBorder('1px')

        }

    },[dispatch, currentSelectedCell, cellInfo, currentKeypadValue, value, puzzleComplete, lastGameMove, isPaused ])


    function handleSelectedCell() {
        if(cellInfo.canEdit){
            dispatch(updatePuzzleCell(cellInfo))
            dispatch(updateSelectedCell(cellInfo))
            dispatch(addGameMove(cellInfo))
            dispatch(updatePuzzleStatus())
            setHasError(false)

            return
        }
        return
    }

    return (
        <Button 
            disabled={disabled}
            sx={{display: 'flex', border: `${cellBorder} solid ${selectedFontColor}`, borderRadius: 0, minWidth: '40px', height: '40px',  backgroundColor: selectedColor, color: selectedFontColor, fontWeight: selectedFontWeight, ':hover':{backgroundColor: selectedColor}, '&.Mui-disabled': { color: "#000000"}}}
            onClick={handleSelectedCell}
        >{value}</Button>
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
