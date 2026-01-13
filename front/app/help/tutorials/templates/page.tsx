import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TemplatesTutorialPage() {
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
            <svg
              className="mr-3 h-8 w-8 text-blue-500"
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
            Como Usar Templates
          </h1>
          <p className="text-gray-500">
            Aprenda a criar, usar e gerenciar templates para processar seus arquivos de forma mais eficiente
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>O que são Templates?</h2>
          <p>
            Templates são conjuntos de configurações pré-definidas que você pode reutilizar para processar arquivos
            semelhantes. Eles são especialmente úteis quando você precisa processar regularmente arquivos com o mesmo
            formato ou estrutura.
          </p>
          <p>
            No FileDivider, os templates armazenam principalmente os auxiliares de extração (expressões regulares) que
            você configura para identificar e extrair informações dos seus arquivos.
          </p>

          <h2>Benefícios de Usar Templates</h2>
          <ul>
            <li>
              <strong>Economia de tempo:</strong> Configure uma vez e reutilize sempre que precisar processar arquivos
              semelhantes.
            </li>
            <li>
              <strong>Consistência:</strong> Garante que os mesmos padrões sejam aplicados a todos os arquivos do mesmo
              tipo.
            </li>
            <li>
              <strong>Facilidade de uso:</strong> Não é necessário lembrar ou recriar expressões regulares complexas a
              cada vez.
            </li>
            <li>
              <strong>Colaboração:</strong> Permite que equipes compartilhem configurações padronizadas para
              processamento de documentos.
            </li>
          </ul>

          <h2>Como Usar Templates Existentes</h2>
          <p>Usar um template existente é simples e direto:</p>
          <ol>
            <li>Acesse a página de processamento de PDF ou TXT</li>
            <li>Faça o upload do seu arquivo</li>
            <li>Na seção "Template", selecione um dos templates disponíveis na lista suspensa</li>
            <li>Os auxiliares de extração serão preenchidos automaticamente com as configurações do template</li>
            <li>Opcionalmente, ajuste o nome do arquivo</li>
            <li>Clique em "Processar" para iniciar o processamento</li>
          </ol>

          <div className="bg-blue-50 p-4 rounded-lg my-6">
            <h4 className="text-blue-800 font-semibold">Dica</h4>
            <p className="text-sm text-blue-800">
              Mesmo usando um template, você ainda pode ajustar os auxiliares de extração antes de processar o arquivo,
              caso precise fazer pequenas modificações para um caso específico.
            </p>
          </div>

          <h2>Como Criar e Salvar Templates</h2>
          <p>Para criar e salvar seus próprios templates, você precisa acessar a área administrativa:</p>

          <h3>Passo 1: Acessar a Área Administrativa</h3>
          <ol>
            <li>Clique em "Admin" no menu superior</li>
            <li>Faça login com suas credenciais administrativas</li>
            <li>Você será direcionado para o Painel Administrativo</li>
          </ol>

          <h3>Passo 2: Criar um Novo Template</h3>
          <ol>
            <li>No Painel Administrativo, clique no botão "Novo Template"</li>
            <li>Preencha o campo "Nome do Template" com um nome descritivo</li>
            <li>
              Configure os auxiliares de extração:
              <ul>
                <li>O auxiliar "Inicio" é obrigatório e define onde cada seção começa</li>
                <li>Adicione outros auxiliares conforme necessário para extrair informações específicas</li>
                <li>Cada auxiliar consiste em uma chave (nome) e um valor (expressão regular)</li>
              </ul>
            </li>
            <li>Clique em "Criar Template" para salvar</li>
          </ol>

          <div className="my-6 border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3 border-b">
              <h4 className="font-semibold">Exemplo de Template para Extratos Bancários</h4>
            </div>
            <div className="p-4">
              <p className="mb-2">
                <strong>Nome do Template:</strong> Extrato Bancário
              </p>
              <p className="mb-2">
                <strong>Auxiliares de Extração:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Inicio:</strong> <code>Cliente: .+</code>
                </li>
                <li>
                  <strong>Nome:</strong> <code>Cliente: (.+)</code>
                </li>
                <li>
                  <strong>Conta:</strong> <code>Conta: (\d+)</code>
                </li>
                <li>
                  <strong>Data:</strong>{" "}
                  <code>
                    Data: (\d{2}/\d{2}/\d{4})
                  </code>
                </li>
              </ul>
            </div>
          </div>

          <h3>Passo 3: Editar ou Excluir Templates</h3>
          <p>Você também pode gerenciar templates existentes:</p>
          <ul>
            <li>
              <strong>Editar:</strong> Clique no botão "Editar" ao lado do template que deseja modificar, faça as
              alterações necessárias e salve.
            </li>
            <li>
              <strong>Excluir:</strong> Clique no botão "Excluir" ao lado do template que deseja remover. Será
              solicitada uma confirmação antes da exclusão.
            </li>
          </ul>

          <h2>Melhores Práticas para Templates</h2>
          <ul>
            <li>
              <strong>Nomes descritivos:</strong> Use nomes claros e descritivos para seus templates, que indiquem o
              tipo de documento ou a finalidade.
            </li>
            <li>
              <strong>Teste antes de salvar:</strong> Antes de salvar um template, teste as expressões regulares com
              diferentes exemplos do mesmo tipo de documento.
            </li>
            <li>
              <strong>Documentação:</strong> Mantenha uma documentação interna sobre os templates, explicando para que
              servem e como devem ser usados.
            </li>
            <li>
              <strong>Revisão periódica:</strong> Revise periodicamente seus templates para garantir que ainda estão
              funcionando corretamente, especialmente se o formato dos documentos mudar.
            </li>
          </ul>

          <h2>Usando Templates com Nomes de Arquivo Dinâmicos</h2>
          <p>
            Uma funcionalidade poderosa do FileDivider é a capacidade de usar valores extraídos pelos auxiliares para
            nomear os arquivos gerados:
          </p>
          <ol>
            <li>
              Crie um template com auxiliares que extraiam informações relevantes (como nome, data, número de documento)
            </li>
            <li>
              Ao usar o template, no campo "Nome do Arquivo", use chaves para inserir os valores extraídos:
              <code>
                documento_{"{Nome}"}_{"{Data}"}
              </code>
            </li>
            <li>
              O FileDivider substituirá as chaves pelos valores extraídos, criando nomes de arquivo personalizados para
              cada seção
            </li>
          </ol>

          <div className="bg-yellow-50 p-4 rounded-lg my-6">
            <h4 className="text-yellow-800 font-semibold">Exemplo</h4>
            <p className="text-sm text-yellow-800">
              Se seu template extrair "João Silva" para a chave "Nome" e "01/01/2023" para a chave "Data", o padrão
              <code>
                documento_{"{Nome}"}_{"{Data}"}
              </code>
              gerará um arquivo chamado "documento_João Silva_01-01-2023.pdf"
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link href="/help/tutorials/regex">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior: Guia de expressões regulares
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
