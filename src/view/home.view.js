class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.autoSlideInterval = null;

        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        this.statusProgress = document.getElementById('statusProgress');

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        this.startAutoSlide();
        this.updateStatusBar();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
        this.restartAutoSlide();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.restartAutoSlide();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.restartAutoSlide();
    }

    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        this.updateStatusBar();
    }

    updateStatusBar() {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.statusProgress.style.transform = `translateX(${(this.currentSlide * 100)}%)`;
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    restartAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});


// Modal functions
function openModal() {
    document.getElementById('loginModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchToRegister() {
    const form = document.querySelector('.login-form');
    const title = form.querySelector('h2');
    const submitBtn = form.querySelector('.submit-btn');
    const footer = form.querySelector('.form-footer');

    if (title.textContent === 'Entrar') {
        title.textContent = 'Cadastrar';
        submitBtn.textContent = 'Criar Conta';
        footer.innerHTML = 'Já tem conta? <a href="#" onclick="switchToRegister()">Entre aqui</a>';

        // Add confirm password field
        const confirmPasswordGroup = document.createElement('div');
        confirmPasswordGroup.className = 'form-group';
        confirmPasswordGroup.innerHTML = `
                    <label for="confirmPassword">Confirmar Senha</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                `;
        form.insertBefore(confirmPasswordGroup, submitBtn);
    } else {
        title.textContent = 'Entrar';
        submitBtn.textContent = 'Entrar';
        footer.innerHTML = 'Não tem conta? <a href="#" onclick="switchToRegister()">Cadastre-se</a>';

        // Remove confirm password field
        const confirmPasswordGroup = document.getElementById('confirmPassword').parentElement;
        if (confirmPasswordGroup) {
            confirmPasswordGroup.remove();
        }
    }
}

// Close modal when clicking outside
document.getElementById('loginModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Form submission
document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isRegister = document.querySelector('.login-form h2').textContent === 'Cadastrar';

    if (isRegister) {
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        alert('Conta criada com sucesso!');
    } else {
        alert('Login realizado com sucesso!');
    }

    closeModal();
    this.reset();
});