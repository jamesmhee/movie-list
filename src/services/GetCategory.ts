import { ApiClient } from '@/utils/ApiClient'

export interface CategoryProps {
    id: number
    name: string
}

interface CategoryResponse {
    genres: CategoryProps[]
}

export const GetCategory = async () => {
    try {
        const response = await ApiClient.get<CategoryResponse>('/genre/movie/list')
        return response?.data
    } catch (error) {
        throw error
    }
}
