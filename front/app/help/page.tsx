"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon as FilePdf, FileText, Search, BookOpen, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

// Define help content for search functionality
const helpContent = [
  {
    title: "Como processar arquivos PDF",
    path: "/help/tutorials/pdf",
    keywords: ["pdf", "processar", "dividir", "arquivo", "documento", "tutorial"],
    category: "tutorial",
  },
  {
    title: "Como processar arquivos TXT",
    path: "/help/tutorials/txt",
    keywords: ["txt", "texto", "processar", "dividir", "arquivo", "documento", "tutorial"],
    category: "tutorial",
  },
  {
    title: "Guia de expressões regulares",
    path: "/help/tutorials/regex",
    keywords: ["regex", "expressão regular", "padrão", "tutorial", "guia"],
    category: "tutorial",
  },
  {
    title: "Como usar templates",
    path: "/help/tutorials/templates",
    keywords: ["template", "modelo", "salvar", "reutilizar", "tutorial"],
    category: "tutorial",
  },
  {
    title: "Como meus arquivos são protegidos?",
    path: "/help/faq#security",
    keywords: ["segurança", "proteção", "privacidade", "arquivo", "faq"],
    category: "faq",
  },
  {
    title: "Qual é o tamanho máximo de arquivo suportado?",
    path: "/help/faq#file-size",
    keywords: ["tamanho", "arquivo", "limite", "máximo", "faq"],
    category: "faq",
  },
  {
    title: "Por quanto tempo posso baixar meus arquivos processados?",
    path: "/help/faq#download",
    keywords: ["download", "baixar", "tempo", "arquivo", "processado", "faq"],
    category: "faq",
  },
  {
    title: "Como criar e salvar templates personalizados?",
    path: "/help/faq#templates",
    keywords: ["template", "modelo", "personalizado", "salvar", "criar", "faq"],
    category: "faq",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof helpContent>([])
  const [showResults, setShowResults] = useState(false)

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const query = searchQuery.toLowerCase()
      const results = helpContent.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(query))
        )
      })
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchQuery])

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Centro de Ajuda</h1>
          <p className="text-gray-500 mb-6">Encontre respostas para suas perguntas e aprenda a usar o FileDivider</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar ajuda..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {showResults && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border overflow-hidden">
                {searchResults.length > 0 ? (
                  <ul className="divide-y">
                    {searchResults.map((result, index) => (
                      <li key={index}>
                        <Link
                          href={result.path}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowResults(false)}
                        >
                          <div className="flex items-center">
                            {result.category === "tutorial" ? (
                              <BookOpen className="h-4 w-4 text-blue-500 mr-2" />
                            ) : (
                              <HelpCircle className="h-4 w-4 text-blue-500 mr-2" />
                            )}
                            <span>{result.title}</span>
                          </div>
                          <span className="text-xs text-gray-500 ml-6">
                            {result.category === "tutorial" ? "Tutorial" : "FAQ"}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-center text-gray-500">
                    Nenhum resultado encontrado para "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                Tutoriais
              </CardTitle>
              <CardDescription>Aprenda a usar o FileDivider passo a passo</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <Link href="/help/tutorials/pdf" className="text-blue-600 hover:underline flex items-center">
                    <FilePdf className="mr-2 h-4 w-4" />
                    Como processar arquivos PDF
                  </Link>
                </li>
                <li>
                  <Link href="/help/tutorials/txt" className="text-blue-600 hover:underline flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Como processar arquivos TXT
                  </Link>
                </li>
                <li>
                  <Link href="/help/tutorials/regex" className="text-blue-600 hover:underline flex items-center">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 4V20M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Guia de expressões regulares
                  </Link>
                </li>
                <li>
                  <Link href="/help/tutorials/templates" className="text-blue-600 hover:underline flex items-center">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 00-1 1v6a1 1 0 001 1h3a1 1 0 001-1v-6a1 1 0 00-1-1h-3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Como usar templates
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-blue-500" />
                Perguntas Frequentes
              </CardTitle>
              <CardDescription>Respostas para as dúvidas mais comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <Link href="/help/faq#security" className="text-blue-600 hover:underline">
                    Como meus arquivos são protegidos?
                  </Link>
                </li>
                <li>
                  <Link href="/help/faq#file-size" className="text-blue-600 hover:underline">
                    Qual é o tamanho máximo de arquivo suportado?
                  </Link>
                </li>
                <li>
                  <Link href="/help/faq#download" className="text-blue-600 hover:underline">
                    Por quanto tempo posso baixar meus arquivos processados?
                  </Link>
                </li>
                <li>
                  <Link href="/help/faq#templates" className="text-blue-600 hover:underline">
                    Como criar e salvar templates personalizados?
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/help/faq">Ver todas as perguntas</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
