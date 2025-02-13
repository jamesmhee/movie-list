interface ButtonProps {
    children: string | React.JSX.Element
    onClick?: () => void
    className?: string
}

const Button = ({ children, onClick, className }: ButtonProps) => {
    return (
        <button onClick={onClick} type="button" className={'btn ' + className}>
            {children}
        </button>
    )
}
export default Button
