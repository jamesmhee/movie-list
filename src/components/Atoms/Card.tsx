import { config } from '@/utils/config'
import Image from 'next/image'

const Card = ({ onClick, item }: { onClick: () => void; item: any }) => {
    return (
        <div onClick={onClick} className="flex flex-col cursor-pointer">
            <Image
                className="flex-2 rounded-md"
                priority
                style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '220px',
                    objectFit: 'fill',
                }}
                src={`${config.url.img + item?.poster_path}`}
                width={500}
                height={500}
                alt={item?.title}
            />
            <p className="text-center flex-1">{item?.title}</p>
        </div>
    )
}
export default Card
