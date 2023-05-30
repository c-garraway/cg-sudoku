import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import gameDataReducer from '../features/gameData/gameDataSlice'
import gameMovesReducer from '../features/gameData/gameMovesSlice';
import gameMessageReducer from '../features/gameData/gameMessageSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    gameData: gameDataReducer,
    gameMoves: gameMovesReducer,
    gameMessage: gameMessageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)
//persistor.purge();

