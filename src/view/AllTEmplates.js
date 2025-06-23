import ResumeController from "../controller/ResumeController.js";

class AllResumes{
    #controller = null;
    constructor(){
        this.#controller = new ResumeController()
    }
    async getAll() {
        const resumes = await this.#controller.findAll()
        console.log(resumes);
    }   
}

const resumes = new AllResumes()
resumes.getAll()