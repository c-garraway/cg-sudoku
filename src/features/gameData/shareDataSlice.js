import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        shareModalOpen: false,
        shareModalMessage: ''
    }
};

const ShareDataSlice = createSlice({
    name: 'shareModal',
    initialState: initialState(),
    reducers: {
        resetShareModalOpen: () => initialState(),
        updateShareModalOpen: (state, action) => {
            state.shareModalOpen = action.payload
        },
        updateShareModalMessage: (state, action) => {
            state.shareModalMessage = action.payload
        }
    }
});

export const {resetShareModalOpen, updateShareModalOpen, updateShareModalMessage} = ShareDataSlice.actions;
export const selectShareModalOpen = (state) => state.shareModal.shareModalOpen;
export const selectShareModalMessage = (state) => state.shareModal.shareModalMessage;

export default ShareDataSlice.reducer;
