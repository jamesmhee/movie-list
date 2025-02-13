const RootLayout = ({ children }: { children: React.JSX.Element }) => {
    return (
        <html data-theme="black" lang="en">
            <body className="">{children}</body>
        </html>
    )
}
export default RootLayout
