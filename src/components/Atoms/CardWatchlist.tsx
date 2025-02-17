import { UseMovieDetail } from '@/hooks/UseMovieDetail'
import { config } from '@/utils/config'
import Image from 'next/image'
import Skelton from './Skelton'

const CardWatchlist = ({ onClick, item }: { onClick: () => void; item: any }) => {
    const { data, isLoading } = UseMovieDetail(item)
    const isCustom = item.toString().includes('ADD')
    const imgSrc = isCustom
        ? item?.poster_path
        : data
          ? config?.url?.img + (data?.poster_path || data?.backdrop_path)
          : ''

    return (
        <div onClick={onClick} className="flex flex-col cursor-pointer">
            {isLoading ? (
                <Skelton height="220" width="50" />
            ) : (
                <>
                    <Image
                        className="flex-2 rounded-md"
                        priority
                        style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '220px',
                            objectFit: 'fill',
                        }}
                        src={imgSrc}
                        width={500}
                        height={500}
                        alt={isCustom ? item?.title : data?.title}
                    />
                    <p className="text-center flex-1">{isCustom ? item?.title : data?.title}</p>
                </>
            )}
        </div>
    )
}
export default CardWatchlist
