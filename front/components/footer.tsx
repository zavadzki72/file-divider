import Link from "next/link"
import { FileText, Github, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl">FileDivider</span>
            </div>
            <p className="text-sm text-gray-600">Tornamos a divisão de arquivos fácil.</p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://github.com/zavadzki72"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://marccusz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">Ferramentas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pdf" className="text-gray-600 hover:text-gray-900 text-sm">
                  Processar PDF
                </Link>
              </li>
              <li>
                <Link href="/txt" className="text-gray-600 hover:text-gray-900 text-sm">
                  Processar TXT
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900 text-sm">
                  Centro de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-gray-600 hover:text-gray-900 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} FileDivider. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
