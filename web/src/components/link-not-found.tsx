import { Link } from 'react-router-dom'
import icon404 from '@/assets/404.svg'

export function LinkNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 md:p-12 max-w-2xl w-full mx-4 text-center">
        <img
          src={icon404}
          alt="404"
          className="mx-auto mb-6"
        />

        <h1 className="text-lg font-bold text-gray-600 mb-3">
          Link não encontrado
        </h1>

        <p className="text-md text-gray-500 mb-4">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
        </p>

        <p className="text-md text-gray-500">
          Saiba mais em{' '}
          <Link to="/" className="text-blue-base hover:underline">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
