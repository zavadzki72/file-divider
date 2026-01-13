const API_BASE_URL = "https://filedivider-api-lctjimkxeq-uc.a.run.app/api"
import { saveDownload, updateDownload, generateId, type DownloadItem } from "@/lib/download-manager"
import { uploadFileInChunks } from "@/lib/upload"

// Atualize a interface Template para usar o nome correto do campo
export interface Template {
  id: string
  name: string
  extractionHelper: Record<string, string>
  createdAt: string
  updatedAt: string
}

export interface TemplateCreateRequest {
  name: string
  extractionHelpers: Record<string, string>
}

export interface TemplateUpdateRequest {
  name?: string
  extractionHelpers?: Record<string, string>
}

export interface ProcessPdfRequest {
  templateId?: string
  fileName?: string
  extractionHelpers?: Record<string, string>
}

export interface ProcessTxtRequest {
  breakByLines: boolean
  fileName?: string
  numberOfLines: number
  extractionHelpers?: Record<string, string>
}

export interface ProcessResponse {
  success: boolean
  message: string
  files?: string[]
  downloadBlob?: Blob
  downloadFilename?: string
  downloadId?: string
  blobUrl?: string
}

// Template API
export async function getTemplates(): Promise<Template[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/Template`)
    if (!response.ok) {
      throw new Error(`Failed to fetch templates: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching templates:", error)
    throw error
  }
}

export async function getTemplate(id: string): Promise<Template> {
  try {
    const response = await fetch(`${API_BASE_URL}/Template/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch template: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    console.log("Template API response:", data)
    return data
  } catch (error) {
    console.error(`Error fetching template ${id}:`, error)
    throw error
  }
}

// Atualize a função createTemplate para usar o nome correto do campo
export async function createTemplate(template: TemplateCreateRequest): Promise<Template> {
  // Se o template contém extractionHelpers, renomeie para extractionHelper
  if (template.extractionHelpers) {
    const { extractionHelpers, ...rest } = template
    const updatedTemplate = {
      ...rest,
      extractionHelper: extractionHelpers,
    }

    const response = await fetch(`${API_BASE_URL}/Template`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTemplate),
    })

    if (!response.ok) {
      throw new Error("Failed to create template")
    }
    return response.json()
  } else {
    const response = await fetch(`${API_BASE_URL}/Template`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    })

    if (!response.ok) {
      throw new Error("Failed to create template")
    }
    return response.json()
  }
}

// Atualize a função updateTemplate para usar o nome correto do campo
export async function updateTemplate(id: string, template: TemplateUpdateRequest): Promise<Template> {
  // Se o template contém extractionHelpers, renomeie para extractionHelper
  if (template.extractionHelpers) {
    const { extractionHelpers, ...rest } = template
    const updatedTemplate = {
      ...rest,
      extractionHelper: extractionHelpers,
    }

    const response = await fetch(`${API_BASE_URL}/Template/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTemplate),
    })

    if (!response.ok) {
      throw new Error("Failed to update template")
    }
    return response.json()
  } else {
    const response = await fetch(`${API_BASE_URL}/Template/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    })

    if (!response.ok) {
      throw new Error("Failed to update template")
    }
    return response.json()
  }
}

export async function deleteTemplate(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Template/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete template")
  }
}

// Função para processar a resposta do arquivo
async function handleFileResponse(
  response: Response,
  fileType: "pdf" | "txt",
  downloadId: string,
): Promise<ProcessResponse> {
  try {
    // Verifica se a resposta é um JSON (provavelmente um erro)
    const contentType = response.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      const jsonData = await response.json()

      // Atualiza o download com erro
      updateDownload(downloadId, {
        status: "error",
        errorMessage: jsonData.message || "Erro desconhecido",
      })

      return {
        success: false,
        message: jsonData.message || "Erro desconhecido",
        downloadId,
      }
    }

    // Se chegou aqui, é um arquivo binário
    console.log("Detectado arquivo binário, preparando para upload")

    // Obtém o nome do arquivo do cabeçalho Content-Disposition
    const disposition = response.headers.get("content-disposition")
    let filename = ""

    if (disposition && disposition.includes("filename=")) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = filenameRegex.exec(disposition)
      if (matches && matches[1]) {
        filename = matches[1].replace(/['"]/g, "")
      }
    }

    // Se não conseguir extrair o nome do arquivo, gera um nome padrão
    if (!filename) {
      const now = new Date()
      const formattedDate = `${now.getDate().toString().padStart(2, "0")}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getFullYear()}`
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`
      filename = `FileDivider_${formattedDate}_${formattedTime}.zip`
    }

    // Obtém o blob da resposta
    const blob = await response.blob()

    // Atualiza o download como "uploading"
    updateDownload(downloadId, {
      status: "uploading",
      filename,
    })

    // Converte o blob para File para usar com a função de upload em chunks
    const file = new File([blob], filename, { type: blob.type })

    try {
      // Inicia o upload em chunks
      updateDownload(downloadId, {
        status: "chunking",
        progress: 0,
      })

      // Usa a função de upload em chunks
      const { url, success } = await uploadFileInChunks(file, (progress) => {
        // Atualiza o progresso no download
        updateDownload(downloadId, {
          progress,
        })
      })

      if (success && url) {
        // Atualiza o download como concluído com a URL do blob
        updateDownload(downloadId, {
          status: "completed",
          blobUrl: url,
        })

        // Envia notificação se permitido
        if (Notification.permission === "granted") {
          const notification = new Notification("Arquivo Processado", {
            body: "Seu arquivo foi processado com sucesso e está pronto para download.",
            icon: "/favicon.ico",
          })

          notification.onclick = () => {
            window.focus()
          }
        }

        return {
          success: true,
          message: "Arquivo processado com sucesso e disponível para download",
          files: [filename],
          downloadBlob: blob,
          downloadFilename: filename,
          downloadId,
          blobUrl: url,
        }
      } else {
        throw new Error("Falha ao fazer upload do arquivo")
      }
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error)

      // Se falhar o upload, oferece download direto
      updateDownload(downloadId, {
        status: "completed",
        errorMessage: "Falha ao fazer upload do arquivo para armazenamento na nuvem. Use o botão de download direto.",
      })

      return {
        success: true,
        message: "Arquivo processado com sucesso, mas não foi possível armazená-lo na nuvem. Use o download direto.",
        files: [filename],
        downloadBlob: blob,
        downloadFilename: filename,
        downloadId,
      }
    }
  } catch (error) {
    console.error("Erro ao processar resposta:", error)

    // Atualiza o download com erro
    updateDownload(downloadId, {
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Erro desconhecido ao processar o arquivo",
    })

    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao processar o arquivo",
      downloadId,
    }
  }
}

