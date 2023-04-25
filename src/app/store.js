import { configureStore } from '@reduxjs/toolkit';
import gameDataReducer from '../features/gameData/gameDataSlice'
import gameErrorsReducer from '../features/gameData/gameErrorsSlice';

export const store = configureStore({
  reducer: {
    gameData: gameDataReducer,
    gameErrors: gameErrorsReducer
  },
});
