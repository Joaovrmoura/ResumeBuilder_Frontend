class UserController {
        
    async login(data) {
        try {
            const response = await fetch('http://localhost:3060/auth/login', {
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            )
         if (result.data.success === true) {
            const token = result.data.token; // ou ajuste conforme estrutura
            // Salva no sessionStorage (recomendado para segurança)
            sessionStorage.setItem('authToken', token);
        } else {
            console.warn('Login falhou:', result.data.message);
        }


        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }

    // Método auxiliar para recuperar token
    getToken() {
        return sessionStorage.getItem('authToken');
    }

}

export default UserController;