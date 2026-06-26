# Aparatus

Aparatus é uma aplicação web moderna para descoberta e agendamento de serviços em barbearias, com uma experiência de usuário voltada para mobile e um assistente de IA para auxiliar no processo.

## Funcionalidades

- Catálogo de barbearias e serviços
- Busca rápida por serviços ou barbearias
- Página detalhada de cada barbearia com seus serviços
- Agendamento de serviços com seleção de data e horário
- Checkout via Stripe para confirmação de reserva
- Visualização de agendamentos confirmados e finalizados
- Cancelamento de reservas
- Chat com assistente de IA para ajudar no agendamento
- Autenticação de usuários
- Integração com Prisma + PostgreSQL

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Better Auth
- Stripe
- AI SDK
- TanStack Query
- Shadcn/ui

## Requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js 20+
- pnpm
- PostgreSQL

## Variáveis de ambiente

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="sua_chave_publica_do_stripe"
STRIPE_SECRET_KEY="sua_chave_secreta_do_stripe"
STRIPE_WEBHOOK_SECRET_KEY="sua_chave_webhook_do_stripe"
GOOGLE_GENERATIVE_AI_API_KEY="sua_chave_do_google_ai"
```

> Ajuste os valores conforme o seu ambiente local ou de desenvolvimento.

## Instalação

```bash
pnpm install
```

## Geração do Prisma Client

```bash
pnpm prisma generate
```

## Migração do banco de dados

Se ainda não houver o banco configurado:

```bash
pnpm prisma migrate dev
```

## Seed inicial (opcional)

Se o projeto possuir seed configurado:

```bash
pnpm tsx prisma/seed.ts
```

## Execução local

```bash
pnpm dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

## Estrutura do projeto

```text
app/                  # Rotas e páginas da aplicação
_components/         # Componentes reutilizáveis da interface
_actions/            # Server actions para regras de negócio
_data/               # Acesso a dados e consultas
lib/                 # Helpers, autenticação e utilidades
prisma/              # Schema do Prisma e seed
public/              # Arquivos estáticos
```

## Fluxos principais

### 1. Explorar barbearias

Na página inicial, o usuário visualiza barbearias recomendadas e pode navegar para ver detalhes e serviços.

### 2. Buscar serviços

A busca permite encontrar barbearias com base no nome do serviço desejado.

### 3. Agendar serviço

No detalhe da barbearia, é possível selecionar:

- data
- horário
- serviço

Após isso, o fluxo cria uma sessão de checkout do Stripe para finalizar o agendamento.

### 4. Ver e cancelar agendamentos

Na área de agendamentos, o usuário consegue visualizar reservas confirmadas, finalizadas e cancelar reservas pendentes.

### 5. Chat com IA

A página de chat permite conversar com um assistente para obter ajuda na busca e no agendamento de serviços.

## Scripts disponíveis

```bash
pnpm dev       # inicia o servidor de desenvolvimento
pnpm build     # cria a build de produção
pnpm start     # inicia a aplicação em modo produção
pnpm lint      # executa o lint do projeto
```

## Observações

- O projeto utiliza autenticação para proteger ações sensíveis como criação e cancelamento de agendamentos.
- O fluxo de pagamento depende de configuração válida do Stripe.
- O chat com IA depende de chaves de API configuradas corretamente.

## Licença

Este projeto é de uso interno e pode ser adaptado conforme necessidade.
