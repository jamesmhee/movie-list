import { createContext, SetStateAction, useContext, useMemo, useState } from 'react'

interface ViewContextProps {
    view: 'grid' | 'table'
    setView: React.Dispatch<SetStateAction<'grid' | 'table'>>
    isFromWatchlist: boolean
    setIsFromWatchlist: React.Dispatch<SetStateAction<boolean>>
}

export const CreateViewContext = createContext<ViewContextProps>({} as ViewContextProps)

export const ViewProvider = ({ children }: { children: React.JSX.Element }) => {
    const [view, setView] = useState<'grid' | 'table'>('table')
    const [isFromWatchlist, setIsFromWatchlist] = useState(false)
    return (
        <CreateViewContext
            value={{
                view,
                setView,
                isFromWatchlist,
                setIsFromWatchlist,
            }}
        >
            {children}
        </CreateViewContext>
    )
}

export const useView = () => {
    const context = useContext(CreateViewContext)
    return context
}
