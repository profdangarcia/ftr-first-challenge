import { Header } from '@/components/layout/header'
import { NewLinkForm } from '@/components/forms/new-link-form'
import { LinkList } from '@/components/link-list'

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col flex-1 bg-gray-200">
        <Header />
        
        <main className="bg-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 md:py-8 lg:pt-0 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-3 lg:gap-5 max-w-7xl mx-auto">
              {/* Painel Esquerdo - Novo link */}
              <NewLinkForm />

              {/* Painel Direito - Meus links */}
              <LinkList />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
