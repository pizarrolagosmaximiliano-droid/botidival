/**
 * ==================== SISTEMA DE AUTENTICACIÓN SEGURO ====================
 * Sistema profesional de autenticación con encriptación, JWT y roles
 * 
 * CREDENCIALES DE PRUEBA (DESARROLLO):
 * - Admin: usuario: "admin@botidival.com" | contraseña: "58442332"
 * ==================== ==================== ====================
 */

// ==================== CONFIGURACIÓN ====================
const AUTH_CONFIG = {
    JWT_SECRET: 'boti-dival-secret-key-2025-seguro', // ⚠️ CAMBIAR EN PRODUCCIÓN
    TOKEN_EXPIRATION: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
    PASSWORD_MIN_LENGTH: 8,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutos
    ROLES: {
        ADMIN: 'admin',
        CLIENTE: 'cliente'
    }
};

// ==================== CLASE DE AUTENTICACIÓN ====================
class AuthSystem {
    constructor() {
        this.currentUser = null;
    }

    /**
     * Encriptar contraseña (simple hash SHA-256 para cliente)
     * ⚠️ EN PRODUCCIÓN: Usar bcrypt en el servidor
     */
    async hashPassword(password) {
        const seed = 'boti-dival-secure-app-boti-dival-premium-v2-2025-system-salt';
        const data = password + seed;
        
        try {
            if (crypto && crypto.subtle) {
                const msgUint8 = new TextEncoder().encode(data);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            }
        } catch (e) {
            console.warn('⚠️ Web Crypto API no disponible, usando fallback JS');
        }
        
        return SecurityUtils.sha256(data);
    }

    /**
     * Validar contraseña
     */
    async validatePassword(inputPassword, storedHash) {
        const inputHash = await this.hashPassword(inputPassword);
        return inputHash === storedHash;
    }

    /**
     * Generar JWT simple (para cliente)
     * ⚠️ EN PRODUCCIÓN: Generar en el servidor
     */
    async generateJWT(user) {
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (AUTH_CONFIG.TOKEN_EXPIRATION / 1000)
        };

        const encodedHeader = btoa(JSON.stringify(header));
        const encodedPayload = btoa(JSON.stringify(payload));

