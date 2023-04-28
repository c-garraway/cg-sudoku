import { createSlice } from "@reduxjs/toolkit";


const initialState = () => {
    return {
        cellErrors: [],
    }
};

const gameErrorsSlice = createSlice({
    name: 'gameErrors',
    initialState: initialState(),
    reducers: {
        resetErrorsData: () => initialState(),
        updateHorizontalErrors: (state, action) => {
            state.horizontalErrors = action.payload
        },
        updateVerticalErrors: (state, action) => {
            state.verticalErrors = action.payload
        },
        updateSectionErrors: (state, action) => {
            state.sectionErrors = state.keypadValue
        }
    }
});

export const {resetErrorsData, updateHorizontalErrors, updateVerticalErrors, updateSectionErrors} = gameErrorsSlice.actions;
export const selectHorizontalErrors = (state) => state.gameErrors.horizontalErrors;
export const selectVerticalErrors = (state) => state.gameErrors.verticalErrors;
export const selectSectionErrors = (state) => state.gameErrors.sectionErrors;

export default gameErrorsSlice.reducer;
