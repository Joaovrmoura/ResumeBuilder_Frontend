class ResumeService {

    async findOne(id) {
        try {
            const response = await fetch(`https://sharehub-dev-v2.onrender.com/api/resumes/${id}`, {
                method: "GET",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData.success === true) {
                return responseData.data;
            }else{
                console.log("ERROR MESSAGE: ", data.message);
            }

            throw new Error("Dados inválidos da API");

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }

    async findAll() {
        try {
            const response = await fetch(`https://sharehub-dev-v2.onrender.com/api/resumes`, {
                method: "GET",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (data.success === true) {
                return data.data;
            }else{
                console.log("ERROR MESSAGE: ", data.message);
            }

            return [];

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }

    async create(bodyData) {
        try {
            console.log("DADOS DO BODY", bodyData);

            const response = await fetch("https://sharehub-dev-v2.onrender.com/api/resumes/", {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });

            const data = await response.json();

            if (data.success === true) {
                console.log("Criado com sucesso", data.data);
                return data.data;
            }else{
                console.log("ERROR MESSAGE: ", data.message);
            }

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }
}

export default new ResumeService();
