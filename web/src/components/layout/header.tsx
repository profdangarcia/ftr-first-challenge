import { Link } from 'react-router-dom'
import fullLogo from '@/assets/full_logo.svg'

export function Header() {
  return (
    <header className="w-full bg-gray-200 lg:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-center lg:justify-start h-16 md:h-20 max-w-7xl mx-auto lg:mb-8">
          <Link to="/" className="flex items-center">
            <img
              src={fullLogo}
              alt="Brev.ly"
              className="h-6 sm:h-7 md:h-8"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
