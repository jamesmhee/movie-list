interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    placeholder: string
    items: {
        name: string | number
        value: string | number
    }[]
    onChange?: (e: any) => void
    className?: string
}

const Select = ({ placeholder, items, onChange, className, ...props }: SelectProps) => {
    return (
        <select {...props} onChange={onChange} className={`select ${className}`}>
            <option disabled={true}>{placeholder}</option>
            {items?.map((item, index) => (
                <option key={index} value={item?.value}>
                    {item?.name}
                </option>
            ))}
        </select>
    )
}
export default Select
