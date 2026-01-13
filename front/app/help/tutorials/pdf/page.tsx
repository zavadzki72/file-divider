import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileIcon as FilePdf, ChevronRight } from "lucide-react"

export default function PdfTutorialPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/help" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para o Centro de Ajuda
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3 flex items-center">
            <FilePdf className="mr-3 h-8 w-8 text-pdf" />
            Como Processar Arquivos PDF
          </h1>
          <p className="text-gray-500">
            Um guia passo a passo para dividir e organizar seus arquivos PDF usando o FileDivider
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold mt-6 mb-4">Visão Geral</h2>
          <p className="my-4 leading-relaxed">
            O FileDivider permite que você divida arquivos PDF em múltiplos documentos com base em expressões regulares
            ou templates predefinidos. Este tutorial irá guiá-lo através do processo completo.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Passo 1: Enviar seu arquivo PDF</h2>
          <p className="my-4 leading-relaxed">
            Comece acessando a página de processamento de PDF e enviando seu arquivo:
          </p>
          <ol className="list-decimal pl-6 my-4 space-y-2">
            <li className="pl-2">
              Navegue até a página{" "}
              <Link href="/pdf" className="text-blue-600 hover:underline">
                Processar PDF
              </Link>
            </li>
            <li className="pl-2">Clique na área de upload ou arraste e solte seu arquivo PDF</li>
            <li className="pl-2">Aguarde até que o arquivo seja carregado completamente</li>
          </ol>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              <strong>Nota:</strong> O tamanho máximo de arquivo suportado é de 10MB. Para arquivos maiores, considere
              dividi-los em partes menores antes de fazer o upload.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Passo 2: Selecionar um template ou configurar expressões regulares
          </h2>
          <p className="my-4 leading-relaxed">
            Você pode escolher entre usar um template existente ou configurar suas próprias expressões regulares:
          </p>
          <h3 className="text-xl font-medium mt-5 mb-3">Opção A: Usar um template existente</h3>
          <ol className="list-decimal pl-6 my-4 space-y-2">
            <li className="pl-2">Selecione um template na lista suspensa</li>
            <li className="pl-2">Os auxiliares de extração serão preenchidos automaticamente</li>
          </ol>

          <h3 className="text-xl font-medium mt-5 mb-3">Opção B: Configurar expressões regulares personalizadas</h3>
          <ol className="list-decimal pl-6 my-4 space-y-2">
            <li className="pl-2">Selecione "Sem Template" na lista suspensa</li>
            <li className="pl-2">
              Configure o auxiliar "Inicio" com uma expressão regular que identifique onde cada seção começa
            </li>
            <li className="pl-2">
              Adicione auxiliares adicionais conforme necessário para extrair informações específicas
            </li>
          </ol>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-bold text-blue-800">Exemplo de expressão regular</h4>
            <p className="text-sm">
              Para dividir um documento em seções que começam com "Capítulo" seguido por um número, você pode usar:
            </p>
            <pre className="bg-gray-800 text-white p-2 rounded text-sm overflow-x-auto">Capítulo \d+</pre>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Passo 3: Definir o nome do arquivo</h2>
          <p className="my-4 leading-relaxed">Você pode personalizar o nome dos arquivos gerados:</p>
          <ol className="list-decimal pl-6 my-4 space-y-2">
            <li className="pl-2">Digite o padrão de nome desejado no campo "Nome do Arquivo"</li>
            <li className="pl-2">
              Use chaves para inserir valores dos auxiliares de extração, como:
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                documento_{"{chave1}"}_{"{chave2}"}
              </code>
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Passo 4: Processar o arquivo</h2>
          <p className="my-4 leading-relaxed">Após configurar todas as opções:</p>
          <ol className="list-decimal pl-6 my-4 space-y-2">
            <li className="pl-2">Clique no botão "Processar PDF"</li>
            <li className="pl-2">Aguarde enquanto o sistema processa seu arquivo</li>
            <li className="pl-2">Quando o processamento for concluído, você verá uma lista dos arquivos gerados</li>
          </ol>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Passo 5: Baixar os resultados</h2>
          <p className="my-4 leading-relaxed">
            <strong>Importante:</strong> Os arquivos processados estão disponíveis apenas temporariamente.
          </p>
          <ol className="list-decimal pl-6 my-4 space-y-2">
            <li className="pl-2">
              Clique no botão "Baixar Arquivos" para obter um arquivo ZIP contendo todos os documentos gerados
            </li>
            <li className="pl-2">Você também pode encontrar seus downloads recentes na "Central de Downloads"</li>
          </ol>

          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Lembrete:</strong> Faça o download dos seus arquivos imediatamente após o processamento. Os
              arquivos não são armazenados permanentemente e podem não estar disponíveis para download posterior.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Dicas avançadas</h2>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li className="pl-2">
              <strong>Expressões regulares complexas:</strong> Para divisões mais precisas, considere usar expressões
              regulares avançadas com grupos de captura.
            </li>
            <li className="pl-2">
              <strong>Salvar templates:</strong> Se você usa frequentemente as mesmas expressões regulares, considere
              salvá-las como um template na área administrativa.
            </li>
            <li className="pl-2">
              <strong>Processamento em lote:</strong> Para processar múltiplos arquivos, é recomendável processá-los
              individualmente para melhor controle e organização.
            </li>
          </ul>
        </div>

        <div className="mt-10 flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/help">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Ajuda
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/help/tutorials/txt">
              Próximo: Processar TXT
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
