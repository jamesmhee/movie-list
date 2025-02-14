import { RootState } from '@/redux/store/store'
import { Detail } from '@/types/ModalMovie'
import { ApiClient } from '@/utils/ApiClient'
import { useSelector } from 'react-redux'

interface MovieListResponse {
    page: number
    results: Omit<Detail, "belongs_to_collection" | "budget" | "genres" | "homepage" | "imdb_id" | "origin_country" | "production_companies" | "production_countries" | "revenue" | "runtime" | "spoken_languages" | "status" | "tagline">
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
