const Skelton = ({ height, width }: { height: string; width: string }) => {
    return <div style={{ height: `${height}`, width: `${width}` }} className="skeleton"></div>
}
export default Skelton
