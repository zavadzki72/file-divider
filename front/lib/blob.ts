import { updateDownload } from "@/lib/utils"
import { uploadLargeFile, type UploadProgressInfo } from "@/lib/chunk-upload"

// Maximum file size for direct upload (5MB)
const DIRECT_UPLOAD_LIMIT = 5 * 1024 * 1024

/**
 * Uploads a blob to Vercel Blob Storage
 * For large files, it uses chunked upload
 */
export async function uploadToVercelBlob(blob: Blob, filename: string, downloadId?: string): Promise<string | null> {
  try {
    // If the file is small, upload directly
    if (blob.size <= DIRECT_UPLOAD_LIMIT) {
      const formData = new FormData()
      formData.append("file", blob)
      formData.append("filename", filename)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erro ao fazer upload: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.url
    }
    // If the file is large, use chunked upload
    else {
      console.log(`Arquivo grande detectado (${(blob.size / (1024 * 1024)).toFixed(2)}MB). Usando upload em chunks.`)

      // Convert Blob to File for use with the chunked upload function
      const file = new File([blob], filename, { type: blob.type })

      // If we have a download ID, update the status to "chunking"
      if (downloadId) {
        updateDownload(downloadId, {
          status: "chunking",
          progress: 0,
        })
      }

      // Upload in chunks with progress callback
      try {
        const url = await uploadLargeFile(file, (info: UploadProgressInfo) => {
          console.log(`Upload em chunks: ${info.currentChunk}/${info.totalChunks} (${info.progress}%)`)

          // Update progress in download if we have an ID
          if (downloadId) {
            updateDownload(downloadId, {
              progress: info.progress,
            })
          }
        })

        return url
      } catch (error) {
        console.error("Erro no upload em chunks:", error)

        // Update download with error if we have an ID
        if (downloadId) {
          updateDownload(downloadId, {
            status: "error",
            errorMessage: error instanceof Error ? error.message : "Erro desconhecido no upload em chunks",
          })
        }

        return null
      }
    }
  } catch (error) {
    console.error("Erro ao fazer upload para o Vercel Blob:", error)
    return null
  }
}

/**
 * Downloads a file from a URL
 */
export function downloadFromUrl(url: string, filename: string): void {
  try {
    // Create an <a> element to download
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
    }, 100)
  } catch (error) {
    console.error("Erro ao fazer download do arquivo:", error)
    throw error
  }
}
