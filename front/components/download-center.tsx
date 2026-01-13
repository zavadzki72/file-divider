"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Loader2, AlertCircle, CheckCircle, Clock, Trash2, X, RefreshCw, Upload, Layers } from "lucide-react"
import {
  getDownloads,
  removeDownload,
  clearDownloads,
  downloadFileFromUrl,
  type DownloadItem,
  type DownloadStatus,
} from "@/lib/download-manager"
import { useToast } from "@/hooks/use-toast"

export function DownloadCenter() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Carrega os downloads e verifica o uso de armazenamento
  useEffect(() => {
    const loadDownloads = () => {
      const storedDownloads = getDownloads()
      setDownloads(storedDownloads)
    }

    // Carrega inicialmente
    loadDownloads()

    // Configura um intervalo para atualizar a cada 2 segundos
    const interval = setInterval(loadDownloads, 2000)

    // Adiciona um listener para eventos de storage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "filedivider_downloads") {
        loadDownloads()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Filtra os downloads com base na aba ativa
  const filteredDownloads = downloads.filter((download) => {
    if (activeTab === "all") return true
    if (activeTab === "pending")
      return download.status === "pending" || download.status === "uploading" || download.status === "chunking"
    if (activeTab === "completed") return download.status === "completed"
    if (activeTab === "error") return download.status === "error"
    return true
  })

  // Ordena os downloads por timestamp (mais recentes primeiro)
  const sortedDownloads = [...filteredDownloads].sort((a, b) => b.timestamp - a.timestamp)

  // Função para baixar um arquivo
  const handleDownload = async (download: DownloadItem) => {
    if (isDownloading[download.id]) return

    try {
      setIsDownloading((prev) => ({ ...prev, [download.id]: true }))

      // Verifica se o download tem URL do blob
      if (download.blobUrl) {
        downloadFileFromUrl(download.blobUrl, download.filename)

        toast({
          title: "Download iniciado",
          description: `O arquivo ${download.filename} está sendo baixado.`,
        })
      } else if (download.downloadBlob) {
        // Se temos o blob diretamente, cria uma URL temporária
        const url = URL.createObjectURL(download.downloadBlob)
        downloadFileFromUrl(url, download.filename)

        // Limpa a URL temporária após o download
        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 1000)

        toast({
          title: "Download iniciado",
          description: `O arquivo ${download.filename} está sendo baixado.`,
        })
      } else {
        toast({
          title: "Arquivo não disponível",
          description: "O arquivo não está mais disponível para download.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error)

      toast({
        title: "Erro ao baixar",
        description: "Ocorreu um erro ao tentar baixar o arquivo.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading((prev) => ({ ...prev, [download.id]: false }))
    }
  }

  // Função para remover um download
  const handleRemove = (id: string) => {
    removeDownload(id)
    setDownloads(downloads.filter((d) => d.id !== id))

    toast({
      title: "Download removido",
      description: "O download foi removido do histórico.",
    })
  }

  // Função para limpar todos os downloads
  const handleClearAll = () => {
    clearDownloads()
    setDownloads([])

    toast({
      title: "Histórico limpo",
      description: "Todos os downloads foram removidos do histórico.",
    })
  }

  // Função para formatar a data
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Função para formatar o tamanho em bytes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Função para obter o ícone de status
  const getStatusIcon = (status: DownloadStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "uploading":
        return <Upload className="h-4 w-4 text-blue-500" />
      case "chunking":
        return <Layers className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  // Função para obter a cor do badge de status
  const getStatusBadgeVariant = (status: DownloadStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "pending":
        return "secondary"
      case "uploading":
      case "chunking":
        return "secondary"
      case "completed":
        return "default"
      case "error":
        return "default" // Changed from "destructive" to "default" to make it blue
      default:
        return "outline"
    }
  }

  // Função para obter o texto do status
  const getStatusText = (status: DownloadStatus) => {
    switch (status) {
      case "pending":
        return "Processando"
      case "uploading":
        return "Enviando"
      case "chunking":
        return "Enviando em partes"
      case "completed":
        return "Concluído"
      case "error":
        return "Erro"
      default:
        return "Desconhecido"
    }
  }

  // Contagem de downloads por status
  const pendingCount = downloads.filter(
    (d) => d.status === "pending" || d.status === "uploading" || d.status === "chunking",
  ).length
  const completedCount = downloads.filter((d) => d.status === "completed").length
  const errorCount = downloads.filter((d) => d.status === "error").length

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Central de Downloads</CardTitle>
          {downloads.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Histórico
            </Button>
          )}
        </div>
        <CardDescription>Gerencie seus arquivos processados</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">
              Todos
              <Badge variant="outline" className="ml-2">
                {downloads.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">
              Processando
              <Badge variant="secondary" className="ml-2">
                {pendingCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">
              Concluídos
              <Badge variant="default" className="ml-2">
                {completedCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="error" className="flex-1">
              Erros
              <Badge variant="default" className="ml-2">
                {errorCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {sortedDownloads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-3">
                  {activeTab === "pending" ? (
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  ) : activeTab === "completed" ? (
                    <CheckCircle className="h-6 w-6 text-muted-foreground" />
                  ) : activeTab === "error" ? (
                    <AlertCircle className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <Download className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-lg font-semibold">Nenhum download encontrado</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "all"
                    ? "Processe arquivos para vê-los aqui."
                    : `Nenhum download com status "${
                        activeTab === "pending" ? "em processamento" : activeTab === "completed" ? "concluído" : "erro"
                      }".`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedDownloads.map((download) => (
                  <div key={download.id} className="border rounded-lg p-4">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            {download.fileType === "pdf" ? (
                              <div className="bg-pdf/10 p-2 rounded-md">
                                <Download className="h-5 w-5 text-pdf" />
                              </div>
                            ) : (
                              <div className="bg-txt/10 p-2 rounded-md">
                                <Download className="h-5 w-5 text-txt" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{download.filename}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{formatDate(download.timestamp)}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemove(download.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Mostrar barra de progresso para uploads em chunks */}
                      {download.status === "chunking" && download.progress !== undefined && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Enviando em partes</span>
                            <span className="text-muted-foreground">{download.progress}%</span>
                          </div>
                          <Progress value={download.progress} className="h-1" />
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={getStatusBadgeVariant(download.status)} className="flex items-center gap-1">
                          {getStatusIcon(download.status)}
                          {getStatusText(download.status)}
                        </Badge>

                        <div>
                          {download.status === "completed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(download)}
                              disabled={isDownloading[download.id]}
                            >
                              {isDownloading[download.id] ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                  Baixando...
                                </>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-1" />
                                  Baixar
                                </>
                              )}
                            </Button>
                          )}
                          {download.status === "pending" && (
                            <Button variant="outline" size="sm" disabled>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              Processando
                            </Button>
                          )}
                          {download.status === "uploading" && (
                            <Button variant="outline" size="sm" disabled>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              Enviando
                            </Button>
                          )}
                          {download.status === "chunking" && (
                            <Button variant="outline" size="sm" disabled>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              Enviando em partes
                            </Button>
                          )}
                          {download.status === "error" && (
                            <Button variant="outline" size="sm" disabled>
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Reprocessar
                            </Button>
                          )}
                        </div>
                      </div>

                      {download.status === "error" && download.errorMessage && (
                        <p className="text-xs text-blue-500 mt-1">{download.errorMessage}</p>
                      )}

                      {download.status === "completed" && !download.blobUrl && !download.downloadBlob && (
                        <p className="text-xs text-amber-500 mt-1">
                          {download.errorMessage || "Arquivo não disponível para download. O link pode ter expirado."}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
