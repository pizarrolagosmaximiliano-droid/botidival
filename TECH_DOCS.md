# 📚 Documentación Técnica - Boti Dival

## Índice

1. [Estructura del Proyecto](#estructura)
2. [Descripción de Archivos](#archivos)
3. [Funcionalidades Principales](#funcionalidades)
4. [API del Carrito](#api-carrito)
5. [Personalización Avanzada](#personalización)
6. [Mejoras Futuras](#mejoras)

---

## Estructura del Proyecto {#estructura}

```
Boti Dival/
├── index.html          # Estructura HTML
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── config.js           # Configuración fácil
├── sw.js               # Service Worker
├── manifest.json       # PWA config
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── .htaccess           # Apache config
├── README.md           # Guía general
├── IMPLEMENTACION.md   # Guía personalización
└── DEPLOY.md           # Guía despliegue
```

---

## Descripción de Archivos {#archivos}

### `index.html`
- **Propósito:** Estructura y contenido
- **Responsable de:** HTML5 semántico, accesibilidad, SEO
- **Modificar:** Textos, información del negocio
- **NO modificar:** Estructura de clases CSS

### `styles.css`
- **Propósito:** Estilos y diseño
- **Responsable de:** Responsive, animaciones, tema nocturno
- **Tamaño:** ~25 KB comprimido
- **Variables CSS:** Definidas en `:root`

### `script.js`
- **Propósito:** Funcionalidad e interactividad
- **Líneas:** ~400 (sin comentarios)
- **Responsable de:** 
  - Gestión del carrito
  - Búsqueda en tiempo real
  - Filtros por categoría
  - Envío a WhatsApp
  - Horarios dinámicos

### `config.js`
- **Propósito:** Centralizar configuración
- **Contenido:**
  - Datos del negocio
  - Horarios
  - Colores
  - URLs de redes sociales

### `sw.js`
- **Propósito:** Service Worker para cache
- **Estrategia:** Network First + Cache First
- **Funciona:** Offline, carga rápida

### `manifest.json`
- **Propósito:** Configuración PWA
- **Permite:** Instalar como app en móviles
- **Íconos:** SVG dinámicos

---

## Funcionalidades Principales {#funcionalidades}

### 1. Sistema de Productos

```javascript
// Agregar producto
const PRODUCTS = [
    {
        id: 1,
        name: 'Producto',
        category: 'cervezas',
        price: 5000,
        emoji: '🍺',
        description: 'Descripción'
    }
];
```

**Categorías válidas:**
- `cervezas` → 🍺
- `destilados` → 🥃
- `vinos` → 🍷
- `hielo` → 🧊
- `snacks` → 🍟
- `bebidas` → 🥤

### 2. Gestión de Carrito

```javascript
// Agregar al carrito
addToCart(productId, quantity, showNotification)

// Actualizar UI
updateCartUI()

// Obtener total
const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
);
```

### 3. Búsqueda

```javascript
// Busca en nombre, descripción y categoría
const results = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query)
);
```

**Funciona:** Mientras escribes, en tiempo real

### 4. Filtros

```javascript
// Aplicar filtro
currentFilter = 'cervezas';
const filtered = PRODUCTS.filter(p => p.category === currentFilter);
renderProducts(filtered);
```

### 5. Envío a WhatsApp

```javascript
// Generar mensaje
const message = generateWhatsAppMessage(name, address, comments);

// URL de WhatsApp
const url = `https://wa.me/56985062378?text=${encodeURIComponent(message)}`;
window.open(url, '_blank');
```

**Mensaje incluye:**
- ✓ Nombre cliente
- ✓ Dirección
- ✓ Listado productos
- ✓ Cantidades
- ✓ Total
- ✓ Comentarios

### 6. Horarios Dinámicos

```javascript
// Detecta si está abierto
function updateStatus() {
    const now = new Date();
    const day = now.getDay(); // 0=domingo, 6=sábado
    // Domingo-Jueves: hasta 00:30
    // Viernes-Sábado: hasta 02:30
}
```

---

## API del Carrito {#api-carrito}

### Métodos públicos

```javascript
// Agregar/quitar del carrito
addToCart(productId, quantity, showNotification)

// Abrir panel lateral
openCart()

// Cerrar panel lateral
closeCart()

// Actualizar interfaz
updateCartUI()

// Finalizar pedido (enviar a WhatsApp)
finalizeOrder()
```

### Estructura del carrito

```javascript
cart = [
    {
        id: 1,
        name: 'Producto',
        category: 'cervezas',
        price: 5000,
        emoji: '🍺',
        description: 'Desc',
        quantity: 2  // Cantidad agregada
    }
]
```

### Estados del carrito

```javascript
// Vacío
cart.length === 0  // true

// Con productos
cart.reduce((sum, item) => sum + item.quantity, 0)  // Total items

// Total precio
cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
```

---

## Personalización Avanzada {#personalización}

### Cambiar tema de colores

`styles.css` líneas 1-8:

```css
:root {
    --primary-color: #D4AF37;   /* Dorado */
    --secondary-color: #C41E3A;  /* Rojo */
    --dark-bg: #0a0a0a;         /* Fondo */
}
```

### Agregar nuevas categorías

1. Agregar en `script.js` función `getCategoryLabel()`
2. Crear nuevo botón filtro en `index.html`
3. Agregar productos con esa categoría

### Implementar persistencia localStorage

```javascript
// En script.js, agregar:

// Guardar carrito
function saveCart() {
    localStorage.setItem('botidival_cart', JSON.stringify(cart));
}

// Cargar carrito
function loadCart() {
    const saved = localStorage.getItem('botidival_cart');
    if (saved) cart = JSON.parse(saved);
}

// Llamar en initializeApp()
loadCart();
```

### Conectar base de datos

Para agregar productos dinámicamente desde una BD:

```javascript
// Reemplazar PRODUCTS array con:
async function loadProducts() {
    const response = await fetch('https://api.ejemplo.com/products');
    const PRODUCTS = await response.json();
    renderProducts(PRODUCTS);
}
```

---

## Mejoras Futuras {#mejoras}

### Fácil de Implementar (⭐)

- **Más productos dinámicos** - Agregar desde formulario
- **Historial de pedidos** - Guardar en localStorage
- **Reseñas de clientes** - Mostrar opiniones
- **Galería de fotos** - Mostrar imágenes de bebidas
- **Dark mode toggle** - Botón on/off

### Mediano (⭐⭐)

- **Sistema de cupones** - Códigos descuento
- **Carrito persistente** - Guardar entre sesiones
- **Notificaciones push** - Avisos de nuevas promos
- **Chat directo** - Atención cliente en vivo
- **Analytics avanzado** - Rastrear comportamiento

### Complejo (⭐⭐⭐)

- **Sistema de pagos** - Webpay, Stripe, PayPal
- **API REST propia** - Backend en Node/Python
- **Base de datos** - MongoDB, PostgreSQL
- **Admin panel** - Gestionar productos, pedidos
- **Sistema de usuarios** - Login, historial

---

## Ejemplos de Código

### Agregar notificación personalizada

```javascript
function showNotificationMessage(message, duration = 3000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Usar:
showNotificationMessage('✓ Producto agregado', 2000);
```

### Crear producto programáticamente

```javascript
function addProductToArray(name, category, price, emoji, description) {
    const id = Math.max(...PRODUCTS.map(p => p.id)) + 1;
    const newProduct = { id, name, category, price, emoji, description };
    PRODUCTS.push(newProduct);
    renderProducts(PRODUCTS);
}

// Usar:
addProductToArray('Cerveza Nueva', 'cervezas', 4500, '🍺', '750ml');
```

### Aplicar filtro mixto (categoría + búsqueda)

```javascript
function filterProductsAdvanced(category, searchQuery) {
    let filtered = PRODUCTS;
    
    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    return filtered;
}
```

---

## Performance Tips 🚀

### Optimizaciones ya incluidas:

✓ Minificación de CSS/JS
✓ Shadow DOM para encapsulación
✓ Lazy loading de imágenes
✓ Service Worker caching
✓ Compresión GZIP
✓ CDN en Netlify

### Mejoras adicionales:

- Usar ImageOptim para compresión
- Implementar Code Splitting
- Agregar Web Workers si es necesario
- Monitorear con Lighthouse

---

## Testing y QA

### Testing manual

- [ ] Agregar productos al carrito
- [ ] Cambiar cantidades
- [ ] Buscar productos
- [ ] Filtrar por categoría
- [ ] Enviar a WhatsApp
- [ ] Verificar horarios
- [ ] Probar en móvil
- [ ] Probar offline

### Testing navegadores

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Safari iOS
- [ ] Chrome Android

---

## Seguridad

### Implementado:

✓ HTTPS/SSL
✓ Headers seguros
✓ XSS protection
✓ Input validation
✓ CORS headers

### Consideraciones:

- No almacenar datos sensibles en localStorage
- Validar entrada del usuario
- No exponer credenciales en frontend
- Usar variables de entorno para claves

---

## Conclusión

Esta web es:
- ✅ Completamente funcional
- ✅ Fácil de personalizar
- ✅ Optimizada para performance
- ✅ SEO-friendly
- ✅ Mobile-first

**Puedes usarla tal cual o expandirla según necesites.**

---

**Última actualización: Abril 2026**
**Versión: 1.0 Production Ready**
