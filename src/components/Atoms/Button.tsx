interface ButtonProps {
    icon?: React.JSX.Element
    children: string | React.JSX.Element
    onClick?: () => void
    className?: string
}

const Button = ({ icon, children, onClick, className }: ButtonProps) => {
    return (
        <button onClick={onClick} type="button" className={'btn ' + className}>            
            {icon && icon}
            {children}
        </button>
    )
}
export default Button
