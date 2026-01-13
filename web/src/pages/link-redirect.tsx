import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import logoIcon from '@/assets/logo_icon.svg'
import { linkService } from '@/services/api'
import { LinkNotFound } from '@/components/link-not-found'

export function LinkRedirect() {
  const { shortCode } = useParams<{ shortCode: string }>()

  const { data, isError } = useQuery({
    queryKey: ['link', shortCode],
    queryFn: async () => {
      if (!shortCode) return null
      const response = await linkService.getByShortCode(shortCode)
      return response.data
    },
    enabled: !!shortCode,
    retry: false,
  })

  useEffect(() => {
    if (data?.originalUrl) {
      window.location.href = data.originalUrl
    }
  }, [data])

  if (isError || (data === null && shortCode)) {
    return <LinkNotFound />
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 md:p-12 max-w-2xl w-full mx-4 text-center">
        <img
          src={logoIcon}
          alt="Brev.ly"
          className="mx-auto mb-6"
        />

        <h1 className="text-lg font-bold text-gray-600 mb-3">
          Redirecionando...
        </h1>

        <p className="text-md text-gray-500 mb-4">
          O link será aberto automaticamente em alguns instantes.
        </p>

        <p className="text-md text-gray-500">
          Não foi redirecionado?{' '}
          <a
            href={data?.originalUrl || '#'}
            className="text-blue-base hover:underline"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  )
}
