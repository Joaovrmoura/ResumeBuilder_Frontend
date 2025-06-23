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

    // Idiomas
    const languages = [];
    const portugues = this.getValue('portugues');
    const ingles = this.getValue('ingles');
    if (portugues) languages.push({ language: 'Português', level: portugues });
    if (ingles) languages.push({ language: 'Inglês', level: ingles });

    // Objeto final
    return {
      user_id: "68537646ec4a38bdc1b45f9e",
      template_selected: "moderno",
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



// Configurar o evento de clique corretamente
document.getElementById('visualizar-json').addEventListener('click', function() {
    const jsonData = FormDataCollector.collectFormData();
 
    console.log('Dados do Formulário:', jsonData);
    // Mostrar os dados em um alerta formatado (opcional)
    alert('Dados do formulário (verifique o console para detalhes):\n' + 
    JSON.stringify(jsonData, null, 2));
});
