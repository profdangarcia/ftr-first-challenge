import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyListWarning } from '@/components/empty-list-warning'
import { LinkItem } from '@/components/link-item'
import { linkService } from '@/services/api'
import type { ILink } from '@/types/link'

export function LinkList() {
  const [links, setLinks] = useState<ILink[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const response = await linkService.list()
      return response.data
    },
  })

  useEffect(() => {
    if (data) {
      setLinks(data)
    }
  }, [data])

  const hasLinks = links.length > 0

  return (
    <section className="bg-gray-100 rounded-lg p-6 md:p-8 h-fit">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-600">Meus links</h2>

        <Button size="sm" icon={Download} disabled={!hasLinks}>
          Baixar CSV
        </Button>
      </div>

      <div className="border-t border-gray-200 my-5"></div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-400">Carregando...</p>
        </div>
      ) : hasLinks ? (
        <div>
          {links.map((link, index) => (
            <div key={link.id}>
              <LinkItem link={link} />
              {index < links.length - 1 && (
                <div className="border-t border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyListWarning />
      )}
    </section>
  )
}
