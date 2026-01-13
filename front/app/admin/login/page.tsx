"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, User, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Already authenticated, redirecting to admin page")
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, digite o email e a senha.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso.",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Erro de Autenticação",
          description: "Email ou senha inválidos. Verifique suas credenciais e tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro de login:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl">
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Área Administrativa</h1>
            <p className="text-gray-500 mt-2">
              Acesse o painel administrativo para gerenciar templates e configurações do FileDivider.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-6 rounded-lg text-white">
            <Shield className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Acesso Restrito</h3>
            <p className="text-sm opacity-90">
              Esta área é exclusiva para administradores autorizados. Se você não possui credenciais de acesso, por
              favor retorne à página principal.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
              &larr; Voltar para a página inicial
            </Link>
            <Link href="/help" className="text-sm text-gray-500 hover:text-gray-900">
              Precisa de ajuda?
            </Link>
          </div>
        </div>

        <Card className="shadow-lg border-gray-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login Administrativo</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar a área administrativa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu-email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
