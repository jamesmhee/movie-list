import { GetMovieList } from '@/services/GetMovieList'
import { useQuery } from '@tanstack/react-query'

export const UseMovie = (id: number) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['movieslist', id],
        queryFn: async () => {
            const response = await GetMovieList(id)
            return response?.data
        },
        refetchOnWindowFocus: false,
        retry: 0,
        enabled: true,
    })

    return { data, isLoading, error, isError }
}
