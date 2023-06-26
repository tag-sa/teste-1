## Teste Feel Alive

Breve descrição do projeto.

## Pré-requisitos

- Node.js (versão mais recente)
- Banco de Dados SQL (por exemplo, MySQL, PostgreSQL)

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   ```

2. Instale as dependências:
   ```bash
   cd seu-projeto
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```bash
   Crie um arquivo .env na raiz do projeto e defina a seguinte variável de ambiente:
   DATABASE_URL="mysql://root:password@localhost:3306/dbfeelalive?schema=public"
   ```
4. Executando as Migrações do Banco de Dados

   ```bash
   Para gerar o schema prima execute o seguinte comando no terminal:
   - npx prisma generate

   ```

5. Execute as migrações do banco de dados:
   ```bash
   execute o seguinte comando no terminal:
   - npx prisma migrate dev
   ```
6. Executando a Aplicação
   ```bash
   - npm run start:dev
   ```
