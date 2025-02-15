import Image from 'next/image'
import { config } from '@/utils/config'
import Button from '../Atoms/Button'
import { MdExpandMore } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { openModal, updateModal } from '@/redux/slice/modalSlice'
import { UseMovieDetails } from '@/hooks/UseMovieDetails'
import ModalMovie from './ModalMovie'
import { useView } from '@/context/ViewContext'
import { DetailShort } from '@/types/ModalMovie'

interface ItemsProps {
    detail: DetailShort
}

const Item = ({ detail }: ItemsProps) => {    
    const { setIsFromWatchlist } = useView()
    const dispatch = useDispatch<AppDispatch>()
    const { mutateAsync } = UseMovieDetails()
    const imageSrc = detail?.id.toString().includes('ADD') ? detail?.poster_path : config?.url?.img! + detail?.poster_path    

    const handleModal = async () => {
        setIsFromWatchlist(false)
        dispatch(
            openModal({
                type: 'element',
                props: {
                    element: <ModalMovie data={null} isLoading={true} />,
                },
            }),
        )
        try {
            const movieDetails = await mutateAsync(+detail?.id!)
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
        <div
            onClick={handleModal}
            className="group hover:scale-110 hover:z-20 hover:delay-500 transition-transform ease-in-out duration-500 relative cursor-pointer w-full overflow-hidden"
        >
            <div className="hover:bg-white dark:hover:bg-zinc-800 hover:delay-500 transition-colors">
                <div className="w-auto h-[250px] overflow-hidden rounded">
                    <Image
                        priority
                        quality={100}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                            overflow: 'hidden',
                        }}
                        src={imageSrc}
                        width={500}
                        height={500}
                        alt={detail?.title!}
                    />
                </div>
                <div className="group-hover:h-full text-zinc-900 dark:text-zinc-100 p-3! flex justify-between w-full h-full top-0 left-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:delay-500 transition-opacity duration-500 ease-out">
                    <div className="bottom-4 left-4">
                        <h3 className="font-bold">{detail?.title}</h3>
                        <p className="text-sm">{detail?.release_date?.split('-')[0]}</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <Button className="btn-ghost btn-circle">
                            <MdExpandMore />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Item
