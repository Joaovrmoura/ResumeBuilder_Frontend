function transformarResume(original) {
  const skillsByType = {};

  if (Array.isArray(original.technical_skills)) {
    original.technical_skills.forEach(skillGroup => {
      skillsByType[skillGroup.name] = skillGroup.skills || [];
    });
  }


  return {

    personal_data: {
      nome: original.personal_data?.name || '',
      localizacao: original.personal_data?.location || '',
      telefone: original.personal_data?.phone || '',
      email: original.personal_data?.email || '',
      github: original.personal_data?.github || '',
      linkedin: original.personal_data?.linkedin || ''
    },


    objetivo: original.objective || '',

   education: Array.isArray(original.education) ? original.education : [],


    technical_skills: skillsByType,

    professional_experience: (original.professional_experience || []).map(exp => ({
      nome: exp.name,
      data: exp.period,
      descricao: exp.description,
      github: exp.github?.replace('https://', '') || '',
      detalhes: exp.details || []
    })),

    cursos_extras: (original.additional_courses || []).map(curso => ({
      titulo: curso.name,
      plataforma: curso.platform,
      carga_horaria: curso.duration
    })),

    idiomas: (original.languages || []).map(lenguage => ({
      nome: lenguage.name,
      nivel: lenguage.level || "Não informado"
    }))
  };
}

function pegarSkills(skillsArray, tipo) {
  const skill = skillsArray?.find(s => s.name === tipo);
  return skill?.skills || [];
}

export default transformarResume;
