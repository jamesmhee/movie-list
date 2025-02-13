import { createContext, SetStateAction, useContext, useMemo, useState } from 'react'

interface ViewContextProps {
    view: 'grid' | 'table'
    setView: React.Dispatch<SetStateAction<'grid' | 'table'>>
}

export const CreateViewContext = createContext<ViewContextProps>({} as ViewContextProps)

export const ViewProvider = ({ children }: { children: React.JSX.Element }) => {
    const [view, setView] = useState<'grid' | 'table'>('grid')
    return (
        <CreateViewContext
            value={{
                view,
                setView,
            }}
        >
            {children}
        </CreateViewContext>
    )
}

export const useView = () => {
    const context = useContext(CreateViewContext)
    if (!context) {
        throw new Error('Context muse be inside provider')
    }
    return context
}
