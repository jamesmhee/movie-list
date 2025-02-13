import { ApiClient } from '@/utils/ApiClient'

export interface TrailerResponse {
    id: number
    results: Result[]
}

export interface Result {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

export const GetTrailer = async (movie_id: number) => {
    try {
        const response = await ApiClient.get<TrailerResponse>(
            `movie/${movie_id}/videos?language=en-US`,
        )
        const filterTrailer = response?.data?.results?.find((elm) => elm.type === 'Trailer')
        return filterTrailer || null
    } catch (error) {
        throw error
    }
}
