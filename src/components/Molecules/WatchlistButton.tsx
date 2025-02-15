import { MdFavorite } from 'react-icons/md'
import Button from '../Atoms/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { openModal } from '@/redux/slice/modalSlice'
import Watchlist from './Watchlist'

const WatchlistButton = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleWatchlist = () => {
        dispatch(
            openModal({
                type: 'element',
                props: {
                    element: <Watchlist />,
                },
            }),
        )
    }
    return (
        <Button
            onClick={handleWatchlist}
            className="fixed bottom-3 btn-circle btn-error right-3 z-[999]"
        >
            <MdFavorite className="text-white text-2xl hover:text-rose-600 transition-colors duration-300" />
        </Button>
    )
}
export default WatchlistButton
