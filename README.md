# 🍺 Boti Dival - Botillería Premium

Website moderno, profesional y optimizado para una botillería ubicada en Coltauco, O'Higgins, Chile.

## 📋 Características

### ✨ Funcionalidades Principales
- **🏠 Página de Inicio** - Hero section impactante con llamado a la acción
- **🛒 Catálogo de Productos** - Categorías: Cervezas, Destilados, Vinos, Hielo, Snacks, Bebidas
- **🔍 Búsqueda en Tiempo Real** - Buscar productos por nombre, descripción o categoría
- **🧠 Carrito Inteligente** - Gestión completa con cantidades ajustables
- **📲 Integración WhatsApp** - Envío automático de pedidos a WhatsApp
- **⏰ Horarios Dinámicos** - Muestra automáticamente si está abierto o cerrado
- **📍 Ubicación y Contacto** - Integración con Google Maps y teléfonos directos
- **🎁 Sección de Promociones** - Destacar ofertas especiales
- **🔄 Filtros por Categoría** - Navegación fácil entre productos
- **💬 Botón Flotante WhatsApp** - Acceso rápido para consultas

### 🎨 Diseño
- **Tema Nocturno Premium** - Colores: Negro, Dorado, Rojo
- **Totalmente Responsive** - Perfecto en móviles, tablets y desktops
- **Animaciones Suaves** - Transiciones elegantes al hacer scroll
- **Interfaz Moderna** - Estilo app tipo PedidosYa/Uber Eats
- **Carga Rápida** - Optimizado para máximo rendimiento

### ⚡ Tecnología
- HTML5 semántico
- CSS3 con variables y gradientes
- JavaScript vanilla (sin dependencias)
- Service Worker para PWA
- Totalmente funcional offline

## 🚀 Instalación y Uso

### Opción 1: Abrir localmente
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador
3. ¡Listo! La web funcionará inmediatamente

### Opción 2: Subir a un servidor web
1. Copia los archivos a tu servidor (host gratuito como Netlify, Vercel, GitHub Pages)
2. Asegúrate de que todos los archivos estén en el mismo directorio:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `sw.js`
   - `manifest.json`

### Opción 3: Usar servidor local (recomendado para desarrollo)

**Con Python 3:**
```bash
cd ruta/a/Boti Dival
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Con Node.js:**
```bash
cd ruta/a/Boti Dival
npx http-server
```

## 📝 Cómo Personalizar

### Cambiar número de WhatsApp
Busca en `script.js` la línea que dice `+56985062378` y reemplázalo con tu número:
```javascript
// Línea ~190 en script.js
window.open(whatsappUrl, '_blank');
```
También busca en `index.html` en los botones WhatsApp.

### Agregar o editar productos
Abre `script.js` y ve a la sección `PRODUCTOS`:
```javascript
const PRODUCTS = [
    { id: 1, name: 'Nombre Producto', category: 'cervezas', price: 3500, emoji: '🍺', description: 'Descripción' },
    // Agrega más productos aquí
];
```

### Cambiar información del negocio
Edita `index.html`:
- **Dirección**: Ruta H-30 #303, Coltauco
- **Teléfono**: +56 9 8506 2378
- **Horarios**: Domingo-Jueves hasta 00:30, Viernes-Sábado hasta 02:30

### Personalizar colores
Abre `styles.css` y busca las variables de color:
```css
:root {
    --primary-color: #D4AF37;      /* Dorado */
    --secondary-color: #C41E3A;    /* Rojo */
    --dark-bg: #0a0a0a;            /* Negro */
}
```

## 📁 Estructura de Archivos

```
Boti Dival/
├── index.html       # Página principal
├── styles.css       # Estilos y diseño
├── script.js        # Funcionalidad y lógica
├── sw.js            # Service Worker (cache)
├── manifest.json    # Configuración PWA
└── README.md        # Este archivo
```

## 🔧 Funcionalidades Técnicas

### Sistema de Carrito
- Agregar/quitar productos en tiempo real
- Controlar cantidades fácilmente
- Visualización de totales automática
- Persistencia en navegadores modernos

### Búsqueda Inteligente
- Busca por nombre, descripción, categoría
- Resultados instantáneos mientras escribes
- Interfaz desplegable
- Click para agregar al carrito

### Envío a WhatsApp
El mensaje incluye automáticamente:
- ✓ Nombre del cliente
- ✓ Lista de productos y cantidades
- ✓ Precio total
- ✓ Dirección de entrega
- ✓ Comentarios especiales
- ✓ Hora y fecha

### Horarios Automáticos
Detecta automáticamente:
- Si está abierto o cerrado
- Horarios de cierre según el día
- Actualización cada minuto

### Modo PWA (Progressive Web App)
- Funciona offline
- Se puede instalar en móviles
- Carga rápida mediante cache
- Ícono en pantalla de inicio

## 💡 Tips de Marketing

### Para Aumentar Ventas
1. **Compartir en redes sociales** - Enlace directo a la web
2. **Agregar código QR** - Imprime el QR en tu local
3. **Publicidad en Google** - Aparece cuando buscan "botillería Coltauco"
4. **Promociones Semanales** - Actualiza la sección "Promos del Tío Dival"
5. **Actualiza horarios** - Mantén actualizada la disponibilidad

### SEO y Posicionamiento
- La web está optimizada para Google
- Aparecerá en búsquedas: "botillería Coltauco", "delivery bebidas", etc.
- Compatible con redes sociales (OpenGraph meta tags)

## 📱 Compatibilidad

✅ Chrome/Chromium (Android/Desktop)
✅ Safari (iOS/macOS)
✅ Firefox (Android/Desktop)
✅ Edge
✅ Opera
✅ Navegadores mobile

## 🐛 Solución de Problemas

### ¿El carrito no guarda los productos?
- Asegúrate que JavaScript esté habilitado
- Borra la caché del navegador (Ctrl+F5)

### ¿No se abre WhatsApp?
- Verifica que el número tenga el formato correcto
- Usa un dispositivo que tenga WhatsApp instalado o acceso web

### ¿La página se ve lenta?
- Borra la caché del navegador
- Desactiva extensiones del navegador
- Recarga la página (F5)

### ¿Los productos no aparecen?
- Verifica que todos los archivos estén en el mismo directorio
- Comprueba que script.js no tenga errores (abre consola: F12)

## 📚 Recursos Útiles

### Modificar sin código
- Para cambiar textos: edita `index.html` en cualquier editor
- Para cambiar colores: edita valores hex en `styles.css`
- Para agregar productos: edita el array en `script.js`

### Hosting Gratuito Recomendado
- **Netlify** (mejor para PWA) - netlify.com
- **Vercel** - vercel.com
- **GitHub Pages** - pages.github.com
- **Surge** - surge.sh

## 📧 Contacto

Para consultas sobre la web, puedes:
- Llamar a +56 9 8506 2378
- Enviar mensaje a +56 9 6404 4114
- Visitarnos en Ruta H-30 #303, Coltauco

---

**Desarrollado especialmente para Boti Dival** 🍺🥃🍷

*Versión 1.0 - Abril 2026*
