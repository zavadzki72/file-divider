/**
 * Utilitário para upload de arquivos grandes em chunks
 */

// Tamanho de cada chunk em bytes (5MB)
const CHUNK_SIZE = 5 * 1024 * 1024

/**
 * Divide um arquivo em chunks para upload
 */
export function createFileChunks(file: File, chunkSize: number = CHUNK_SIZE): Blob[] {
  const chunks: Blob[] = []
  let start = 0

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size)
    chunks.push(file.slice(start, end))
    start = end
  }

  return chunks
}

/**
 * Interface para o progresso do upload
 */
export interface UploadProgressInfo {
  totalChunks: number
  currentChunk: number
  progress: number // 0-100
}

/**
 * Faz upload de um arquivo grande em chunks
 */
export async function uploadLargeFile(file: File, onProgress?: (info: UploadProgressInfo) => void): Promise<string> {
  // Gera um ID único para o arquivo
  const fileId = Date.now().toString(36) + Math.random().toString(36).substring(2)
  const filename = `${fileId}-${file.name}`

  // Divide o arquivo em chunks
  const chunks = createFileChunks(file)
  const totalChunks = chunks.length

  // Array para armazenar as URLs dos chunks
  const chunkUrls: string[] = []

  // Faz upload de cada chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const chunkFilename = `${filename}.part${i}`

    // Cria um FormData para o chunk
    const formData = new FormData()
    formData.append("file", chunk)
    formData.append("filename", chunkFilename)
    formData.append("fileId", fileId)
    formData.append("chunkIndex", i.toString())
    formData.append("totalChunks", totalChunks.toString())

    // Faz o upload do chunk
    const response = await fetch("/api/upload-chunk", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Erro ao fazer upload do chunk ${i}: ${response.status}`)
    }

    const data = await response.json()
    chunkUrls.push(data.url)

    // Notifica o progresso
    if (onProgress) {
      onProgress({
        totalChunks,
        currentChunk: i + 1,
        progress: Math.round(((i + 1) / totalChunks) * 100),
      })
    }
  }

  // Solicita a combinação dos chunks no servidor
  const combineResponse = await fetch("/api/combine-chunks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileId,
      filename: file.name,
      totalChunks,
      chunkUrls,
    }),
  })

  if (!combineResponse.ok) {
    const errorData = await combineResponse.json()
    throw new Error(errorData.message || `Erro ao combinar chunks: ${combineResponse.status}`)
  }

  const finalData = await combineResponse.json()
  return finalData.url
}