// File Processing API
export async function processPdf(file: File, request: ProcessPdfRequest): Promise<ProcessResponse> {
  // Cria um ID para o download e salva no localStorage
  const downloadId = generateId()
  const downloadItem: DownloadItem = {
    id: downloadId,
    filename: file.name, // Nome temporário, será atualizado quando o download for concluído
    status: "pending",
    timestamp: Date.now(),
    fileType: "pdf",
  }

  saveDownload(downloadItem)

  const formData = new FormData()
  formData.append("FormFile", file)

  // Determina a URL base com base no template
  let url =
    request.templateId && request.templateId !== "no-template"
      ? `${API_BASE_URL}/FileDivisor/pdf`
      : `${API_BASE_URL}/FileDivisor/pdf/without-template`

  if (request.templateId && request.templateId !== "no-template") {
    url += `?templateId=${request.templateId}`
  }

  if (request.templateId && request.templateId !== "no-template" && request.fileName) {
    url += `&fileName=${request.fileName}`
  } else if (request.fileName) {
    formData.append("FileName", request.fileName)
  }

  // Adiciona os auxiliares de extração como campos do FormData
  if (request.extractionHelpers && Object.keys(request.extractionHelpers).length > 0) {
    for (const [key, value] of Object.entries(request.extractionHelpers)) {
      formData.append(`ExtractorHelper[${key}]`, value)
    }
  }

  try {
    console.log("Enviando requisição para:", url)

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      // Atualiza o download com erro
      updateDownload(downloadId, {
        status: "error",
        errorMessage: `Erro no servidor: ${response.status} ${response.statusText}`,
      })

      throw new Error(`Erro no servidor: ${response.status} ${response.statusText}`)
    }

    // Processa a resposta
    return await handleFileResponse(response, "pdf", downloadId)
  } catch (error) {
    console.error("Erro ao processar PDF:", error)

    // Atualiza o download com erro
    updateDownload(downloadId, {
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Erro desconhecido ao processar o arquivo",
    })

    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao processar o arquivo",
      downloadId,
    }
  }
}

export async function processTxt(file: File, request: ProcessTxtRequest): Promise<ProcessResponse> {
  // Cria um ID para o download e salva no localStorage
  const downloadId = generateId()
  const downloadItem: DownloadItem = {
    id: downloadId,
    filename: file.name, // Nome temporário, será atualizado quando o download for concluído
    status: "pending",
    timestamp: Date.now(),
    fileType: "txt",
  }

  saveDownload(downloadItem)

  const formData = new FormData()
  formData.append("FormFile", file)

  // Determina a URL base com base no método de processamento
  let url = request.breakByLines
    ? `${API_BASE_URL}/FileDivisor/txt/by-line`
    : `${API_BASE_URL}/FileDivisor/txt/without-template`

  // Adiciona o nome do arquivo ao FormData
  if (request.fileName) {
    formData.append("FileName", request.fileName)
  }

  // Adiciona o parâmetro de linha como query parameter se estiver usando quebra por linhas
  if (request.breakByLines && request.numberOfLines) {
    url += `?line=${request.numberOfLines}`
  }

  // Adiciona os auxiliares de extração como campos do FormData
  if (!request.breakByLines && request.extractionHelpers && Object.keys(request.extractionHelpers).length > 0) {
    for (const [key, value] of Object.entries(request.extractionHelpers)) {
      formData.append(`ExtractorHelper[${key}]`, value)
    }
  }

  try {
    console.log("Enviando requisição para:", url)

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      // Atualiza o download com erro
      updateDownload(downloadId, {
        status: "error",
        errorMessage: `Erro no servidor: ${response.status} ${response.statusText}`,
      })

      throw new Error(`Erro no servidor: ${response.status} ${response.statusText}`)
    }

    // Processa a resposta
    return await handleFileResponse(response, "txt", downloadId)
  } catch (error) {
    console.error("Erro ao processar TXT:", error)

    // Atualiza o download com erro
    updateDownload(downloadId, {
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Erro desconhecido ao processar o arquivo",
    })

    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao processar o arquivo",
      downloadId,
    }
  }
}
