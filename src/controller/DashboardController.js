// Importações
import resumeDAO from "../model/resumeDAO.js";
import User from '../model/userDAO.js';
import TemplateController from "./TemplateController.js";
import generatePDF from '../utils/generatePDF.js';
import CurriculoUI from '../view/dashboard.js'; 

class DashboarContrlller {
    constructor() {
        this.ui = new CurriculoUI();
        this.initialize();
    }

    verifyAuth() {
        const userId = sessionStorage.getItem('user_id');
        const user_email = sessionStorage.getItem('user_email');
        console.log(userId, user_email);

        if (!userId || !user_email) {
            window.location.href = 'home.html';
        }
    }

    async getAll() {
        return await resumeDAO.findAll();
    }

    async showSingleCurriculo(id) {
        if (!id) {
            console.error("ID do currículo inválido:", id);
            return;
        }

        this.ui.showSection('unico');
        document.querySelector('.nav-tab:nth-child(2)')?.classList.add('active');

        const resumeElement = document.getElementById('resume');
        const pdfButton = document.getElementById('generate-pdf');
        const controller = new TemplateController();

        try {
            const htmlRenderizado = await controller.getOne(id);
            resumeElement.innerHTML = htmlRenderizado;

            if (pdfButton) {
                pdfButton.style.display = 'block';
                pdfButton.onclick = () => generatePDF();
            }
        } catch (err) {
            resumeElement.innerHTML = "<p>Erro ao carregar currículo.</p>";
            console.error("Erro ao renderizar currículo:", err);
        }
    }

    async initialize() {
        document.addEventListener('DOMContentLoaded', async () => {
            this.verifyAuth();
            
            const numberOfresumes = document.getElementById('numberOfresumes');
            const user_id = sessionStorage.getItem('user_id');
            const loader = document.getElementById('loader');
            loader.style.display = 'flex';

            try {
                const user = new User();
                const result = await this.getAll();
                numberOfresumes.textContent = result.length;
                await user.findOne(user_id);
                
                if (result.length >= 0) {
                    this.ui.renderCurriculos(result);
                }

            } catch (err) {
                console.error("Erro ao carregar currículos:", err);
            } finally {
                loader.style.display = 'none';
            }

            // Event Listeners
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('input', e => {
                    this.ui.filterCurriculos(e.target.value);
                });
            }

            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.addEventListener('click', e => {
                    const sectionId = e.target.getAttribute('data-section');
                    this.ui.showSection(sectionId, e);
                });
            });

            // Delegation para botões de detalhes
            document.getElementById('curriculosGrid').addEventListener('click', async (e) => {
                if (e.target.classList.contains('ver-detalhes')) {
                    const id = e.target.dataset.id;
                    await this.showSingleCurriculo(id);
                }
            });

            // PDF Generation Handler
            document.addEventListener('click', (e) => {
                if (e.target.id === 'generate-pdf') {
                    generatePDF();
                }
            });

            // Funções globais
            window.showSection = (sectionId, event) => this.ui.showSection(sectionId, event);
            window.showSingleCurriculo = id => this.showSingleCurriculo(id);
        });
    }
}

// Inicialização da aplicação
new DashboarContrlller();