"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Minus, ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createTemplate } from "@/lib/api"
import Link from "next/link"

export default function NewTemplatePage() {
  const [name, setName] = useState("")
  const [extractionHelpers, setExtractionHelpers] = useState<{ key: string; value: string }[]>([
    { key: "Inicio", value: "" },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const addExtractionHelper = () => {
    setExtractionHelpers([...extractionHelpers, { key: "", value: "" }])
  }

  const removeExtractionHelper = (index: number) => {
    // Prevent removing the 'Inicio' helper
    if (extractionHelpers[index].key === "Inicio") {
      toast({
        title: "Ação não permitida",
        description: "O auxiliar 'Inicio' é obrigatório e não pode ser removido.",
        variant: "destructive",
      })
      return
    }

    const newHelpers = [...extractionHelpers]
    newHelpers.splice(index, 1)
    setExtractionHelpers(newHelpers)
  }

  const updateExtractionHelper = (index: number, field: "key" | "value", value: string) => {
    const newHelpers = [...extractionHelpers]

    // Prevent changing the key if it's 'Inicio'
    if (field === "key" && newHelpers[index].key === "Inicio") {
      toast({
        title: "Ação não permitida",
        description: "A chave 'Inicio' é obrigatória e não pode ser alterada.",
        variant: "destructive",
      })
      return
    }

    newHelpers[index][field] = value
    setExtractionHelpers(newHelpers)
  }

  // Atualize a função handleSubmit para usar o nome correto do campo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "O nome do template é obrigatório.",
        variant: "destructive",
      })
      return
    }

    // Check if 'Inicio' helper exists and has a value
    const inicioHelper = extractionHelpers.find((helper) => helper.key === "Inicio")
    if (!inicioHelper || !inicioHelper.value.trim()) {
      toast({
        title: "Erro",
        description: "O auxiliar 'Inicio' é obrigatório e deve ter um valor.",
        variant: "destructive",
      })
      return
    }

    // Valida auxiliares de extração
    const validHelpers = extractionHelpers.filter((helper) => helper.key.trim() && helper.value.trim())
    if (validHelpers.length === 0) {
      toast({
        title: "Erro",
        description: "Pelo menos um auxiliar de extração válido é necessário.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Converte array de auxiliares de extração para objeto
      const helpersObject: Record<string, string> = {}
      validHelpers.forEach((helper) => {
        helpersObject[helper.key.trim()] = helper.value.trim()
      })

      await createTemplate({
        name: name.trim(),
        extractionHelpers: helpersObject,
      })

      toast({
        title: "Template criado",
        description: "O template foi criado com sucesso.",
      })

      router.push("/admin")
    } catch (error) {
      console.error("Falha ao criar template:", error)
      toast({
        title: "Erro ao criar template",
        description: "Não foi possível criar o template. Verifique os dados e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Painel
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Criar Novo Template</CardTitle>
          <CardDescription>Crie um novo template para processamento de arquivos PDF.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Template</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome do template"
                required
              />
            </div>

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
                    placeholder="Valor"
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
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Criar Template
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
