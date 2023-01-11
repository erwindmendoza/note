import { createStore } from 'redux';
import notesReducer from './noteReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, notesReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);