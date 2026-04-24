# 🔐 Documentación de Sistema de Autenticación Seguro

## Resumen General

Se ha implementado un **sistema de autenticación profesional y seguro** para Boti Dival que incluye:

- ✅ Encriptación de contraseñas (SHA-256 en cliente, bcrypt en servidor para producción)
- ✅ Gestión segura de sesiones con JWT
- ✅ Protección contra intentos de fuerza bruta
- ✅ Roles y permisos (Admin, Cliente)
- ✅ Logout automático por inactividad
- ✅ Logs de seguridad
- ✅ Validaciones en cliente y servidor

---

## 🚀 Credenciales de Prueba (DESARROLLO)

### Admin
```
Email: admin@botidival.com
Contraseña: AdminSecuro2025!
Rol: Administrador (acceso total)
```

### Cliente
```
Email: cliente@botidival.com
Contraseña: Cliente2025!
Rol: Usuario (acceso limitado)
```

### Gerente
```
Email: gerente@botidival.com
Contraseña: Gerente2025!
Rol: Administrador (acceso limitado a reportes)
```

---

## 📁 Archivos del Sistema

### 1. `auth.js`
**Sistema principal de autenticación**

Contiene:
- Clase `AuthSystem` con métodos de login/logout
- Encriptación de contraseñas
- Generación y verificación de JWT
- Gestión de sesiones
- Control de intentos fallidos
- Logs de seguridad
- Protección por inactividad

Funciones principales:
```javascript
Auth.login(email, password)           // Login
Auth.logout()                         // Logout
Auth.isAuthenticated()                // Verificar autenticación
Auth.getCurrentUser()                 // Obtener usuario actual
Auth.hasRole(role)                    // Verificar rol
Auth.hasPermission(permission)        // Verificar permisos
Auth.changePassword(old, new)         // Cambiar contraseña
Auth.getSecurityLogs()                // Ver logs de seguridad
```

### 2. `users.db.js`
**Base de datos de usuarios local (SOLO DESARROLLO)**

Contiene:
- Clase `UsersDatabase` con gestión de usuarios
- 3 usuarios de prueba predeterminados
- Persistencia en localStorage
- Métodos CRUD para usuarios

Funciones principales:
```javascript
USERS_DATABASE.findByEmail(email)     // Buscar por email
USERS_DATABASE.getAllUsers()          // Listar todos
USERS_DATABASE.createUser(data)       // Crear usuario
USERS_DATABASE.updateUser(id, data)   // Actualizar usuario
USERS_DATABASE.deleteUser(id)         // Eliminar usuario
```

Funciones de debugging en consola:
```javascript
DBUtils.showAllUsers()                // Ver tabla de usuarios
DBUtils.showStats()                   // Ver estadísticas
DBUtils.createUser(email, pwd, name)  // Crear usuario
DBUtils.findUser(email)               // Buscar usuario
DBUtils.resetDB()                     // Resetear BD
DBUtils.exportDB()                    // Exportar datos
```

### 3. `admin-login.js`
**Lógica del formulario de login**

Contiene:
- Validaciones de email y contraseña
- Integración con `Auth.js`
- Animaciones y efectos visuales
- Protección contra pega de contraseñas
- Opción "Recordarme"
- Manejo de errores

### 4. `admin.js` (ACTUALIZADO)
**Panel administrativo con protección**

Cambios:
- Removida lógica antigua de login
- Integración con nuevo sistema de autenticación
- Verificación de roles en dashboard
- Logout seguro

---

## 🔒 Características de Seguridad

### 1. Encriptación de Contraseñas
```javascript
// Cliente: SHA-256 + salt
hashPassword(password) {
    return CryptoJS.SHA256(password + JWT_SECRET).toString();
}

// Producción: usar bcrypt en servidor
// npm install bcrypt
```

