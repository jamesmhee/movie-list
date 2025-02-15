'use client'
import { BsTable } from 'react-icons/bs'
import { IoGridOutline } from 'react-icons/io5'
import Gridview from '../Molecules/Gridview'
import CustomTable from '../Molecules/CustomTable'
import { useView } from '@/context/ViewContext'
import Tabs from '../Atoms/Tabs'
import { TabListProps } from '../Atoms/Tabs'
import { UseCategory } from '@/hooks/UseCategory'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store/store'
import { useEffect } from 'react'
import { setCategory } from '@/redux/slice/movieSlice'
import WatchlistButton from '../Molecules/WatchlistButton'

const TabList: TabListProps[] = [
    {
        name: 'grid',
        icon: <IoGridOutline />,
    },
    {
        name: 'table',
        icon: <BsTable />,
    },
]

const RenderType = () => {
    const { view } = useView()
    const dispatch = useDispatch<AppDispatch>()
    const { category } = useSelector((state: RootState) => state.movie)
    const { movieList } = useSelector((state: RootState) => state.movie)
    const { data } = UseCategory(category?.length <= 0)

    useEffect(() => {
        if (data) {
            dispatch(setCategory({ category: data?.genres }))
        }
    }, [data])

    return (
        <>            
            <div className="w-full flex justify-end pr-5! pt-3!">
                <Tabs tabList={TabList} />
            </div>
            <div className="w-full p-5!">
                <div className="border-2 border-zinc-100 dark:border-zinc-900 rounded-2xl h-full p-2!">
                    {view === 'grid' ? (
                        <>
                        {
                            (Array.isArray(movieList) && movieList?.length > 0) &&
                            <Gridview name="Custom" id={'ADD'} /> 
                        }
                        {
                            category?.map((elm, index) => (
                                <Gridview key={index} name={elm?.name} id={elm?.id} />
                            ))
                        }
                        </>
                    ) : (
                        <CustomTable />
                    )}
                </div>
            </div>
            <WatchlistButton />
        </>
    )
}
export default RenderType
