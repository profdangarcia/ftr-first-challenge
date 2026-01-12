import { ButtonHTMLAttributes } from 'react'
import { LucideIcon } from 'lucide-react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  'aria-label': string
}

export function IconButton({
  icon: Icon,
  className = '',
  ...props
}: IconButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2'

  const defaultClasses =
    'bg-gray-200 text-gray-500 hover:bg-white hover:border hover:border-blue-base'

  const classes = `${baseClasses} ${defaultClasses} ${className}`

  return (
    <button className={classes} {...props}>
      <Icon size={18} />
    </button>
  )
}
