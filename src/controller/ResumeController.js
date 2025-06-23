import ResumeService from '../model/resumeDAO.js';
import Templates from '../utils/templateHTML.js';

class ResumeController {
    #templatesHTML;

    constructor() {
        this.#templatesHTML = new Templates();
    }

    async getOne() {
        try {
            const apiData = await ResumeService.findOne();
            const transformedData = this.#templatesHTML.transformResumeData(apiData);
            const templateName = apiData.template_selected || 'classico';

            return this.#templatesHTML.renderTemplate(templateName, transformedData);
        } catch (error) {
            console.error("Erro ao gerar currículo:", error);
        }
    }

    async getAll() {
        try {
            const apiDataArray = await ResumeService.findAll();

            return apiDataArray.map(apiData => {
                const transformedData = this.#templatesHTML.transformResumeData(apiData);
                const templateName = apiData.template_selected || 'classico';
                return this.#templatesHTML.renderTemplate(templateName, transformedData);
            });

        } catch (error) {
            console.error("Erro ao gerar currículos:", error);
        }
    }

    async createResume(data) {

    }
}

export default ResumeController;
