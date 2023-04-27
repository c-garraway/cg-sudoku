import { configureStore } from '@reduxjs/toolkit';
import gameDataReducer from '../features/gameData/gameDataSlice'
import gameMovesReducer from '../features/gameData/gameMovesSlice';

export const store = configureStore({
  reducer: {
    gameData: gameDataReducer,
    gameMoves: gameMovesReducer
  },
});
