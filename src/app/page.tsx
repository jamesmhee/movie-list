'use client'
import Head from 'next/head'
import RenderType from '@/components/Organisms/RenderType'
import { ViewProvider } from '@/context/ViewContext'

const Home = () => {
    return (
        <ViewProvider>
            <div>            
                <RenderType />
            </div>
        </ViewProvider>
    )
}
export default Home