### 2. JWT (JSON Web Tokens)
```javascript
// Token contiene:
{
  "sub": "usuario-id",
  "email": "usuario@botidival.com",
  "role": "admin",
  "iat": 1714000000,
  "exp": 1714604800  // Expira en 7 días
}
```

### 3. Protección contra Fuerza Bruta
- Máximo 5 intentos fallidos
- Bloqueo de 15 minutos después
- Contador visible al usuario
- Log de intentos

### 4. Sesiones Seguras
- Expiración automática en 7 días
- Logout automático por inactividad (30 minutos)
- Validación de token al cargar
- Almacenamiento seguro en localStorage

### 5. Roles y Permisos
```javascript
ROLES.ADMIN = ['view_dashboard', 'manage_orders', 'manage_products', 
               'manage_promotions', 'view_reports', 'manage_settings']

ROLES.CLIENTE = ['view_products', 'place_order', 'view_my_orders', 'edit_profile']
```

### 6. Logs de Seguridad
Eventos registrados:
- LOGIN_SUCCESS / LOGIN_FAILED
- LOGOUT
- PASSWORD_CHANGED
- PASSWORD_PASTE_ATTEMPT
- Máximo 50 eventos almacenados

Ver logs en consola:
```javascript
Auth.getSecurityLogs()  // Array de eventos
```

---

## 🔄 Flujo de Autenticación

```
1. Usuario ingresa email y contraseña
   ↓
2. Validaciones de cliente (formato, longitud)
   ↓
3. Búsqueda en base de datos
   ↓
4. Hash de contraseña y comparación
   ↓
5. Verificación de intentos fallidos
   ↓
6. Generación de JWT y sesión
   ↓
7. Almacenamiento en localStorage
   ↓
8. Redirección según rol
   ↓
9. Protección automática del dashboard
```

---

## 📊 Configuración

En `auth.js`:
```javascript
const AUTH_CONFIG = {
    JWT_SECRET: 'boti-dival-secret-key-2025-seguro',  // ⚠️ CAMBIAR EN PRODUCCIÓN
    TOKEN_EXPIRATION: 7 * 24 * 60 * 60 * 1000,         // 7 días
    PASSWORD_MIN_LENGTH: 8,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_TIME: 15 * 60 * 1000                       // 15 minutos
};
```

---

## 🚨 Para PRODUCCIÓN: Recomendaciones de Seguridad

### 1. Migrar a Backend Seguro
```javascript
// Usar Node.js + Express

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hash seguro
const hashedPassword = await bcrypt.hash(password, 10);

// Verificar
const isValid = await bcrypt.compare(password, hashedPassword);

// JWT en servidor
const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);
```

### 2. Usar HTTPS
```
Cambiar todas las URLs a https://
Obtener certificado SSL (Let's Encrypt gratuito)
```

### 3. Usar Variables de Entorno
```bash
JWT_SECRET=tu-secreto-seguro-aleatorio
PASSWORD_PEPPER=otro-secreto
DATABASE_URL=tu-base-de-datos
```

### 4. Implementar Base de Datos
```javascript
// MongoDB
User.findOne({ email })
await User.create({ email, passwordHash, name, role })

// PostgreSQL
SELECT * FROM users WHERE email = $1
INSERT INTO users VALUES ($1, $2, $3, $4)
```

### 5. Rate Limiting
```javascript
// npm install express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutos
    max: 5,                     // 5 intentos
    message: 'Demasiados intentos de login'
});

app.post('/api/login', limiter, loginHandler);
```

### 6. CORS Configurado
```javascript
const cors = require('cors');

app.use(cors({
    origin: 'https://botidival.cl',  // Solo tu dominio
    credentials: true
}));
```

### 7. CSRF Protection
```javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.post('/api/login', csrfProtection, loginHandler);
```

### 8. Content Security Policy
```javascript
app.use(helmet());  // npm install helmet
```

