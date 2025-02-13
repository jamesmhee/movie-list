import Skelton from '../Atoms/Skelton'

const LoadingPoster = () => {
    return (
        <div className="flex flex-col gap-20">
            <div className="grid grid-rows-1 grid-flow-col-dense overflow-x-auto hide-scrollbar gap-20">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div className="flex-shrink-0" key={index}>
                        <Skelton height={'200px'} width={'300px'} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default LoadingPoster
