import { CategoryProps } from '@/services/GetCategory'
import { AddMovie, Detail, DetailShort } from '@/types/ModalMovie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MovieState {
    category: CategoryProps[]
    movieList: DetailShort[]
    watchList: Detail[]
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
        addWatchList: (state, action: PayloadAction<{ movie: Detail }>) => {
            if (!Array.isArray(state.watchList)) {
                state.watchList = []
            }
            if (state.watchList.find((e) => e.id === action.payload.movie.id)) {
                return
            }

            state.watchList.push(action.payload.movie)
        },
        removeWatchList: (state, action: PayloadAction<{ movie: Detail }>) => {
            state.watchList = state.watchList.filter((item) => item.id !== action.payload.movie.id)
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
