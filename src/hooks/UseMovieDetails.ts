import { GetCredits } from '@/services/GetCredits'
import { GetMovieDetail } from '@/services/GetMovieDetail'
import { GetSimilar } from '@/services/GetSimilar'
import { GetTrailer } from '@/services/GetTrailer'
import { useMutation, useQuery } from '@tanstack/react-query'

export const UseMovieDetails = () => {
    const { mutateAsync, data, isPending, error, isError, isSuccess } = useMutation({
        mutationKey: ['details'],
        mutationFn: async (movie_id: number) => {
            const actors = await GetCredits(movie_id)
            const trailer = await GetTrailer(movie_id)
            const detail = await GetMovieDetail(movie_id)            
            const similar = await GetSimilar(movie_id)
            return { actors, trailer, detail, similar }
        },
    })
    return { mutateAsync, data, isPending, error, isError, isSuccess }
}