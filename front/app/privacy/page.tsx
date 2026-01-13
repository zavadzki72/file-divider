import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold mb-3">Política de Privacidade</h1>
          <p className="text-gray-500">Última atualização: 14 de maio de 2025</p>
        </div>

        <div className="prose max-w-none">
          <h2>1. Introdução</h2>
          <p>
            O FileDivider está comprometido em proteger sua privacidade. Esta Política de Privacidade explica como
            coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nosso serviço.
          </p>
          <p>
            Ao usar o FileDivider, você concorda com a coleta e uso de informações de acordo com esta política. As
            informações pessoais que coletamos são usadas apenas para fornecer e melhorar o serviço. Não usaremos ou
            compartilharemos suas informações com ninguém, exceto conforme descrito nesta Política de Privacidade.
          </p>

          <h2>2. Informações que Coletamos</h2>
          <p>Podemos coletar os seguintes tipos de informações:</p>
          <h3>2.1 Informações de Uso</h3>
          <p>
            Coletamos informações sobre como você interage com nosso serviço, como os tipos de arquivos processados,
            recursos utilizados e outras ações realizadas no serviço.
          </p>
          <h3>2.2 Arquivos Enviados</h3>
          <p>
            Para fornecer nosso serviço, processamos os arquivos que você envia. Estes arquivos são armazenados
            temporariamente em nossos servidores durante o processamento e por um curto período após (geralmente 24
            horas) para permitir o download dos resultados.
          </p>
          <h3>2.3 Informações do Dispositivo</h3>
          <p>
            Podemos coletar informações sobre o dispositivo que você usa para acessar nosso serviço, incluindo tipo de
            dispositivo, sistema operacional, navegador e configurações de idioma.
          </p>

          <h2>3. Como Usamos Suas Informações</h2>
          <p>Usamos as informações coletadas para:</p>
          <ul>
            <li>Fornecer, manter e melhorar nosso serviço</li>
            <li>Processar seus arquivos conforme solicitado</li>
            <li>Detectar, prevenir e resolver problemas técnicos</li>
            <li>Monitorar o uso do serviço para melhorar a experiência do usuário</li>
            <li>Desenvolver novos recursos e funcionalidades</li>
          </ul>

          <h2>4. Armazenamento e Segurança de Dados</h2>
          <p>
            Levamos a segurança de seus dados a sério e implementamos medidas técnicas e organizacionais apropriadas
            para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
          <p>
            <strong>Armazenamento Temporário:</strong> Seus arquivos são armazenados apenas temporariamente em nossos
            servidores. Após o processamento, os arquivos resultantes ficam disponíveis para download por um período
            limitado (geralmente 24 horas), após o qual são automaticamente excluídos.
          </p>
          <p>
            <strong>Transmissão Segura:</strong> Todas as transmissões de dados entre seu dispositivo e nossos
            servidores são protegidas usando criptografia SSL/TLS.
          </p>

          <h2>5. Compartilhamento de Informações</h2>
          <p>
            Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros. Isso não inclui terceiros
            confiáveis que nos auxiliam na operação do nosso serviço, desde que concordem em manter essas informações
            confidenciais.
          </p>
          <p>
            Podemos divulgar suas informações quando acreditamos que a liberação é apropriada para cumprir a lei,
            aplicar nossas políticas do site ou proteger nossos ou outros direitos, propriedade ou segurança.
          </p>

          <h2>6. Seus Direitos</h2>
          <p>Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
          <ul>
            <li>Direito de acesso às suas informações pessoais</li>
            <li>Direito de retificação de informações incorretas</li>
            <li>Direito de exclusão de suas informações pessoais</li>
            <li>Direito de restringir o processamento de suas informações</li>
            <li>Direito à portabilidade de dados</li>
            <li>Direito de se opor ao processamento de suas informações</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, entre em contato conosco através do email:
            privacidade@filedivider.com.br
          </p>

          <h2>7. Cookies e Tecnologias Semelhantes</h2>
          <p>
            Usamos cookies e tecnologias semelhantes para rastrear a atividade em nosso serviço e armazenar certas
            informações. Cookies são arquivos com pequena quantidade de dados que podem incluir um identificador único
            anônimo.
          </p>
          <p>
            Você pode instruir seu navegador a recusar todos os cookies ou indicar quando um cookie está sendo enviado.
            No entanto, se você não aceitar cookies, pode não conseguir usar algumas partes do nosso serviço.
          </p>

          <h2>8. Serviços de Terceiros</h2>
          <p>
            Nosso serviço pode conter links para outros sites que não são operados por nós. Se você clicar em um link de
            terceiros, será direcionado para o site desse terceiro. Recomendamos fortemente que você revise a Política
            de Privacidade de cada site que visitar.
          </p>
          <p>
            Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de
            quaisquer sites ou serviços de terceiros.
          </p>

          <h2>9. Privacidade de Crianças</h2>
          <p>
            Nosso serviço não se destina a pessoas com menos de 18 anos. Não coletamos intencionalmente informações
            pessoais identificáveis de crianças menores de 18 anos. Se descobrirmos que uma criança menor de 18 anos nos
            forneceu informações pessoais, excluiremos imediatamente essas informações de nossos servidores.
          </p>

          <h2>10. Alterações nesta Política de Privacidade</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer
            alterações publicando a nova Política de Privacidade nesta página.
          </p>
          <p>
            Recomendamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações. As
            alterações a esta Política de Privacidade são efetivas quando publicadas nesta página.
          </p>

          <h2>11. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do email:
            privacidade@filedivider.com.br
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
