// Tamanho de cada chunk em bytes (2MB)
const CHUNK_SIZE = 2 * 1024 * 1024

/**
 * Interface para o resultado do upload
 */
export interface UploadResult {
  url: string
  success: boolean
}

/**
 * Divide um arquivo em chunks para upload
 */
function createFileChunks(file: File): Blob[] {
  const chunks: Blob[] = []
  let start = 0

  while (start < file.size) {
    const end = Math.min(start + CHUNK_SIZE, file.size)
    chunks.push(file.slice(start, end))
    start = end
  }

  return chunks
}

/**
 * Faz upload de um arquivo em chunks
 */
export async function uploadFileInChunks(file: File, onProgress?: (progress: number) => void): Promise<UploadResult> {
  try {
    // Se o arquivo for pequeno (< 2MB), faz upload direto
    if (file.size <= CHUNK_SIZE) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("filename", file.name)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Erro ao fazer upload: ${response.status}`)
      }

      const data = await response.json()
      return { url: data.url, success: true }
    }

    // Para arquivos grandes, divide em chunks
    const chunks = createFileChunks(file)
    const totalChunks = chunks.length

    // Gera um ID único para este upload
    const uploadId = Date.now().toString(36) + Math.random().toString(36).substring(2)

    // Array para armazenar os IDs dos chunks
    const chunkIds: string[] = []

    // Faz upload de cada chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]

      // Cria um FormData para o chunk
      const formData = new FormData()
      formData.append("file", chunk)
      formData.append("filename", `${uploadId}_chunk_${i}`)
      formData.append("chunkIndex", i.toString())
      formData.append("totalChunks", totalChunks.toString())
      formData.append("uploadId", uploadId)
      formData.append("originalFilename", file.name)

      // Faz o upload do chunk
      const response = await fetch("/api/upload-chunk", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Erro ao fazer upload do chunk ${i}: ${response.status}`)
      }

      const data = await response.json()
      chunkIds.push(data.chunkId)

      // Atualiza o progresso
      if (onProgress) {
        onProgress(Math.round(((i + 1) / totalChunks) * 100))
      }
    }

    // Solicita a combinação dos chunks
    const combineResponse = await fetch("/api/combine-chunks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uploadId,
        chunkIds,
        filename: file.name,
        totalChunks,
      }),
    })

    if (!combineResponse.ok) {
      throw new Error(`Erro ao combinar chunks: ${combineResponse.status}`)
    }

    const finalData = await combineResponse.json()
    return { url: finalData.url, success: true }
  } catch (error) {
    console.error("Erro no upload em chunks:", error)
    throw error
  }
}
