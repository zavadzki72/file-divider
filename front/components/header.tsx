"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, FileIcon as FilePdf, HelpCircle, Lock, ChevronDown, Grid } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const pathname = usePathname()

  // Função para verificar se o caminho atual corresponde a uma rota específica
  const isActivePath = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side: Logo, Name and Tools dropdown */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">FileDivider</span>
          </Link>

          {/* Tools Dropdown - Next to the logo */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 gap-1 text-base flex items-center">
                <Grid className="h-5 w-5 mr-1.5" />
                Ferramentas <ChevronDown className="h-4 w-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[700px] p-0">
              <div className="grid grid-cols-3 gap-4 p-6">
                {/* Processar Column */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Processar</h3>
                  <DropdownMenuGroup className="space-y-3">
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href="/pdf"
                        className={`flex items-center gap-3 rounded-md p-3 hover:bg-gray-100 w-full cursor-pointer ${
                          isActivePath("/pdf") ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-pdf/10">
                          <FilePdf className="h-5 w-5 text-pdf" />
                        </div>
                        <span className="font-medium">Processar PDF</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href="/txt"
                        className={`flex items-center gap-3 rounded-md p-3 hover:bg-gray-100 w-full cursor-pointer ${
                          isActivePath("/txt") ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-txt/10">
                          <FileText className="h-5 w-5 text-txt" />
                        </div>
                        <span className="font-medium">Processar TXT</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </div>

                {/* Ajuda Column */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Ajuda</h3>
                  <DropdownMenuGroup className="space-y-3">
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href="/help/tutorials/pdf"
                        className={`flex items-center gap-3 rounded-md p-3 hover:bg-gray-100 w-full cursor-pointer ${
                          isActivePath("/help/tutorials/pdf") ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-100">
                          <svg
                            className="h-5 w-5 text-amber-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">Tutorial PDF</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href="/help/tutorials/txt"
                        className={`flex items-center gap-3 rounded-md p-3 hover:bg-gray-100 w-full cursor-pointer ${
                          isActivePath("/help/tutorials/txt") ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-100">
                          <svg
                            className="h-5 w-5 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <span className="font-medium">Tutorial TXT</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </div>

                {/* Mais Column */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Mais</h3>
                  <DropdownMenuGroup className="space-y-3">
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href="/help"
                        className={`flex items-center gap-3 rounded-md p-3 hover:bg-gray-100 w-full cursor-pointer ${
                          isActivePath("/help") && !isActivePath("/help/tutorials") ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                          <HelpCircle className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="font-medium">Centro de Ajuda</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="p-0">
                      <Link
                        href="/admin/login"
                        className={`flex items-center gap-3 rounded-md p-3 hover:bg-gray-100 w-full cursor-pointer ${
                          isActivePath("/admin") ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-red-100">
                          <Lock className="h-5 w-5 text-red-600" />
                        </div>
                        <span className="font-medium">Área Administrativa</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Spacer to push right side buttons to the edge */}
        <div className="flex-1"></div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-3">
          <Link href="/help" passHref>
            <Button variant={pathname === "/help" ? "default" : "ghost"} size="sm" className="text-sm font-medium">
              <HelpCircle className="mr-2 h-4 w-4" />
              Ajuda
            </Button>
          </Link>
          <Link href="/admin" passHref>
            <Button variant={pathname === "/admin" ? "default" : "ghost"} size="sm" className="text-sm font-medium">
              <Lock className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
