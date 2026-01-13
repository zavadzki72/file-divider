import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/help" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para o Centro de Ajuda
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Perguntas Frequentes</h1>
          <p className="text-gray-500">Encontre respostas para as dúvidas mais comuns sobre o FileDivider</p>
        </div>

        <div className="space-y-8">
          <section id="general" className="space-y-4">
            <h2 className="text-xl font-bold">Perguntas Gerais</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-is-filedivider">
                <AccordionTrigger>O que é o FileDivider?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    O FileDivider é uma plataforma online que permite dividir e organizar arquivos PDF e TXT de forma
                    eficiente. Utilizando expressões regulares e algoritmos avançados, o FileDivider identifica padrões
                    em seus documentos e os divide em múltiplos arquivos menores, facilitando a organização e o
                    gerenciamento de informações.
                  </p>
                  <p>
                    É especialmente útil para processar grandes volumes de documentos, como extratos bancários,
                    relatórios, contratos e outros tipos de arquivos que seguem um padrão estruturado.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="who-can-use">
                <AccordionTrigger>Quem pode usar o FileDivider?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    O FileDivider pode ser usado por qualquer pessoa ou organização que precise processar e organizar
                    documentos de forma eficiente. É especialmente útil para:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Profissionais de contabilidade e finanças</li>
                    <li>Departamentos administrativos e de recursos humanos</li>
                    <li>Escritórios de advocacia e departamentos jurídicos</li>
                    <li>Profissionais que lidam com grandes volumes de documentação</li>
                    <li>Qualquer pessoa que precise organizar arquivos PDF ou TXT</li>
                  </ul>
                  <p>
                    Não é necessário conhecimento técnico avançado para usar o FileDivider, embora um entendimento
                    básico de expressões regulares possa ser útil para configurações mais avançadas.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cost">
                <AccordionTrigger>O FileDivider é gratuito?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Sim, o FileDivider é completamente gratuito para uso. Não há custos ocultos ou limitações de
                    funcionalidades na versão gratuita.
                  </p>
                  <p>
                    No entanto, existem limitações técnicas, como o tamanho máximo de arquivo (10MB) e o número de
                    arquivos que podem ser processados simultaneamente, para garantir a qualidade do serviço para todos
                    os usuários.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="security" className="space-y-4">
            <h2 className="text-xl font-bold">Segurança e Privacidade</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="file-security">
                <AccordionTrigger>Como meus arquivos são protegidos?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    A segurança dos seus dados é nossa prioridade. O FileDivider implementa várias medidas para proteger
                    seus arquivos:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Todos os arquivos são processados em um ambiente seguro e isolado</li>
                    <li>A transmissão de dados é protegida por criptografia SSL/TLS</li>
                    <li>Os arquivos são armazenados temporariamente apenas durante o processamento</li>
                    <li>
                      Após o download ou após um curto período, todos os arquivos são automaticamente excluídos dos
                      nossos servidores
                    </li>
                    <li>Não acessamos, analisamos ou compartilhamos o conteúdo dos seus arquivos com terceiros</li>
                  </ul>
                  <p>
                    Recomendamos que você faça o download dos seus arquivos processados imediatamente após o
                    processamento, pois eles não são armazenados permanentemente em nossos servidores.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-storage">
                <AccordionTrigger>Por quanto tempo meus dados são armazenados?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    O FileDivider não armazena permanentemente seus arquivos. O ciclo de vida dos seus dados é o
                    seguinte:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 mb-2">
                    <li>Seus arquivos são carregados para nossos servidores quando você os envia para processamento</li>
                    <li>Durante o processamento, os arquivos são mantidos em um ambiente seguro e isolado</li>
                    <li>
                      Após o processamento, os arquivos resultantes ficam disponíveis para download por um curto período
                      (geralmente 24 horas)
                    </li>
                    <li>
                      Após esse período, ou imediatamente após o download, todos os arquivos são automaticamente
                      excluídos dos nossos servidores
                    </li>
                  </ol>
                  <p>
                    Informações básicas sobre o processamento (como nome do arquivo, data e hora) podem ser armazenadas
                    para fins de diagnóstico e melhoria do serviço, mas sem o conteúdo dos arquivos.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy-policy">
                <AccordionTrigger>Vocês têm uma política de privacidade?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Sim, temos uma política de privacidade detalhada que explica como tratamos seus dados. Alguns pontos
                    importantes da nossa política incluem:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Não coletamos informações pessoais além do estritamente necessário para fornecer o serviço</li>
                    <li>Não compartilhamos seus dados com terceiros</li>
                    <li>
                      Não utilizamos seus arquivos para treinamento de modelos de IA ou para qualquer outro fim além do
                      processamento solicitado
                    </li>
                    <li>Implementamos medidas técnicas e organizacionais para proteger seus dados</li>
                  </ul>
                  <p>
                    Você pode acessar nossa política de privacidade completa{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      aqui
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="file-size" className="space-y-4">
            <h2 className="text-xl font-bold">Arquivos e Processamento</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="max-file-size">
                <AccordionTrigger>Qual é o tamanho máximo de arquivo suportado?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    O FileDivider suporta arquivos de até 10MB. Esta limitação existe para garantir um processamento
                    eficiente e rápido para todos os usuários.
                  </p>
                  <p className="mb-2">Se você precisa processar arquivos maiores, recomendamos:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Dividir o arquivo em partes menores antes de fazer o upload</li>
                    <li>Comprimir o arquivo para reduzir seu tamanho (certifique-se de que ainda seja legível)</li>
                    <li>Remover imagens ou elementos desnecessários que aumentam o tamanho do arquivo</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="supported-formats">
                <AccordionTrigger>Quais formatos de arquivo são suportados?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Atualmente, o FileDivider suporta os seguintes formatos de arquivo:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>
                      <strong>PDF (.pdf)</strong> - Para documentos no formato Portable Document Format
                    </li>
                    <li>
                      <strong>TXT (.txt)</strong> - Para arquivos de texto simples
                    </li>
                  </ul>
                  <p>
                    Estamos trabalhando para adicionar suporte a mais formatos no futuro, como documentos do Word
                    (.docx), planilhas Excel (.xlsx) e outros formatos comuns.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="processing-time">
                <AccordionTrigger>Quanto tempo leva para processar um arquivo?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">O tempo de processamento varia dependendo de vários fatores:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Tamanho do arquivo - Arquivos maiores levam mais tempo para processar</li>
                    <li>
                      Complexidade do conteúdo - Documentos com muitas imagens ou formatação complexa podem levar mais
                      tempo
                    </li>
                    <li>
                      Tipo de processamento - Extração personalizada com expressões regulares complexas pode ser mais
                      demorada
                    </li>
                    <li>
                      Carga do servidor - Em momentos de alto tráfego, o processamento pode ser um pouco mais lento
                    </li>
                  </ul>
                  <p>
                    Na maioria dos casos, o processamento é concluído em poucos segundos a alguns minutos. Para arquivos
                    muito grandes ou complexos, pode levar mais tempo.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="download" className="space-y-4">
            <h2 className="text-xl font-bold">Downloads e Resultados</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="download-time">
                <AccordionTrigger>Por quanto tempo posso baixar meus arquivos processados?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Os arquivos processados ficam disponíveis para download por um período limitado, geralmente 24 horas
                    após o processamento. Após esse período, os arquivos são automaticamente excluídos dos nossos
                    servidores.
                  </p>
                  <p className="mb-2">
                    <strong>Importante:</strong> Recomendamos fortemente que você faça o download dos seus arquivos
                    imediatamente após o processamento. O FileDivider não é um serviço de armazenamento, e não podemos
                    garantir a disponibilidade dos arquivos além do período mencionado.
                  </p>
                  <p>
                    Os links de download são armazenados localmente no seu navegador na "Central de Downloads", mas os
                    arquivos em si não são armazenados permanentemente em nossos servidores.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="download-format">
                <AccordionTrigger>Em que formato recebo os arquivos processados?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Os arquivos processados são entregues em um arquivo ZIP que contém todos os documentos gerados
                    durante o processamento. Dentro do arquivo ZIP, você encontrará:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>
                      Para arquivos PDF: Múltiplos arquivos PDF, cada um correspondendo a uma seção do documento
                      original
                    </li>
                    <li>
                      Para arquivos TXT: Múltiplos arquivos TXT, cada um correspondendo a uma seção do texto original
                    </li>
                  </ul>
                  <p>
                    Os nomes dos arquivos seguirão o padrão que você definiu no campo "Nome do Arquivo" durante o
                    processamento, com os valores extraídos pelos auxiliares de extração substituindo as variáveis entre
                    chaves.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="download-issues">
                <AccordionTrigger>O que fazer se eu tiver problemas para baixar os arquivos?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Se você estiver enfrentando problemas para baixar seus arquivos processados, tente as seguintes
                    soluções:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 mb-2">
                    <li>Verifique sua conexão com a internet</li>
                    <li>Tente usar um navegador diferente</li>
                    <li>
                      Desative temporariamente bloqueadores de pop-up ou extensões que possam interferir nos downloads
                    </li>
                    <li>Limpe o cache do navegador e tente novamente</li>
                    <li>Se o download iniciar mas falhar, tente novamente - pode ser um problema temporário</li>
                  </ol>
                  <p>
                    Se você ainda estiver tendo problemas, tente processar o arquivo novamente. Como o processamento é
                    gratuito, você pode tentar quantas vezes for necessário.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="templates" className="space-y-4">
            <h2 className="text-xl font-bold">Templates e Configurações</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="create-templates">
                <AccordionTrigger>Como criar e salvar templates personalizados?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Para criar e salvar templates personalizados, você precisa acessar a área administrativa:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 mb-2">
                    <li>Clique em "Admin" no menu superior</li>
                    <li>Faça login com suas credenciais administrativas</li>
                    <li>No Painel Administrativo, clique no botão "Novo Template"</li>
                    <li>Preencha o campo "Nome do Template" com um nome descritivo</li>
                    <li>Configure os auxiliares de extração (o auxiliar "Inicio" é obrigatório)</li>
                    <li>Clique em "Criar Template" para salvar</li>
                  </ol>
                  <p>
                    Para mais detalhes sobre como criar e usar templates, consulte nosso{" "}
                    <Link href="/help/tutorials/templates" className="text-blue-600 hover:underline">
                      tutorial completo sobre templates
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="regex-help">
                <AccordionTrigger>Como criar expressões regulares eficientes?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Criar expressões regulares eficientes requer prática e conhecimento dos padrões presentes nos seus
                    documentos. Aqui estão algumas dicas:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>Comece com expressões simples e vá refinando conforme necessário</li>
                    <li>Teste suas expressões em uma pequena amostra do texto antes de processar arquivos grandes</li>
                    <li>Use ferramentas online como Regex101 ou RegExr para testar e depurar suas expressões</li>
                    <li>Para o auxiliar "Inicio", escolha um padrão que seja único para o início de cada seção</li>
                    <li>Use grupos de captura (parênteses) para extrair informações específicas</li>
                  </ul>
                  <p>
                    Para um guia detalhado sobre expressões regulares, consulte nosso{" "}
                    <Link href="/help/tutorials/regex" className="text-blue-600 hover:underline">
                      tutorial de expressões regulares
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="filename-patterns">
                <AccordionTrigger>Como usar padrões de nome de arquivo dinâmicos?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    O FileDivider permite criar nomes de arquivo dinâmicos usando valores extraídos pelos auxiliares de
                    extração:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 mb-2">
                    <li>
                      Configure auxiliares de extração que capturem informações relevantes (como nome, data, número)
                    </li>
                    <li>
                      No campo "Nome do Arquivo", use chaves para inserir os valores extraídos:{" "}
                      <code>
                        documento_{"{Nome}"}_{"{Data}"}
                      </code>
                    </li>
                    <li>O FileDivider substituirá as chaves pelos valores extraídos para cada seção processada</li>
                  </ol>
                  <p className="mb-2">
                    <strong>Exemplo:</strong> Se seu auxiliar "Nome" extrair "João Silva" e o auxiliar "Data" extrair
                    "01/01/2023", o padrão{" "}
                    <code>
                      documento_{"{Nome}"}_{"{Data}"}
                    </code>{" "}
                    gerará um arquivo chamado "documento_João Silva_01-01-2023.pdf"
                  </p>
                  <p>
                    Isso é especialmente útil para organizar grandes volumes de documentos de forma automática e
                    consistente.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link href="/help">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Centro de Ajuda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
