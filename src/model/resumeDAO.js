const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODUzNzY0NmVjNGEzOGJkYzFiNDVmOWUiLCJlbWFpbCI6InVzZXJ0ZXN0ZTZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUwNjQ0MDYyLCJleHAiOjE3NTA2NDcwNjJ9.kKn3iWdAB26lj0dGUtT77xjiRYBQ5KTt54BndsSrUm8";

class ResumeService {

    async findOne() {
        try {
            const response = await fetch("http://localhost:3060/api/resumes/6854534fe76ba884882abad9", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                }
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
            
            if (responseData.success === true) {
                console.log(responseData.data);
                
                return responseData.data;
            }
            throw new Error("Dados inválidos da API");
            
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            throw error;
        }
    }

    async findAll(){
         try {
            const response = await fetch('http://localhost:3060/api/resumes', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
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

    async create() {
        
    }

}

export default new ResumeService();