        // Firma simple (en producción usar HMAC real)
        const hash = await this.hashPassword(encodedHeader + '.' + encodedPayload);
        const signature = btoa(hash.substring(0, 32));

        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }

    /**
     * Verificar JWT
     */
    async verifyJWT(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;

            const payload = JSON.parse(atob(parts[1]));

            // Verificar expiración
            if (payload.exp < Math.floor(Date.now() / 1000)) {
                return null; // Token expirado
            }

            // Verificar firma (simple)
            const expectedHash = await this.hashPassword(parts[0] + '.' + parts[1]);
            const expectedSignature = btoa(expectedHash.substring(0, 32));
            
            if (parts[2] !== expectedSignature) {
                return null; // Firma inválida
            }

            return payload;
        } catch (e) {
            return null;
        }
    }

    /**
     * Registrar intento fallido de login
     */
    recordFailedAttempt(email) {
        const attempts = JSON.parse(localStorage.getItem('login_attempts') || '{}');
        
        if (!attempts[email]) {
            attempts[email] = { count: 0, timestamp: null };
        }

        attempts[email].count += 1;
        attempts[email].timestamp = Date.now();

        localStorage.setItem('login_attempts', JSON.stringify(attempts));
        return attempts[email].count;
    }

    /**
     * Verificar si cuenta está bloqueada
     */
    isAccountLocked(email) {
        const attempts = JSON.parse(localStorage.getItem('login_attempts') || '{}');
        
        if (!attempts[email]) return false;

        const timeSinceLastAttempt = Date.now() - attempts[email].timestamp;
        
        if (timeSinceLastAttempt > AUTH_CONFIG.LOCKOUT_TIME) {
            // Liberar bloqueo si pasó el tiempo
            delete attempts[email];
            localStorage.setItem('login_attempts', JSON.stringify(attempts));
            return false;
        }

        return attempts[email].count >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS;
    }

    /**
     * Limpiar intentos fallidos (después de login exitoso)
     */
    clearFailedAttempts(email) {
        const attempts = JSON.parse(localStorage.getItem('login_attempts') || '{}');
        delete attempts[email];
        localStorage.setItem('login_attempts', JSON.stringify(attempts));
    }

    /**
     * LOGIN: Validar credenciales y crear sesión
     */
    async login(email, password) {
        // Validar entrada
        if (!email || !password) {
            return {
                success: false,
                error: 'Email y contraseña son requeridos'
            };
        }

        // Verificar bloqueo de cuenta
        if (this.isAccountLocked(email)) {
            return {
                success: false,
                error: `Cuenta bloqueada. Intenta de nuevo en ${Math.ceil(AUTH_CONFIG.LOCKOUT_TIME / 60000)} minutos`,
                locked: true
            };
        }

        // Obtener usuario de la base de datos
        const user = USERS_DATABASE.findByEmail(email);
        const isValid = user ? await this.validatePassword(password, user.passwordHash) : false;

        if (!user || !isValid) {
            const attempts = this.recordFailedAttempt(email);
            const remaining = AUTH_CONFIG.MAX_LOGIN_ATTEMPTS - attempts;

            return {
                success: false,
                error: remaining > 0 
                    ? `Email o contraseña incorrectos. Intentos restantes: ${remaining}`
                    : `Demasiados intentos. Cuenta bloqueada.`,
                attemptsRemaining: remaining
            };
        }

        // Limpiar intentos fallidos
        this.clearFailedAttempts(email);

        // Crear sesión
        const token = await this.generateJWT(user);
        const session = {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            loginTime: Date.now(),
            expiresAt: Date.now() + AUTH_CONFIG.TOKEN_EXPIRATION
        };

        // Guardar sesión en localStorage
        try {
            localStorage.setItem('auth_session', JSON.stringify(session));
            this.currentUser = session.user;
            
            console.log('💾 Sesión guardada en localStorage');
            console.log('📊 Sesión:', {
                user: session.user,
                expiresAt: new Date(session.expiresAt),
                token: session.token.substring(0, 20) + '...'
            });

            // Log de seguridad
            this.logSecurityEvent('LOGIN_SUCCESS', {
                email,
                role: user.role,
                timestamp: new Date().toISOString()
            });

            return {
                success: true,
                message: `Bienvenido ${user.name}`,
                user: session.user,
                role: user.role
            };
        } catch (error) {
            console.error('❌ Error guardando sesión:', error);
            return {
                success: false,
                error: 'Error al guardar la sesión'
            };
        }
    }

    /**
     * LOGOUT: Cerrar sesión actual
     */
    logout() {
        if (this.currentUser) {
            this.logSecurityEvent('LOGOUT', {
                email: this.currentUser.email,
                timestamp: new Date().toISOString()
            });
        }

        localStorage.removeItem('auth_session');
        this.currentUser = null;
        return { success: true, message: 'Sesión cerrada' };
    }

    /**
     * Cargar sesión existente
     */
    async loadSession() {
        const sessionData = localStorage.getItem('auth_session');
        
        if (!sessionData) {
            console.log('ℹ️  No hay sesión guardada');
            this.currentUser = null;
            return;
        }

        try {
            const session = JSON.parse(sessionData);
            console.log('📦 Sesión encontrada:', session.user);

            // Verificar expiración
            if (session.expiresAt < Date.now()) {
                console.log('⏰ Sesión expirada');
                this.logout();
                return;
            }

            // Verificar token
            const tokenPayload = await this.verifyJWT(session.token);
            if (!tokenPayload) {
                console.log('🔑 Token inválido');
                this.logout();
                return;
            }

            this.currentUser = session.user;
            console.log('✅ Sesión cargada exitosamente:', this.currentUser);
        } catch (e) {
            console.error('❌ Error cargando sesión:', e);
            this.logout();
        }
    }

    /**
     * Obtener usuario actual
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Verificar si está autenticado
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Verificar si tiene un rol específico
     */
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    /**
     * Verificar si tiene permisos
     */
    hasPermission(permission) {
        if (!this.currentUser) return false;

        // Definir permisos por rol
        const permissions = {
            [AUTH_CONFIG.ROLES.ADMIN]: [
                'view_dashboard',
                'manage_orders',
                'manage_products',
                'manage_promotions',
                'view_reports',
                'manage_settings'
            ],
            [AUTH_CONFIG.ROLES.CLIENTE]: [
                'view_products',
                'place_order',
                'view_my_orders',
                'edit_profile'
            ]
        };

        const userPermissions = permissions[this.currentUser.role] || [];
        return userPermissions.includes(permission);
    }

    /**
     * Registrar evento de seguridad
     */
    logSecurityEvent(eventType, data) {
        const event = {
            type: eventType,
            timestamp: new Date().toISOString(),
            data
        };

        // Guardar en localStorage (máximo 50 eventos)
        const events = JSON.parse(localStorage.getItem('security_logs') || '[]');
        events.push(event);
        
        if (events.length > 50) {
            events.shift(); // Eliminar el más antiguo
        }

        localStorage.setItem('security_logs', JSON.stringify(events));
        console.log('[SECURITY LOG]', event);
    }

    /**
     * Obtener logs de seguridad
     */
    getSecurityLogs() {
        return JSON.parse(localStorage.getItem('security_logs') || '[]');
    }

    /**
     * Cambiar contraseña
     */
    async changePassword(currentPassword, newPassword) {
        if (!this.isAuthenticated()) {
            return { success: false, error: 'No autenticado' };
        }

        if (newPassword.length < AUTH_CONFIG.PASSWORD_MIN_LENGTH) {
            return {
                success: false,
                error: `La contraseña debe tener al menos ${AUTH_CONFIG.PASSWORD_MIN_LENGTH} caracteres`
            };
        }

        const user = USERS_DATABASE.findByEmail(this.currentUser.email);
        const isValid = await this.validatePassword(currentPassword, user.passwordHash);
        
        if (!isValid) {
            return { success: false, error: 'Contraseña actual incorrecta' };
        }

        const newHash = await this.hashPassword(newPassword);
        USERS_DATABASE.updateUserPassword(user.id, newHash);

        this.logSecurityEvent('PASSWORD_CHANGED', {
            email: this.currentUser.email,
            timestamp: new Date().toISOString()
        });

        return { success: true, message: 'Contraseña actualizada' };
    }
}

// ==================== CREAR INSTANCIA GLOBAL ====================
const Auth = new AuthSystem();

// Cargar sesión al iniciar
window.addEventListener('load', () => {
    Auth.loadSession();
});

// Proteger contra cierre de sesión por inactividad (opcional)
let inactivityTimeout;
const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutos

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    
    if (!Auth.isAuthenticated()) return;

    inactivityTimeout = setTimeout(() => {
        Auth.logout();
        window.location.href = window.BASE_URL + 'admin-login.html?reason=inactivity';
    }, INACTIVITY_TIME);
}

// Resetear timer en actividad del usuario
['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});
