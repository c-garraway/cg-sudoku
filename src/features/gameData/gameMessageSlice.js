import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        messageBox: 'To start a new game select [new puzzle] below.',
    }
};

const gameMessageSlice = createSlice({
    name: 'gameMessage',
    initialState: initialState(),
    reducers: {
        resetMessageBox: () => initialState(),
        updateMessageBox: (state, action) => {
            state.messageBox = action.payload
        },
    }
});

export const {resetMessageBox, updateMessageBox} = gameMessageSlice.actions;
export const selectMessageBox = (state) => state.gameMessage.messageBox;

export default gameMessageSlice.reducer;
