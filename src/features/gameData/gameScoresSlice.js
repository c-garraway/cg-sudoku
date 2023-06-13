
import { createSlice } from "@reduxjs/toolkit";


const initialState = () => {
    return {
        hard: {completionTime: [0, '0:00:00'], date: '0000-00-00, 00:00 p.m.'},
        medium: {completionTime: [0, '0:00:00'], date: '0000-00-00, 00:00 p.m.'},
        easy: {completionTime: [0, '0:00:00'], date: '0000-00-00, 00:00 p.m.'},
        lastCompletionTime: [0, '0'],
        scoreUpdated: false
    }
};

const gameScoresSlice = createSlice({
    name: 'gameScores',
    initialState: initialState(),
    reducers: {
        resetGameScores: (state) => {
            state.hard = {completionTime: [0, '0:00:00'], date: '0000-00-00, 00:00 p.m.'}
            state.medium = {completionTime: [0, '0:00:00'], date: '0000-00-00, 00:00 p.m.'}
            state.easy = {completionTime: [0, '0:00:00'], date: '0000-00-00, 00:00 p.m.'}
        },
        /* resetGameScores: () => initialState(), */
        updateHardScore: (state, action) => {
            state.hard = action.payload
            state.scoreUpdated = true
        },
        updateMediumScore: (state, action) => {
            state.medium = action.payload
            state.scoreUpdated = true

        },
        updateEasyScore: (state, action) => {
            state.easy = action.payload
            state.scoreUpdated = true

        },
        updateLastCompletionTime: (state, action) => {
            state.lastCompletionTime = action.payload
        },
        updateScoreUpdated: (state, action) => {
            state.scoreUpdated = action.payload
        }
    }
});

export const {resetGameScores, updateHardScore, updateMediumScore, updateEasyScore, updateLastCompletionTime, updateScoreUpdated} = gameScoresSlice.actions;
export const selectHardScore = (state) => state.gameScores.hard;
export const selectMediumScore = (state) => state.gameScores.medium;
export const selectEasyScore = (state) => state.gameScores.easy;
export const selectLastCompletionTime= (state) => state.gameScores.lastCompletionTime;
export const selectScoreUpdated= (state) => state.gameScores.scoreUpdated;

export default gameScoresSlice.reducer;