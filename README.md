
## NLW Agents - Aplicação Fullstack

Este projeto foi desenvolvido durante um evento da Rocketseat, demonstrando a criação de uma **aplicação fullstack robusta e eficiente**, composta por uma API de backend e uma interface de usuário frontend, focadas na utilização de agentes inteligentes na web.

<p>Telas do App</p>

<p>Home</p>
<img alt="Tela 1" src=".github/1.png" width="50%">

<p>Room</p>
<img alt="Tela 2" src=".github/2.png" width="50%">


-----

### 🚀 Tecnologias

#### Backend (API)

  * **Node.js** com TypeScript
  * **Fastify**: Framework web rápido e eficiente
  * **PostgreSQL** com extensão `pgvector` para vetores
  * **Drizzle ORM**: Type-safe database operations
  * **Zod**: Schema validation
  * **Docker**: Containerização do banco de dados

#### Frontend (Interface do Usuário)

  * **React 19.1**: Biblioteca para interfaces de usuário
  * **TypeScript 5.8**: Superset JavaScript com tipagem estática
  * **Vite 7.0**: Build tool e servidor de desenvolvimento
  * **TailwindCSS 4.1**: Framework CSS utility-first
  * **React Router Dom 7.6**: Biblioteca de roteamento
  * **TanStack React Query 5.8**: Gerenciamento de estado servidor e cache
  * **Radix UI**: Componentes primitivos acessíveis
  * **Shadcn/ui**: Sistema de componentes
  * **Lucide React**: Biblioteca de ícones

-----

### 🏗️ Arquitetura e Padrões de Projeto

#### Backend

  * **Arquitetura Modular**: Separação de responsabilidades entre rotas, schemas e conexão com banco.
  * **Validação de Schemas**: Com Zod para type safety.
  * **ORM Type-safe**: Com Drizzle para operações de banco de dados.
  * **Validação de Variáveis de Ambiente**: Centralizadas.

#### Frontend

  * **Component-based Architecture**: Arquitetura baseada em componentes React.
  * **File-based Routing**: Roteamento baseado em arquivos com React Router.
  * **Server State Management**: Gerenciamento de estado servidor com React Query.
  * **Variant-based Components**: Componentes com variantes usando CVA.
  * **Composition Pattern**: Padrão de composição com Radix Slot.
  * **Path Aliasing**: Alias de caminhos (`@/` aponta para `src/`).

-----

### ⚙️ Setup e Configuração

#### Pré-requisitos Gerais

  * **Node.js**:
      * Backend: Versão com suporte a `--experimental-strip-types`.
      * Frontend: Versão 18 ou superior.
  * **Docker** e **Docker Compose** (apenas para o backend).
  * **npm** ou **yarn**.

#### 1\. Clone o repositório

```bash
git clone <url-do-repositorio>
cd <nome-da-pasta-do-projeto> # Navegue para a raiz do seu projeto
```

*Assumindo que o backend e o frontend estão em subdiretórios (ex: `server` e `client` ou `web`)*

#### 2\. Configuração do Backend

```bash
cd server # Navegue para o diretório do backend
```

  * **Configure o banco de dados (Docker):**
    ```bash
    docker-compose up -d
    ```
  * **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do diretório `server`:
    ```
    PORT=3333
    DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
    ```
  * **Instale as dependências:**
    ```bash
    npm install
    ```
  * **Execute as migrações do banco:**
    ```bash
    npx drizzle-kit migrate
    ```
  * **(Opcional) Popule o banco com dados de exemplo:**
    ```bash
    npm run db:seed
    ```

#### 3\. Configuração do Frontend

```bash
cd ../client # Navegue de volta para a raiz do projeto e depois para o diretório do frontend (ajuste o caminho se necessário)
```

  * **Instale as dependências:**
    ```bash
    npm install
    ```

-----

### 🏃 Como Executar

Certifique-se de que o **backend esteja configurado e executando** antes de iniciar o frontend, pois a aplicação frontend consome a API que deve estar rodando na porta `3333`.

#### Backend

  * **Desenvolvimento:**
    ```bash
    npm run dev
    ```
  * **Produção:**
    ```bash
    npm start
    ```

#### Frontend

  * **Desenvolvimento:**
    ```bash
    npm run dev
    ```
  * **Preview do build de produção:**
    ```bash
    npm run preview
    ```

-----

### 📚 Scripts Disponíveis

#### Backend

  * `npm run dev`: Executa o servidor em modo de desenvolvimento com hot reload.
  * `npm start`: Executa o servidor em modo de produção.
  * `npm run db:seed`: Popula o banco de dados com dados de exemplo.

#### Frontend

  * `npm run dev`: Inicia o servidor de desenvolvimento.
  * `npm run build`: Gera build de produção.
  * `npm run preview`: Preview do build de produção.

-----

### 🌐 Endpoints e Acesso

  * **API (Backend):**
    A API estará disponível em `http://localhost:3333`

      * `GET /health`: Health check da aplicação.
      * `GET /rooms`: Lista as salas disponíveis.

  * **Aplicação (Frontend):**
    A aplicação estará acessível em `http://localhost:5173`

-----

### 🛠️ Estrutura do Projeto Frontend (Exemplo)

```
src/
├── components/ui/    # Componentes de interface
├── pages/           # Páginas da aplicação
├── lib/             # Utilitários e configurações
└── app.tsx          # Componente raiz
```
