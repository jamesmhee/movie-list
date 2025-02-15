'use client'
import './globals.css'
import { Provider } from 'react-redux'
import { persistor, store } from '@/redux/store/store'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Organisms/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'
import Modal from '@/components/Molecules/Modal'
import { ViewProvider } from '@/context/ViewContext'

const queryClient = new QueryClient()

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>NETFLICK</title>
            </head>
            <body className={`antialiased scroll-smooth`}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider>                        
                        <Navbar />
                        <Provider store={store}>
                            <ViewProvider>
                                <PersistGate loading={null} persistor={persistor}>
                                <Modal />
                                    {children}
                                </PersistGate>
                            </ViewProvider>
                        </Provider>
                    </ThemeProvider>
                </QueryClientProvider>
            </body>
        </html>
    )
}
