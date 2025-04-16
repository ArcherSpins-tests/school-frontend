import clsx from 'classnames'

interface InputProps {
  value?: string
  name?: string
  className?: string
  fieldClassName?: string
  lefftAddons?: React.ReactNode
  onChange?: (val: string) => void
}

export const Input = ({
  name,
  onChange,
  lefftAddons,
  fieldClassName,
  className,
  value,
}: InputProps) => {
  return (
    <div className={clsx('relative', fieldClassName)}>
      {lefftAddons ? <div className="absolute top-2 left-1">{lefftAddons}</div> : null}
      <input
        className={clsx(
          'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
          lefftAddons ? 'pl-8' : '',
          className
        )}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
