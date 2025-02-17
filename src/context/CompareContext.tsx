import { createContext, SetStateAction, useContext, useState } from 'react'

interface CompareContextProps {
    compare: {
        id: number
    }[]
    setCompare: React.Dispatch<SetStateAction<{ id: number }[]>>
}

export const CompareContext = createContext<CompareContextProps>({} as CompareContextProps)

export const CompareContextProvider = ({ children }: { children: React.JSX.Element }) => {
    const [compare, setCompare] = useState<{ id: number }[]>([])

    return (
        <CompareContext
            value={{
                compare,
                setCompare,
            }}
        >
            {children}
        </CompareContext>
    )
}

export const UseCompare = () => {
    const context = useContext(CompareContext)
    return context
}
