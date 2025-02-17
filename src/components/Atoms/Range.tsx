const Range = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="w-full max-w-xs">
            <input {...props} type="range" min={0} max="10" className="range" step="0.01" />
            <div className="flex justify-between px-2.5 mt-2 text-xs">
                {Array.from({ length: 10 }).map((_, index) => (
                    <span key={index}>|</span>
                ))}
            </div>
            <div className="flex justify-between px-2.5 mt-2 text-xs">
                {Array.from({ length: 10 }).map((_, index) => (
                    <span key={index}>{index}</span>
                ))}
            </div>
        </div>
    )
}
export default Range
