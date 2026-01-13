"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Minus, ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getTemplate, updateTemplate } from "@/lib/api"
import Link from "next/link"

export default function EditTemplatePage({ params }: { params: { id: string } }) {
  const [name, setName] = useState("")
  const [extractionHelpers, setExtractionHelpers] = useState<{ key: string; value: string }[]>([
    { key: "Inicio", value: "" },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setIsLoading(true)
        const template = await getTemplate(id)

        // Set the template name
        setName(template.name || "")

        // Debug: Log the template data to see what we're getting
        console.log("Template data:", template)
        console.log("Extraction helpers:", template.extractionHelpers)

        // Check if extractionHelper exists and is not null
        if (template.extractionHelper && typeof template.extractionHelper === "object") {
          // Convert object to array of key-value pairs
          const helpers = Object.entries(template.extractionHelper).map(([key, value]) => ({
            key,
            value: String(value), // Ensure value is a string
          }))

          // Ensure 'Inicio' is present
          if (!helpers.some((helper) => helper.key === "Inicio")) {
            helpers.unshift({ key: "Inicio", value: "" })
          }

          setExtractionHelpers(helpers.length > 0 ? helpers : [{ key: "Inicio", value: "" }])
        } else {
          // If no extraction helpers, set default
          setExtractionHelpers([{ key: "Inicio", value: "" }])
        }

        // Add toast notification for successful template loading
        toast({
          title: "Template carregado",
          description: "Template carregado com sucesso.",
        })
      } catch (error) {
        console.error("Falha ao buscar template:", error)
        toast({
          title: "Erro ao carregar template",
          description: "Não foi possível carregar o template. Verifique sua conexão e tente novamente.",
          variant: "destructive",
        })
        router.push("/admin")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplate()
  }, [id, router, toast])

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
    setExtractionHelpers(newHelpers.length > 0 ? newHelpers : [{ key: "Inicio", value: "" }])
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

      await updateTemplate(id, {
        name: name.trim(),
        extractionHelpers: helpersObject,
      })

      toast({
        title: "Template atualizado",
        description: "O template foi atualizado com sucesso.",
      })

      router.push("/admin")
    } catch (error) {
      console.error("Falha ao atualizar template:", error)
      toast({
        title: "Erro ao atualizar template",
        description: "Não foi possível atualizar o template. Verifique os dados e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
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
          <CardTitle>Editar Template</CardTitle>
          <CardDescription>Atualize o template para processamento de arquivos PDF.</CardDescription>
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
                  Atualizando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Atualizar Template
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
