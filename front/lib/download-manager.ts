// Tipos para o gerenciador de downloads
export type DownloadStatus = "pending" | "completed" | "error" | "uploading" | "chunking"

// Interface DownloadItem
export interface DownloadItem {
  id: string
  filename: string
  status: DownloadStatus
  timestamp: number
  fileType: "pdf" | "txt"
  errorMessage?: string
  blobUrl?: string // URL do Vercel Blob Storage
  progress?: number // Progresso do upload em chunks (0-100)
  downloadBlob?: Blob // Blob para download direto
}

const STORAGE_KEY = "filedivider_downloads"
const MAX_STORAGE_ITEMS = 20 // Limita o número máximo de downloads armazenados

// Função para gerar um ID único
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Função para salvar um download no localStorage
export function saveDownload(download: DownloadItem): void {
  try {
    const downloads = getDownloads()

    // Adiciona o novo download
    downloads.push(download)

    // Ordena por timestamp (mais recentes primeiro) e limita o número de itens
    const sortedDownloads = downloads.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_STORAGE_ITEMS)

    // Salva no localStorage
    try {
      // Não podemos salvar o blob diretamente no localStorage, então criamos uma cópia sem o blob
      const downloadsToSave = sortedDownloads.map((d) => {
        const { downloadBlob, ...rest } = d
        return rest
      })

      localStorage.setItem(STORAGE_KEY, JSON.stringify(downloadsToSave))
    } catch (storageError) {
      console.error("Erro ao salvar no localStorage:", storageError)

      // Se falhar, tenta remover alguns downloads antigos
      const reducedDownloads = sortedDownloads.slice(0, 10).map((d) => {
        const { downloadBlob, ...rest } = d
        return rest
      })

      localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedDownloads))
    }
  } catch (error) {
    console.error("Erro ao salvar download:", error)
  }
}

// Função para atualizar um download existente
export function updateDownload(id: string, updates: Partial<DownloadItem>): void {
  try {
    const downloads = getDownloads()
    const index = downloads.findIndex((d) => d.id === id)

    if (index !== -1) {
      // Preserva o blob se existir e não estiver sendo atualizado
      const currentBlob = downloads[index].downloadBlob

      downloads[index] = {
        ...downloads[index],
        ...updates,
        // Mantém o blob atual se não estiver sendo atualizado
        downloadBlob: updates.downloadBlob !== undefined ? updates.downloadBlob : currentBlob,
      }

      // Salva no localStorage
      try {
        // Não podemos salvar o blob diretamente no localStorage
        const downloadsToSave = downloads.map((d) => {
          const { downloadBlob, ...rest } = d
          return rest
        })

        localStorage.setItem(STORAGE_KEY, JSON.stringify(downloadsToSave))
      } catch (storageError) {
        console.error("Erro ao atualizar no localStorage:", storageError)

        // Se falhar, tenta remover alguns downloads antigos
        const reducedDownloads = downloads.slice(0, 10).map((d) => {
          const { downloadBlob, ...rest } = d
          return rest
        })

        localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedDownloads))
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar download:", error)
  }
}

// Função para obter todos os downloads
export function getDownloads(): DownloadItem[] {
  try {
    const downloadsJson = localStorage.getItem(STORAGE_KEY)
    if (!downloadsJson) return []

    const downloads = JSON.parse(downloadsJson) as DownloadItem[]

    // Filtra downloads mais antigos que 7 dias
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const filteredDownloads = downloads.filter((d) => d.timestamp > sevenDaysAgo)

    // Se filtramos alguns downloads, atualize o localStorage
    if (filteredDownloads.length < downloads.length) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDownloads))
      } catch (error) {
        console.error("Erro ao atualizar localStorage após filtrar downloads antigos:", error)
      }
    }

    return filteredDownloads
  } catch (error) {
    console.error("Erro ao analisar downloads do localStorage:", error)
    return []
  }
}

// Função para remover um download
export function removeDownload(id: string): void {
  try {
    const downloads = getDownloads()
    const filteredDownloads = downloads.filter((d) => d.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDownloads))
  } catch (error) {
    console.error("Erro ao remover download:", error)
  }
}

// Função para limpar todos os downloads
export function clearDownloads(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Erro ao limpar downloads:", error)
  }
}

// Função para baixar um arquivo a partir de uma URL
export function downloadFileFromUrl(url: string, filename: string): void {
  try {
    // Cria um elemento <a> para fazer o download
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()

    // Limpa recursos
    setTimeout(() => {
      document.body.removeChild(a)
    }, 100)
  } catch (error) {
    console.error("Erro ao fazer download do arquivo:", error)
    throw error
  }
}

// Função para verificar o espaço disponível no localStorage (aproximado)
export function getLocalStorageUsage(): { used: number; total: number; percentage: number } {
  try {
    const total = 5 * 1024 * 1024 // 5MB é o limite típico para a maioria dos navegadores
    let used = 0

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const value = localStorage.getItem(key) || ""
        used += (key.length + value.length) * 2 // Aproximadamente 2 bytes por caractere
      }
    }

    return {
      used,
      total,
      percentage: (used / total) * 100,
    }
  } catch (error) {
    console.error("Erro ao calcular uso do localStorage:", error)
    return { used: 0, total: 5 * 1024 * 1024, percentage: 0 }
  }
}

export function downloadFile(url: string, filename: string): void {
  downloadFileFromUrl(url, filename)
}
