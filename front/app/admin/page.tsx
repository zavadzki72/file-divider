"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTemplates, deleteTemplate, type Template } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Edit, Trash2, LogOut } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      setIsLoading(true)
      const data = await getTemplates()
      setTemplates(Array.isArray(data) ? data : [])

      // Add toast notification for successful template loading
      if (Array.isArray(data) && data.length > 0) {
        toast({
          title: "Templates carregados",
          description: `${data.length} templates encontrados.`,
        })
      }
    } catch (error) {
      console.error("Falha ao buscar templates:", error)
      toast({
        title: "Erro ao carregar templates",
        description: "Não foi possível carregar os templates. Verifique sua conexão e tente novamente.",
        variant: "destructive",
      })
      setTemplates([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este template?")) {
      return
    }

    try {
      await deleteTemplate(id)

      // Add toast notification for successful template deletion
      toast({
        title: "Template excluído",
        description: "O template foi excluído com sucesso.",
      })

      fetchTemplates()
    } catch (error) {
      console.error("Falha ao excluir template:", error)
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o template. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    logout()

    // Add toast notification for logout
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })

    router.push("/")
  }

  // Função para truncar texto longo
  const truncateText = (text: string, maxLength = 30) => {
    if (!text) return ""
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-gray-500">Gerencie templates e configurações para o FileDivider.</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <Tabs defaultValue="templates">
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Templates</h2>
            <Link href="/admin/templates/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Template
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : templates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-muted-foreground mb-4">Nenhum template encontrado.</p>
                <Link href="/admin/templates/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Auxiliares de Extração:</p>
                      {template.extractionHelper && Object.entries(template.extractionHelper).length > 0 ? (
                        <ul className="text-sm space-y-2">
                          {Object.entries(template.extractionHelper || {}).map(([key, value]) => (
                            <li key={key}>
                              <div className="font-medium">{key}:</div>
                              <div className="text-muted-foreground break-words text-xs overflow-hidden">
                                {String(value)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">Nenhum auxiliar de extração definido.</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 mt-auto">
                    <Link href={`/admin/templates/edit/${template.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
