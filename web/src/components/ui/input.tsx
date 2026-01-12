import { InputHTMLAttributes, forwardRef } from 'react'
import { AlertTriangle } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const hasError = !!error

    const inputClasses = `
      w-full px-4 py-2 rounded-lg border transition-colors
      bg-white text-gray-600 placeholder-gray-300
      focus:outline-none focus:ring-2 focus:ring-offset-1
      ${
        hasError
          ? 'border-danger focus:border-danger focus:ring-danger'
          : 'border-gray-300 focus:border-blue-base focus:ring-blue-base'
      }
      ${className}
    `.trim().replace(/\s+/g, ' ')

    const labelClasses = `
      block text-md font-semibold mb-1.5
      ${hasError ? 'text-danger' : 'text-gray-600'}
    `.trim().replace(/\s+/g, ' ')

    return (
      <div className="w-full">
        {label && <label className={labelClasses}>{label}</label>}
        <input ref={ref} className={inputClasses} {...props} />
        {hasError && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <AlertTriangle size={14} className="text-danger flex-shrink-0" />
            <span className="text-sm text-danger">{error}</span>
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
