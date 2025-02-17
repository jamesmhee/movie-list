import { ApiClient } from '@/utils/ApiClient'
import { MovieListResponse } from './GetMovieList'
import { UseMovieAllProps } from '@/hooks/UseMovieAll'
import { Detail, Genre, Result } from '@/types/ModalMovie'

interface MovieAllResponse {
    page: number
    total_pages: number
    total_results: number
    results: Result[]
}

export const GetMovieAll = async ({ options }: UseMovieAllProps) => {
    const pageIndex = options?.pageIndex + 1
    const genre = options?.searchValue.genre
    const year = options?.searchValue.year
    const rating = options?.searchValue.rating === 0 ? null : options?.searchValue.rating
    try {
        const searchData = await ApiClient.get<MovieAllResponse>(
            `discover/movie?page=${pageIndex}&sort_by=popularity.desc&language=en-US`,
            {
                params: {
                    primary_release_year: year,
                    with_genres: genre,
                    'vote_average.lte': rating,
                },
            },
        )
        return searchData?.data
    } catch (error) {
        throw error
    }
}
