import { createSlice } from "@reduxjs/toolkit";


const initialState = () => {
    return {
        moves: [],
        hasMoves: false
    }
};

const gameMovesSlice = createSlice({
    name: 'gameMoves',
    initialState: initialState(),
    reducers: {
        resetGameMoves: () => initialState(),
        addGameMove: (state, action) => {
            state.moves.push(action.payload)
            if(state.hasMoves === false) {
                state.hasMoves = true
            }
        },
        deleteLastGameMove: (state, action) => {
            if(state.moves.length > 0) {
                state.moves.pop(action.payload)
                if(state.moves.length === 0) {
                    state.hasMoves = false
                }
            }
        },
    }
});

export const {resetGameMoves, addGameMove, deleteLastGameMove} = gameMovesSlice.actions;
export const selectGameMoves = (state) => state.gameMoves.moves;
export const selectHasMoves = (state) => state.gameMoves.hasMoves;
export const selectLastGameMove = (state) => {
    const moves = state.gameMoves.moves
    //console.log(moves)
    if(moves.length > 0) {
        const lastMove = moves.slice(-1)[0]
        //console.log(lastMove)
        return lastMove
    } else {
        return null
    }
    
};

export default gameMovesSlice.reducer;
