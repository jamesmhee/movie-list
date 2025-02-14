import { DetailShort } from '@/types/ModalMovie'
import { ApiClient } from '@/utils/ApiClient'

interface MovieListResponse {
    page: number
    results: DetailShort[]
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
