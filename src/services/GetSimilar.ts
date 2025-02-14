import { Similar } from '@/types/ModalMovie'
import { ApiClient } from '@/utils/ApiClient'

export const GetSimilar = async (movie_id: number) => {
    try {
        const response = await ApiClient.get<Similar>(`movie/${movie_id}/similar`)
        return response?.data
    } catch (error) {
        throw error
    }
}
