import { CategoryProps } from '@/services/GetCategory'
import { MovieResult } from '@/services/GetMovieList'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MovieState {
    category: CategoryProps[]
    movieList: MovieResult[]
}

const initialState: MovieState = {
    category: [],
    movieList: [],
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
        setMovieList: (state, action: PayloadAction<{ movieList: MovieResult[] }>) => {
            state.movieList = action.payload.movieList
        },
        clearMovieList: (state) => {
            state.movieList = []
        },
    },
})

export const { setCategory, clearCategory, setMovieList, clearMovieList } = movieSlice.actions
export default movieSlice.reducer
