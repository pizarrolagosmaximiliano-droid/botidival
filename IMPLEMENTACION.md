# 🚀 Guía de Implementación - Boti Dival

## Paso 1: Preparar los archivos

Asegúrate de tener estos 5 archivos en la misma carpeta:

```
✓ index.html      (página principal)
✓ styles.css      (estilos)
✓ script.js       (funcionalidad)
✓ sw.js           (caché/offline)
✓ manifest.json   (configuración mobile)
```

⚠️ **Importante:** Deben estar en la MISMA carpeta, no en subcarpetas.

---

## Paso 2: Prueba Local (Antes de publicar)

### Opción A: Abrir en navegador (más simple)
1. Haz clic derecho en `index.html`
2. Selecciona "Abrir con" → Browser/Navegador
3. ✓ La web funcionará

### Opción B: Servidor local (recomendado para desarrollo)

**Si tienes Python instalado:**
```
cd "C:\Users\maxim\Desktop\Boti Dival"
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Si tienes Node.js:**
```
cd "C:\Users\maxim\Desktop\Boti Dival"
npx http-server
```

---

## Paso 3: Personalizar la Web

### 3.1 Cambiar el número de WhatsApp

**Opción A: En index.html (recomendado)**
Busca y reemplaza TODAS las menciones de `56985062378`:
- Busca: `56985062378`
- Reemplaza por: Tu número (ej: `56964044114`)

**Localidades donde aparece:**
- Botón flotante (esquina inferior derecha)
- Sección de contacto
- Link de ubicación

**Opción B: En script.js**
Línea ~190, función `finalizeOrder()`:
```javascript
const whatsappUrl = `https://wa.me/56985062378?text=`;
// Cambia 56985062378 por tu número
```

### 3.2 Cambiar información del negocio

En `index.html`, busca y actualiza:

```html
<!-- TELÉFONO 1 -->
<a href="https://wa.me/56964044114"...>

<!-- TELÉFONO 2 -->  
<a href="https://wa.me/56985062378"...>

<!-- DIRECCIÓN -->
<p class="address">Ruta H-30 #303, Coltauco</p>
<p class="region">Región de O'Higgins, Chile</p>

<!-- HORARIOS -->
<div class="hour-row">
    <span>Domingo a Jueves</span>
    <strong>Hasta las 00:30</strong>
</div>
<div class="hour-row">
    <span>Viernes y Sábado</span>
    <strong>Hasta las 02:30</strong>
</div>
```

### 3.3 Cambiar productos

En `script.js`, busca la sección `const PRODUCTS = [`:

```javascript
const PRODUCTS = [
    // Cervezas
    { 
        id: 1, 
        name: 'Cerveza Artesanal Golden',     // Nombre del producto
        category: 'cervezas',                 // Categoría
        price: 3500,                          // Precio en pesos
        emoji: '🍺',                          // Emoji representativo
        description: '750ml - Dorada'         // Descripción
    },
    // Agregar más productos aquí...
];
```

**Categorías disponibles:**
- `cervezas` 🍺
- `destilados` 🥃
- `vinos` 🍷
- `hielo` 🧊
- `snacks` 🍟
- `bebidas` 🥤

### 3.4 Cambiar colores

En `styles.css`, línea 1-8:

```css
:root {
    --primary-color: #D4AF37;      /* Dorado - cambia aquí */
    --secondary-color: #C41E3A;    /* Rojo - cambia aquí */
    --dark-bg: #0a0a0a;            /* Negro - cambia aquí */
    --card-bg: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #333333;
}
```

**Ejemplos de colores:**
- Dorado: `#D4AF37`, `#FFD700`, `#FFC700`
- Rojo: `#C41E3A`, `#DC143C`, `#FF0000`
- Negro: `#0a0a0a`, `#1a1a1a`, `#000000`

---

## Paso 4: Publicar en Internet (GRATIS)

### Opción A: Netlify (RECOMENDADO)

1. Crea cuenta gratis en [netlify.com](https://netlify.com)
2. Haz login
3. Arrastra la carpeta `Boti Dival` a la página
4. ¡Listo! Tu web estará en vivo en segundos

**Ventajas:**
- ✓ Dominio gratis (tudominio.netlify.app)
- ✓ HTTPS automático (seguro)
- ✓ Muy rápido
- ✓ PWA funciona perfectamente

### Opción B: Vercel

1. Crea cuenta en [vercel.com](https://vercel.com)
2. Conecta tu carpeta del proyecto
3. ¡Publicado automáticamente!

### Opción C: GitHub Pages (AVANZADO)

1. Crea repositorio en GitHub
2. Sube los archivos
3. Ve a Settings → Pages
4. Selecciona rama `main`
5. ¡Tu web estará en github.io

---

## Paso 5: Verificar que Todo Funciona

Después de publicar, verifica:

✅ **Homepage** - Se ve bonito y carga rápido
✅ **Búsqueda** - Funciona escribiendo
✅ **Productos** - Se pueden agregar al carrito
✅ **Carrito** - Muestra productos correctos
✅ **WhatsApp** - Abre con el número correcto
✅ **Móvil** - Se ve perfecto en celular
✅ **Botones** - Todos clickean correctamente

---

## Paso 6: Optimizaciones PRO

### 6.1 Agregar sitio a Google

1. Accede a [Search Console](https://search.google.com/search-console)
2. Agrega tu dominio
3. Verifica propiedad
4. ¡Aparecerás en búsquedas de Google!

### 6.2 Crear código QR

Usa [qr-code-generator.com](https://qr-code-generator.com):
1. Copia tu URL (ej: tudominio.netlify.app)
2. Genera código QR
3. Imprime y pon en tu local

### 6.3 Combinar con redes sociales

Comparte en:
- WhatsApp: Manda el enlace a contactos
- Facebook: Crea evento y pega enlace
- Instagram: Link en bio
- TikTok: En descripción de videos

---

## Solución Rápida de Problemas

| Problema | Solución |
|----------|----------|
| "WhatsApp no abre" | Verifica que el número tenga formato +56 |
| "Los productos no aparecen" | Revisa que script.js no tenga errores (F12) |
| "Se ve lento" | Borra caché (Ctrl+F5) |
| "No funciona offline" | No todos los navegadores con Service Worker |
| "El carrito no guarda" | Habilita JavaScript en navegador |

---

## Características Incluidas (VERIFICADAS ✓)

✓ Página bonita y moderna
✓ Diseño responsive (móvil/desktop)
✓ Búsqueda de productos
✓ Filtros por categoría
✓ Carrito inteligente
✓ Envío automático a WhatsApp
✓ Horarios dinámicos
✓ Información de contacto
✓ Promociones destacadas
✓ Animaciones suaves
✓ Botón flotante WhatsApp
✓ Modo offline (PWA)
✓ Optimizado para velocidad
✓ SEO preparado

---

## Próximas Mejoras (OPCIONAL)

- Sistema de reseñas de clientes
- Historial de pedidos
- Cupones de descuento
- Integración con payment gateways
- Notificaciones push
- Dashboard de admin
- API propia

---

## Contacto y Soporte

### Para cambios menores:
Edita los archivos HTML/CSS directamente

### Para cambios mayores:
Contacta a un desarrollador freelance en:
- Fiverr
- Upwork
- Soyfreelancer.com

### Mantenimiento:
- Actualiza precios regularmente
- Agrega nuevos productos
- Mantén horarios al día
- Revisa que WhatsApp funcione

---

**¡Tu web está lista para vender! 🎉**

*Última actualización: Abril 2026*
