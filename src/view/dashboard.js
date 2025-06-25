// export default class CurriculoUI {
//     constructor() {
//         this.initCardAnimations();
//     }

//     showSection(sectionId, event) {
//         document.querySelectorAll('.content-section').forEach(section => {
//             section.style.display = 'none'; // Oculta todos
//             section.classList.remove('visualizacao-curriculo'); // Remove estilo especial
//         });

//         const targetSection = document.getElementById(sectionId);
//         targetSection.style.display = 'block';

//         if (sectionId === 'unico') {
//             targetSection.classList.add('visualizacao-curriculo');
//         }

//         document.querySelectorAll('.nav-tab').forEach(tab => {
//             tab.classList.remove('active');
//         });

//         if (event && event.target) {
//             event.target.classList.add('active');
//         }

//         const pdfButton = document.getElementById('generate-pdf');
//         if (pdfButton) pdfButton.style.display = 'none'; // Esconde botão PDF ao sair
//     }



//     // async showSingleCurriculo(id) {
//     //     if (!id) {
//     //         console.error("ID do currículo inválido:", id);
//     //         return;
//     //     }

//     //     this.showSection('unico'); // Agora ativa a exibição do currículo
//     //     document.querySelector('.nav-tab:nth-child(2)')?.classList.add('active');

//     //     const resumeElement = document.getElementById('resume');
//     //     const pdfButton = document.getElementById('generate-pdf');
//     //     const controller = new TemplateController();

//     //     try {
//     //         const htmlRenderizado = await controller.getOne(id);
//     //         resumeElement.innerHTML = htmlRenderizado;

//     //         if (pdfButton) {
//     //             pdfButton.style.display = 'block';
//     //             pdfButton.onclick = () => generatePDF();
//     //         }
//     //     } catch (err) {
//     //         resumeElement.innerHTML = "<p>Erro ao carregar currículo.</p>";
//     //         console.error("Erro ao renderizar currículo:", err);
//     //     }
//     // }

//     showSingleCurriculo(id, html) {
//         if (!id) {
//             console.error("ID do currículo inválido:", id);
//             return;
//         }

//         this.showSection('unico'); // Agora ativa a exibição do currículo
//         document.querySelector('.nav-tab:nth-child(2)')?.classList.add('active');

//         const resumeElement = document.getElementById('resume');
//         const pdfButton = document.getElementById('generate-pdf');

//         if(!html){
//             resumeElement.innerHTML = "<p>Erro ao carregar currículo.</p>";
//             console.error("Erro ao renderizar currículo:", err);
//         }
//         resumeElement.innerHTML = html;
        
//         if (pdfButton) {
//             pdfButton.style.display = 'block';
//             pdfButton.onclick = () => generatePDF();
//         }
//     } 



//     renderCurriculos(data) {
//         const container = document.getElementById('curriculosGrid');
//         container.innerHTML = "";

//         data.forEach(item => {
//             const card = document.createElement("div");
//             card.className = "curriculo-card";

//             card.innerHTML = `
//         <div class="curriculo-header">
//           <div class="avatar">${item.template_selected.charAt(0).toUpperCase()}</div>
//           <div class="curriculo-info">
//             <h3>Template: ${item.template_selected}</h3>
//             <p>ID: ${item._id}</p>
//           </div>
//         </div>
//         <div class="curriculo-details">
//           <div class="detail-row">
//             <span class="detail-label">Criado em:</span>
//             <span class="detail-value">${new Date(item.createdAt).toLocaleDateString()}</span>
//           </div>
//           <div class="detail-row">
//             <span class="detail-label">Template:</span>
//             <span class="detail-value">${item.template_selected}</span>
//           </div>
//           <div class="detail-row">
//             <span class="detail-label">Status:</span>
//             <span class="detail-value">Ativo</span>
//           </div>
//         </div>
//         <button class="btn ver-detalhes" data-id="${item._id}">Visualizar/Download</button>
//       `;
//             console.log(item._id);

//             const button = card.querySelector('.ver-detalhes');

//             button.addEventListener('click', async (e) => {
//                 const id = e.currentTarget.dataset.id; // Usa o dataset corretamente
//                 console.log("ID do currículo clicado:", id); // debug
//                 this.showSingleCurriculo(id, html);
//             });

//             container.appendChild(card);
//         });

//         this.initCardAnimations();
//     }

//     filterCurriculos(searchTerm) {
//         const cards = document.querySelectorAll('.curriculo-card');
//         cards.forEach(card => {
//             const name = card.querySelector('h3')?.textContent.toLowerCase();
//             const role = card.querySelector('.curriculo-info p')?.textContent.toLowerCase();
//             const term = searchTerm.toLowerCase();

//             if (name?.includes(term) || role?.includes(term)) {
//                 card.style.display = 'block';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     }

//     initCardAnimations() {
//         document.querySelectorAll('.curriculo-card').forEach(card => {
//             card.addEventListener('mouseenter', function () {
//                 this.style.transform = 'translateY(-8px) scale(1.02)';
//             });

//             card.addEventListener('mouseleave', function () {
//                 this.style.transform = 'translateY(0) scale(1)';
//             });
//         });
//     }
// }
