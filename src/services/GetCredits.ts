import { ApiClient } from '@/utils/ApiClient'

export interface CreditsResponse {
    id: number
    cast: Cast[]
    crew: Crew[]
}

export interface Cast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface Crew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    credit_id: string
    department: string
    job: string
}

export const GetCredits = async (movie_id: number) => {
    try {
        const response = await ApiClient.get<CreditsResponse>(
            `movie/${movie_id}/credits?language=en-US`,
        )
        return response?.data?.cast
    } catch (error) {
        throw error
    }
}
