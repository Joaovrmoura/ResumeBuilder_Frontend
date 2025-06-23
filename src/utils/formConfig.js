// Navegação por etapas
const stepSections = document.querySelectorAll('.step-section');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const totalSteps = stepSections.length;

// Função para mostrar uma etapa específica
function showStep(stepNumber) {
  stepSections.forEach(section => {
    section.classList.remove('active');
  });

  const stepToShow = document.getElementById(`step${stepNumber}`);
  if (stepToShow) {
    stepToShow.classList.add('active');

    // Atualizar barra de progresso
    const progressPercentage = (stepNumber / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `Etapa ${stepNumber} de ${totalSteps}`;

    // Scroll suave para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Event listeners para botões de navegação
document.querySelectorAll('.nav-btn.next').forEach(button => {
  button.addEventListener('click', function () {
    const nextStep = this.getAttribute('data-next');
    showStep(nextStep);
  });
});

document.querySelectorAll('.nav-btn.prev').forEach(button => {
  button.addEventListener('click', function () {
    if (!this.disabled) {
      const prevStep = this.getAttribute('data-prev');
      showStep(prevStep);
    }
  });
});


// Adicionar múltiplas habilidades técnicas
document.getElementById('add-habilidade').addEventListener('click', function() {
  const container = document.getElementById('habilidades-container');
  const template = container.querySelector('.addable-section').cloneNode(true);

  // Limpar valores
  template.querySelectorAll('input').forEach(input => {
    input.value = '';
  });

  // Adicionar evento de remoção
  const removeBtn = template.querySelector('.remove-item-btn');
  removeBtn.addEventListener('click', function() {
    container.removeChild(template);
  });

  container.appendChild(template);
});


// Adicionar múltiplas formações
document.getElementById('add-educacao').addEventListener('click', function () {
  const container = document.getElementById('educacao-container');
  const template = container.querySelector('.addable-section').cloneNode(true);

  // Limpar valores
  template.querySelectorAll('input, textarea').forEach(input => {
    input.value = '';
  });

  // Adicionar evento de remoção
  const removeBtn = template.querySelector('.remove-item-btn');
  removeBtn.addEventListener('click', function () {
    container.removeChild(template);
  });

  container.appendChild(template);
});

// Adicionar múltiplas experiências profissionais
document.getElementById('add-experiencia').addEventListener('click', function() {
  const container = document.getElementById('experiencias-container');
  const template = container.querySelector('.addable-section').cloneNode(true);

  // Limpar valores
  template.querySelectorAll('input, textarea').forEach(input => {
    input.value = '';
  });

  // Adicionar evento de remoção
  const removeBtn = template.querySelector('.remove-item-btn');
  removeBtn.addEventListener('click', function() {
    container.removeChild(template);
  });

  container.appendChild(template);
});
// Adicionar múltiplos cursos extras
document.getElementById('add-curso-extra').addEventListener('click', function() {
  const container = document.getElementById('cursos-extras-container');
  const template = container.querySelector('.addable-section').cloneNode(true);

  // Limpar valores
  template.querySelectorAll('input').forEach(input => {
    input.value = '';
  });

  // Adicionar evento de remoção
  const removeBtn = template.querySelector('.remove-item-btn');
  removeBtn.addEventListener('click', function() {
    container.removeChild(template);
  });

  container.appendChild(template);
});


// Adicionar eventos de remoção para os itens iniciais
document.querySelectorAll('.remove-item-btn').forEach(button => {
  button.addEventListener('click', function () {
    const container = this.closest('.addable-section').parentElement;
    const sections = container.querySelectorAll('.addable-section');

    // Não remover se for o único item
    if (sections.length > 1) {
      container.removeChild(this.closest('.addable-section'));
    } else {
      alert('Você precisa ter pelo menos um item nesta seção.');
    }
  });
});

// Simulação de envio do formulário
document.getElementById('resumeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Currículo gerado com sucesso! Em uma implementação real, aqui seria gerado o PDF ou visualização do currículo.');
});

// Botão de preview flutuante
document.querySelector('.preview-toggle').addEventListener('click', function () {
  alert('Visualização do currículo seria exibida aqui!');
});

// Melhorar experiência de foco nos campos
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', function () {
    this.parentElement.style.borderColor = 'var(--primary)';
  });

  input.addEventListener('blur', function () {
    this.parentElement.style.borderColor = '';
  });
});

// Inicializar a primeira etapa
showStep(1);

