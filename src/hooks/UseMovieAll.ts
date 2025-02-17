import { GetMovieAll } from '@/services/GetMovieAll'
import { useQuery } from '@tanstack/react-query'

export interface UseMovieAllProps {
    options: {
        pageSize: number
        pageIndex: number
        searchValue: {
            genre: number | null
            year: string
            rating?: number
        }
    }
}

export const UseMovieAll = ({ options }: UseMovieAllProps) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [options.pageIndex, options.searchValue],
        queryFn: async () => {
            const movieData = await GetMovieAll({ options })
            return movieData
        },
        retry: 1,
    })

    return { data, isLoading, isError, error }
}
