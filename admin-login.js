/**
 * ==================== LÓGICA DE LOGIN SEGURO ====================
 * Manejo del formulario de login con validaciones de seguridad
 */

document.addEventListener('DOMContentLoaded', () => {
    // CORRECCIÓN CRÍTICA: Asegurar que el hash del admin en localStorage sea el correcto
    const fixAdminHash = () => {
        const STORAGE_KEY = 'boti_dival_users_v2';
        const correctHash = '9675b032f0e8bbb61eb49aeb86c21042ea813bde6e7489963789c628cc0e2398';
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
            try {
                let db = JSON.parse(stored);
                let changed = false;
                db.forEach(u => {
                    if (u.email === 'admin@botidival.com' && u.passwordHash !== correctHash) {
                        u.passwordHash = correctHash;
                        changed = true;
                    }
                });
                if (changed) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
                    console.log('✅ Hash de administrador actualizado correctamente.');
                }
            } catch (e) {
                console.error('Error al corregir hash:', e);
            }
        }
    };
    fixAdminHash();

    // Verificar que Auth y USERS_DATABASE estén cargados
    if (typeof Auth === 'undefined' || typeof USERS_DATABASE === 'undefined') {
        console.error('❌ Error: Auth o USERS_DATABASE no están cargados');
        document.body.innerHTML = '<h1 style="color:red; padding:20px;">Error: Sistema de autenticación no cargado. Por favor recarga la página.</h1>';
        return;
    }

    console.log('✅ Sistema de autenticación cargado correctamente');

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

    /**
     * Mostrar mensaje de sesión
     */
    function showSessionMessage(message, type = 'error') {
        sessionMessage.textContent = message;
        sessionMessage.className = `alert-message alert-${type}`;
        sessionMessage.style.display = 'block';
    }

    /**
     * Mostrar mensaje de error
     */
    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.className = 'alert-message alert-error';
        errorMessage.style.display = 'block';
    }

    /**
     * Limpiar mensaje de error
     */
    function clearErrorMessage() {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }

    /**
     * Validar email formato
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validar contraseña
     */
    function validatePasswordInput(password) {
        if (password.length < 6) {
            return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
        }
        return { valid: true };
    }

    /**
     * Habilitar/deshabilitar botón de login
     */
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

    /**
     * Manejar envío del formulario
     */
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrorMessage();

        // Obtener valores
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validaciones de cliente
        if (!email) {
            showErrorMessage('Por favor ingresa tu email');
            emailInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showErrorMessage('Por favor ingresa un email válido');
            emailInput.focus();
            return;
        }

        if (!password) {
            showErrorMessage('Por favor ingresa tu contraseña');
            passwordInput.focus();
            return;
        }

        const passwordValidation = validatePasswordInput(password);
        if (!passwordValidation.valid) {
            showErrorMessage(passwordValidation.error);
            return;
        }

        // Deshabilitar botón y mostrar loader
        setLoginButtonState(true);

        try {
            // Simular delay de red para evitar ataques de fuerza bruta
            await new Promise(resolve => setTimeout(resolve, 500));

            // Intentar login
            const result = Auth.login(email, password);
            console.log('📝 Resultado de login:', result);

            if (result.success) {
                // Login exitoso
                console.log('✅ Login exitoso para:', email);
                showSuccessAnimation();

                // Guardar email si está marcado "Recordarme"
                if (rememberMe.checked) {
                    localStorage.setItem('remembered_email', email);
                } else {
                    localStorage.removeItem('remembered_email');
                }

                // Redirigir según el rol
                setTimeout(() => {
                    const user = Auth.getCurrentUser();
                    console.log('👤 Usuario actual:', user);
                    console.log('🔑 BASE_URL:', window.BASE_URL);
                    
                    if (user.role === 'admin') {
                        const redirectUrl = window.BASE_URL + 'admin-dashboard.html';
                        console.log('🚀 Redirigiendo a:', redirectUrl);
                        window.location.href = redirectUrl;
                    } else {
                        const redirectUrl = window.BASE_URL + 'index.html';
                        console.log('🚀 Redirigiendo a:', redirectUrl);
                        window.location.href = redirectUrl;
                    }
                }, 1000);
            } else {
                // Login fallido
                console.log('❌ Login fallido:', result.error);
                setLoginButtonState(false);
                
                if (result.locked) {
                    showErrorMessage(result.error);
                    passwordInput.disabled = true;
                    emailInput.disabled = true;
                    loginBtn.disabled = true;
                } else {
                    showErrorMessage(result.error);
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            }
        } catch (error) {
            setLoginButtonState(false);
            showErrorMessage('Error de conexión. Por favor intenta de nuevo.');
            console.error('Error en login:', error);
        }
    });

    /**
     * Mostrar animación de éxito
     */
    function showSuccessAnimation() {
        loginForm.style.opacity = '0.5';
        loginBtn.innerHTML = '✅ Autenticado - Redirigiendo...';
        loginBtn.style.background = '#33d884';
        
        // Efecto de confeti simple
        createConfetti();
    }

    /**
     * Crear efecto de confeti
     */
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

    /**
     * Validar en tiempo real
     */
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = '#C41E3A';
        } else {
            emailInput.style.borderColor = '#333';
        }
    });

    passwordInput.addEventListener('blur', () => {
        if (passwordInput.value && passwordInput.value.length < 6) {
            passwordInput.style.borderColor = '#C41E3A';
        } else {
            passwordInput.style.borderColor = '#333';
        }
    });

    /**
     * Limpiar error al escribir
     */
    emailInput.addEventListener('input', () => {
        if (errorMessage.style.display === 'block') {
            clearErrorMessage();
        }
    });

    passwordInput.addEventListener('input', () => {
        if (errorMessage.style.display === 'block') {
            clearErrorMessage();
        }
    });

    /**
     * Proteger contra pega de contraseña (opcional)
     */
    passwordInput.addEventListener('paste', (e) => {
        // Permitir pero registrar
        Auth.logSecurityEvent('PASSWORD_PASTE_ATTEMPT', {
            timestamp: new Date().toISOString()
        });
    });

    /**
     * Log de actividad
     */
    console.log('%c🔐 Sistema de Login Seguro Cargado', 'color: green; font-weight: bold;');
    console.log('Credenciales de desarrollo disponibles en la interfaz');
});