### 9. Validaciones en Servidor
```javascript
// NUNCA confiar solo en validaciones de cliente
const validator = require('validator');

if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
}
```

### 10. Logging y Monitoreo
```javascript
// npm install winston
const logger = require('winston');

logger.info('Login exitoso', {
    user_id: user.id,
    email: user.email,
    ip: req.ip,
    timestamp: new Date()
});
```

---

## 📱 Integración en Páginas

### Proteger página de admin
```html
<script src="users.db.js"></script>
<script src="auth.js"></script>
<script>
    // Proteger acceso
    if (!Auth.isAuthenticated()) {
        window.location.href = '/admin-login.html';
    }
    if (!Auth.hasRole('admin')) {
        alert('Acceso denegado');
    }
</script>
```

### Mostrar datos del usuario
```html
<script>
    const user = Auth.getCurrentUser();
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userRole').textContent = user.role;
</script>
```

### Logout
```javascript
document.getElementById('logoutBtn').addEventListener('click', () => {
    Auth.logout();
    window.location.href = '/admin-login.html';
});
```

---

## 🧪 Pruebas de Seguridad

### Test 1: Login correcto
```javascript
Auth.login('admin@botidival.com', 'AdminSecuro2025!')
// Resultado: { success: true, user: {...} }
```

### Test 2: Contraseña incorrecta
```javascript
Auth.login('admin@botidival.com', 'contraseña-incorrecta')
// Resultado: { success: false, error: 'Email o contraseña incorrectos' }
```

### Test 3: Verificar sesión
```javascript
Auth.isAuthenticated()  // true/false
Auth.getCurrentUser()   // { id, email, name, role }
```

### Test 4: Verificar permisos
```javascript
Auth.hasRole('admin')                      // true/false
Auth.hasPermission('manage_orders')        // true/false
```

### Test 5: Intentos fallidos
```javascript
// Después de 5 intentos fallidos:
Auth.login('admin@botidival.com', 'mal')
// Resultado: { success: false, locked: true, error: '...' }
```

---

## 🐛 Debugging en Consola

```javascript
// Ver todos los usuarios
DBUtils.showAllUsers()

// Ver estadísticas
DBUtils.showStats()

// Crear usuario de prueba
DBUtils.createUser('test@botidival.com', 'Prueba2025!', 'Usuario Prueba', 'cliente')

// Ver logs de seguridad
Auth.getSecurityLogs()

// Ver sesión actual
Auth.getCurrentUser()

// Ver configuración
console.log(AUTH_CONFIG)
```

---

## ⚠️ Lista de Verificación Antes de Producción

- [ ] Cambiar `JWT_SECRET` a un valor aleatorio fuerte
- [ ] Migrar usuarios a base de datos segura
- [ ] Implementar bcrypt para hash de contraseñas
- [ ] Configurar HTTPS/SSL
- [ ] Implementar rate limiting
- [ ] Configurar CORS correctamente
- [ ] Agregar validaciones en servidor
- [ ] Configurar CSP headers
- [ ] Implementar logging
- [ ] Realizar pruebas de penetración
- [ ] Configurar backups automáticos
- [ ] Agregar autenticación de 2 factores (2FA)
- [ ] Implementar refresh tokens
- [ ] Agregar auditoría de cambios

---

## 📞 Soporte y Mantenimiento

Para agregar más usuarios:
```javascript
USERS_DATABASE.createUser({
    email: 'nuevo@botidival.com',
    password: 'ContraseñaSegura2025!',
    name: 'Nombre Usuario',
    role: 'cliente'
})
```

Para cambiar contraseña (en consola):
```javascript
Auth.changePassword('antigua', 'nueva')
```

---

## 📝 Versión
- **v1.0.0** - Sistema de autenticación inicial
- Fecha: 21/04/2026
- Autor: GitHub Copilot
- Licencia: MIT

---

*Sistema de autenticación profesional desarrollado para Boti Dival - Botillería Premium*
