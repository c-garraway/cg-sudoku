
import { createSlice } from "@reduxjs/toolkit";


const initialState = () => {
    return {
        hard: [],
        medium: [],
        easy: []
    }
};

const gameScoresSlice = createSlice({
    name: 'gameScores',
    initialState: initialState(),
    reducers: {
        resetGameScores: () => initialState(),
        updateHardScore: (state, action) => {
            state.hard = action.payload
        },
        updateMediumScore: (state, action) => {
            state.medium = action.payload
        },
        updateEasyScore: (state, action) => {
            state.easy = action.payload
        },
    }
});

export const {resetGameScores, updateHardScore, updateMediumScore, updateEasyScore} = gameScoresSlice.actions;
export const selectHardScore = (state) => state.gameScores.hard;
export const selectMediumScore = (state) => state.gameScores.medium;
export const selectEasyScore = (state) => state.gameScores.easy;

export default gameScoresSlice.reducer;