export const imageToBase64 = (file: File): Promise<string> => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
        ;(reader.onloadend = () => {
            resolve(reader.result as string)
        }),
            (reader.onerror = (error) => {
                reject(error)
            })
    })
}
