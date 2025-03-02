import { Result } from '@/types/ModalMovie'
import { config } from '@/utils/config'
import Image from 'next/image'

const Card = ({ onClick, item }: { onClick: () => void; item: any }) => {
    const imgSrc = item.toString().includes('ADD')
        ? item?.poster_path
        : config?.url?.img + (item?.poster_path || item?.backdrop_path)
    return (
        <div onClick={onClick} className="flex flex-col cursor-pointer">
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
                alt={item?.title}
            />
            <p className="text-center flex-1">{item?.title}</p>
        </div>
    )
}
export default Card
