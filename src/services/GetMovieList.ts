import { RootState } from '@/redux/store/store'
import { ApiClient } from '@/utils/ApiClient'
import { useSelector } from 'react-redux'

export interface MovieResult {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface MovieListResponse {
    page: number
    results: MovieResult[]
    total_pages: number
    total_results: number
}

export const GetMovieList = async (id: number) => {
    try {
        return await ApiClient.get<MovieListResponse>(
            `discover/movie?with_genres=${id}&language=en-US&page=1&sort_by=popularity.desc`,
        )
    } catch (error) {
        throw error
    }
}
