import resumeDAO from "../model/resumeDAO.js";


export default class FormDataCollector {
  static getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : null;
  }

  static collectFormData() {
    // Dados pessoais
    const personal_data = {
      name: this.getValue('nome'),
      location: this.getValue('localizacao'),
      phone: this.getValue('telefone'),
      email: this.getValue('email'),
      github: this.getValue('github'),
      linkedin: this.getValue('linkedin')
    };

    // Objetivo
    const objective = this.getValue('objetivo');
    const urlParams = new URLSearchParams(window.location.search);
    const template = urlParams.get('template');
    const user_id = sessionStorage.getItem('user_id');

    // Formação acadêmica
    const education = [];
    document.querySelectorAll('#educacao-container .addable-section').forEach(section => {
      education.push({
        course: section.querySelector('input[name="curso[]"]')?.value || '',
        institution: section.querySelector('input[name="instituicao[]"]')?.value || '',
        location: section.querySelector('input[name="local[]"]')?.value || '',
        data_start: section.querySelector('input[name="inicio[]"]')?.value || '',
        data_end: section.querySelector('input[name="conclusao[]"]')?.value || ''
      });
    });

    // Habilidades técnicas
    const technical_skills = [];
    document.querySelectorAll('#habilidades-container .addable-section').forEach(section => {
      const categoria = section.querySelector('input[name="categoria_habilidade[]"]')?.value.trim();
      const habilidades = section.querySelector('input[name="lista_habilidades[]"]')?.value;

      if (categoria && habilidades) {
        const skillsArray = habilidades.split(',')
          .map(skill => skill.trim())
          .filter(skill => skill !== '');

        if (skillsArray.length > 0) {
          technical_skills.push({
            name: categoria.toLowerCase(),
            skills: skillsArray
          });
        }
      }
    });

    // Experiências profissionais
    const professional_experience = [];
    document.querySelectorAll('#experiencias-container .addable-section').forEach(section => {
      const detalhesText = section.querySelector('textarea[name="experiencia_detalhes[]"]')?.value || '';
      const detalhesArray = detalhesText.split('\n')
        .map(item => item.trim())
        .filter(item => item !== '' && item !== '-');

      professional_experience.push({
        name: section.querySelector('input[name="experiencia_nome[]"]')?.value || '',
        period: [
          section.querySelector('input[name="experiencia_inicio[]"]')?.value || '',
          section.querySelector('input[name="experiencia_fim[]"]')?.value || ''
        ],
        github: section.querySelector('input[name="experiencia_github[]"]')?.value || '',
        description: section.querySelector('input[name="experiencia_descricao[]"]')?.value || '',
        details: detalhesArray
      });
    });

    // Cursos extras
    const additional_courses = [];
    document.querySelectorAll('#cursos-extras-container .addable-section').forEach(section => {
      additional_courses.push({
        name: section.querySelector('input[name="curso_extra_nome[]"]')?.value || '',
        platform: section.querySelector('input[name="curso_extra_instituicao[]"]')?.value || '',
        duration: section.querySelector('input[name="curso_extra_horas[]"]')?.value || ''
      });
    });

    const languages = [];
    document.querySelectorAll('#languages-container .addable-section').forEach(section => {
      languages.push({
        name: section.querySelector('input[name="languages_name[]"]')?.value || '',
        level: section.querySelector('input[name="languages_level[]"]')?.value || ''
      });
    });

    // Idiomas
    // const languages = [];
    // const languages_name = this.getValue('languages_name');
    // if (portugues) languages.push({ name: 'Português', level: portugues });
    // if (ingles) languages.push({ name: 'Inglês', level: ingles });

    // Objeto final
    return {
      user_id: user_id,
      template_selected: template,
      personal_data,
      objective,
      education,
      technical_skills,
      professional_experience,
      additional_courses,
      languages
    };
  }
}


// Botão de salvar currículo
document.getElementById('btnCreate').addEventListener('click', async () => {
  try {
    const jsonData = FormDataCollector.collectFormData(); // coleta atualizada aqui
    const create = await resumeDAO.create(jsonData);

    if (create) {
      window.location.href = 'dashboard.html'
    }

  } catch (error) {
    console.error('Erro ao salvar currículo:', error);
  }
});

