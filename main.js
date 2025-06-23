import ResumeController from "./src/controller/ResumeController.js";
import generatePDF from './src/generatePDF.js';

const resumeElement = document.getElementById('resume');
const pdfButton = document.getElementById('generate-pdf');

// Instanciar o controller
const controller = new ResumeController();

// Quando a página carregar
document.addEventListener('DOMContentLoaded', async () => {
    const htmlRenderizado = await controller.getOne();

    // Renderizar no DOM
    resumeElement.innerHTML = htmlRenderizado;

    // Mostrar botão PDF
    pdfButton.style.display = 'block';
    pdfButton.addEventListener('click', generatePDF);
});