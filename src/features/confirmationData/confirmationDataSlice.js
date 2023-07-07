
import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return {
        modalOpen: false,
        modalForComponent: ['', 0],
        modalResponse: false
    }
};

const confirmationModalSlice = createSlice({
    name: 'confirmationModal',
    initialState: initialState(),
    reducers: {
        resetConfirmationModal: () => initialState(),
        updateModalOpen: (state, action) => {
            state.modalOpen = action.payload
        },
        updateModalForComponent: (state, action) => {
            state.modalForComponent = action.payload
        },
        updateModalResponse: (state, action) => {
            state.modalResponse = action.payload
        }

    }
});

export const {resetConfirmationModal, updateModalOpen, updateModalForComponent, updateModalResponse} = confirmationModalSlice.actions;
export const selectModelOpen = (state) => state.confirmationModal.modalOpen;
export const selectModalForComponent = (state) => state.confirmationModal.modalForComponent;
export const selectModalResponse = (state) => state.confirmationModal.modalResponse;

export default confirmationModalSlice.reducer;