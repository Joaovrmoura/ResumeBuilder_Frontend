class AuthController {

    async login(formData) {
        try {
            const response = await fetch('https://sharehub-dev-v2.onrender.com/auth/login', {
                method: 'POST',
                credentials: 'include', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
            )
            const data = await response.json();
            console.log('Resposta da API:', data);

            if (data.success === true) {
                const token = data.token; 

                sessionStorage.setItem('user_email', data.data.email);
                sessionStorage.setItem('user_id', data.data._id);
                return true;
            } else {
                console.warn('Login falhou:', data.message);
            }


        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }
    
    async register(formData) {
        try {
            const response = await fetch('https://sharehub-dev-v2.onrender.com/auth/register', {
                method: 'POST',
                credentials: 'include', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
            )
            const data = await response.json();
            console.log(data.success);

            if (data.success === true) {
                console.log('Resposta da API:', data);
                const token = data.token; 

                sessionStorage.setItem('user_email', data.data.email);
                sessionStorage.setItem('user_id', data.data._id);

                return true;

            } else {
                console.warn('Cadastro falhou:', data.message);
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


export default AuthController;