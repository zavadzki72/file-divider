import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Termos de Serviço</h1>
          <p className="text-gray-500">Última atualização: 14 de maio de 2025</p>
        </div>

        <div className="prose max-w-none">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou usar o FileDivider, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se
            você não concordar com qualquer parte destes termos, não poderá acessar ou usar nosso serviço.
          </p>

          <h2>2. Descrição do Serviço</h2>
          <p>
            O FileDivider é uma plataforma online que permite aos usuários dividir e organizar arquivos PDF e TXT
            utilizando expressões regulares e algoritmos automatizados. Nosso serviço processa os arquivos enviados e
            gera novos documentos organizados de acordo com as configurações do usuário.
          </p>

          <h2>3. Uso do Serviço</h2>
          <p>
            Você concorda em usar o FileDivider apenas para fins legais e de acordo com estes Termos. Você não deve:
          </p>
          <ul>
            <li>Violar quaisquer leis aplicáveis ou regulamentos</li>
            <li>Infringir direitos de propriedade intelectual ou outros direitos de terceiros</li>
            <li>Tentar interferir ou comprometer a integridade ou segurança do sistema</li>
            <li>Transmitir vírus, malware ou outros códigos maliciosos</li>
            <li>Coletar ou rastrear informações pessoais de outros usuários</li>
            <li>Usar o serviço para fins ilegais ou não autorizados</li>
          </ul>

          <h2>4. Conteúdo do Usuário</h2>
          <p>
            Ao enviar arquivos para processamento através do FileDivider, você mantém todos os direitos de propriedade
            sobre seu conteúdo. No entanto, você concede ao FileDivider uma licença limitada para processar, armazenar
            temporariamente e manipular seus arquivos exclusivamente para fornecer o serviço solicitado.
          </p>
          <p>
            Você é o único responsável por todo o conteúdo que envia e garante que tem todos os direitos necessários
            para compartilhar esse conteúdo e que ele não viola leis ou direitos de terceiros.
          </p>

          <h2>5. Privacidade e Segurança</h2>
          <p>
            Respeitamos sua privacidade e protegemos seus dados. Nosso tratamento de informações pessoais é regido por
            nossa{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Política de Privacidade
            </Link>
            , que é incorporada a estes Termos de Serviço.
          </p>
          <p>
            Implementamos medidas de segurança para proteger seus arquivos durante o processamento, mas nenhum sistema é
            completamente seguro. Não podemos garantir a segurança absoluta de suas informações.
          </p>

          <h2>6. Limitações do Serviço</h2>
          <p>
            O FileDivider é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou
            implícitas. Não garantimos que o serviço atenderá às suas necessidades específicas, será ininterrupto,
            oportuno, seguro ou livre de erros.
          </p>
          <p>
            Reservamo-nos o direito de modificar, suspender ou descontinuar o serviço (ou qualquer parte dele) a
            qualquer momento, com ou sem aviso prévio.
          </p>

          <h2>7. Limitação de Responsabilidade</h2>
          <p>
            Em nenhuma circunstância o FileDivider, seus diretores, funcionários, parceiros ou agentes serão
            responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo,
            sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes de:
          </p>
          <ul>
            <li>Seu acesso ou uso ou incapacidade de acessar ou usar o serviço</li>
            <li>Qualquer conduta ou conteúdo de terceiros no serviço</li>
            <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo</li>
            <li>Falha no processamento ou armazenamento de arquivos</li>
          </ul>

          <h2>8. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento. Notificaremos sobre mudanças
            significativas publicando os novos Termos nesta página. As alterações entrarão em vigor imediatamente após
            serem publicadas.
          </p>
          <p>
            Seu uso continuado do serviço após a publicação de Termos modificados constitui aceitação dessas
            modificações.
          </p>

          <h2>9. Lei Aplicável</h2>
          <p>
            Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições
            sobre conflitos de leis.
          </p>

          <h2>10. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através do email:
            contato@filedivider.com.br
          </p>
        </div>

        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
