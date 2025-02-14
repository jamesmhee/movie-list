const Badge = ({ className, text }: { className?: string; text: string }) => {
    return <div className={`badge ${className}`}>{text}</div>
}
export default Badge
