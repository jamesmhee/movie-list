import { config } from '@/utils/config'
import Image from 'next/image'
import Skelton from '../Atoms/Skelton'
import Video from '../Atoms/Video'
import Button from '../Atoms/Button'
import { useState } from 'react'
import { FaPlay, FaCheck } from 'react-icons/fa6'
import { PiStarFill } from 'react-icons/pi'
import Badge from '../Atoms/Badge'
import Card from '../Atoms/Card'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store/store'
import { openModal, updateModal } from '@/redux/slice/modalSlice'
import { UseMovieDetails } from '@/hooks/UseMovieDetails'
import { addWatchList, removeWatchList } from '@/redux/slice/movieSlice'
import { useView } from '@/context/ViewContext'
import { IoCaretBackOutline } from 'react-icons/io5'
import Watchlist from './Watchlist'
import { ModalMovieData } from '@/types/ModalMovie'

interface ModalMovieProps {
    data: ModalMovieData | null
    isLoading: boolean
    isCustom?: boolean
}
const ModalMovie = ({ data, isLoading, isCustom }: ModalMovieProps) => {
    const [isTrailer, setIsTrailer] = useState(false)
    const [isActMore, setIsActMore] = useState(false)
    const { mutateAsync } = UseMovieDetails()
    const { isFromWatchlist } = useView()
    const imgSrc = isCustom
        ? data?.detail?.backdrop_path!
        : config.url.img! + (data?.detail?.backdrop_path || data?.detail?.poster_path)
    const dispatch = useDispatch<AppDispatch>()
    const { watchList } = useSelector((state: RootState) => state.movie)

    const actors = isCustom
        ? data?.actors?.map((item) => item?.name).join(', ')
        : data?.actors
              ?.filter((item) => item?.known_for_department === 'Acting')
              .map((item) => item?.name)
              .join(', ')

    const formatDuration = (minutes: number) => {
        return Math.floor(minutes / 60) <= 0
            ? (minutes % 60) + ' นาที'
            : Math.floor(minutes / 60) + ' ชั่วโมง ' + (minutes % 60) + ' นาที'
    }

    const handleSimilar = async (movie_id: number) => {
        if (isCustom) return

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

    const addWatchlist = () => {
        if (data?.detail) {
            dispatch(
                addWatchList({
                    movie: data?.detail,
                }),
            )
        }
    }

    const removeWatchlist = () => {
        if (data?.detail) {
            dispatch(
                removeWatchList({
                    movie: data?.detail,
                }),
            )
        }
    }

    const backtoWatchlist = () => {
        dispatch(
            updateModal({
                props: {
                    element: <Watchlist />,
                },
            }),
        )
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 justify-center">
                <Skelton height={''} className="h-[300px] md:h-[400px]" width={'100%'}></Skelton>
                <div className="flex">
                    <div className="hidden md:flex flex-1 gap-2">
                        <Skelton height={'30px'} width={'35%'}></Skelton>
                        <Skelton height={'30px'} width={'35%'}></Skelton>
                    </div>
                    <div className="flex-2 flex gap-2 flex-col">
                        <Skelton height={'120px'} width={'100%'}></Skelton>
                    </div>
                </div>
                <div className="flex-1">
                    <Skelton height={'300px'} width={'100%'}></Skelton>
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="relative">
                {isTrailer ? (
                    <div className="z-20">
                        <Video id={data?.trailer?.key as string} />
                    </div>
                ) : (
                    <>
                        <Image
                            priority
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '400px',
                                objectFit: 'cover',
                            }}
                            src={imgSrc}
                            width={500}
                            height={500}
                            alt={data?.detail?.title as string}
                        />
                    </>
                )}
                {!isTrailer && (
                    <>
                        <div className="absolute bottom-0 left-0 p-5! w-full bg-gradient-to-t from-black from-10% to-transparent to-100%">
                            <h2 className="text-2xl md:text-3xl text-zinc-100 font-semibold ">
                                {data?.detail?.title} ({data?.detail?.release_date?.split('-')[0]})
                            </h2>
                            <div className="text-zinc-100 font-semibold inline-flex items-center gap-2">
                                <PiStarFill /> {data?.detail?.vote_average?.toFixed(2)} / 10
                            </div>
                            <p className="font-semibold text-zinc-100">
                                {formatDuration(data?.detail?.runtime as number)}
                            </p>
                        </div>
                        {watchList?.find((e) => e.id === data?.detail?.id) ? (
                            <>
                                <Button
                                    icon={<FaCheck />}
                                    onClick={removeWatchlist}
                                    className="absolute bottom-3 right-3 p-1!"
                                >
                                    Watchlisted
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={addWatchlist}
                                className="absolute bottom-3 right-3 p-1!"
                            >
                                + Watchlist
                            </Button>
                        )}
                        {isFromWatchlist && (
                            <Button
                                onClick={backtoWatchlist}
                                className="absolute btn-circle z-[999] p-2! top-6 left-3"
                            >
                                <IoCaretBackOutline className="text-lg" />
                            </Button>
                        )}
                        {data?.trailer?.key && (
                            <Button
                                onClick={() => setIsTrailer(true)}
                                className="absolute z-[999] top-[33%] p-5! md:top-44 left-[44%] md:left-[46.5%]"
                            >
                                <FaPlay />
                            </Button>
                        )}
                    </>
                )}
            </div>
            <div className="w-full p-3! flex flex-col gap-3">
                <div className="flex md:flex-row flex-col gap-2">
                    <div className="flex-1 flex gap-x-2 h-max gap-y-2 flex-wrap">
                        {isCustom && <Badge className='badge-neutral p-2!' text="Custom Movie"/>}
                        {data?.detail?.genres?.map((genre, index) => (
                            <span key={genre?.name}>
                                <Badge className={'badge-neutral p-2!'} text={genre?.name} />
                            </span>
                        ))}
                    </div>
                    <div className="flex-2">
                        <p className="leading-6 whitespace-pre-line">{data?.detail?.overview}</p>
                    </div>
                </div>
                <div className="space-x-2!">
                    <p className="font-semibold text-zinc-400 text-lg">Actor</p>
                    <p
                        className={`leading-6 whitespace-pre-line ${isActMore ? 'h-full' : 'max-h-12'} overflow-y-hidden`}
                    >
                        {actors}
                    </p>
                    {actors && actors?.length > 210 && (
                        <Button
                            onClick={() => setIsActMore(!isActMore)}
                            className="h-min btn-link btn-accent"
                        >
                            {isActMore ? 'hide' : 'more'}
                        </Button>
                    )}
                </div>
                {
                    !isCustom && 
                    <div className="space-x-2!">
                        <p className="font-semibold text-zinc-400 text-lg">Related Movies</p>
                        <div className="grid grid-flow-col auto-cols-[200px] auto-rows-max gap-2 overflow-auto">
                            {data?.similar?.results?.map((item, index) => (
                                <Card
                                    key={item?.id}
                                    onClick={() => handleSimilar(item?.id)}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>
                }
                
            </div>
        </div>
    )
}
export default ModalMovie
