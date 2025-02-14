interface SelectProps {
    placeholder: string
    items: {
        name: string
        value: string
    }[]
    onChange?: (e: any) => void
    className?: string
}
const Select = ({ placeholder, items, onChange, className }: SelectProps) => {
    return (
        <select onChange={onChange} defaultValue={placeholder} className={`select ${className}`}>
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
