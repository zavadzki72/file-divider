import { put, list, del } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { uploadId, chunkIds, filename, totalChunks } = await request.json()

    if (!uploadId || !chunkIds || !filename || !totalChunks) {
      return NextResponse.json({ error: "Dados incompletos para combinar chunks" }, { status: 400 })
    }

    // Verifica se todos os chunks foram enviados
    if (chunkIds.length !== Number.parseInt(totalChunks)) {
      return NextResponse.json(
        {
          error: "Número incorreto de chunks",
          message: `Esperado ${totalChunks} chunks, recebido ${chunkIds.length}`,
        },
        { status: 400 },
      )
    }

    // Lista todos os chunks deste upload
    const { blobs } = await list({
      prefix: uploadId,
    })

    if (blobs.length !== Number.parseInt(totalChunks)) {
      return NextResponse.json(
        {
          error: "Alguns chunks estão faltando",
          message: `Esperado ${totalChunks} chunks, encontrado ${blobs.length}`,
        },
        { status: 400 },
      )
    }

    // Ordena os blobs pelo índice no nome do arquivo
    blobs.sort((a, b) => {
      const indexA = Number.parseInt(a.pathname.split("_chunk_")[1])
      const indexB = Number.parseInt(b.pathname.split("_chunk_")[1])
      return indexA - indexB
    })

    // Baixa todos os chunks
    const chunkPromises = blobs.map(async (blob) => {
      const response = await fetch(blob.url)
      return response.arrayBuffer()
    })

    const chunkBuffers = await Promise.all(chunkPromises)

    // Calcula o tamanho total
    const totalSize = chunkBuffers.reduce((acc, buffer) => acc + buffer.byteLength, 0)

    // Cria um buffer combinado
    const combinedBuffer = new Uint8Array(totalSize)

    // Combina os chunks
    let offset = 0
    for (const buffer of chunkBuffers) {
      combinedBuffer.set(new Uint8Array(buffer), offset)
      offset += buffer.byteLength
    }

    // Cria um blob a partir do buffer combinado
    const combinedBlob = new Blob([combinedBuffer])

    // Nome final do arquivo
    const finalFilename = `${Date.now()}_${filename}`

    // Faz o upload do arquivo combinado
    const blob = await put(finalFilename, combinedBlob, {
      access: "public",
      addRandomSuffix: false,
    })

    // Limpa os chunks após combinar (opcional)
    for (const blobItem of blobs) {
      await del(blobItem.url)
    }

    // Retorna a URL do arquivo combinado
    return NextResponse.json({
      url: blob.url,
      success: true,
    })
  } catch (error) {
    console.error("Erro ao combinar chunks:", error)
    return NextResponse.json(
      {
        error: "Falha ao combinar chunks",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
