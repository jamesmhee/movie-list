import { UseMovieDetails } from '@/hooks/UseMovieDetails'
import { Actor, Detail, Similar, Trailer } from '@/types/ModalMovie'
import { useEffect, useState } from 'react'
import Chart from './Chart'
import Skelton from '../Atoms/Skelton'
import { PiStarFill } from 'react-icons/pi'
import { formatDuration } from '@/utils/date'

export interface DataDetail {
    actors: Actor[]
    trailer: Trailer | null
    detail: Detail
    similar: Similar
}

interface ModalCompareProps {
    compare: any
}

const ModalCompare = ({ compare }: ModalCompareProps) => {
    const { mutateAsync } = UseMovieDetails()
    const [data, setData] = useState<DataDetail[]>([])

    const fetchCompareDetail = async () => {
        let format = []
        for (let i = 0; i < compare?.length; i++) {
            const detail = await mutateAsync(compare[i].id)
            format.push(detail)
        }
        setData(format)
    }

    useEffect(() => {
        if (compare?.length > 0) {
            fetchCompareDetail()
        }
    }, [])

    if (data?.length !== 2) {
        return (
            <div className='flex flex-col gap-2 p-5!'>                
                <h2 className="text-3xl my-3! font-semibold">Compare Movie</h2>
                <Skelton width='100%' height='400px'/>
                <div className='w-full flex gap-2'>
                    <Skelton width='100%' height='300px'/>
                    <Skelton width='100%' height='auto'/>
                </div>
            </div>
        )
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Movie Budget & Revnue Compare.',
            },
        },
    }

    const labels = ['Budget', 'Revnue']

    const chartData = {
        labels,
        datasets: [
            {
                label: data[0].detail.title,
                data: [                                        
                    data[0].detail.budget,
                    data[0].detail.revenue,                    
                ],
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: data[1].detail.title,
                data: [                    
                    data[1].detail.budget,
                    data[1].detail.revenue,                    
                ],
                backgroundColor: 'rgba(53, 162, 235, 1)',
            },
        ],
    }

    return (
        <div className="w-full flex flex-col gap-2 p-5!">
            <h2 className="text-3xl my-3! font-semibold">Compare Movie</h2>
            <Chart options={options} data={chartData} />
            <hr></hr>
            <div className='flex flex-col md:flex-row gap-2 w-full items-center'>
                {
                    data?.map((item, index)=>(
                        <div key={item?.detail.title} className='flex-auto w-full'>
                            <p className='text-xl font-semibold'>                                
                                {item?.detail?.title} ({item?.detail?.release_date.split('-')[0]})
                            </p>
                            <p className='inline-flex items-center gap-2'>
                                <PiStarFill className='text-xl text-yellow-400'/> 
                                <span>
                                    {item?.detail.vote_average.toFixed(2)}
                                </span>
                            </p>
                            <p>Duration: {formatDuration(item?.detail?.runtime)}</p>
                            <p>Total Actors: {item?.actors?.length}</p>
                        </div>
                    ))
                }
            </div>            
        </div>
    )
}
export default ModalCompare
