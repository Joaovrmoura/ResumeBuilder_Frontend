📄 Documentação da API – Fast CV
API RESTful para gerenciamento de currículos e usuários.
Desenvolvida com Node.js, Express, MongoDB (via Mongoose), autenticação JWT com cookies HttpOnly, validação com express-validator, segurança com helmet e controle de acesso via middleware.

🌐 URL Base da Produção
arduino
Copiar
Editar
https://fast-cv-phi.vercel.app

🔒 Autenticação
Utiliza JWT com cookie HttpOnly
O token tem expiração definida em .env com TOKEN_EXPIRATION=50m
Apenas usuários autenticados podem acessar rotas protegidas (/api/*)
Middleware de validação verifica a presença e validade do token

🛡️ Segurança
helmet: adiciona headers de segurança HTTP
cors: permite apenas https://fast-cv-phi.vercel.app
rate-limit: proteção contra requisições excessivas

🔐 Detalhes Técnicos do Cookie (Ambientes)
A autenticação via JWT utiliza um cookie HttpOnly com as seguintes configurações:

js
Copiar
Editar
res.cookie('token', token, {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000
});



📁 Estrutura do Projeto
bash
Copiar
Editar
📦 src
 ┣ 📂config       # configurações como conexão, CORS e rateLimit
 ┣ 📂controllers  # lógica de negócios (CRUD usuários e currículos)
 ┣ 📂models       # schemas do Mongoose (User, Resume)
 ┣ 📂routes       # rotas Express (auth, resume, user)
 ┣ 📂validators   # validadores express-validator para cada entidade
 ┣ 📂middlewares  # auth middleware, not found route handler
📦 Endpoints

🔐 Autenticação (/auth)
POST /auth/register
Cria um novo usuário.

Body:

json
Copiar
Editar
{
  "email": "userTeste6@gmail.com",
  "password": "Joao123"
}
POST /auth/login
Autentica o usuário e armazena o token JWT em um cookie HttpOnly.

Body:

json
Copiar
Editar
{
  "email": "userteste6@gmail.com",
  "password": "Joao123"
}
👤 Usuários (/api/users)
Requer autenticação via token (cookie HttpOnly).

GET /api/users
Retorna todos os usuários cadastrados.

DELETE /api/users/:id
Remove o usuário com base no ID informado.

📄 Currículos (/api/resumes)
Requer autenticação via token (cookie HttpOnly).

GET /api/resumes
Retorna todos os currículos.

GET /api/resumes/:id
Retorna um currículo específico.

DELETE /api/resumes/:id
Deleta um currículo específico.

📘 Headers Necessários
http
Copiar
Editar
Content-Type: application/json
credentials: 'include'  // para envio do cookie HttpOnly
⚙️ Variáveis de Ambiente (.env)
env
Copiar
Editar
CONNECTSTRING=mongodb+srv://...
PORT=3060
ACESS_TOKEN_SECRET=...
TOKEN_EXPIRATION=50m
OPENROUTER_API_KEY=...
NODE_ENV=development
🔐 Middleware
auth.middleware.js: protege rotas com JWT

notFoundRoute.js: captura rotas inexistentes

📚 Exemplo de Requisição com Fetch
javascript
Copiar
Editar
fetch('/api/resumes', {
  method: 'GET',
  credentials: 'include'
})
.then(res => res.json())
.then(data => console.log(data));
