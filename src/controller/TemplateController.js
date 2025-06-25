import ResumeService from '../model/resumeDAO.js';
import Templates from '../view/renderTemplates.js';

class TemplateController {
    #templatesHTML;

    constructor() {
        this.#templatesHTML = new Templates();
    }

    async getOne(id) {
        try {
            const apiData = await ResumeService.findOne(id);
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
}

export default TemplateController;
