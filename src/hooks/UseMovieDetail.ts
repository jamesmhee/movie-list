import { GetMovieDetail } from '@/services/GetMovieDetail'
import { ApiClient } from '@/utils/ApiClient'
import { useQuery } from '@tanstack/react-query'

export const UseMovieDetail = (movie_id: number) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [movie_id],
        queryFn: async () => {
            const response = await GetMovieDetail(movie_id)
            return response
        },
    })

    return { data, isLoading, isError, error }
}
