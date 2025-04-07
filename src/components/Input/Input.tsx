import clsx from 'classnames'

interface InputProps {
  value?: string
  name?: string
  className?: string
  fieldClassName?: string
  lefftAddons?: React.ReactNode
}

export const Input = ({ name, lefftAddons, fieldClassName, className, value }: InputProps) => {
  return (
    <div className={clsx('relative', fieldClassName)}>
      {lefftAddons ? <div className="absolute top-1 left-1">{lefftAddons}</div> : null}
      <input
        className={clsx('rounded-md border border-gray-300 px-2 py-[5px]', className)}
        name={name}
        value={value}
      />
    </div>
  )
}
