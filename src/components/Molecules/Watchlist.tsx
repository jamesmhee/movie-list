import { AppDispatch, RootState } from '@/redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Atoms/Card'
import { openModal, updateModal } from '@/redux/slice/modalSlice'
import ModalMovie from './ModalMovie'
import { UseMovieDetails } from '@/hooks/UseMovieDetails'
import { useView } from '@/context/ViewContext'

const Watchlist = () => {
    const { mutateAsync } = UseMovieDetails()
    const dispatch = useDispatch<AppDispatch>()
    const { watchList } = useSelector((state: RootState) => state.movie)
    const { setIsFromWatchlist } = useView()
    const handleSimilar = async (movie_id: number) => {
        setIsFromWatchlist(true)
        dispatch(
            openModal({
                type: 'element',
                props: {
                    element: <ModalMovie data={null} isLoading={true} />,
                },
            }),
        )
        try {
            const movieDetails = await mutateAsync(movie_id)
            const movieData = movieDetails
            dispatch(
                updateModal({
                    props: {
                        element: <ModalMovie data={movieData} isLoading={false} />,
                    },
                }),
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto">
            <div className="p-5!">
                <h2 className="text-2xl">Your Watchlist</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row auto-cols-[300px] p-5! gap-3 overflow-auto">
                {Array.isArray(watchList) && watchList?.length > 0 ? (
                    <>
                        {watchList?.map((list, index) => (
                            <Card
                                key={list?.id}
                                onClick={() => handleSimilar(+list?.id)}
                                item={list}
                            />
                        ))}
                    </>
                ) : (
                    <>No Watchlist</>
                )}
            </div>
        </div>
    )
}
export default Watchlist
