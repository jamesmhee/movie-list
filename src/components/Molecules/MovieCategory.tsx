interface Props {}
const MovieCategory = (props: Props) => {
    return (
        <div className="w-full mx-auto px-4 overflow-y-scroll">
            <div className="grid grid-flow-col auto-cols-[320px] gap-6">
                {movieList?.map((item, index) => (
                    <div key={index}>
                        <Item detail={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MovieCategory
