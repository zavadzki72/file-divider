# [FileDivider](https://fd.marccusz.com)

<div align="center">
  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PkF6u6yYJG3sisD4AQDsl7APilxiXI.png" alt="FileDivider Banner" width="100%" />
</div>

## Sobre o Projeto

O FileDivider é uma ferramenta online que permite dividir e organizar arquivos PDF e TXT de forma inteligente. Utilizando expressões regulares ou métodos predefinidos, o sistema facilita a extração e organização de informações de documentos, tornando o processo de divisão de arquivos simples e eficiente.

## Funcionalidades

### Processamento de Arquivos PDF
- Divisão de PDFs com base em expressões regulares
- Utilização de templates predefinidos
- Extração personalizada de informações
- Processamento rápido e eficiente

### Processamento de Arquivos TXT
- Quebra por número de linhas (mínimo 10 linhas)
- Extração personalizada com expressões regulares
- Organização inteligente do conteúdo

### Central de Downloads
- Gerenciamento de arquivos processados
- Acompanhamento do status de processamento
- Download imediato dos arquivos processados

## Como Usar

### Para Processar Arquivos PDF

1. Acesse a página de processamento de PDF clicando em "Processar PDF" no menu principal
2. Faça upload do seu arquivo PDF (tamanho máximo: 10MB)
3. Escolha o método de processamento:
   - **Usar um template existente**: Selecione um template predefinido da lista
   - **Configurar expressões regulares personalizadas**: Configure o auxiliar "Início" com uma expressão regular que identifique onde cada seção começa
4. Defina o nome do arquivo de saída (você pode usar chaves como {chave1} para inserir valores dos auxiliares)
5. Clique em "Processar PDF"
6. Aguarde o processamento e faça o download dos arquivos resultantes

### Para Processar Arquivos TXT

1. Acesse a página de processamento de TXT clicando em "Processar TXT" no menu principal
2. Faça upload do seu arquivo TXT (tamanho máximo: 10MB)
3. Escolha o método de processamento:
   - **Quebrar por linhas**: Define o número de linhas por arquivo (mínimo 10 linhas)
   - **Extração personalizada**: Configure expressões regulares para identificar seções
4. Defina o nome do arquivo de saída
5. Clique em "Processar TXT"
6. Aguarde o processamento e faça o download dos arquivos resultantes

## Dicas Importantes

- Os arquivos não são armazenados permanentemente. Faça o download imediatamente após o processamento.
- Para arquivos maiores que 10MB, considere dividi-los em partes menores antes de fazer o upload.
- Utilize expressões regulares precisas para obter melhores resultados na divisão personalizada.
- Verifique a seção de Ajuda e Tutoriais para exemplos detalhados de uso.

## Suporte

Se precisar de ajuda ou tiver dúvidas:
- Consulte a seção de [FAQ](https://fd.marccusz.com/help/faq)
- Acesse o [Centro de Ajuda](https://fd.marccusz.com/help)

## Tecnologias Utilizadas

- Frontend: Next.js, React, Tailwind CSS
- Backend: .NET Core
- Processamento de arquivos: Bibliotecas especializadas para manipulação de PDF e TXT

## Contato

- Site: [https://marccusz.com](https://marccusz.com)
- GitHub: [https://github.com/zavadzki72](https://github.com/zavadzki72)

---

© 2025 FileDivider. Todos os direitos reservados.
