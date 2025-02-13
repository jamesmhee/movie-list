import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import modalSlice from '@/redux/slice/modalSlice'
import movieSlice from '@/redux/slice/movieSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['movie'],
}

const rootReducer = combineReducers({
    modal: modalSlice,
    movie: movieSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NEXT_PUBLIC_ENV === 'dev',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
