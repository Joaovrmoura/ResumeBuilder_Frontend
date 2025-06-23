const token_session = sessionStorage.getItem("authToken")

class ResumeService {

    async findOne(id) {
        try {
            const response = await fetch(`http://localhost:3060/api/resumes/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token_session}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData.success === true) {
                return responseData.data;
            }
            throw new Error("Dados inválidos da API");

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }

    async findAll() {
        try {
            const token_session = sessionStorage.getItem('authToken');
            const user_id = sessionStorage.getItem('user_id');
            
            const response = await fetch(`http://localhost:3060/api/resumes`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token_session}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json(); 
        
            
            if (data.success === true) {
                return data.data;
            }

            console.warn("Falha ao criar:", data.message || data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }

    async create(bodyData) {
        try {
            const token_session = sessionStorage.getItem('authToken');
            console.log("DADOS DO BODY", bodyData);

            const response = await fetch("http://localhost:3060/api/resumes/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token_session}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData) 
            });

            const data = await response.json();
            console.log(data);
            
            if (data.success === true) {
                console.log("Criado com sucesso", data.data);
                return data.data;
            }

            console.warn("Falha ao criar:", data.message || data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }
}

export default new ResumeService();