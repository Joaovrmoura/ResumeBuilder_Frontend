import transformarResume from './transformDATA.js';
import TemplateEnum from '../view/Templates.js'; // renomeie se necessário

export default class Templates {


  transformResumeData(originalData) {
    return transformarResume(originalData);
  }

  renderTemplate(templateName, transformedData) {
    switch (templateName) {
      case TemplateEnum.CLASSICO.name:
        return this.classicalTemplate(transformedData);
      case TemplateEnum.MODERNO.name:
        return this.modernTemplate(transformedData);
      case TemplateEnum.COLORIDO.name:
        return this.color(transformedData);
      default:
        return this.classicalTemplate(transformedData);
    }
  }

  classicalTemplate(data) {

    const formatSkills = (arr) => arr?.length ? arr.join(', ') : 'Nenhuma';
    const formatData = (periodo) => periodo?.length ? `${periodo[0]} - ${periodo[1]}` : '';



    return `
          <style>
           * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

             .resume-template {
              width:794px; 
              height: 1123px;
              font-size: 90%;
              font-family: 'Arial';
            }
          h2{
            font-size: 15px;
          }
          </style>  
            <div class="resume-template" style="width: 100%; margin: 0 auto; font-size: 105%; color: #333333;">
        <!-- Cabeçalho -->

        <div style="background: #333333; color: white; padding: 20px; margin-bottom: 20px;">
          ${data.personal_data.nome ? `<h1 style="margin: 0; font-size: 28px; color: white;">${data.personal_data.nome}</h1>` : ''}

          <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; color: white;">
            ${data.personal_data.localizacao ? `<span>${data.personal_data.localizacao}</span>` : ''}
            ${data.personal_data.telefone ? `<span>${data.personal_data.telefone}</span>` : ''}
            ${data.personal_data.email ? `<span>Gmail: <a href="mailto:${data.personal_data.email}" style="text-decoration: none; color: #3498db;">${data.personal_data.email}</a></span>` : ''}
          </div>

          <div style="color: white;">
            ${data.personal_data.github ? `<a href="${data.personal_data.github}" style="text-decoration: none; color: #3498db;"><span style="color: white;">Github:</span> ${data.personal_data.github}</a><br>` : ''}
            ${data.personal_data.linkedin ? `<a href="${data.personal_data.linkedin}" style="text-decoration: none; color: #3498db;"><span style="color: white;">LinkedIn:</span> ${data.personal_data.linkedin}</a>` : ''}
          </div>
        </div>


        ${data.objetivo ? `
          <section style="padding: 10px 20px;">
            <h2 style="border-bottom: 0.5px solid #333333; margin: 0 0 8px; padding-bottom: 5px; color: #333333;">Objetivo Profissional</h2>
            <p style="margin: 0; color: #666666;">${data.objetivo}</p>
          </section>` : ''}



        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${Array.isArray(data.education) && data.education.length ? `
            <section style="padding: 10px 20px;">
              <h2 style="border-bottom: 0.5px solid #333333; margin: 0 0 8px; color: #333333;  padding-bottom: 5px;">Formação Acadêmica</h2>
              ${data.education.map(edu => `
                <div style="margin-bottom: 10px;">
                  ${edu.course ? `<p style="margin: 5px 0; font-weight: bold; color: #333333;">${edu.course}</p>` : ''}
                  ${edu.institution ? `<p style="margin: 0; color: #666666;">${edu.institution}${edu.location ? ` - ${edu.location}` : ''}</p>` : ''}
                  ${(edu.start_data || edu.end_data) ? `<p style="margin: 0; color: #666666;">${[edu.start_data, edu.end_data].filter(Boolean).join(' - ')}</p>` : ''}
                </div>
              `).join('')}
            </section>` : ''}


          ${(data.technical_skills && Object.keys(data.technical_skills).length > 0) ? `
            <section style="padding: 10px 20px;">
              <h2 style="border-bottom: 0.5px solid #333333; margin: 0 0 8px; color: #333333;  padding-bottom: 5px;">Habilidades Técnicas</h2>
              <ul style="padding-left: 20px; margin: 0;">
                ${Object.entries(data.technical_skills).map(([skillType, skills]) => `
                  <li style="margin-bottom: 4px; color: #666666;"><strong style="color: #333333;">${skillType.charAt(0).toUpperCase() + skillType.slice(1)}:</strong> ${formatSkills(skills)}</li>
                `).join('')}
              </ul>
            </section>` : ''}
        </div>



        <!-- experiencia profissional -->
        ${(data.professional_experience && data.professional_experience.length > 0) ? `
          <section style="padding: 10px 20px;">
            <h2 style="border-bottom: 0.5px solid #333333; margin: 0 0 8px; color: #333333;  padding-bottom: 5px;">Experiências Profissionais</h2>
            ${data.professional_experience.map(projeto => `
              <div style="padding-bottom: 10px; margin-top: 5px; border-bottom: 1px dashed #eee;">
                ${projeto.nome ? `<div style="display: flex; justify-content: space-between;">
                  <h3 style="margin: 0; color: #333333;  font-size: 14px;">${projeto.nome}</h3>
                  ${projeto.data ? `<span style="color: #666666;">${formatData(projeto.data)}</span>` : ''}
                </div>` : ''}
                ${projeto.descricao ? `<p style="margin: 5px 0; color: #666666; font-size: 14px;">${projeto.descricao}</p>` : ''}
                ${projeto.github ? `<p style="margin: 5px 0;"><a href="https://${projeto.github}" style="text-decoration: none; color: #3498db;">${projeto.github}</a></p>` : ''}
                ${projeto.detalhes?.length ? `
                  <ul style="padding-left: 20px; margin: 5px 0;">
                    ${projeto.detalhes.map(detalhe => `<li style="margin-bottom: 4px; color: #666666;">${detalhe}</li>`).join('')}
                  </ul>` : ''}
              </div>
            `).join('')}
          </section>` : ''}


          

        ${(data.cursos_extras && data.cursos_extras.length > 0) ? `
          <section style="padding: 10px 20px;">
            <h2 style="border-bottom: 0.5px solid #333333; margin: 0 0 8px; color: #333333;  padding-bottom: 5px;">Cursos Complementares</h2>
            <ul style="padding-left: 20px; margin: 5px 0; columns: 2; column-gap: 20px;">
              ${data.cursos_extras.map(curso => `
                <li style="margin-bottom: 6px; color: #666666;"><strong style="color: #333333;">${curso.titulo}</strong><br><span>${curso.plataforma} (${curso.carga_horaria})</span></li>
              `).join('')}
            </ul>
          </section>` : ''}



        ${(data.idiomas && data.idiomas.length > 0) ? `
          <section style="padding: 10px 20px;">
            <h2 style="border-bottom: 0.5px solid #333333; margin: 0 0 8px; color: #333333;  padding-bottom: 5px;">Idiomas</h2>
            <ul style="padding-left: 20px; margin: 5px 0;">
              ${data.idiomas.map(idioma => `<li style="margin-bottom: 4px; color: #666666;"><strong style="color: #333333;">${idioma.nome}:</strong> ${idioma.nivel}</li>`).join('')}
            </ul>
          </section>` : ''}
      </div>`;
  }






