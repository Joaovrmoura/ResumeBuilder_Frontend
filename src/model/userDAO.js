export default class User {
    async findOne(user_id) {
        try {
            const response = await fetch(`https://sharehub-dev-v2.onrender.com/api/users/${user_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            const data = await response.json()

            if (data.success === true) {
                return data.data;
            } else {
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
            const response = await fetch('https://sharehub-dev-v2.onrender.com/api/resumes', {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
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

}

