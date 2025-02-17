import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartProps {
    options: {
        responsive: boolean
        plugins: {
            legend: {
                position: 'center' | 'left' | 'top' | 'right' | 'bottom' | 'chartArea'
            }
            title: {
                display: boolean
                text: string
            }
        }
    }
    data: any
}

const Chart = ({ options, data }: ChartProps) => {    
    return <Bar options={options} data={data} />
}

export default Chart
