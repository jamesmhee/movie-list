import { Trailer } from '@/types/ModalMovie'
import { ApiClient } from '@/utils/ApiClient'

export interface TrailerResponse {
    id: number
    results: Trailer[]
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
