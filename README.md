
Frontend Fast CV

Este é o frontend do projeto Fast CV, que consome a API RESTful para gerenciamento de currículos e usuários.

🔗 Como o frontend consome a API
O frontend utiliza fetch API para realizar requisições HTTP para o backend hospedado em:

arduino
https://sharehub-dev-v2.onrender.com
Todas as requisições enviam cookies de autenticação (credentials: 'include') para manter a sessão autenticada via token JWT armazenado em cookie HttpOnly.

📚 Principais serviços e controllers
AuthController
Responsável pela autenticação do usuário:

login(formData): Envia um POST para /auth/login com email e senha, recebe o token via cookie e armazena dados básicos no sessionStorage.
register(formData): Envia um POST para /auth/register para criar um novo usuário.
Usa credentials: 'include' para enviar cookies e manter a sessão.

ResumeService
Gerencia as operações sobre currículos:

findAll(): GET /api/resumes — lista todos os currículos.
findOne(id): GET /api/resumes/:id — obtém um currículo específico.
create(bodyData): POST /api/resumes — cria um novo currículo.
Todas as chamadas enviam o cookie para autenticação.

User
Serviço para operações relacionadas aos usuários:
findOne(user_id): GET /api/users/:id — obtém informações de um usuário.
findAll(): GET /api/users — lista todos os usuários.

⚙️ Configurações comuns nas requisições
Headers: 'Content-Type': 'application/json'
credentials: 'include' para enviar cookies HttpOnly com JWT
Os dados são enviados e recebidos no formato JSON.

🛠️ Tratamento de erros
O frontend utiliza a função handleApiError (importada de ../utils/ErrorHandler.js) para tratar erros retornados pela API e lidar com mensagens de falha ou sucesso.

🌐 Link de Produção
A aplicação frontend está disponível em produção neste link:

arduino
https://fast-cv-phi.vercel.app/home.html#
