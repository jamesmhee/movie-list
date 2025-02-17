export const yearOptions = () => {
    const min = 1899
    const date = new Date().getFullYear()
    const total = date - min
    return Array.from({ length: total }).map((_, index) => {
        return {
            name: date - index,
            value: date - index,
        }
    })
}


export const formatDuration = (minutes: number) => {
    return Math.floor(minutes / 60) <= 0
        ? (minutes % 60) + ' Minutes'
        : Math.floor(minutes / 60) + ' Hours ' + (minutes % 60) + ' Minutes'
}