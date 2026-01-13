import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function RegexTutorialPage() {
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
                d="M12 4V20M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Guia de Expressões Regulares
          </h1>
          <p className="text-gray-500">
            Aprenda a usar expressões regulares para extrair informações de seus arquivos de forma eficiente
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>O que são Expressões Regulares?</h2>
          <p>
            Expressões regulares (regex) são sequências de caracteres que formam um padrão de busca. Elas são
            extremamente úteis para encontrar, validar e extrair informações de textos. No FileDivider, usamos
            expressões regulares para identificar onde cada seção começa e para extrair informações específicas dos seus
            arquivos.
          </p>

          <h2>Conceitos Básicos</h2>
          <p>
            Antes de mergulharmos em exemplos específicos, vamos entender alguns conceitos básicos de expressões
            regulares:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Caracteres Literais</h3>
                <p className="text-sm">
                  A maioria dos caracteres em uma expressão regular representa a si mesmo. Por exemplo, a expressão
                  <code className="bg-gray-100 px-1 rounded">abc</code> corresponde exatamente à sequência "abc".
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Metacaracteres</h3>
                <p className="text-sm">
                  Alguns caracteres têm significados especiais, como{" "}
                  <code className="bg-gray-100 px-1 rounded">. ^ $ * + ? {} [ ] \ | ( )</code>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Classes de Caracteres</h3>
                <p className="text-sm">
                  Colchetes definem um conjunto de caracteres. Por exemplo,{" "}
                  <code className="bg-gray-100 px-1 rounded">[abc]</code> corresponde a "a", "b" ou "c".
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Quantificadores</h3>
                <p className="text-sm">
                  Especificam quantas vezes um caractere pode aparecer, como{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    * + ? {"{n}"} {"{n,}"} {"{n,m}"}
                  </code>
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Metacaracteres Comuns</h2>
          <table className="w-full border-collapse my-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Metacaractere</th>
                <th className="border p-2 text-left">Descrição</th>
                <th className="border p-2 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  <code>.</code>
                </td>
                <td className="border p-2">Qualquer caractere, exceto quebra de linha</td>
                <td className="border p-2">
                  <code>a.c</code> corresponde a "abc", "adc", "a1c", etc.
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>^</code>
                </td>
                <td className="border p-2">Início da linha</td>
                <td className="border p-2">
                  <code>^abc</code> corresponde a "abc" apenas no início da linha
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>$</code>
                </td>
                <td className="border p-2">Fim da linha</td>
                <td className="border p-2">
                  <code>abc$</code> corresponde a "abc" apenas no final da linha
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>\d</code>
                </td>
                <td className="border p-2">Qualquer dígito (0-9)</td>
                <td className="border p-2">
                  <code>\d\d\d</code> corresponde a três dígitos como "123"
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>\w</code>
                </td>
                <td className="border p-2">Qualquer caractere alfanumérico ou underscore</td>
                <td className="border p-2">
                  <code>\w+</code> corresponde a uma ou mais letras, números ou underscore
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>\s</code>
                </td>
                <td className="border p-2">Qualquer espaço em branco</td>
                <td className="border p-2">
                  <code>a\sb</code> corresponde a "a b", "a\tb", etc.
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>*</code>
                </td>
                <td className="border p-2">Zero ou mais ocorrências</td>
                <td className="border p-2">
                  <code>ab*c</code> corresponde a "ac", "abc", "abbc", etc.
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>+</code>
                </td>
                <td className="border p-2">Uma ou mais ocorrências</td>
                <td className="border p-2">
                  <code>ab+c</code> corresponde a "abc", "abbc", mas não a "ac"
                </td>
              </tr>
              <tr>
                <td className="border p-2">
                  <code>?</code>
                </td>
                <td className="border p-2">Zero ou uma ocorrência</td>
                <td className="border p-2">
                  <code>ab?c</code> corresponde a "ac" e "abc"
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Exemplos Práticos para o FileDivider</h2>

          <h3>Exemplo 1: Identificar Início de Seção</h3>
          <p>Para dividir um documento em seções que começam com "Capítulo" seguido por um número:</p>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">Capítulo \d+</pre>
          <p>Esta expressão corresponderá a textos como "Capítulo 1", "Capítulo 42", etc.</p>

          <h3>Exemplo 2: Extrair CPF</h3>
          <p>Para extrair um CPF no formato XXX.XXX.XXX-XX:</p>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            \d{3}\.\d{3}\.\d{3}-\d{2}
          </pre>
          <p>Esta expressão corresponderá a CPFs como "123.456.789-01".</p>

          <h3>Exemplo 3: Extrair Datas</h3>
          <p>Para extrair datas no formato DD/MM/AAAA:</p>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            \d{2}/\d{2}/\d{4}
          </pre>
          <p>Esta expressão corresponderá a datas como "01/01/2023".</p>

          <h3>Exemplo 4: Extrair Nomes de Clientes</h3>
          <p>Para extrair nomes de clientes que começam com "Cliente:" seguido por qualquer texto:</p>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">Cliente: (.+)</pre>
          <p>
            Esta expressão corresponderá a textos como "Cliente: João Silva" e capturará "João Silva" como um grupo.
          </p>

          <h2>Dicas para Usar Expressões Regulares no FileDivider</h2>
          <ul>
            <li>
              <strong>Auxiliar "Inicio":</strong> Este auxiliar é obrigatório e deve conter uma expressão que
              identifique onde cada seção começa. Escolha um padrão que seja único para o início de cada seção.
            </li>
            <li>
              <strong>Seja específico:</strong> Quanto mais específica for sua expressão regular, menos chances de
              correspondências indesejadas.
            </li>
            <li>
              <strong>Teste suas expressões:</strong> Antes de processar arquivos grandes, teste suas expressões
              regulares em uma pequena amostra do seu texto.
            </li>
            <li>
              <strong>Use grupos de captura:</strong> Parênteses <code>()</code> criam grupos de captura que podem ser
              referenciados posteriormente, útil para extrair informações específicas.
            </li>
          </ul>

          <h2>Ferramentas para Testar Expressões Regulares</h2>
          <p>
            Existem várias ferramentas online que podem ajudar você a testar suas expressões regulares antes de usá-las
            no FileDivider:
          </p>
          <ul>
            <li>
              <a
                href="https://regex101.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Regex101
              </a>{" "}
              - Uma ferramenta interativa com explicações detalhadas
            </li>
            <li>
              <a
                href="https://regexr.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                RegExr
              </a>{" "}
              - Outra excelente ferramenta para testar e aprender
            </li>
            <li>
              <a
                href="https://www.regextester.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                RegEx Tester
              </a>{" "}
              - Simples e fácil de usar
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
            <Link href="/help/tutorials/templates">
              Próximo: Como usar templates
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
