'use client'
import Button from '@/components/Atoms/Button'
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
