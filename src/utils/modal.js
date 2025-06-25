// scripts/modalLogin.js
import AuthController from '../controller/AuthController.js';

class ModalLogin {
    constructor(modalId = 'loginModal') {
        this.modal = document.getElementById(modalId);
        this.form = document.querySelector('.login-form');
        this.title = this.form?.querySelector('h2');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        this.footer = this.form?.querySelector('.form-footer');

        this.init();    
        // Submissão do login
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.title.textContent === 'Entrar') {
                this.loginForm();
            } else {
                this.registerForm();
            }
        });
    }

    async loginForm() {
        const loader = document.getElementById('modal-loader');
        loader.style.display = 'flex';
        loader.textContent = 'Servidor Render iniciando...'
        
        try {
            const email = this.form.querySelector('#email').value;
            const password = this.form.querySelector('#password').value;

            const userData = {
                email: email,
                password: password
            }
            const auth = new AuthController()
            const login = await auth.login(userData)

            if (login) {
                this.close();
                this.updateAuthUI(true);
            }

        } catch (error) {
            console.error(error);
        } finally {
            loader.style.display = 'none';
        }
    }

    async registerForm() {
        const loader = document.getElementById('modal-loader');
        loader.style.display = 'flex';

        try {
            const email = this.form.querySelector('#email').value;
            const password = this.form.querySelector('#password').value;
            const confirmPassword = this.form.querySelector('#confirmPassword')?.value;

            if (password !== confirmPassword) {
                alert('As senhas não conferem.');
                return;
            }

            const userData = { email, password };
            const auth = new AuthController();
            const register = await auth.register(userData);

            if (register) {
                alert('Cadastrado com sucesso!');
                this.close();
                this.updateAuthUI(true);
            }

        } catch (error) {
            console.error(error);
        } finally {
            loader.style.display = 'none';
        }
    }

    updateAuthUI(isLoggedIn) {
        const loginBtn = document.querySelector('.login-btn');
        const userContainer = document.querySelector('.user-container');
        
        if (isLoggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            
            if (!userContainer) {
                const nav = document.querySelector('nav');
                if (nav) {
                    const newUserContainer = document.createElement('div');
                    newUserContainer.className = 'user-container';
                    nav.appendChild(newUserContainer);
                }
            }
            
            const container = document.querySelector('.user-container');
            let userSpan = container.querySelector('.user-name');
            let logoutBtn = container.querySelector('.logout-btn');
            
            if (!userSpan) {
                userSpan = document.createElement('span');
                userSpan.className = 'user-name';
                userSpan.textContent = 'Logado';
                container.appendChild(userSpan);
            }
            
            if (!logoutBtn) {
                logoutBtn = document.createElement('button');
                logoutBtn.className = 'logout-btn';
                logoutBtn.textContent = 'Logout';
                container.appendChild(logoutBtn);
                
                logoutBtn.addEventListener('click', () => {
                    sessionStorage.removeItem('user_id');
                    sessionStorage.removeItem('user_email');
                    this.updateAuthUI(false);
                });
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (userContainer) userContainer.remove();
        }
    }

    init() {
        if (!this.modal) return;

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        window.openModal = () => this.open();
        window.closeModal = () => this.close();
        window.switchToRegister = () => this.switchToRegister();

        this.setupSmoothScroll();
        this.setupHeaderScrollEffect();

    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    switchToRegister() {
        if (!this.form || !this.title || !this.submitBtn || !this.footer) return;

        const isLogin = this.title.textContent === 'Entrar';

        this.title.textContent = isLogin ? 'Cadastrar' : 'Entrar';
        this.submitBtn.textContent = isLogin ? 'Criar Conta' : 'Entrar';
        this.footer.innerHTML = isLogin
            ? 'Já tem conta? <a href="#" onclick="switchToRegister()">Entre aqui</a>'
            : 'Não tem conta? <a href="#" onclick="switchToRegister()">Cadastre-se</a>';

        const existing = document.getElementById('confirmPassword');
        if (isLogin && !existing) {
            const confirmPasswordGroup = document.createElement('div');
            confirmPasswordGroup.className = 'form-group';
            confirmPasswordGroup.innerHTML = `
                <label for="confirmPassword">Confirmar Senha</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            `;
            this.form.insertBefore(confirmPasswordGroup, this.submitBtn);
        } else if (!isLogin && existing) {
            existing.parentElement.remove();
        }
    }

    setupSmoothScroll() {
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
    }

    setupHeaderScrollEffect() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (!header) return;
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = new ModalLogin();
    
    const userId = sessionStorage.getItem('user_id');
    const user_email = sessionStorage.getItem('user_email');

    modal.updateAuthUI(!!userId && !!user_email);
});