interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder: string
    name: string    
    className?: string    
}

const InputField = ({
    type,
    placeholder,
    name,         
    className,
    ...props
}: InputFieldProps) => {
  return (
    <input {...props} type={type} placeholder={placeholder} name={name} id={name} className={`${className} input`} />
  )
};
export default InputField;
