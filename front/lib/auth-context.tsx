"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

const API_BASE_URL = "https://filedivider-api-lctjimkxeq-uc.a.run.app/api"

// Store auth data with expiration (7 days)
const storeAuthData = () => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 7) // 7 days from now

  const authData = {
    authenticated: true,
    expires: expirationDate.getTime(),
  }

  localStorage.setItem("filedivider_auth", JSON.stringify(authData))
  console.log("Auth data stored:", authData)
}

// Check if auth is valid
const isAuthValid = () => {
  try {
    const authDataString = localStorage.getItem("filedivider_auth")
    if (!authDataString) {
      console.log("No auth data found in localStorage")
      return false
    }

    const authData = JSON.parse(authDataString)
    const now = new Date().getTime()

    const isValid = authData.authenticated && authData.expires > now
    console.log("Auth validation:", {
      isValid,
      authenticated: authData.authenticated,
      expires: new Date(authData.expires).toLocaleString(),
      now: new Date(now).toLocaleString(),
      timeLeft: Math.round((authData.expires - now) / (1000 * 60 * 60 * 24)) + " days",
    })

    return isValid
  } catch (error) {
    console.error("Error checking auth validity:", error)
    return false
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Verificar autenticação ao montar o componente
  useEffect(() => {
    // Verificar se o usuário já está autenticado
    const checkAuth = () => {
      const valid = isAuthValid()
      console.log("Initial auth check:", valid)
      setIsAuthenticated(valid)
    }

    checkAuth()

    // Adicionar um listener para o evento storage para sincronizar entre abas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "filedivider_auth") {
        console.log("Auth data changed in another tab")
        const valid = isAuthValid()
        setIsAuthenticated(valid)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", { email })

      const response = await fetch(`${API_BASE_URL}/User/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("Login response status:", response.status)

      if (response.status === 204) {
        // Login successful (NoContent)
        console.log("Login successful")
        storeAuthData() // Store with expiration
        setIsAuthenticated(true)
        return true
      } else if (response.status === 403) {
        // Invalid credentials (Forbidden)
        console.log("Login failed: Invalid credentials")
        return false
      } else {
        // Other error
        console.error("Login error:", response.status, response.statusText)
        return false
      }
    } catch (error) {
      console.error("Error connecting to server:", error)
      return false
    }
  }

  const logout = () => {
    console.log("Logging out")
    localStorage.removeItem("filedivider_auth")
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
