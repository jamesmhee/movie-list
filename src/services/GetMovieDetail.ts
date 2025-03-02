import { Detail } from '@/types/ModalMovie'
import { ApiClient } from '@/utils/ApiClient'

export const GetMovieDetail = async (movie_id: number) => {
    try {
        const response = await ApiClient.get<Detail>(`movie/${movie_id}`)
        return response?.data
    } catch (error) {
        throw error
    }
}
