import resumeDAO from "../model/resumeDAO.js";
import User from '../model/userDAO.js';
import ResumeController from "../controller/ResumeController.js";
import generatePDF from './generatePDF.js';

function verificarAutenticacao() {
    const userId = sessionStorage.getItem('user_id');
    const user_email = sessionStorage.getItem('user_email');
    console.log(userId, user_email); 
    
    if (!userId || !user_email) {
        window.location.href = 'home.html';
    }
}

export default class CurriculoUI {
    constructor() {
        this.initCardAnimations();
    }

   showSection(sectionId, event) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none'; // Oculta todos
        section.classList.remove('visualizacao-curriculo'); // Remove estilo especial
    });

    const targetSection = document.getElementById(sectionId);
    targetSection.style.display = 'block';

    if (sectionId === 'unico') {
        targetSection.classList.add('visualizacao-curriculo');
    }

    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    if (event && event.target) {
        event.target.classList.add('active');
    }

    const pdfButton = document.getElementById('generate-pdf');
    if (pdfButton) pdfButton.style.display = 'none'; // Esconde botão PDF ao sair
}



   async showSingleCurriculo(id) {
    if (!id) {
        console.error("ID do currículo inválido:", id);
        return;
    }

    this.showSection('unico'); // Agora ativa a exibição do currículo
    document.querySelector('.nav-tab:nth-child(2)')?.classList.add('active');

    const resumeElement = document.getElementById('resume');
    const pdfButton = document.getElementById('generate-pdf');
    const controller = new ResumeController();

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



    renderCurriculos(data) {
        const container = document.getElementById('curriculosGrid');
        container.innerHTML = "";

        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "curriculo-card";

            card.innerHTML = `
        <div class="curriculo-header">
          <div class="avatar">${item.template_selected.charAt(0).toUpperCase()}</div>
          <div class="curriculo-info">
            <h3>Template: ${item.template_selected}</h3>
            <p>ID: ${item._id}</p>
          </div>
        </div>
        <div class="curriculo-details">
          <div class="detail-row">
            <span class="detail-label">Criado em:</span>
            <span class="detail-value">${new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Template:</span>
            <span class="detail-value">${item.template_selected}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value">Ativo</span>
          </div>
        </div>
        <button class="btn ver-detalhes" data-id="${item._id}">Visualizar/Download</button>
      `;
            console.log(item._id);

            const button = card.querySelector('.ver-detalhes');
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id; // Usa o dataset corretamente
                console.log("ID do currículo clicado:", id); // debug
                await this.showSingleCurriculo(id);
            });

            container.appendChild(card);
        });

        this.initCardAnimations();
    }

    filterCurriculos(searchTerm) {
        const cards = document.querySelectorAll('.curriculo-card');
        cards.forEach(card => {
            const name = card.querySelector('h3')?.textContent.toLowerCase();
            const role = card.querySelector('.curriculo-info p')?.textContent.toLowerCase();
            const term = searchTerm.toLowerCase();

            if (name?.includes(term) || role?.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    initCardAnimations() {
        document.querySelectorAll('.curriculo-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

async function getAll() {
    const allresumes = await resumeDAO.findAll();
    return allresumes;
}




document.addEventListener('DOMContentLoaded', async () => {
    verificarAutenticacao();
    const ui = new CurriculoUI();
    const numberOfresumes = document.getElementById('numberOfresumes');
    const user_id = sessionStorage.getItem('user_id');
    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Mostra o loader


    try {
        const user = new User();
        const result = await getAll();
        numberOfresumes.textContent = result.length;
        await user.findOne(user_id);

        if (result.length >= 0) {
            ui.renderCurriculos(result);
        }
    } catch (err) {
        console.error("Erro ao carregar currículos:", err);
    } finally {
    loader.style.display = 'none'; // Esconde o loader
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            ui.filterCurriculos(e.target.value);
        });
    }

    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', e => {
            const sectionId = e.target.getAttribute('data-section');
            ui.showSection(sectionId, e);
        });
    });

    window.showSection = (sectionId, event) => ui.showSection(sectionId, event);
    window.showSingleCurriculo = id => ui.showSingleCurriculo(id);
});

