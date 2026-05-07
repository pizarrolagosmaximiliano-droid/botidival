/**
 * ==================== LÓGICA DE LOGIN SEGURO ====================
 * Manejo del formulario de login con Firebase Auth
 */
import { login, checkAuth } from '../services/auth.service.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Redirigir si ya está autenticado
    const currentUser = await checkAuth();
    if (currentUser) {
        window.location.href = window.BASE_URL + 'admin-dashboard.html';
        return;
    }

    console.log('✅ Sistema de autenticación Firebase cargado correctamente');

    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const sessionMessage = document.getElementById('sessionMessage');
    const rememberMe = document.getElementById('rememberMe');

    // Verificar si viene de sesión expirada
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reason') === 'inactivity') {
        showSessionMessage('⏰ Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.', 'info');
    }

    // Cargar email recordado si existe
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }

    function showSessionMessage(message, type = 'error') {
        sessionMessage.textContent = message;
        sessionMessage.className = `alert-message alert-${type}`;
        sessionMessage.style.display = 'block';
    }

    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.className = 'alert-message alert-error';
        errorMessage.style.display = 'block';
    }

    function clearErrorMessage() {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setLoginButtonState(disabled) {
        const spinner = document.getElementById('loginSpinner');
        const btnText = document.getElementById('loginBtnText');
        
        loginBtn.disabled = disabled;
        
        if (disabled) {
            if (spinner) spinner.style.display = 'inline-block';
            if (btnText) btnText.textContent = 'Verificando...';
        } else {
            if (spinner) spinner.style.display = 'none';
            if (btnText) btnText.textContent = 'Iniciar Sesión';
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrorMessage();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !isValidEmail(email)) {
            showErrorMessage('Por favor ingresa un email válido');
            emailInput.focus();
            return;
        }

        if (!password || password.length < 6) {
            showErrorMessage('La contraseña debe tener al menos 6 caracteres');
            passwordInput.focus();
            return;
        }

        setLoginButtonState(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                console.log('✅ Login exitoso');
                showSuccessAnimation();

                if (rememberMe.checked) {
                    localStorage.setItem('remembered_email', email);
                } else {
                    localStorage.removeItem('remembered_email');
                }

                setTimeout(() => {
                    window.location.href = window.BASE_URL + 'admin-dashboard.html';
                }, 1000);
            } else {
                setLoginButtonState(false);
                showErrorMessage(result.error);
                passwordInput.value = '';
                passwordInput.focus();
            }
        } catch (error) {
            setLoginButtonState(false);
            showErrorMessage('Error de conexión al servidor de autenticación.');
        }
    });

    function showSuccessAnimation() {
        loginForm.style.opacity = '0.5';
        loginBtn.innerHTML = '✅ Autenticado - Redirigiendo...';
        loginBtn.style.background = '#33d884';
        createConfetti();
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#D4AF37', '#C41E3A', '#33d884'][Math.floor(Math.random() * 3)];
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);

        let top = -10;
        let opacity = 1;
        const interval = setInterval(() => {
            top += Math.random() * 8 + 2;
            opacity -= 0.02;
            confetti.style.top = top + 'px';
            confetti.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(interval);
                confetti.remove();
            }
        }, 30);
    }

    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = '#C41E3A';
        } else {
            emailInput.style.borderColor = '#333';
        }
    });

    emailInput.addEventListener('input', () => {
        if (errorMessage.style.display === 'block') clearErrorMessage();
    });

    passwordInput.addEventListener('input', () => {
        if (errorMessage.style.display === 'block') clearErrorMessage();
    });
});
