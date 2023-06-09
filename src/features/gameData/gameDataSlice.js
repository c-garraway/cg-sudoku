import { createSlice } from "@reduxjs/toolkit";
import { checkPuzzleStatus} from "../../helpers/checkPuzzleStatus";

let arr = new Array(9);
for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(9);
    for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = null;
    }
}

const status = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
}

const initialState = () => {
    return {
        resolvedPuzzle: arr,
        originalPuzzle: arr,
        puzzleValues: arr,
        puzzleStatus: status,
        puzzleComplete: false,
        puzzlePause: false,
        puzzleErrors: {count: 0},
        puzzleFilled: false,
        keypadValue: 1,
        selectedCell: null,
        selectedLevel: 0,
        stopwatchActive: false,
        stopwatchReset: false,
        stopwatchAtUnload: 0,
        solveButtonSelected: false
    }
};

const gameDataSlice = createSlice({
    name: 'gameData',
    initialState: initialState(),
    reducers: {
        resetGameData: () => initialState(),
        loadResolvedPuzzle: (state, action) => {
            state.resolvedPuzzle = action.payload
        },
        loadOriginalPuzzle: (state, action) => {
            state.originalPuzzle = action.payload
        },
        loadPuzzleValues: (state, action) => {
            state.puzzleValues = action.payload
        },
        updateSelectedCell: (state, action) => {
            state.selectedCell = action.payload
        },
        updateKeypadValue: (state, action) => {
            state.keypadValue = action.payload
        },
        updatePuzzleCell: (state, action) => {
            if(!action.payload) {return}
            if(state.puzzleValues[action.payload.row][action.payload.column] === action.payload.updatedValue) {
                state.puzzleValues[action.payload.row][action.payload.column] = null
            } else {
                state.puzzleValues[action.payload.row][action.payload.column] = action.payload.updatedValue
            }
        },
        restorePuzzleCell: (state, action) => {
            if(!action.payload) {return}
            state.puzzleValues[action.payload.row][action.payload.column] = action.payload.previousValue
        },
        updatePuzzleStatus: (state) => {
            const status = checkPuzzleStatus(state.puzzleValues)
            state.puzzleStatus = status
        },
        updatePuzzleComplete: (state, action) => {
            state.puzzleComplete = action.payload
        },
        updateSelectedLevel: (state, action) => {
            state.selectedLevel = action.payload
        },
        updatePuzzlePause: (state, action) => {
            state.puzzlePause = action.payload
        },
        updatePuzzleFilled: (state, action) => {
            state.puzzleFilled = action.payload
        },
        updateStopwatchActive: (state, action) => {
            state.stopwatchActive = action.payload
        },
        updateStopwatchReset: (state, action) => {
            state.stopwatchReset = action.payload
        },
        updateSolveButtonSelected: (state, action) => {
            state.solveButtonSelected = action.payload
        },
        updateStopwatchAtUnload: (state, action) => {
            state.stopwatchAtUnload = action.payload
        },
        addPuzzleError: (state, action) => {
            state.puzzleErrors = {...state.puzzleErrors, [action.payload.cellID]: action.payload.value, count: state.puzzleErrors?.count + 1 }
        },
        removePuzzleError: (state, action) => {
            const { [action.payload.cellID]: removedValue, ...updatedPuzzleErrors } = state.puzzleErrors
            state.puzzleErrors = {...updatedPuzzleErrors, count: state.puzzleErrors?.count > 0 ? state.puzzleErrors?.count - 1 : 0}
        },
        resetPuzzleErrors: (state) => {
                state.puzzleErrors = {count: 0}
        }
    }
});

export const {resetGameData, updateKeypadValue, updatePuzzleCell, updateSelectedCell, restorePuzzleCell, loadPuzzleValues, loadResolvedPuzzle, loadOriginalPuzzle, updatePuzzleStatus, /* updateCompleteStatus, */ updateSelectedLevel, updatePuzzlePause, updateStopwatchActive, updateStopwatchReset, updateSolveButtonSelected, updateStopwatchAtUnload, addPuzzleError, removePuzzleError, resetPuzzleErrors, updatePuzzleComplete, updatePuzzleFilled } = gameDataSlice.actions;
export const selectResolvedPuzzle = (state) => state.gameData.resolvedPuzzle;
export const selectOriginalPuzzle = (state) => state.gameData.originalPuzzle;
export const selectPuzzleValues = (state) => state.gameData.puzzleValues;
export const selectPuzzleStatus = (state) => state.gameData.puzzleStatus;
export const selectPuzzleComplete = (state) => state.gameData.puzzleComplete;
export const selectPuzzlePause = (state) => state.gameData.puzzlePause;
export const selectPuzzleFilled = (state) => state.gameData.puzzleFilled;
export const selectPuzzleErrors = (state) => state.gameData.puzzleErrors;
export const selectKeypadValue = (state) => state.gameData.keypadValue;
export const selectSelectedCell = (state) => state.gameData.selectedCell;
export const selectSelectedLevel = (state) => state.gameData.selectedLevel;
export const selectStopwatchActive = (state) => state.gameData.stopwatchActive;
export const selectStopwatchReset = (state) => state.gameData.stopwatchReset;
export const selectStopwatchAtUnload = (state) => state.gameData.stopwatchAtUnload;
export const selectSolveButtonSelected = (state) => state.gameData.solveButtonSelected;
export const selectSection1 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[0][0], values[0][1], values[0][2]], 
        [values[1][0], values[1][1], values[1][2]], 
        [values[2][0], values[2][1], values[2][2]]
    ]
};
export const selectSection2 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[0][3], values[0][4], values[0][5]], 
        [values[1][3], values[1][4], values[1][5]], 
        [values[2][3], values[2][4], values[2][5]]
    ]
};
export const selectSection3 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[0][6], values[0][7], values[0][8]], 
        [values[1][6], values[1][7], values[1][8]], 
        [values[2][6], values[2][7], values[2][8]]
    ]
};
export const selectSection4 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[3][0], values[3][1], values[3][2]], 
        [values[4][0], values[4][1], values[4][2]], 
        [values[5][0], values[5][1], values[5][2]]
    ]
};
export const selectSection5 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[3][3], values[3][4], values[3][5]], 
        [values[4][3], values[4][4], values[4][5]], 
        [values[5][3], values[5][4], values[5][5]]
    ]
};
export const selectSection6 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[3][6], values[3][7], values[3][8]], 
        [values[4][6], values[4][7], values[4][8]], 
        [values[5][6], values[5][7], values[5][8]]
    ]
};
export const selectSection7 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[6][0], values[6][1], values[6][2]], 
        [values[7][0], values[7][1], values[7][2]], 
        [values[8][0], values[8][1], values[8][2]]
    ]
}
export const selectSection8 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[6][3], values[6][4], values[6][5]], 
        [values[7][3], values[7][4], values[7][5]], 
        [values[8][3], values[8][4], values[8][5]]
    ]
};
export const selectSection9 = (state) => {const values = state.gameData.puzzleValues
    return [
        [values[6][6], values[6][7], values[6][8]], 
        [values[7][6], values[7][7], values[7][8]], 
        [values[8][6], values[8][7], values[8][8]]
    ]
};

export default gameDataSlice.reducer;
