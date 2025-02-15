interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset' | undefined
    icon?: React.JSX.Element
    children: string | React.JSX.Element
    onClick?: () => void
    className?: string
}

const Button = ({ type = 'button', icon, children, onClick, className }: ButtonProps) => {
    return (
        <button onClick={onClick} type={type} className={'btn ' + className}>
            {icon && icon}
            {children}
        </button>
    )
}
export default Button
