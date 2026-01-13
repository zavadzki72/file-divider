"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, FileIcon as FilePdf, Plus, Minus, CheckCircle, HelpCircle, Download } from "lucide-react"
import { getTemplates, processPdf, type Template } from "@/lib/api"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DownloadCenter } from "@/components/download-center"
import { downloadFileFromUrl } from "@/lib/download-manager"

export default function PdfPage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [extractionHelpers, setExtractionHelpers] = useState<{ key: string; value: string }[]>([
    { key: "Inicio", value: "" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processResult, setProcessResult] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null)
  const [downloadFilename, setDownloadFilename] = useState<string>("")
  const [result, setResult] = useState<{ blobUrl: string | null; downloadFilename: string | null }>({
    blobUrl: null,
    downloadFilename: null,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Adiciona a classe de tema PDF ao body
    document.body.classList.add("pdf-theme")

    // Solicita permissão para notificações
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission()
    }

    // Busca templates
    const fetchTemplates = async () => {
      try {
        setIsLoading(true)
        const data = await getTemplates()
        setTemplates(data)
      } catch (error) {
        console.error("Falha ao buscar templates:", error)
        toast({
          title: "Erro",
          description: "Falha ao buscar templates. Por favor, tente novamente.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()

    // Limpeza
    return () => {
      document.body.classList.remove("pdf-theme")
    }
  }, [toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Valida o tipo de arquivo
      if (!selectedFile.type.includes("pdf") && !selectedFile.name.endsWith(".pdf")) {
        toast({
          title: "Tipo de arquivo inválido",
          description: "Por favor, envie um arquivo PDF.",
          variant: "destructive",
        })
        e.target.value = ""
        return
      }

      setFile(selectedFile)
      // Não define mais o nome do arquivo automaticamente
      // Reset results when a new file is selected
      setProcessResult([])
      setShowResults(false)
      setDownloadBlob(null)
      setDownloadFilename("")
    }
  }

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value)

    // Se "sem-template" for selecionado, redefine os auxiliares de extração com "Inicio" como obrigatório
    if (value === "no-template") {
      setExtractionHelpers([{ key: "Inicio", value: "" }])
    } else {
      // Encontra o template selecionado
      const template = templates.find((t) => t.id === value)
      if (template && template.extractionHelpers) {
        // Converte objeto em array de pares chave-valor
        const helpers = Object.entries(template.extractionHelpers).map(([key, value]) => ({
          key,
          value,
        }))
        setExtractionHelpers(helpers.length > 0 ? helpers : [{ key: "Inicio", value: "" }])
      }
    }
  }

  const addExtractionHelper = () => {
    setExtractionHelpers([...extractionHelpers, { key: "", value: "" }])
  }

  const removeExtractionHelper = (index: number) => {
    // Não permite remover se for o auxiliar "Inicio"
    if (extractionHelpers[index].key === "Inicio" && extractionHelpers.some((h) => h.key === "Inicio")) {
      toast({
        title: "Ação não permitida",
        description: "O auxiliar 'Inicio' é obrigatório e não pode ser removido.",
        variant: "destructive",
      })
      return
    }

    const newHelpers = [...extractionHelpers]
    newHelpers.splice(index, 1)
    setExtractionHelpers(newHelpers.length > 0 ? newHelpers : [{ key: "Inicio", value: "" }])
  }

  const updateExtractionHelper = (index: number, field: "key" | "value", value: string) => {
    const newHelpers = [...extractionHelpers]

    // Se estiver tentando mudar a chave "Inicio" para outro valor
    if (
      field === "key" &&
      newHelpers[index].key === "Inicio" &&
      value !== "Inicio" &&
      !newHelpers.some((h, i) => i !== index && h.key === "Inicio")
    ) {
      toast({
        title: "Ação não permitida",
        description: "Pelo menos um auxiliar com a chave 'Inicio' é obrigatório.",
        variant: "destructive",
      })
      return
    }

    newHelpers[index][field] = value
    setExtractionHelpers(newHelpers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, envie um arquivo PDF.",
        variant: "destructive",
      })
      return
    }

    // Verifica se tem pelo menos um auxiliar com a chave "Inicio" quando não tem template
    if (selectedTemplate === "no-template" && !extractionHelpers.some((h) => h.key === "Inicio")) {
      toast({
        title: "Auxiliar obrigatório",
        description: "É necessário ter pelo menos um auxiliar com a chave 'Inicio'.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)
      setShowResults(false)
      setDownloadBlob(null)
      setDownloadFilename("")

      // Converte array de auxiliares de extração para objeto
      const helpersObject: Record<string, string> = {}
      extractionHelpers.forEach((helper) => {
        if (helper.key && helper.value) {
          helpersObject[helper.key] = helper.value
        }
      })

      console.log("Enviando requisição com:", {
        file: file.name,
        templateId: selectedTemplate !== "no-template" ? selectedTemplate : undefined,
        fileName: fileName || undefined,
        extractionHelpers: Object.keys(helpersObject).length > 0 ? helpersObject : undefined,
      })

      const result = await processPdf(file, {
        templateId: selectedTemplate !== "no-template" ? selectedTemplate : undefined,
        fileName: fileName || undefined,
        extractionHelpers: Object.keys(helpersObject).length > 0 ? helpersObject : undefined,
      })

      console.log("Resultado do processamento:", result)

      if (result.success) {
        toast({
          title: "Sucesso",
          description: result.message,
        })

        if (result.files && result.files.length > 0) {
          setProcessResult(result.files)
          setShowResults(true)

          // Armazena o blob e o nome do arquivo para download imediato
          if (result.downloadBlob && result.downloadFilename) {
            setDownloadBlob(result.downloadBlob)
            setDownloadFilename(result.downloadFilename)
          }

          // Armazena o blobUrl e o nome do arquivo para download imediato
          if (result.blobUrl && result.downloadFilename) {
            setResult({ blobUrl: result.blobUrl, downloadFilename: result.downloadFilename })
          }
        }
      } else {
        toast({
          title: "Erro",
          description: result.message || "Falha ao processar arquivo PDF.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Falha ao processar PDF:", error)
      toast({
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Falha ao processar arquivo PDF. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Função para realizar o download manualmente
  const handleDownload = () => {
    if (!result.blobUrl) {
      toast({
        title: "Erro",
        description: "URL de download não disponível.",
        variant: "destructive",
      })
      return
    }

    try {
      downloadFileFromUrl(result.blobUrl, result.downloadFilename || "arquivo.zip")

      toast({
        title: "Download iniciado",
        description: "O arquivo está sendo baixado.",
      })
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error)

      toast({
        title: "Erro ao baixar",
        description: "Ocorreu um erro ao tentar baixar o arquivo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-8 md:py-10 bg-gradient-to-r from-red-50 to-red-100 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-row items-center justify-between">
            <div className="space-y-2 max-w-[60%]">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Processamento de Arquivos PDF
              </h1>
              <p className="text-gray-500 md:text-lg">Envie seus arquivos PDF e organize-os com nosso sistema.</p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <img src="/images/pdf-banner.png" alt="Processamento de PDF" className="h-40 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-white border-b border-gray-100">
                <CardTitle className="flex items-center text-xl">
                  <FilePdf className="h-5 w-5 mr-2 text-pdf" />
                  Enviar Arquivo PDF
                </CardTitle>
                <CardDescription>Envie um arquivo PDF para processar e organizar seu conteúdo.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="file">Arquivo PDF</Label>
                      <div
                        className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          id="file"
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                        {file ? (
                          <div className="flex items-center gap-2">
                            <FilePdf className="w-8 h-8 text-primary" />
                            <span className="font-medium text-gray-600">{file.name}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="mt-2 text-base text-gray-500">Clique para enviar ou arraste e solte</span>
                            <span className="text-sm text-gray-400">Apenas arquivos PDF</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="template">Template</Label>
                      <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-template">Sem Template</SelectItem>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fileName">Nome do Arquivo</Label>
                      <Input
                        id="fileName"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Digite o nome do arquivo (ex: documento_{chave1}_{chave2})"
                      />
                      <p className="text-xs text-muted-foreground">
                        Você pode usar chaves como {"{chave1}"} para inserir valores dos auxiliares de extração.
                      </p>
                    </div>

                    {selectedTemplate === "no-template" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Auxiliares de Extração</Label>
                          <Button type="button" variant="outline" size="sm" onClick={addExtractionHelper}>
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>

                        {extractionHelpers.map((helper, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={helper.key}
                              onChange={(e) => updateExtractionHelper(index, "key", e.target.value)}
                              placeholder="Chave"
                              className="flex-1"
                              disabled={helper.key === "Inicio"}
                            />
                            <Input
                              value={helper.value}
                              onChange={(e) => updateExtractionHelper(index, "value", e.target.value)}
                              placeholder="Valor (expressão regular)"
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExtractionHelper(index)}
                              disabled={extractionHelpers.length === 1 || helper.key === "Inicio"}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}

                        <Accordion type="single" collapsible className="mt-4">
                          <AccordionItem value="regex-help">
                            <AccordionTrigger className="text-sm font-medium flex items-center">
                              <HelpCircle className="h-4 w-4 mr-2" />
                              Ajuda com Expressões Regulares
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground space-y-2">
                              <p>
                                Expressões regulares (regex) são padrões utilizados para encontrar combinações de
                                caracteres em textos. Aqui estão alguns exemplos úteis:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>
                                  <strong>^</strong> - Início da linha
                                </li>
                                <li>
                                  <strong>$</strong> - Fim da linha
                                </li>
                                <li>
                                  <strong>\d</strong> - Qualquer dígito (0-9)
                                </li>
                                <li>
                                  <strong>\w</strong> - Qualquer caractere alfanumérico
                                </li>
                                <li>
                                  <strong>.*</strong> - Qualquer caractere, qualquer quantidade
                                </li>
                                <li>
                                  <strong>[A-Z]</strong> - Qualquer letra maiúscula
                                </li>
                                <li>
                                  <strong>\s</strong> - Espaço em branco
                                </li>
                              </ul>
                              <p className="mt-2">
                                <strong>Exemplo:</strong> Para capturar um CPF, use:{" "}
                                <code>
                                  \d{3}\.\d{3}\.\d{3}-\d{2}
                                </code>
                              </p>
                              <p>
                                <strong>Dica:</strong> O auxiliar <strong>Inicio</strong> é obrigatório e deve conter
                                uma expressão que identifique onde começa cada seção a ser extraída.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      disabled={!file || isProcessing}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 text-white border-0"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <FilePdf className="w-4 h-4 mr-2" />
                          Processar PDF
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {showResults && processResult.length > 0 && (
              <Card ref={resultRef} className="border-primary shadow-sm">
                <CardHeader className="bg-primary/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <CardTitle>Resultados do Processamento</CardTitle>
                  </div>
                  <CardDescription>Seu PDF foi processado com sucesso.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <p className="font-medium">Arquivos Gerados:</p>
                    <ul className="space-y-1 pl-5 list-disc">
                      {processResult.map((file, index) => (
                        <li key={index} className="text-sm">
                          {file}
                        </li>
                      ))}
                    </ul>
                    {downloadBlob && downloadFilename && (
                      <Button onClick={handleDownload} className="w-full mt-4" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar Arquivos
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-white border-b border-gray-100">
                <CardTitle className="text-xl">Como Usar</CardTitle>
                <CardDescription>Siga estes passos para processar seus arquivos PDF.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold">
                      1
                    </div>
                    <p className="font-medium">Envie um arquivo PDF</p>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    Clique na área de upload para selecionar um arquivo PDF do seu computador.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold">
                      2
                    </div>
                    <p className="font-medium">Selecione um template ou crie configurações personalizadas</p>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    Escolha um template existente ou personalize seus auxiliares de extração usando expressões
                    regulares.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold">
                      3
                    </div>
                    <p className="font-medium">Defina o nome do arquivo</p>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    Digite o nome para os arquivos gerados. Você pode usar chaves para inserir valores dos auxiliares de
                    extração, como: documento_{"{chave1}"}_{"{chave2}"}.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold">
                      4
                    </div>
                    <p className="font-medium">Configure expressões regulares</p>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    Se não estiver usando um template, defina expressões regulares para extrair informações. O auxiliar
                    "Inicio" é obrigatório e define onde cada seção começa.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold">
                      5
                    </div>
                    <p className="font-medium">Processe seu arquivo</p>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    Clique no botão "Processar PDF" para iniciar o processamento do seu arquivo.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold">
                      6
                    </div>
                    <p className="font-medium">Faça o download imediatamente</p>
                  </div>
                  <p className="text-sm text-gray-500 pl-8">
                    <strong>Importante:</strong> Faça o download do arquivo imediatamente após o processamento. Os
                    arquivos não são armazenados localmente.
                  </p>
                </div>
              </CardContent>
            </Card>

            <DownloadCenter />
          </div>
        </div>
      </div>
    </div>
  )
}
