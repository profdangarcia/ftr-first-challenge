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

  const getSizeClasses = () => {
    if (size === 'sm') {
      return 'px-2 py-2 text-sm font-semibold bg-gray-200 text-gray-500 border border-transparent hover:border-blue-base focus:ring-blue-base disabled:opacity-50 disabled:hover:border-transparent'
    }
    if (size === 'md') {
      return 'px-4 py-2 text-md'
    }
    return 'px-6 py-3 text-lg'
  }

  const sizeClasses = getSizeClasses()

  // Para botão 'sm', não aplica variant classes pois tem estilo próprio
  const variantState =
    size === 'sm'
      ? ''
      : disabled
        ? variantClasses[variant].disabled
        : variantClasses[variant].default

  const classes = `${baseClasses} ${sizeClasses} ${variantState} ${className}`

  return (
    <button className={classes} disabled={disabled} {...props}>
      {Icon && (
        <Icon
          size={size === 'sm' ? 16 : size === 'md' ? 18 : 20}
          className={size === 'sm' ? 'text-gray-500' : ''}
        />
      )}
      {children}
    </button>
  )
}
