/**
 * ==================== BASE DE DATOS DE USUARIOS ====================
 * Base de datos local con usuarios de prueba (SOLO DESARROLLO)
 * 
 * ⚠️ IMPORTANTE PARA PRODUCCIÓN:
 * - Mover a un servidor seguro (Node.js + Express)
 * - Usar bcrypt para hash de contraseñas
 * - Implementar SQL/NoSQL con validaciones
 * - Usar HTTPS y tokens JWT en servidor
 * ==================== ====================
 */

class UsersDatabase {
    constructor() {
        this.users = [
            {
                id: 'admin-001',
                email: 'admin@botidival.com',
                name: 'Administrador Boti Dival',
                role: 'admin',
                // Contraseña: "AdminSecuro2025!"
                passwordHash: this.simpleHash('AdminSecuro2025!'),
                createdAt: new Date('2025-01-01'),
                status: 'active',
                permissions: [
                    'view_dashboard',
                    'manage_orders',
                    'manage_products',
                    'manage_promotions',
                    'view_reports',
                    'manage_settings'
                ]
            },
            {
                id: 'cliente-001',
                email: 'cliente@botidival.com',
                name: 'Cliente Premium',
                role: 'cliente',
                // Contraseña: "Cliente2025!"
                passwordHash: this.simpleHash('Cliente2025!'),
                createdAt: new Date('2025-02-15'),
                status: 'active',
                permissions: [
                    'view_products',
                    'place_order',
                    'view_my_orders',
                    'edit_profile'
                ]
            },
            {
                id: 'admin-002',
                email: 'gerente@botidival.com',
                name: 'Gerente de Ventas',
                role: 'admin',
                // Contraseña: "Gerente2025!"
                passwordHash: this.simpleHash('Gerente2025!'),
                createdAt: new Date('2025-01-10'),
                status: 'active',
                permissions: [
                    'view_dashboard',
                    'manage_orders',
                    'view_reports'
                ]
            }
        ];

        // Cargar datos persistentes del localStorage si existen
        this.loadFromStorage();
    }

    /**
     * Hash simple para desarrollo (usar bcrypt en producción)
     */
    simpleHash(password) {
        if (typeof CryptoJS !== 'undefined') {
            return CryptoJS.SHA256(password + 'boti-dival-secret-key-2025-seguro').toString();
        }
        return btoa(password + 'boti-dival-secret-key-2025-seguro');
    }

