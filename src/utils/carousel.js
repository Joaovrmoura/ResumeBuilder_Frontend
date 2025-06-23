
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


function verificarAutenticacaoComModal() {
    
   const userId = sessionStorage.getItem('user_id');
   const user_email = sessionStorage.getItem('user_email')
   
    if (!user_email || !userId) {
        const modal = document.getElementById('authRequiredModal');
        modal.style.display = 'flex';

        const loginBtn = document.getElementById('goToLogin');
        loginBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            openModal(); // abre o modal de login
        });
        return false; // bloqueia execução
    }

    return true; // usuário autenticado
}


// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const createCV = document.querySelectorAll('#create-cv');
    createCV.forEach(button => {
        button.addEventListener('click', (e) => {
            const verified = verificarAutenticacaoComModal();
            if(!verified) e.preventDefault()
        })
    })
    new Carousel();
   
});

