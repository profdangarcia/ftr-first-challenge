import { ButtonHTMLAttributes, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: {
      default:
        'bg-blue-base text-white hover:bg-blue-dark focus:ring-blue-base',
      disabled: 'bg-blue-base/50 text-white cursor-not-allowed',
    },
    secondary: {
      default:
        'bg-white border text-gray-400 border-gray-300 hover:border-blue-base hover:text-blue-base focus:ring-blue-base',
      disabled: 'bg-white border-gray-300 text-gray-300 cursor-not-allowed',
    },
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
  }

  const variantState = disabled
    ? variantClasses[variant].disabled
    : variantClasses[variant].default

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantState} ${className}`

  return (
    <button className={classes} disabled={disabled} {...props}>
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} />}
      {children}
    </button>
  )
}
