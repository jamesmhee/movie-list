'use client'
import './globals.css'
import { Provider } from 'react-redux'
import { persistor, store } from '@/redux/store/store'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Organisms/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient()

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>            
        <head>
            <title>NETF*CK</title>            
        </head>
            <body className={`antialiased scroll-smooth`}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                        <Navbar />
                        <Provider store={store}>
                            <PersistGate loading={null} persistor={persistor}>
                                {children}
                            </PersistGate>
                        </Provider>                        
                    </ThemeProvider>
                </QueryClientProvider>
            </body>
        </html>
    )
}
