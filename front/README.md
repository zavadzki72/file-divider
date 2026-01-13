# FileDivider - Frontend

Interface web moderna para processamento e divisão inteligente de arquivos PDF e TXT.

🌐 **Acesse em:** [fd.marccusz.com](https://fd.marccusz.com)

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Next.js | 15.2.4 | Framework React para produção |
| React | 19 | Biblioteca de UI |
| TypeScript | 5 | Superset tipado do JavaScript |
| TailwindCSS | 3.4.17 | Framework CSS utility-first |
| pnpm | - | Gerenciador de pacotes |

### Bibliotecas de UI

- **Radix UI** - Componentes acessíveis e sem estilo
- **Lucide React** - Ícones modernos
- **Sonner** - Notificações toast
- **Recharts** - Gráficos e visualizações
- **React Hook Form + Zod** - Formulários e validação
- **next-themes** - Suporte a temas (dark/light mode)

### Componentes Radix UI Utilizados

Accordion • Alert Dialog • Avatar • Checkbox • Dialog • Dropdown Menu • Navigation Menu • Popover • Progress • Select • Tabs • Toast • Tooltip

## 📁 Estrutura do Projeto

```
front/
├── app/               # Páginas e rotas (App Router)
├── components/        # Componentes reutilizáveis
│   └── ui/           # Componentes de interface
├── hooks/            # Custom hooks
├── lib/              # Utilitários e configurações
├── public/           # Arquivos estáticos
├── styles/           # Estilos globais
└── types/            # Definições de tipos TypeScript
```

## 🚀 Como Executar

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Instalação

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar build de produção
pnpm start
```

A aplicação estará disponível em `http://localhost:3000`.

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Gera build de produção |
| `pnpm start` | Executa build de produção |
| `pnpm lint` | Executa linter |

## 🎨 Design System

O projeto utiliza:

- **TailwindCSS** para estilos utilitários
- **CSS Variables** para temas dinâmicos
- **Radix UI** para componentes acessíveis
- **Animações** via `tailwindcss-animate`

## 📱 Funcionalidades

- ✅ Processamento de arquivos PDF com regex
- ✅ Processamento de arquivos TXT
- ✅ Sistema de templates predefinidos
- ✅ Central de downloads
- ✅ Design responsivo
- ✅ Modo escuro/claro
- ✅ Interface acessível

## 🔗 Links

- [Produção](https://fd.marccusz.com)
- [FAQ](https://fd.marccusz.com/help/faq)
- [Centro de Ajuda](https://fd.marccusz.com/help)

## 📝 Licença

© 2025 FileDivider. Todos os direitos reservados.
© 2025 FileDivider. Todos os direitos reservados.
