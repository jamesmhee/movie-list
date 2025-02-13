import { GetCategory } from '@/services/GetCategory'
import { useQuery } from '@tanstack/react-query'

export const UseCategory = (active: boolean) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const response = await GetCategory()
            return response
        },
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        enabled: active,
    })

    return { data, isLoading, isError, error }
}