    /**
     * Buscar usuario por email
     */
    findByEmail(email) {
        return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    /**
     * Buscar usuario por ID
     */
    findById(id) {
        return this.users.find(user => user.id === id);
    }

    /**
     * Obtener todos los usuarios (solo para admin)
     */
    getAllUsers() {
        return this.users.map(user => {
            const { passwordHash, ...userData } = user;
            return userData;
        });
    }

    /**
     * Actualizar contraseña de usuario
     */
    updateUserPassword(userId, newHash) {
        const user = this.findById(userId);
        if (user) {
            user.passwordHash = newHash;
            this.saveToStorage();
            return true;
        }
        return false;
    }

    /**
     * Crear nuevo usuario (solo admin)
     */
    createUser(userData) {
        // Validaciones
        if (!userData.email || !userData.password || !userData.name) {
            return { success: false, error: 'Datos incompletos' };
        }

        if (this.findByEmail(userData.email)) {
            return { success: false, error: 'Email ya existe' };
        }

        const newUser = {
            id: `${userData.role}-${Date.now()}`,
            email: userData.email,
            name: userData.name,
            role: userData.role || 'cliente',
            passwordHash: this.simpleHash(userData.password),
            createdAt: new Date(),
            status: 'active',
            permissions: userData.permissions || []
        };

        this.users.push(newUser);
        this.saveToStorage();

        return { success: true, message: 'Usuario creado', userId: newUser.id };
    }

    /**
     * Actualizar usuario
     */
    updateUser(userId, updates) {
        const user = this.findById(userId);
        if (!user) return { success: false, error: 'Usuario no encontrado' };

        // No permitir actualizar ciertos campos
        const allowedUpdates = ['name', 'email', 'status'];
        allowedUpdates.forEach(field => {
            if (field in updates) {
                user[field] = updates[field];
            }
        });

        this.saveToStorage();
        return { success: true, message: 'Usuario actualizado' };
    }

    /**
     * Eliminar usuario (solo admin)
     */
    deleteUser(userId) {
        const index = this.users.findIndex(user => user.id === userId);
        if (index === -1) return { success: false, error: 'Usuario no encontrado' };

        this.users.splice(index, 1);
        this.saveToStorage();
        return { success: true, message: 'Usuario eliminado' };
    }

    /**
     * Verificar disponibilidad de email
     */
    isEmailAvailable(email) {
        return !this.findByEmail(email);
    }

    /**
     * Guardar base de datos en localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem('users_database', JSON.stringify(this.users));
            return true;
        } catch (e) {
            console.error('Error guardando base de datos:', e);
            return false;
        }
    }

    /**
     * Cargar base de datos de localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('users_database');
            if (stored) {
                // Combinar usuarios existentes con almacenados (evitar perder datos)
                const storedUsers = JSON.parse(stored);
                this.users = this.mergeUsers(this.users, storedUsers);
            }
        } catch (e) {
            console.error('Error cargando base de datos:', e);
        }
    }

    /**
     * Combinar usuarios (mantiene usuarios por defecto si no están en storage)
     */
    mergeUsers(defaultUsers, storedUsers) {
        const merged = [...storedUsers];
        
        defaultUsers.forEach(defaultUser => {
            if (!merged.find(u => u.id === defaultUser.id)) {
                merged.push(defaultUser);
            }
        });

        return merged;
    }

    /**
     * Resetear base de datos a valores por defecto
     */
    reset() {
        this.users = [
            {
                id: 'admin-001',
                email: 'admin@botidival.com',
                name: 'Administrador Boti Dival',
                role: 'admin',
                passwordHash: this.simpleHash('AdminSecuro2025!'),
                createdAt: new Date('2025-01-01'),
                status: 'active',
                permissions: ['view_dashboard', 'manage_orders', 'manage_products', 'manage_promotions', 'view_reports', 'manage_settings']
            },
            {
                id: 'cliente-001',
                email: 'cliente@botidival.com',
                name: 'Cliente Premium',
                role: 'cliente',
                passwordHash: this.simpleHash('Cliente2025!'),
                createdAt: new Date('2025-02-15'),
                status: 'active',
                permissions: ['view_products', 'place_order', 'view_my_orders', 'edit_profile']
            },
            {
                id: 'admin-002',
                email: 'gerente@botidival.com',
                name: 'Gerente de Ventas',
                role: 'admin',
                passwordHash: this.simpleHash('Gerente2025!'),
                createdAt: new Date('2025-01-10'),
                status: 'active',
                permissions: ['view_dashboard', 'manage_orders', 'view_reports']
            }
        ];
        this.saveToStorage();
    }

    /**
     * Exportar base de datos (para respaldo)
     */
    export() {
        return JSON.stringify(this.users, null, 2);
    }

    /**
     * Obtener estadísticas
     */
    getStats() {
        return {
            total: this.users.length,
            admins: this.users.filter(u => u.role === 'admin').length,
            clientes: this.users.filter(u => u.role === 'cliente').length,
            activos: this.users.filter(u => u.status === 'active').length,
            inactivos: this.users.filter(u => u.status === 'inactive').length
        };
    }
}

// ==================== CREAR INSTANCIA GLOBAL ====================
const USERS_DATABASE = new UsersDatabase();

// ==================== FUNCIONES DE AYUDA EN CONSOLA ====================
/**
 * Funciones para debugging en consola (solo desarrollo)
 */
const DBUtils = {
    // Ver todos los usuarios
    showAllUsers() {
        console.table(USERS_DATABASE.getAllUsers());
    },

    // Ver estadísticas
    showStats() {
        console.log('📊 Estadísticas:', USERS_DATABASE.getStats());
    },

    // Exportar base de datos
    exportDB() {
        const data = USERS_DATABASE.export();
        console.log(data);
        copy(data); // Copiar al portapapeles
    },

    // Resetear base de datos
    resetDB() {
        if (confirm('¿Confirmas que quieres resetear la base de datos?')) {
            USERS_DATABASE.reset();
            console.log('✅ Base de datos reseteada');
        }
    },

    // Crear nuevo usuario
    createUser(email, password, name, role = 'cliente') {
        const result = USERS_DATABASE.createUser({
            email,
            password,
            name,
            role
        });
        console.log(result);
    },

    // Ver usuario por email
    findUser(email) {
        const user = USERS_DATABASE.findByEmail(email);
        if (user) {
            const { passwordHash, ...userData } = user;
            console.table(userData);
        } else {
            console.log('Usuario no encontrado');
        }
    }
};

console.log('%c🔐 BASE DE DATOS DE USUARIOS CARGADA', 'color: green; font-weight: bold;');
console.log('Para debugging, usa: DBUtils.showAllUsers(), DBUtils.showStats(), DBUtils.createUser(email, password, name, role)');
