import { Header } from '@/components/layout/header'

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col flex-1 bg-gray-200">
        <Header />
        
        <main className="bg-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 md:py-8 lg:pt-0 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-3 lg:gap-5 max-w-7xl mx-auto">
              {/* Painel Esquerdo - Novo link */}
              <section className="bg-white rounded-lg p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-600 mb-6">
                  Novo link
                </h2>
                
                {/* Formulário será implementado aqui */}
              </section>

              {/* Painel Direito - Meus links */}
              <section className="bg-white rounded-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-600">Meus links</h2>
                  
                  {/* Botão Baixar CSV será implementado aqui */}
                </div>
                
                {/* Lista de links será implementada aqui */}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
