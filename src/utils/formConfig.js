function verificarAutenticacao() {
  const token = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('user_id');

  if (!token || !userId) {
    window.location.href = 'home.html';
  }
}

verificarAutenticacao();

class ResumeFormSteps {
  constructor() {
    this.stepSections = document.querySelectorAll('.step-section');
    this.progressBar = document.getElementById('progressBar');
    this.progressText = document.getElementById('progressText');
    this.totalSteps = this.stepSections.length;

    this.init();
  }

  init() {
    this.bindNavigationButtons();
    this.bindDynamicAddButtons();
    this.bindRemoveButtons();
    this.bindFormSubmit();
    this.bindInputFocusEvents();
    this.showStep(1);
  }

  showStep(stepNumber) {
    this.stepSections.forEach(section => {
      section.classList.remove('active');
    });

    const stepToShow = document.getElementById(`step${stepNumber}`);
    if (stepToShow) {
      stepToShow.classList.add('active');
      const progressPercentage = (stepNumber / this.totalSteps) * 100;
      this.progressBar.style.width = `${progressPercentage}%`;
      this.progressText.textContent = `Etapa ${stepNumber} de ${this.totalSteps}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  bindNavigationButtons() {
    document.querySelectorAll('.nav-btn.next').forEach(button => {
      button.addEventListener('click', () => {
        const nextStep = button.getAttribute('data-next');
        this.showStep(nextStep);
      });
    });

    document.querySelectorAll('.nav-btn.prev').forEach(button => {
      button.addEventListener('click', () => {
        const prevStep = button.getAttribute('data-prev');
        if (!button.disabled) this.showStep(prevStep);
      });
    });
  }

  bindDynamicAddButtons() {
    this.setupAddButton('add-habilidade', 'habilidades-container', ['input']);
    this.setupAddButton('add-educacao', 'educacao-container', ['input', 'textarea']);
    this.setupAddButton('add-experiencia', 'experiencias-container', ['input', 'textarea']);
    this.setupAddButton('add-curso-extra', 'cursos-extras-container', ['input']);
  }

  setupAddButton(buttonId, containerId, inputSelectors) {
    const button = document.getElementById(buttonId);
    button?.addEventListener('click', () => {
      const container = document.getElementById(containerId);
      const template = container.querySelector('.addable-section').cloneNode(true);

      // Limpar valores
      template.querySelectorAll(inputSelectors.join(',')).forEach(input => input.value = '');

      // Adicionar evento de remoção
      const removeBtn = template.querySelector('.remove-item-btn');
      removeBtn?.addEventListener('click', () => container.removeChild(template));

      container.appendChild(template);
    });
  }

  bindRemoveButtons() {
    document.querySelectorAll('.remove-item-btn').forEach(button => {
      button.addEventListener('click', function () {
        const container = this.closest('.addable-section').parentElement;
        const sections = container.querySelectorAll('.addable-section');

        if (sections.length > 1) {
          container.removeChild(this.closest('.addable-section'));
        } else {
          alert('Você precisa ter pelo menos um item nesta seção.');
        }
      });
    });
  }

  bindFormSubmit() {
    const form = document.getElementById('resumeForm');
    form?.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Currículo gerado com sucesso! Em uma implementação real, aqui seria gerado o PDF ou visualização do currículo.');
    });
  }

  bindInputFocusEvents() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.parentElement.style.borderColor = 'var(--primary)';
      });
      input.addEventListener('blur', function () {
        this.parentElement.style.borderColor = '';
      });
    });
  }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
  new ResumeFormSteps();
});
