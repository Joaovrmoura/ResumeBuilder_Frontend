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
                console.log('Login falhou:', data.message);
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
            });

            // Confirme se a resposta é JSON válida
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Resposta da API não é JSON");
            }

            const data = await response.json();
            console.log('Resposta da API:', data);

            if (data.success === true) {
                sessionStorage.setItem('user_email', data.data.email);
                sessionStorage.setItem('user_id', data.data._id);
                return true;
            } else {
                console.log('Cadastro falhou:', data.message);
                return false;
            }

        } catch (error) {
            console.error("Erro no AuthController.register:", error);
            throw error; // repassa para o `catch` de registerForm()
        }
    }

    // Método auxiliar para recuperar token
    getToken() {
        return sessionStorage.getItem('authToken');
    }
}


export default AuthController;