import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileIcon as FilePdf, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section - Inspired by Smallpdf */}
      <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Tornamos a divisão de arquivos fácil.
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl mt-4">
                  Todas as ferramentas que você precisa para ser mais produtivo e trabalhar de forma mais inteligente
                  com seus documentos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a href="#cta-section">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white border-0"
                  >
                    Começar Gratuitamente
                  </Button>
                </a>
                <Link href="/help">
                  <Button size="lg" variant="outline">
                    Ajuda
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center relative">
              {/* Decorative elements */}
              <div className="absolute top-1/4 right-1/4 w-6 h-6 rounded-full bg-pink-500 opacity-70"></div>
              <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-blue-500 opacity-70"></div>
              <div className="absolute top-1/3 left-1/3 w-8 h-8 rounded-full border-2 border-yellow-500 opacity-70"></div>
              <div className="absolute bottom-1/4 right-1/3 w-5 h-5 rounded-full bg-green-500 opacity-70"></div>

              {/* Custom document editor illustration */}
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-4 relative">
                  {/* Editor toolbar */}
                  <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 rounded bg-gray-200"></div>
                      <div className="w-6 h-6 rounded bg-gray-200"></div>
                      <div className="w-6 h-6 rounded bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Document content */}
                  <div className="bg-gray-50 rounded-lg p-4 relative">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 mb-6"></div>

                    {/* Document elements */}
                    <div className="flex justify-between mb-6">
                      <div className="w-20 h-20 rounded border-2 border-blue-400 border-dashed flex items-center justify-center">
                        <span className="text-xs text-blue-400">Hello</span>
                      </div>
                      <div className="w-20 h-20 rounded-full border-2 border-blue-400 border-dashed"></div>
                    </div>

                    <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>

                    {/* Red circles/annotations */}
                    <div className="relative h-10 mb-3">
                      <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 border-red-500"></div>
                      <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 border-red-500"></div>
                      <div className="absolute left-2/5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 border-red-500"></div>
                    </div>

                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                  </div>

                  {/* Cursor */}
                  <div className="absolute bottom-10 right-10 w-4 h-4 transform rotate-45 border-b-2 border-r-2 border-black"></div>
                </div>

                {/* Floating UI elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-teal-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="absolute top-1/2 -right-6 w-12 h-12 bg-yellow-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="absolute bottom-1/3 -left-6 w-12 h-12 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-0 w-1/3 h-1/3 bg-pink-50 rounded-full filter blur-3xl opacity-30"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Por Que Escolher FileDivider?
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Nossa plataforma oferece soluções eficientes para organização de documentos com recursos avançados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Processamento Rápido</h3>
              <p className="text-gray-500">
                Divida e organize seus arquivos em segundos, economizando tempo valioso no seu fluxo de trabalho.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Segurança Garantida</h3>
              <p className="text-gray-500">
                Seus documentos são processados com segurança e não são armazenados permanentemente em nossos
                servidores.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Tecnologia Inteligente</h3>
              <p className="text-gray-500">
                Utilizamos expressões regulares e algoritmos avançados para garantir resultados precisos na divisão de
                arquivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Increased size */}
      <section
        id="cta-section"
        className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl max-w-3xl">
              Comece a Organizar Seus Arquivos Hoje
            </h2>
            <p className="max-w-[800px] md:text-xl/relaxed text-white/90 text-lg">
              Experimente o FileDivider gratuitamente e descubra como podemos ajudar a otimizar seu fluxo de trabalho.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row pt-6">
              <Link href="/pdf">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-white text-lg px-8 py-6">
                  <FilePdf className="mr-2 h-5 w-5" />
                  Processar PDF
                </Button>
              </Link>
              <Link href="/txt">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-white text-lg px-8 py-6">
                  <FileText className="mr-2 h-5 w-5" />
                  Processar TXT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
