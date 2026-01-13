import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as Blob
    const filename = formData.get("filename") as string
    const chunkIndex = formData.get("chunkIndex") as string
    const totalChunks = formData.get("totalChunks") as string
    const uploadId = formData.get("uploadId") as string
    const originalFilename = formData.get("originalFilename") as string

    if (!file || !filename || !chunkIndex || !totalChunks || !uploadId) {
      return NextResponse.json({ error: "Dados incompletos para upload de chunk" }, { status: 400 })
    }

    // Faz o upload do chunk para o Vercel Blob Storage
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    })

    // Gera um ID único para este chunk
    const chunkId = `${uploadId}_${chunkIndex}`

    // Retorna a URL do blob e o ID do chunk
    return NextResponse.json({
      url: blob.url,
      chunkId,
      success: true,
    })
  } catch (error) {
    console.error("Erro ao fazer upload do chunk:", error)
    return NextResponse.json(
      {
        error: "Falha ao fazer upload do chunk",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
