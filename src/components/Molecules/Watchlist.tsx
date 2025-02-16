import { AppDispatch, RootState } from '@/redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Atoms/Card'
import { openModal, updateModal } from '@/redux/slice/modalSlice'
import ModalMovie from './ModalMovie'
import { UseMovieDetails } from '@/hooks/UseMovieDetails'
import { useView } from '@/context/ViewContext'
import { AddMovie, Detail } from '@/types/ModalMovie'

const Watchlist = () => {
    const { mutateAsync } = UseMovieDetails()
    const dispatch = useDispatch<AppDispatch>()
    const { watchList, movieList } = useSelector((state: RootState) => state.movie)
    const { setIsFromWatchlist } = useView()
    const handleSimilar = async (movie_id: string) => {
        setIsFromWatchlist(true)

        const findCustom: AddMovie | null = movieList.find(e=>e?.id === movie_id) || null
        if(movie_id.toString().includes('ADD')){
            const formatDataForComponent = {
                detail: findCustom as Detail,
                actors: findCustom?.actors,
                trailer: undefined,
                similar: undefined,
            }
            dispatch(openModal({
                type: 'element',
                props: {
                    element: <ModalMovie data={formatDataForComponent} isLoading={false} isCustom/>
                }
            }))
            return
        }

        dispatch(
            openModal({
                type: 'element',
                props: {
                    element: <ModalMovie data={null} isLoading={true} />,
                },
            }),
        )
        try {
            const movieDetails = await mutateAsync(+movie_id)
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
                                onClick={() => handleSimilar(list?.id.toString())}
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
