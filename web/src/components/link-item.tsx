import { Link } from 'react-router-dom'
import { Copy, Trash2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { IconButton } from '@/components/ui/icon-button'
import { linkService } from '@/services/api'
import type { ILink } from '@/types/link'

interface LinkItemProps {
  link: ILink
}

export function LinkItem({ link }: LinkItemProps) {
  const queryClient = useQueryClient()
  const shortUrl = `brev.ly/${link.shortCode}`

  function getFullShortUrl(): string {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'
    return `${frontendUrl}/${link.shortCode}`
  }

  async function handleCopy() {
    try {
      const fullUrl = getFullShortUrl()
      await navigator.clipboard.writeText(fullUrl)
      toast.success('Link copiado para a área de transferência!')
    } catch (error) {
      toast.error('Erro ao copiar link. Tente novamente.')
    }
  }

  async function handleDelete() {
    const result = await linkService.delete(link.id)

    if (!result.errors) {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    }
  }

  return (
    <div className="py-3.5 md:py-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <Link
          to={`/links/${link.shortCode}`}
          className="block text-md text-blue-base hover:underline truncate"
        >
          {shortUrl}
        </Link>
        <p className="text-sm text-gray-500 truncate mt-1">
          {link.originalUrl}
        </p>
      </div>

      <div className="flex items-center gap-5 flex-shrink-0">
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {link.accessCount} acessos
        </span>

        <IconButton
          icon={Copy}
          aria-label="Copiar link"
          onClick={handleCopy}
        />

        <IconButton
          icon={Trash2}
          aria-label="Deletar link"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}