  modernTemplate(data) {
    const formatSkills = (arr) => arr?.length ? arr.join(', ') : 'Nenhuma';
    const formatData = (periodo) => periodo?.length ? `${periodo[0]} - ${periodo[1]}` : '';
    console.log(data.personal_data.nome);


    return ` 
      <style>
         * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

          .resume-template {
              width:794px; 
              height: 1123px;
              font-size: 90%;
              font-family: 'Arial';
          }
        h2{
          font-size: 20px;
        }
    </style>  
      <div class="resume-template" style="padding: 0px 40px; margin-top: 15px; background: white; color: #000;">
        <!-- Cabeçalho -->
        <header style="margin-bottom: 15px; padding-bottom: 10px;">
           ${data.personal_data.nome ? `<h1 style="margin: 0 0 5px 0; font-size: 32px; color: #000;">
          ${data.personal_data.nome}</h1>` : ''}

          ${(data.personal_data.localizacao || data.personal_data.telefone || data.personal_data.email) ? `
          <div style="margin-bottom: 5px; color: #555;">
            <span style="color: #000;">Contato:</span> ${[
          data.personal_data.localizacao,
          data.personal_data.telefone,
          data.personal_data.email ? `<a href="mailto:${data.personal_data.email}" style="color: #1e6bb8; text-decoration: none;">${data.personal_data.email}</a>` : ''
        ].filter(Boolean).join(' | ')}
          </div>` : ''}

          ${(data.personal_data.github || data.personal_data.linkedin) ? `
            <div style="display: flex; flex-direction: column; gap:5px;">
              ${data.personal_data.github ? `<a href="https://${data.personal_data.github}" style="color: #1e6bb8; text-decoration: none;">
              <span style="color: #000;">GitHub:</span> ${data.personal_data.github}</a>` : ''}
              ${data.personal_data.linkedin ? `<a href="https://${data.personal_data.linkedin}" style="color: #1e6bb8; text-decoration: none;">
              <span style="color: #000;">LinkedIn:</span> ${data.personal_data.linkedin}</a>` : ''}
            </div>` : ''}
        </header>

        ${data.objetivo ? `
        <section style="margin-bottom: 15px;">
          <h2 style="font-size: 18px; letter-spacing: 1px; margin: 0 0 10px 0; color: #000;">Objetivo Profissional</h2>
          <p style="line-height: 1.6; margin: 0; color: #555;">${data.objetivo}</p>
        </section>` : ''}
             <div style="border-bottom: 1px solid #eee; margin: 15px 0;"></div>
        ${Array.isArray(data.education) && data.education.length ? `
        <h2 style="font-size: 18px; margin: 0 0 10px 0; color: #000;">Formação</h2>
        <section style="margin-bottom: 15px; display:grid; grid-template-columns: repeat(2, 1fr);">
          ${data.education.map(edu => `
            <div style="margin-bottom: 10px;">
              ${edu.course ? `<p style="margin: 0 0 5px 0; font-weight: bold; color: #000;">${edu.course}</p>` : ''}
              ${edu.institution ? `<p style="margin: 0 0 5px 0; color: #555;">${edu.institution}</p>` : ''}
              ${(edu.start_data || edu.end_data || edu.location) ? `<p style="margin: 0; color: #888;">
                ${[edu.start_data, edu.end_data].filter(Boolean).join(' - ')}${edu.location ? ` | ${edu.location}` : ''}</p>` : ''}
            </div>
          `).join('')}
        </section>` : ''}

        <div style="border-bottom: 1px solid #eee; margin: 15px 0;"></div>



        ${data.professional_experience?.length ? `
        <section style="margin-bottom: 15px;">
          <h2 style="font-size: 18px; letter-spacing: 1px; margin: 0 0 10px 0; color: #000;">Experiência</h2>
          ${data.professional_experience.map(projeto => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between;">
                ${projeto.nome ? `<h3 style="margin: 0 0 5px 0; font-size: 14px; color: #000;">${projeto.nome}</h3>` : ''}
                ${projeto.data ? `<span style="color: #888; ">${formatData(projeto.data)}</span>` : ''}
              </div>
              ${projeto.descricao ? `<p style="margin: 0 0 8px 0; color: #555;">${projeto.descricao}</p>` : ''}
              ${projeto.github ? `<p style="margin: 0 0 8px 0; "><a href="https://${projeto.github}" style="color:#1e6bb8; text-decoration: none;"><span style="color:#000;">Link:</span> ${projeto.github}</a></p>` : ''}
              ${projeto.detalhes?.length ? `
                <ul style="padding-left: 20px; margin: 10px 0 0 0;">
                  ${projeto.detalhes.map(detalhe => `<li style="margin-bottom: 4px;  color: #555;">${detalhe}</li>`).join('')}
                </ul>` : ''}
            </div>`).join('')}
        </section>` : ''}


        
        <div style="border-bottom: 1px solid #eee; margin: 15px 0;"></div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 15px;">
          ${data.idiomas?.length ? `
          <section>
            <h2 style="font-size: 18px; letter-spacing: 1px; margin: 0 0 10px 0; color: #000;">Idiomas</h2>
            ${data.idiomas.map(idioma => `
              <p style="margin: 0; color: #555;"><strong style="color: #000;">${idioma.nome}:</strong> ${idioma.nivel}</p>`).join('')}
          </section>` : ''}

          ${Object.keys(data.technical_skills || {}).length ? `
          <section>
            <h2 style="font-size: 18px; letter-spacing: 1px; margin: 0 0 10px 0; color: #000;">Habilidades</h2>
            <div>
              ${Object.entries(data.technical_skills).map(([skillType, skills]) => `
                <p style="margin: 0 0 8px 0; color: #555;">
                  <strong style="color: #000;">${skillType.charAt(0).toUpperCase() + skillType.slice(1)}:</strong> ${formatSkills(skills)}
                </p>`).join('')}
            </div>
          </section>` : ''}
        </div>

        <div>
          <div style="border-bottom: 1px solid #eee; margin: 20px 0;"></div>
          <div>
            ${data.cursos_extras?.length ? `
            <h2 style="font-size: 18px; letter-spacing: 1px; margin: 0 0 10px 0; color: #000;">Cursos</h2>
            <section style="display:grid; grid-template-columns: repeat(2, 2fr); margin-top: 15px;">
              ${data.cursos_extras.map(curso => `
                <div style="margin-bottom: 5px;">
                  <strong style="color: #000;">${curso.titulo}</strong>
                  <div style=" color: #555;">
                    ${curso.plataforma} • ${curso.carga_horaria}
                  </div>
                </div>`).join('')}
            </section>` : ''}
          </div>
        </div>
      </div>

        `
  }






  /////////////////////// color template! //////////////////////////////

  color(data) {
    const formatSkills = (arr) => arr?.length ? arr.join(', ') : 'Nenhuma';
    const formatData = (periodo) => periodo?.length ? `${periodo[0]} - ${periodo[1]}` : '';

    return `
        <style>
           * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

          .resume-template {
              width:794px; 
              height: 1123px;
              font-size: 80%;
              font-family: 'Arial';
          }
        </style>  
          <div class="resume-template" style="max-width: 800px;  
                margin: 0 auto; margin-top: 15px; padding: 0px 30px; color: #2c3e50; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <!-- Cabeçalho -->
        <header style="text-align: center;">
          <div style="">
            ${data.personal_data.nome ? `<h1 style="margin: 0; font-size: 32px; color: #2c3e50;">${data.personal_data.nome}</h1>` : ''}
          </div>

         <div style="display: flex;  margin-top: 10px; justify-content: center; gap: 15px; flex-wrap: wrap; color: #555; font-size: 14px; align-items: center;">
          <span><strong style="color: #2c3e50;">Contato:</strong> 
          ${data.personal_data.email ? `<a href="https://${data.personal_data.email}" style=" color: #154c87; text-decoration: none;" target="_blank"  >${data.personal_data.email}</a> | ` : ''}
          ${data.personal_data.telefone ? `<span>${data.personal_data.telefone} |</span> ` : ''}
          ${data.personal_data.localizacao ? `<span> ${data.personal_data.localizacao}</span> | ` : ''}
        </div>

          <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px; font-size: 14px;">
            ${data.personal_data.github ? `<span>
              <strong style="color: #2c3e50;">GitHub:</strong> 
              <a href="https://${data.personal_data.github}" target="_blank" style=" color: #154c87; text-decoration: none;">${data.personal_data.github}</a></span>` : ''}
            ${data.personal_data.linkedin ? `<span><strong style="color: #2c3e50;">LinkedIn:
              </strong> <a href="https://${data.personal_data.linkedin}" target="_blank" style=" color: #154c87; text-decoration: none;">${data.personal_data.linkedin}</a></span>` : ''}
           </div>
        </header>

        ${data.objetivo ? `
        <!-- Objetivo -->
        <section style="margin-bottom: 25px;">
          <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Objetivo</h2>
          <p style="color: #555; margin-top:5px;">${data.objetivo}</p>
        </section>` : ''}



        <!-- formação -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top:-10px;">
          ${data.education?.length ? `
          <section style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Formação</h2>
            ${data.education.map(edu => `
              <div style="margin-bottom: 10px; margin-top:5px;">
                ${(edu.course || edu.location) ? `<p style="margin: 0;"><strong>${edu.course}</strong> - ${edu.location}</p>` : ''}
                ${edu.institution ? `<p style="margin: 0; color: #555;">${edu.institution}</p>` : ''}
                ${(edu.start_data || edu.end_data) ? `
                  <p style="margin: 0; color: #7f8c8d; font-size: 14px;">
                    ${edu.start_data || ''} - ${edu.end_data || ''}
                  </p>` : ''}
              </div>
            `).join('')}
          </section>
          ` : ''}


        ${Object.keys(data.technical_skills || {}).length ? `
          <section style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Habilidades</h2>
            <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
              ${Object.entries(data.technical_skills).map(([skillType, skills]) => `
                <div style="padding: 1px 1px; border-radius: 6px;">
                  <p style="margin: 0 0 4px 0; font-weight: bold; color: #2c3e50;">${skillType}</p>
                  <p style="margin: 0; color: #555;">${formatSkills(skills)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        </div>
            


        <!-- EXperiência -->
        <!-- EXperiência -->
        ${data.professional_experience?.length ? `
          <section style="margin-bottom: 25px;  margin-top:-15px;">
          <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Experiência Profissional</h2>
          <div style="position: relative; margin-left: 10px; padding-left: 15px; border-left: 2px solid #eaeaea;">
          ${data.professional_experience.map(experience => `
            <div style="position: relative; margin-top: 10px; padding: 5px 0;">
                <div style="position: absolute; left: -22px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: #3498db;"></div>
                ${experience.nome ? `<h3 style="margin: 0; font-size: 13px; color: #2c3e50;">${experience.nome}</h3>` : ''}
                ${experience.data ? `<p style="margin: 0; margin-bottom: 5px; color: #7f8c8d; font-size: 13px;">${formatData(experience.data)}</p>` : ''}
                ${experience.descricao ? `<p style="margin: 0; color: #555;">${experience.descricao}</p>` : ''}
                ${experience.github ? `<p style="margin: 0;"><a href="https://${experience.github}" style="color: #154c87; font-size: 13px;">${experience.github}</a></p>` : ''}
                ${experience.detalhes?.length ? `
                  <ul style="padding-left: 20px; margin: 5px 0 0 0; color: #555; font-size: 13px;">
                  ${experience.detalhes.map(detalhe => `<li>${detalhe}</li>`).join('')}
                  </ul>` : ''}
                  </div>
                  `).join('')}
            </div>
        </section>` : ''}
                  
                  
                  
          <!-- CURSOS EXTRAS  -->
        ${data.cursos_extras?.length ? `
        <section style="margin-bottom: 25px; margin-top: 5px;">
          <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Cursos</h2>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr);">
            ${data.cursos_extras.map(curso => `
              <div>
                <p style="margin:0; font-size: 14px;"><strong>${curso.titulo}</strong></p>
                <p style="margin-top:5px; color: #555;">${curso.plataforma} • ${curso.carga_horaria}</p>
              </div>
            `).join('')}
          </div>
        </section>` : ''}


        ${data.idiomas?.length ? `
        <section style="margin-bottom: 25px; margin-top:-10px;">
          <h2 style="color: #2c3e50; border-bottom: 1px solid #3498db; padding-bottom: 5px;">Idiomas</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr;  margin-top:5px;">
            ${data.idiomas.map(idioma => `
              <p style="margin: 0; color: #555;">
                <strong style="color: #2c3e50; font-size: 14px;">${idioma.nome}:</strong> ${idioma.nivel}
              </p>
            `).join('')}
          </div>
        </section>` : ''}
      </div>
      `;
  }

  clean(data) {

  }
}





