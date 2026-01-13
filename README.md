<div align="center">

# 📄 FileDivider

**Ferramenta online para dividir e organizar arquivos PDF e TXT de forma inteligente**

🌐 **[fd.marccusz.com](https://fd.marccusz.com)**

[![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📖 Sobre o Projeto

O **FileDivider** é uma aplicação web que permite dividir e organizar arquivos PDF e TXT utilizando expressões regulares ou métodos predefinidos. Ideal para extrair e organizar informações de documentos de forma automatizada.

## ✨ Funcionalidades

### 📑 Processamento de PDF
- Divisão baseada em expressões regulares
- Templates predefinidos reutilizáveis
- Extração personalizada de informações
- Nomeação dinâmica de arquivos de saída

### 📝 Processamento de TXT
- Quebra por número de linhas (mínimo 10)
- Extração personalizada com regex
- Organização inteligente do conteúdo

### 📥 Central de Downloads
- Gerenciamento de arquivos processados
- Acompanhamento do status de processamento
- Download imediato dos resultados

## 🏗 Arquitetura

```
file-divider/
├── back/                    # Backend .NET 9
│   └── FileDivider/
│       └── FileDivider.Api/ # API RESTful
└── front/                   # Frontend Next.js 15
```

## 🛠 Stack Tecnológica

### Backend
| Tecnologia | Descrição |
|------------|-----------|
| .NET 9 | Framework principal |
| ASP.NET Core | API RESTful |
| MongoDB | Banco de dados |
| iText7 / PdfPig | Processamento de PDF |
| Docker | Containerização |

### Frontend
| Tecnologia | Descrição |
|------------|-----------|
| Next.js 15 | Framework React |
| React 19 | Biblioteca de UI |
| TypeScript | Tipagem estática |
| TailwindCSS | Estilização |
| Radix UI | Componentes acessíveis |

## 🚀 Como Executar

### Backend

```bash
cd back/FileDivider/FileDivider.Api
dotnet restore
dotnet run
```

### Frontend

```bash
cd front
pnpm install
pnpm dev
```

## 📚 Documentação

Consulte os READMEs específicos para mais detalhes:

- [Backend README](./back/README.md)
- [Frontend README](./front/README.md)

## 🔗 Links Úteis

| Link | Descrição |
|------|-----------|
| [fd.marccusz.com](https://fd.marccusz.com) | Aplicação em Produção |
| [Centro de Ajuda](https://fd.marccusz.com/help) | Tutoriais e documentação |
| [FAQ](https://fd.marccusz.com/help/faq) | Perguntas frequentes |

## 👤 Autor

**Marccus Zavadzki**

- Website: [marccusz.com](https://marccusz.com)
- GitHub: [@zavadzki72](https://github.com/zavadzki72)

---

<div align="center">

© 2025 FileDivider. Todos os direitos reservados.

</div>
