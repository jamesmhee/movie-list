import axios from 'axios'
import { AxiosResponse } from 'axios'

export const ApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_READ_KEY,
        accept: 'application/json',
    },
})

ApiClient.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    },
)

ApiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status >= 400) {
            const customError = new Error(error.response?.data?.message || 'Something went wrong')
            ;(customError as any).status = error.response?.status
            ;(customError as any).data = error.response?.data
            throw customError
        }
        return Promise.reject(error)
    },
)
