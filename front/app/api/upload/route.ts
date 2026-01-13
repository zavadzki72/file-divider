import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const filename = formData.get("filename") as string

    if (!file || !filename) {
      return NextResponse.json({ error: "Arquivo ou nome do arquivo não fornecido" }, { status: 400 })
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Arquivo muito grande",
          message: `O tamanho máximo permitido é ${MAX_FILE_SIZE / (1024 * 1024)}MB. Seu arquivo tem ${(file.size / (1024 * 1024)).toFixed(2)}MB.`,
        },
        { status: 413 },
      )
    }

    // Gera um nome único para o arquivo
    const uniqueFilename = `${Date.now()}-${filename}`

    // Faz o upload para o Vercel Blob Storage
    const blob = await put(uniqueFilename, file, {
      access: "public",
      addRandomSuffix: false,
    })

    // Retorna a URL do blob
    return NextResponse.json({
      url: blob.url,
      success: true,
    })
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error)
    return NextResponse.json(
      {
        error: "Falha ao fazer upload do arquivo",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
