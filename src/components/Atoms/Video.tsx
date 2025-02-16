interface Props {}
const Video = ({ id }: { id: string }) => {
    return (
        <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=0&loop=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
    )
}
export default Video
