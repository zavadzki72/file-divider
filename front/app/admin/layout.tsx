"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <AdminAuthCheck>{children}</AdminAuthCheck>
      <Toaster />
    </AuthProvider>
  )
}

function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If not authenticated and not on the login page, redirect to login
    if (!isAuthenticated && pathname !== "/admin/login") {
      console.log("Not authenticated, redirecting to login page")
      router.push("/admin/login")
    } else {
      console.log("Auth check passed:", { isAuthenticated, pathname })
    }
  }, [isAuthenticated, pathname, router])

  // If on login page, render children regardless of auth status
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // If not authenticated, render nothing (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // If authenticated, render children
  return <>{children}</>
}
