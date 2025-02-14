const Skelton = ({
    className,
    height,
    width,
}: {
    className?: string
    height: string
    width: string
}) => {
    return (
        <div
            style={{ height: `${height}`, width: `${width}` }}
            className={`${className} skeleton`}
        ></div>
    )
}
export default Skelton
