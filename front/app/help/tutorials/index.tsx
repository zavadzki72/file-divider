import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileIcon as FilePdf, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TutorialsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/help" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para o Centro de Ajuda
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-3">Todos os Tutoriais</h1>
          <p className="text-gray-500">
            Explore nossa coleção completa de tutoriais para aprender a usar o FileDivider
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FilePdf className="mr-2 h-5 w-5 text-pdf" />
                Como processar arquivos PDF
              </CardTitle>
              <CardDescription>Aprenda a dividir e organizar seus arquivos PDF usando o FileDivider</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Um guia passo a passo para processar arquivos PDF, desde o upload até o download dos resultados.
              </p>
              <Button asChild>
                <Link href="/help/tutorials/pdf">Ler tutorial</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-txt" />
                Como processar arquivos TXT
              </CardTitle>
              <CardDescription>Aprenda a dividir e organizar seus arquivos TXT usando o FileDivider</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Um guia passo a passo para processar arquivos TXT, incluindo quebra por linhas e extração personalizada.
              </p>
              <Button asChild>
                <Link href="/help/tutorials/txt">Ler tutorial</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4V20M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Guia de expressões regulares
              </CardTitle>
              <CardDescription>
                Aprenda a usar expressões regulares para extrair informações de seus arquivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Um guia completo sobre expressões regulares, com exemplos práticos para uso no FileDivider.
              </p>
              <Button asChild>
                <Link href="/help/tutorials/regex">Ler tutorial</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 00-1 1v6a1 1 0 001 1h3a1 1 0 001-1v-6a1 1 0 00-1-1h-3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Como usar templates
              </CardTitle>
              <CardDescription>
                Aprenda a criar, usar e gerenciar templates para processar seus arquivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Um guia completo sobre como criar e utilizar templates para automatizar o processamento de arquivos.
              </p>
              <Button asChild>
                <Link href="/help/tutorials/templates">Ler tutorial</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Recursos Adicionais</h2>
          <p className="mb-4">
            Além dos tutoriais, você também pode consultar nossa seção de Perguntas Frequentes para encontrar respostas
            para dúvidas comuns.
          </p>
          <Button variant="outline" asChild>
            <Link href="/help/faq">Ver Perguntas Frequentes</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
