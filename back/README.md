# FileDivider - Backend

API RESTful para processamento e divisão inteligente de arquivos PDF e TXT.

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| .NET | 9.0 | Framework principal |
| ASP.NET Core | 9.0 | Framework web para APIs |
| MongoDB | - | Banco de dados NoSQL |
| Docker | - | Containerização |

### Bibliotecas de Processamento de PDF

- **iText7** (8.0.3) - Manipulação avançada de PDFs
- **PdfPig** (0.1.10) - Extração de texto de PDFs
- **PdfSharpCore** (1.3.67) - Criação e manipulação de PDFs

### Bibliotecas Auxiliares

- **Swashbuckle.AspNetCore** (8.1.1) - Documentação Swagger/OpenAPI
- **MongoDB.Driver** (3.4.0) - Driver oficial do MongoDB

## 📁 Estrutura do Projeto

```
FileDivider.Api/
├── Controllers/        # Endpoints da API
├── Data/              # Contexto e configurações do MongoDB
├── Dtos/              # Objetos de transferência de dados
├── Extensions/        # Métodos de extensão
├── Middlewares/       # Middlewares customizados
├── Models/            # Modelos de domínio
├── Services/          # Lógica de negócio
└── Program.cs         # Configuração da aplicação
```

## 🚀 Como Executar

### Pré-requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [MongoDB](https://www.mongodb.com/try/download/community) (local ou Atlas)

### Desenvolvimento Local

```bash
# Navegar para o diretório do projeto
cd FileDivider/FileDivider.Api

# Restaurar dependências
dotnet restore

# Executar em modo desenvolvimento
dotnet run
```

A API estará disponível em `https://localhost:5001` com Swagger UI.

### Docker

```bash
# Build da imagem
docker build -t filedivider-api .

# Executar container
docker run -p 80:80 -e MongoDbConnectionString="sua-connection-string" filedivider-api
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `MongoDbConnectionString` | String de conexão do MongoDB |
| `PORT` | Porta da aplicação (produção) |

### appsettings.json

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "FileDivider"
  }
}
```

## 📚 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/file/pdf` | Processa arquivo PDF |
| POST | `/api/file/txt` | Processa arquivo TXT |
| GET | `/api/template` | Lista templates disponíveis |
| POST | `/api/template` | Cria novo template |

## 📝 Licença

© 2025 FileDivider. Todos os direitos reservados.
