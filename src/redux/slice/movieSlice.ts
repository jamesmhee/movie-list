import { CategoryProps } from '@/services/GetCategory'
import { AddMovie, Detail, DetailShort, TableDetail } from '@/types/ModalMovie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MovieState {
    category: CategoryProps[]
    movieList: DetailShort[]
    watchList: (number | string)[]
}

const initialState: MovieState = {
    category: [],
    movieList: [],
    watchList: [],
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<{ category: CategoryProps[] }>) => {
            state.category = action.payload.category
        },
        clearCategory: (state) => {
            state.category = []
        },
        setMovieList: (state, action: PayloadAction<{ movieList: DetailShort[] }>) => {
            state.movieList = action.payload.movieList
        },
        addMovieList: (state, action: PayloadAction<{ movie: AddMovie }>) => {
            state.movieList.push(action.payload.movie)
        },
        clearMovieList: (state) => {
            state.movieList = []
        },
        addWatchList: (state, action: PayloadAction<{ movieId: string | number }>) => {
            if (!Array.isArray(state.watchList)) {
                state.watchList = []
            }
            if (state.watchList.find((e) => e === action.payload.movieId)) {
                return
            }

            state.watchList.push(action.payload.movieId)
        },
        removeWatchList: (state, action: PayloadAction<{ movieId: string | number }>) => {
            state.watchList = state.watchList.filter((item) => item !== action.payload.movieId)
        },
    },
})

export const {
    setCategory,
    clearCategory,
    setMovieList,
    addMovieList,
    clearMovieList,
    addWatchList,
    removeWatchList,
} = movieSlice.actions
export default movieSlice.reducer
