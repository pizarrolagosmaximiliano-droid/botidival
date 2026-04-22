/* ==================== CONFIGURACIÓN FÁCIL BOTI DIVAL ==================== */
/* 
 * Este archivo permite personalizar la web FÁCILMENTE sin tocar código
 * Solo reemplaza los valores en este archivo
 */

// ========== CONFIGURACIÓN AUTOMÁTICA DE RUTAS ==========
// Detecta si estamos en GitHub Pages o localhost y ajusta las rutas
const BASE_URL = (() => {
    const href = window.location.href;
    // Si está en GitHub Pages (botidival)
    if (href.includes('github.io') || href.includes('botidival')) {
        return '/botidival/';
    }
    // Si está en localhost o servidor local
    return '/';
})();

const CONFIG = {
    // ========== INFORMACIÓN DEL NEGOCIO ==========
    BUSINESS: {
        name: 'Boti Dival',
        tagline: 'Premium & Nocturno',
        description: 'Botillería Premium con más de 20 años de experiencia',
        
        address: 'Ruta H-30 #303, Coltauco',
        region: 'Región de O\'Higgins, Chile',
        
        phone_primary: '+56 9 6404 4114',
        phone_secondary: '+56 9 8506 2378',
        
        whatsapp_number: '56985062378',  // Sin + (el código lo agrega)
        
        email: 'contacto@botidival.com',  // Opcional
    },

    // ========== HORARIOS ==========
    HOURS: {
        weekday: {
            days: 'Domingo a Jueves',
            closing: '00:30'
        },
        weekend: {
            days: 'Viernes y Sábado',
            closing: '02:30'
        }
    },

    // ========== COLORES PERSONALIZADOS ==========
    COLORS: {
        primary: '#D4AF37',      // Dorado (cambiar aquí para dorado diferente)
        secondary: '#C41E3A',    // Rojo (cambiar aquí para rojo diferente)
        dark_bg: '#0a0a0a',      // Negro muy oscuro
        card_bg: '#1a1a1a',      // Negro para tarjetas
        text_primary: '#ffffff', // Blanco
        text_secondary: '#b0b0b0' // Gris claro
    },

    // ========== SOCIAL MEDIA (Futuro) ==========
    SOCIAL: {
        facebook: '',           // Agregar URL si existe
        instagram: '',          // Agregar URL si existe
        tiktok: '',            // Agregar URL si existe
        youtube: '',           // Agregar URL si existe
    },

    // ========== URLS Maps ==========
    MAPS: {
        google_maps: 'https://maps.google.com/?q=Ruta+H-30+303+Coltauco',
        coordinates: '-33.98,-70.15'  // Coltauco, O'Higgins
    },

    // ========== POLÍTICAS ==========
    POLICIES: {
        delivery_info: 'Despachos disponibles en Coltauco. Costo según distancia.',
        payment_methods: 'Aceptamos transferencia, efectivo y débito',
        return_policy: 'Los productos se devuelven en 24 horas si llegan en mal estado',
    },

    // ========== PROMOCIONES ESPECIALES ==========
    PROMOTIONS: [
        {
            title: 'Pack Pisco Party',
            badge: '🔥 HOT',
            items: 'Pisco Capel + Bebida 3L + Hielo',
            price_from: 19900
        },
        {
            title: 'Combo Cervecero',
            badge: '⭐ ESPECIAL',
            items: '6 Cervezas Artesanales + Snacks',
            price_from: 24900,
            image: 'https://cdnx.jumpseller.com/cerveza-mas-56/image/22316272/resize/640/640?1655388937'
        },
        {
            title: 'Kit Vino Nocturno',
            badge: '✨ NUEVO',
            items: '2 Vinos Premium + Hielo + Copas',
            price_from: 29900
        }
    ],

    // ========== CONFIGURACIÓN DE PWA ==========
    PWA: {
        app_name: 'Boti Dival - Botillería Premium',
        app_short_name: 'Boti Dival',
        app_description: 'Botillería Premium con Delivery Nocturno',
        display: 'standalone',
        theme_color: '#D4AF37',
        background_color: '#0a0a0a'
    },

    // ========== SEO ==========
    SEO: {
        keywords: 'botillería, delivery, coltauco, bebidas, pisco, vino, cerveza, othiggins, chile',
        author: 'Boti Dival',
        og_title: 'Boti Dival - Botillería Premium',
        og_description: 'Tus bebidas a la puerta de tu casa 🍻 Delivery nocturno en Coltauco'
    },

    // ========== FUNCIONES AUXILIARES ==========
    
    // Obtener número WhatsApp formateado
    getWhatsAppURL: function(message = '') {
        const phone = this.BUSINESS.whatsapp_number;
        const msg = encodeURIComponent(message || `Hola ${this.BUSINESS.name}, me gustaría realizar un pedido`);
        return `https://wa.me/${phone}?text=${msg}`;
    },

    // Obtener URL de Google Maps
    getGoogleMapsURL: function() {
        return this.MAPS.google_maps;
    },

    // Verificar si está abierto AHORA
    isOpenNow: function() {
        const now = new Date();
        const day = now.getDay();  // 0=domingo, 6=sábado
        
        // Siempre está abierto en esta botillería (24 horas)
        // Pero puedes personalizar si lo deseas
        return true;
    }
};

// ============== CÓMO USAR EN OTROS ARCHIVOS ==============
/*
 * 
 * En HTML:
 * <p><%= CONFIG.BUSINESS.name %></p>
 * <p><%= CONFIG.BUSINESS.address %></p>
 * 
 * En JavaScript:
 * const phone = CONFIG.BUSINESS.phone_secondary;
 * const url = CONFIG.getWhatsAppURL('Quiero hacer un pedido');
 * 
 * En CSS (agregar script que aplique colores dinámicamente):
 * document.documentElement.style.setProperty('--primary-color', CONFIG.COLORS.primary);
 * 
 */

// Exportar para Node.js (si se usa en backend)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
