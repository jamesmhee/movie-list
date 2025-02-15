import { UseMovie } from '@/hooks/UseMovie'
import LoadingPoster from './LoadingPoster'
import Item from './Item'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const Gridview = ({ id, name }: { id: number | string; name: string }) => {    
    const { movieList } = useSelector((state: RootState)=>state.movie)
    const { data, isLoading, isError, error } = UseMovie(+id)
    if (isLoading) {
        return (
            <div className="py-16!">
                <LoadingPoster />
            </div>
        )
    }

    return (
        <>
            <h2 className="text-2xl mb-1! font-semibold">{name}</h2>
            <div className="w-full mx-auto px-4 overflow-x-scroll">
                <div className="grid grid-flow-col auto-cols-[300px] gap-6 mx-5! h-full">
                    {
                        ['ADD'].includes(id.toString()) &&
                        movieList?.map((custom, index)=>(
                            <div key={index}>
                                <Item detail={custom}/>
                            </div>
                        ))
                    }
                    {Array.isArray(data?.results) &&
                        data?.results &&
                        data?.results?.map((item, index) => (
                            <div key={index}>
                                <Item detail={item} />
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}
export default Gridview
