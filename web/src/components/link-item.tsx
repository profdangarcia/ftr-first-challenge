import { Link } from 'react-router-dom'
import { Copy, Trash2 } from 'lucide-react'
import { IconButton } from '@/components/ui/icon-button'
import type { ILink } from '@/types/link'

interface LinkItemProps {
  link: ILink
}

export function LinkItem({ link }: LinkItemProps) {
  const shortUrl = `brev.ly/${link.shortCode}`

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
          onClick={() => {
            // TODO: Implementar cópia para clipboard
          }}
        />

        <IconButton
          icon={Trash2}
          aria-label="Deletar link"
          onClick={() => {
            // TODO: Implementar deleção
          }}
        />
      </div>
    </div>
  )
}
