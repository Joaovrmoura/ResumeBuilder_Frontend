class UserController {

    async login(formData) {
        try {
            const response = await fetch('http://localhost:3060/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
            )
            const data = await response.json();
            console.log('Resposta da API:', data);

            if (data.success === true) {
                const token = data.token; 
                // Salva no sessionStorage (recomendado para segurança)
                console.log('authToken', token, 'user_name', data.data.email, 'user_id',data.data._id);

                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('user_name', data.data.email);
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
            const response = await fetch('http://localhost:3060/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }
            )
            const data = await response.json();
            console.log(data.success);

            if (data.success === true) {
                console.log('Resposta da API:', data);
                const token = data.token; 
                // Salva no sessionStorage (recomendado para segurança)
                console.log('authToken', token, 'user_name', data.data.email, 'user_id',data.data._id);

                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('user_name', data.data.email);
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

export default UserController;