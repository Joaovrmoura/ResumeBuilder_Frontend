export default class CurriculoUI {
    constructor() {
        this.initCardAnimations();
    }

    showSection(sectionId, event) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('visualizacao-curriculo');
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
        if (pdfButton) pdfButton.style.display = 'none';
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
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}