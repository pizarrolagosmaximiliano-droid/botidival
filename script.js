/* ==================== PRODUCTOS ==================== */

const DEFAULT_PRODUCTS = [
    // Destilados
    { id: 1, name: 'Pisco Alto del Carmen', category: 'destilados', price: 9500, image: 'images/alto.jpg.jpeg', description: '35° - Botella 750ml de tradición chilena', popular: true, active: true },
    { id: 2, name: 'Whisky Chivas Regal 12', category: 'destilados', price: 28900, image: 'images/chivas.jpg.jpeg', description: '12 Años - Whisky Escocés Premium 750ml', active: true },
    { id: 3, name: 'Jack Daniel\'s Old No. 7', category: 'destilados', price: 26500, image: 'images/jack1.jpg.jpeg', description: 'Tennessee Whisky - El clásico de siempre 750ml', popular: true, active: true },
    { id: 4, name: 'Jack Daniel\'s Honey', category: 'destilados', price: 26500, image: 'images/jack2.jpg.jpeg', description: 'Tennessee Honey - Suave toque de miel 750ml', active: true },
    { id: 5, name: 'Jack Daniel\'s Apple', category: 'destilados', price: 26500, image: 'images/jack3.jpg.jpeg', description: 'Tennessee Apple - Refrescante sabor manzana 750ml', active: true },
    { id: 6, name: 'Johnnie Walker Red Label', category: 'destilados', price: 15900, image: 'images/redlabel1.jpg.jpeg', description: 'JW Red Label - Mezcla vibrante 750ml', active: true },
    { id: 7, name: 'Johnnie Walker Black Label', category: 'destilados', price: 32900, image: 'images/rednegro.jpg.jpeg', description: 'JW Black Label - 12 Años de profundidad 750ml', popular: true, active: true },
    { id: 8, name: 'Pisco Nobel Reservado', category: 'destilados', price: 12900, image: 'images/nobel.jpg.jpeg', description: 'Pisco Nobel - Calidad excepcional 750ml', active: true },
    { id: 9, name: 'Pisco Nobel 40°', category: 'destilados', price: 14500, image: 'images/nobel2.jpg.jpeg', description: 'Pisco Nobel 40° - Edición especial 750ml', active: true },
    { id: 10, name: 'Promo Mix Alcohol', category: 'destilados', price: 15990, image: 'images/alchol.png', description: 'Pack especial para tu previa', active: true },
    
    // Cervezas
    { id: 11, name: 'Pack Cerveza Corona', category: 'cervezas', price: 14900, image: 'images/pack corona .jpeg', description: 'Balde/Pack 6 Botellas - 355ml c/u', popular: true, active: true },
    
    // Vinos
    { id: 12, name: 'Vino Gato Negro Tinto', category: 'vinos', price: 3900, image: 'images/gato1.jpg.jpeg', description: 'Botella 1.5L - Varietal Cabernet Sauvignon', active: true },
    { id: 13, name: 'Vino Gato Negro Blanco', category: 'vinos', price: 3900, image: 'images/gato2.jpg.jpeg', description: 'Botella 1.5L - Varietal Sauvignon Blanc', active: true },

    // Bebidas & Mixers
    { id: 14, name: 'Monster Energy', category: 'bebidas', price: 2500, image: 'images/monster.jpg.jpeg', description: 'Lata 473ml - Energía extrema', active: true },
    { id: 15, name: 'Bebida Coca-Cola 1.5L', category: 'bebidas', price: 2200, image: 'images/coca.jpg.jpeg', description: 'Botella 1.5L - Sabor original', active: true },
    { id: 16, name: 'Bebida Sprite 1.5L', category: 'bebidas', price: 2200, image: 'images/sprite.jpg.jpeg', description: 'Botella 1.5L - Lima-limón', active: true },
    
    // Hielo
    { id: 17, name: 'Bolsa de Hielo 2kg', category: 'hielo', price: 1500, image: 'images/hielo.jpg.jpeg', description: 'Hielo en cubitos purificado', active: true },
    
    // Snacks
    { id: 18, name: 'Deli Snacks Mix', category: 'snacks', price: 4500, image: 'images/snacks.jpg.jpeg', description: 'Variedad de snacks premium para compartir', active: true }
];

// Corregir automáticamente datos corruptos en localStorage si existen
(function fixStorageCorruption() {
    try {
        const stored = localStorage.getItem('botidival_products');
        if (stored && (stored.includes('Ã') || stored.includes('ǟ'))) {
            console.warn('Detectada corrupción de caracteres en LocalStorage. Reiniciando catálogo...');
            localStorage.removeItem('botidival_products');
            window.location.reload();
        }
    } catch (e) {}
})();


// InicializaciÃƒÂ³n robusta con versionado para forzar actualizaciÃƒÂ³n
function loadProducts() {
    const CATALOG_VERSION = 'v2.0'; // Incrementa esto para forzar reset
    try {
        const storedVersion = localStorage.getItem('catalog_version');
        const raw = localStorage.getItem('productos');
        
        if (storedVersion !== CATALOG_VERSION || !raw) {
            throw new Error('reset');
        }
        
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('invÃƒÂ¡lido');
        return parsed;
    } catch (e) {
        localStorage.setItem('productos', JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem('catalog_version', CATALOG_VERSION);
        return DEFAULT_PRODUCTS;
    }
}

let PRODUCTS = loadProducts();

// ConfiguraciÃƒÂ³n de delivery
const DELIVERY_ZONES = {
    'doÃƒÂ±ihue': {
        name: 'DoÃƒÂ±ihue',
        sectors: [
            { id: 'centro', name: 'DoÃƒÂ±ihue Centro', cost: 6600 },
            { id: 'cerrillos', name: 'Cerrillos', cost: 6000 }
        ]
    },
    'coltauco': {
        name: 'Coltauco',
        sectors: [
            { id: 'quimÃƒÂ¡vida', name: 'QuimÃƒÂ¡vida', cost: 6000 },
            { id: 'lo_de_cuevas', name: 'Lo de Cuevas', cost: 5800 },
            { id: 'hijuela_del_medio', name: 'Hijuela del Medio', cost: 5800 },
            { id: 'rinconada_de_parral', name: 'Rinconada de Parral', cost: 4700 },
            { id: 'cuesta_de_idahue', name: 'Cuesta de Idahue', cost: 4600 },
            { id: 'el_molino', name: 'El Molino', cost: 4300 },
            { id: 'montegrande', name: 'Montegrande', cost: 4200 },
            { id: 'el_loreto', name: 'El Loreto', cost: 4000 },
            { id: 'pampa_de_idahue', name: 'Pampa de Idahue', cost: 3900 },
            { id: 'puren', name: 'Puren', cost: 3700 },
            { id: 'idahue', name: 'Idahue', cost: 3500 },
            { id: 'el_parral', name: 'El Parral', cost: 3000 },
            { id: 'almendro', name: 'Almendro', cost: 2700 },
            { id: 'lo_droguett', name: 'Lo Droguett', cost: 2600 },
            { id: 'idahuillo', name: 'Idahuillo', cost: 2500 },
            { id: 'san_luis', name: 'San Luis', cost: 2400 },
            { id: 'lo_ulloa', name: 'Lo Ulloa', cost: 2400 },
            { id: 'centro_coltauco', name: 'Coltauco Centro', cost: 2200 }
        ]
    }
};

let cart = [];
let currentFilter = 'all';
let selectedComuna = '';
let selectedSector = '';
let deliveryCost = 0;

function saveCartState() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const STORAGE_KEYS = {
    productos: 'productos',
    pedidos: 'pedidosHistorial',
    promociones: 'promociones',
    carousel: 'carouselImages',
    delivery: 'deliveryStatus',
    deliveryTrips: 'deliveryTripsHistory',
    instagram: 'instagramVideos'
};

function loadCartState() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (Array.isArray(storedCart)) {
        cart = storedCart.filter(item => item && item.id && item.quantity > 0);
    }
}

// Variables para promociones y videos
let promociones = JSON.parse(localStorage.getItem(STORAGE_KEYS.promociones)) || [];
let instagramVideos = JSON.parse(localStorage.getItem(STORAGE_KEYS.instagram)) || [];
let carouselImages = JSON.parse(localStorage.getItem(STORAGE_KEYS.carousel)) || [];
let deliveryStatus = JSON.parse(localStorage.getItem(STORAGE_KEYS.delivery)) !== null ? JSON.parse(localStorage.getItem(STORAGE_KEYS.delivery)) : true;
let deliveryTrips = JSON.parse(localStorage.getItem(STORAGE_KEYS.deliveryTrips)) || [];

// Variables para control de pedidos
let pedidosHistorial = JSON.parse(localStorage.getItem('pedidosHistorial')) || [];

// Inicializar datos de ejemplo si no existen
if (pedidosHistorial.length === 0) {
    const fechaHoy = new Date();
    const fechaAyer = new Date(fechaHoy);
    fechaAyer.setDate(fechaAyer.getDate() - 1);
    
    pedidosHistorial = [
        {
            id: 1001,
            fecha: fechaHoy.toISOString(),
            tipo: 'delivery',
            cliente: {
                nombre: 'Juan PÃƒÂ©rez',
                telefono: '+56912345678',
                comuna: 'Coltauco',
                sector: 'Centro',
                direccion: 'Calle Principal 123',
                coordenadas: '-34.4567, -71.1234'
            },
            productos: [
                { id: 1, nombre: 'Cerveza Artesanal Golden', cantidad: 2, precioUnitario: 3500, subtotal: 7000 },
                { id: 5, nombre: 'Pisco Capel AÃƒÂ±ejo', cantidad: 1, precioUnitario: 12900, subtotal: 12900 }
            ],
            costos: {
                subtotal: 19900,
                delivery: 0,
                total: 19900
            },
            comentarios: 'Entregar despuÃƒÂ©s de las 20:00'
        },
        {
            id: 1002,
            fecha: fechaAyer.toISOString(),
            tipo: 'delivery',
            cliente: {
                nombre: 'MarÃƒÂ­a GonzÃƒÂ¡lez',
                telefono: '+56987654321',
                comuna: 'DoÃƒÂ±ihue',
                sector: 'Centro',
                direccion: 'Avenida Central 456',
                coordenadas: ''
            },
            productos: [
                { id: 7, nombre: 'Whisky Johnny Walker Red', cantidad: 1, precioUnitario: 17900, subtotal: 17900 }
            ],
            costos: {
                subtotal: 17900,
                delivery: 6600,
                total: 24500
            },
            comentarios: 'Llamar al llegar'
        },
        {
            id: 1003,
            fecha: fechaHoy.toISOString(),
            tipo: 'presencial',
            cliente: {
                nombre: 'Carlos RodrÃƒÂ­guez',
                telefono: '+56955556666',
                comuna: 'Coltauco',
                sector: 'Centro',
                direccion: 'Local - Retiro en tienda',
                coordenadas: ''
            },
            productos: [
                { id: 4, nombre: 'Six Pack Cerveza Lager', cantidad: 1, precioUnitario: 18900, subtotal: 18900 }
            ],
            costos: {
                subtotal: 18900,
                delivery: 0,
                total: 18900
            },
            comentarios: 'Cliente frecuente'
        }
    ];
    localStorage.setItem('pedidosHistorial', JSON.stringify(pedidosHistorial));
}

// Inicializar datos de ejemplo si no existen
if (!localStorage.getItem('promociones')) {
    localStorage.setItem('promociones', JSON.stringify([
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
            title: 'Happy Hour - 2x1 en Cervezas',
            description: 'Todas las tardes de 18:00 a 20:00, lleva 2 cervezas y paga solo 1. Ã‚Â¡Perfecto para el after office!',
            price: 3500,
            active: true,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
            title: 'Pack Familiar - Pisco + Bebidas',
            description: 'Botella de pisco Capel + 6 gaseosas premium. Ideal para reuniones familiares.',
            price: 15900,
            active: true,
            createdAt: new Date().toISOString()
        }
    ]));
}

if (!localStorage.getItem('videos')) {
    localStorage.setItem('videos', JSON.stringify([
        {
            id: 1,
            videoId: 'dQw4w9WgXcQ',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            title: 'Conoce Nuestra Carta Premium',
            description: 'Descubre nuestra selecciÃƒÂ³n de bebidas premium y productos exclusivos.',
            active: true,
            createdAt: new Date().toISOString()
        }
    ]));
}

// Recargar variables despuÃƒÂ©s de inicializaciÃƒÂ³n
promociones = JSON.parse(localStorage.getItem('promociones')) || [];
videos = JSON.parse(localStorage.getItem('videos')) || [];
carouselImages = JSON.parse(localStorage.getItem('carouselImages')) || carouselImages;

/* ==================== CARRUSEL ==================== */

let currentSlide = 1;
const totalSlides = 3;
let slideInterval;

function initializeCarousel() {
    startSlideShow();
    updateIndicators();
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide > totalSlides) currentSlide = 1;
    if (currentSlide < 1) currentSlide = totalSlides;
    showSlide(currentSlide);
    resetSlideShow();
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
    resetSlideShow();
}

function showSlide(slideNumber) {
    // Ocultar todos los slides
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostrar slide actual
    const activeSlide = document.querySelector(`.carousel-slide[data-slide="${slideNumber}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    
    updateIndicators();
}

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index + 1 === currentSlide);
    });
}

function startSlideShow() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Cambiar cada 5 segundos
}

function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
}

/* ==================== INICIALIZACIÃƒâ€œN ==================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadCartState();
    
    // Renderizar componentes si existen los contenedores
    if (document.getElementById('productsGrid')) {
        renderProducts(PRODUCTS.filter(p => p.active !== false));
    }
    
    if (document.getElementById('promoExclusiveTrack')) {
        updateWebPromociones();
    }
    
    if (document.getElementById('instagramVideosGrid')) {
        updateWebInstagram();
    }

    if (document.getElementById('imagesCarouselSection')) {
        updateWebCarousel();
    }

    updateDynamicMarketing();
    
    setupEventListeners();
    updateStatus();
    updateCartUI();
    initializeCarousel();
    initScrollAnimations();
    addTouchFeedback();
    enhanceSearch();
    addKeyboardShortcuts();
    checkDarkMode();
    setupLazyLoad();
    
    // Inicializar estado delivery (Dashboard/Header)
    if (document.getElementById('deliveryStatusDot')) {
        updateDeliveryStatusUI();
    }

    // Inicializar control de pedidos (solo en dashboard)
    if (document.getElementById('control-pedidosSection')) {
        renderPedidosDashboard();
        renderPedidosHistorial();
    }
    
    // Event listeners para formularios de Admin
    const promoForm = document.getElementById('promoCreateForm');
    if (promoForm) promoForm.addEventListener('submit', savePromocion);

    const videoForm = document.getElementById('videoCreateForm');
    if (videoForm) videoForm.addEventListener('submit', saveVideo);
    
    setInterval(updateStatus, 60000); 
    setInterval(checkDarkMode, 600000); // Check cada 10 minutos

    // SincronizaciÃƒÂ³n en tiempo real
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEYS.productos) {
            PRODUCTS = loadProducts();
            const filtered = currentFilter === 'all'
                ? PRODUCTS.filter(p => p.active !== false)
                : PRODUCTS.filter(p => p.category === currentFilter && p.active !== false);
            renderProducts(filtered);
        }
        
        if (e.key === STORAGE_KEYS.promociones) {
            promociones = JSON.parse(localStorage.getItem(STORAGE_KEYS.promociones)) || [];
            updateWebPromociones();
        }

        if (e.key === STORAGE_KEYS.instagram) {
            instagramVideos = JSON.parse(localStorage.getItem(STORAGE_KEYS.instagram)) || [];
            updateWebInstagram();
        }

        if (e.key === STORAGE_KEYS.carousel) {
            carouselImages = JSON.parse(localStorage.getItem(STORAGE_KEYS.carousel)) || [];
            updateWebCarousel();
        }

        if (e.key === STORAGE_KEYS.delivery) {
            deliveryStatus = JSON.parse(localStorage.getItem(STORAGE_KEYS.delivery));
            updateDeliveryDisplay(deliveryStatus);
        }

        if (e.key === STORAGE_KEYS.deliveryTrips) {
            deliveryTrips = JSON.parse(localStorage.getItem(STORAGE_KEYS.deliveryTrips)) || [];
            updateDynamicMarketing();
        }
    });
}

/* ==================== EVENT LISTENERS ==================== */

function setupEventListeners() {
    // Filtros (Tarjetas de CategorÃƒÂ­a)
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            currentFilter = category;
            
            // Actualizar tÃƒÂ­tulo del catÃƒÂ¡logo
            const catalogTitle = document.getElementById('catalogTitle');
            if (catalogTitle) {
                catalogTitle.textContent = card.querySelector('h3').textContent;
            }

            // Filtrar y renderizar productos
            const filtered = currentFilter === 'all'
                ? PRODUCTS.filter(p => p.active !== false)
                : PRODUCTS.filter(p => p.category === currentFilter && p.active !== false);
            renderProducts(filtered);

            // Animar transiciÃƒÂ³n a vista de productos
            const categoriesView = document.getElementById('categoriesView');
            const productsView = document.getElementById('productsView');
            
            if (categoriesView && productsView) {
                categoriesView.classList.add('fade-out');
                setTimeout(() => {
                    categoriesView.classList.remove('active-view');
                    categoriesView.classList.add('hidden-view');
                    categoriesView.classList.remove('fade-out');
                    
                    productsView.classList.remove('hidden-view');
                    productsView.classList.add('active-view');
                    
                    // Limpiar buscador si existe
                    const searchInput = document.getElementById('categorySearchInput');
                    if(searchInput) searchInput.value = '';
                    
                    // Scroll suave hacia arriba de la secciÃƒÂ³n
                    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
                }, 300); // Esperar animaciÃƒÂ³n
            }
        });
    });

    // BotÃƒÂ³n Volver
    const btnBack = document.getElementById('btnBackToCategories');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            const categoriesView = document.getElementById('categoriesView');
            const productsView = document.getElementById('productsView');
            
            if (categoriesView && productsView) {
                productsView.classList.add('fade-out');
                setTimeout(() => {
                    productsView.classList.remove('active-view');
                    productsView.classList.add('hidden-view');
                    productsView.classList.remove('fade-out');
                    
                    categoriesView.classList.remove('hidden-view');
                    categoriesView.classList.add('active-view');
                    
                    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    }

    // Buscador local de categorÃƒÂ­a
    const categorySearchInput = document.getElementById('categorySearchInput');
    if (categorySearchInput) {
        categorySearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const baseProducts = currentFilter === 'all'
                ? PRODUCTS.filter(p => p.active !== false)
                : PRODUCTS.filter(p => p.category === currentFilter && p.active !== false);
                
            const filtered = baseProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.description.toLowerCase().includes(searchTerm)
            );
            
            renderProducts(filtered);
        });
    }

    // BÃƒÂºsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', () => {
        document.getElementById('searchResults').classList.add('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            document.getElementById('searchResults').classList.remove('active');
        }
    });

    // Carrito
    document.querySelector('.cart-link').addEventListener('click', (e) => {
        e.preventDefault();
        openOrderForm();
    });
    
    // Menu mÃƒÂ³vil
    const menuToggle = document.getElementById('menuToggle');
    // El menú ahora se maneja con la lógica del drawer al final del archivo


    // Actualizar nav activa al hacer scroll
    window.addEventListener('scroll', () => {
        const sections = ['home', 'catalogo', 'ubicacion'];
        let current = '';

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const sectionTop = element.offsetTop;
                if (pageYOffset >= sectionTop - 150) {
                    current = section;
                }
            }
        });

        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

/* ==================== RENDERIZADO DE PRODUCTOS ==================== */

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" style="${product.active === false ? 'opacity:0.6; pointer-events:none;' : ''}">
            ${product.popular ? '<div class="popular-badge">Ã°Å¸â€Â¥ Popular</div>' : ''}
            ${product.active === false ? '<div class="popular-badge" style="background:#dc3545; right:auto; left:10px;">Agotado</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; filter: ${product.active === false ? 'grayscale(100%)' : 'none'};" onerror="this.src='https://via.placeholder.com/400?text=Sin+imagen'; this.onerror=null;">
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryLabel(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    ${product.previousPrice ? `<span style="text-decoration:line-through; color:#999; font-size:0.85em; margin-right:8px;">$${product.previousPrice.toLocaleString('es-CL')}</span>` : ''}
                    $${product.price.toLocaleString('es-CL')}
                </div>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="addToCart(${product.id}, -1)">−</button>
                        <span class="qty-display" id="qty-${product.id}">0</span>
                        <button class="qty-btn" onclick="addToCart(${product.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}, 1, true)">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Actualizar cantidades en el UI
    updateProductQuantityDisplay();
}

function getCategoryLabel(category) {
    const labels = {
        'cervezas': '🍺 Cervezas',
        'destilados': '🍸 Destilados',
        'vinos': '🍷 Vinos',
        'hielo': '🧊 Hielo',
        'snacks': '🥨 Snacks',
        'bebidas': '🥤 Bebidas'
    };
    return labels[category] || category;
}

/* ==================== CARRITO ==================== */

function addToCart(productId, quantity = 1, showNotification = true) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += quantity;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    } else if (quantity > 0) {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCartUI();
    updateProductQuantityDisplay();
    saveCartState();

    if (showNotification) {
        showNotificationMessage(`✔ ${product.name} agregado al carrito`);
        // Abrir automáticamente el formulario de pedido al agregar
        setTimeout(openOrderForm, 500);
    }
}

function updateProductQuantityDisplay() {
    PRODUCTS.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const qty = cartItem ? cartItem.quantity : 0;
        const display = document.getElementById(`qty-${product.id}`);
        if (display) {
            display.textContent = qty;
        }
    });
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const mobileCartCount = document.getElementById('mobileCartCount');
    const drawerCartCount = document.getElementById('drawerCartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    [cartCount, mobileCartCount, drawerCartCount].forEach(el => {
        if (el) {
            el.textContent = totalItems;
            el.classList.remove('pop');
            void el.offsetWidth; // Force reflow
            el.classList.add('pop');
        }
    });

    // Actualizar Mini Resumen (Sticky bar en móvil)
    const miniSummary = document.getElementById('miniSummary');
    if (miniSummary) {
        if (totalItems > 0) {
            miniSummary.style.display = 'block';
            const qtyEl = document.getElementById('miniSummaryQty');
            const totalEl = document.getElementById('miniSummaryTotal');
            if (qtyEl) qtyEl.textContent = `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;
            if (totalEl) totalEl.textContent = `$${totalPrice.toLocaleString('es-CL')}`;
        } else {
            miniSummary.style.display = 'none';
        }
    }
}

function removeItemFromCart(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        cart = cart.filter(i => i.id !== productId);
        updateCartUI();
        updateProductQuantityDisplay();
        saveCartState();
        showNotificationMessage(`🗑️ ${item.name} eliminado del carrito`);
    }
}

function removeFromCartAndRefresh(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        cart = cart.filter(i => i.id !== productId);
        updateCartUI();
        updateProductQuantityDisplay();
        saveCartState();
        
        // Si el carrito queda vacío, cerrar el modal
        if (cart.length === 0) {
            closeOrderModal();
            showNotificationMessage('🛒 El carrito está vacío');
        } else {
            // Refrescar el modal de pedido
            openOrderForm();
        }
    }
}

// Legacy openOrderForm removed. See active definition below.

function openCartSummaryModal() {
    const modal = document.createElement('div');
    modal.id = 'cartSummaryModal';
    modal.className = 'order-modal-overlay';

    if (cart.length === 0) {
        modal.innerHTML = `
            <div class="order-modal order-modal--small">
                <div class="order-modal-header">
                    <h3>🛒 Carrito vacío</h3>
                    <button class="modal-close" onclick="closeCartSummaryModal()">✖</button>
                </div>
                <div class="order-modal-content">
                    <p>Todavía no has agregado productos.</p>
                    <div class="order-actions" style="justify-content: center; margin-top: 16px;">
                        <button type="button" class="btn btn-primary" onclick="closeCartSummaryModal()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
    } else {
        const displayedItems = cart.slice(0, 4);
        const itemsHtml = displayedItems.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <span class="order-item-name">${item.name}</span>
                    <span class="order-item-qty">x${item.quantity}</span>
                </div>
                <span class="order-item-price">$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
            </div>
        `).join('');

        const moreCount = cart.length - displayedItems.length;
        const moreHtml = moreCount > 0 ? `
            <div class="order-item order-item-more">
                <span class="order-item-name">... y ${moreCount} producto(s) más</span>
            </div>
        ` : '';

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        modal.innerHTML = `
            <div class="order-modal order-modal--small">
                <div class="order-modal-header">
                    <h3>🛒 Tu Pedido</h3>
                    <button class="modal-close" onclick="closeCartSummaryModal()">✖</button>
                </div>
                <div class="order-modal-content">
                    <div class="order-summary">
                        <div class="order-items">
                            ${itemsHtml}
                            ${moreHtml}
                        </div>
                        <div class="order-total">
                            <strong>Total: $${total.toLocaleString('es-CL')}</strong>
                        </div>
                    </div>
                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeCartSummaryModal()">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="openOrderForm()">Continuar</button>
                    </div>
                </div>
            </div>
        `;
    }

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCartSummaryModal();
        }
    });
    document.addEventListener('keydown', handleSummaryEscapeKey);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeCartSummaryModal() {
    const modal = document.getElementById('cartSummaryModal');
    if (modal) {
        modal.classList.remove('active');
        document.removeEventListener('keydown', handleSummaryEscapeKey);
        setTimeout(() => modal.remove(), 300);
    }
}

function handleSummaryEscapeKey(event) {
    if (event.key === 'Escape') {
        closeCartSummaryModal();
    }
}


function setCompactMode(compact = true) {
    const miniSummary = document.getElementById('miniSummary');
    const fullSections = document.getElementById('fullSections');

    if (compact) {
        miniSummary.style.display = cart.length > 0 ? 'block' : 'none';
        fullSections.style.display = 'none';
        cartExpanded = false;
    } else {
        miniSummary.style.display = 'none';
        fullSections.style.display = 'block';
        cartExpanded = true;
        // Auto-expand cart items and form when opening full view
        updateCartUI();
        // Mostrar formulario automáticamente en modo expandido
        document.getElementById('cartForm').style.display = 'block';
        document.getElementById('cartSummary').style.display = 'block';
        document.getElementById('checkoutBtn').style.display = 'block';
    }
}

function toggleCartSection() {
    setCompactMode(!cartExpanded);
    if (cartExpanded) {
        updateStepIndicator(1); // Mostrar productos
    }
}

function updateStepIndicator(step) {
    // Reset all steps
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    
    // Activate current step
    for (let i = 1; i <= step; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (stepElement) {
            stepElement.classList.add('active');
        }
    }
}

function openOrderForm() {
    if (cart.length === 0) {
        showNotificationMessage('❌ Tu carrito está vacío.');
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'orderModal';
    modal.className = 'order-modal-overlay';
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    modal.innerHTML = `
        <div class="order-modal-premium">
            <div class="order-modal-header">
                <h3>🛒 Finalizar Compra</h3>
                <button class="modal-close" onclick="closeOrderModal()">×</button>
            </div>

            <div class="order-modal-content slim-scroll">
                <!-- Pedido -->
                <div class="order-summary-premium">
                    <div class="summary-header">
                        <h4>Resumen del Pedido</h4>
                        <span class="badge">${totalItems} items</span>
                    </div>
                    <div class="order-items">
                        ${cart.map(item => `
                            <div class="order-item-premium">
                                <div class="item-main-info">
                                    <div class="item-qty-badge">${item.quantity}x</div>
                                    <span class="item-name">${item.name}</span>
                                </div>
                                <div class="item-side-info">
                                    <span class="item-price">$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                                    <button class="delete-item-btn" onclick="removeFromCartAndRefresh(${item.id})" title="Eliminar">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="total-premium">
                        <div class="total-row">
                            <span class="total-label">Subtotal</span>
                            <span class="total-val">$${subtotal.toLocaleString('es-CL')}</span>
                        </div>
                        <div id="deliveryRow" class="total-row" style="display: none;">
                            <span class="total-label">Envío</span>
                            <span id="modalDeliveryCost" class="total-val">$0</span>
                        </div>
                        <div class="total-row grand-total">
                            <span class="total-label">TOTAL</span>
                            <span id="modalTotalAmount" class="total-val">$${subtotal.toLocaleString('es-CL')}</span>
                        </div>
                    </div>
                </div>

                <!-- Formulario -->
                <form class="order-form-premium" onsubmit="submitOrder(event)">
                    <div class="form-section">
                        <h4>📍 Datos de Entrega</h4>
                        
                        <div class="premium-input-group">
                            <label>Método de Entrega</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="typeDelivery" name="orderType" value="delivery" checked onchange="toggleOrderTypeFields()">
                                    <label for="typeDelivery">🛵 Delivery</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="typeRetiro" name="orderType" value="retiro" onchange="toggleOrderTypeFields()">
                                    <label for="typeRetiro">🛍️ Retiro</label>
                                </div>
                            </div>
                        </div>

                        <div class="premium-input-group">
                            <label>Nombre Completo *</label>
                            <input type="text" id="modalClientName" class="premium-input" placeholder="Tu nombre" required>
                        </div>

                        <div class="premium-input-group">
                            <label>WhatsApp *</label>
                            <input type="tel" id="modalClientPhone" class="premium-input" placeholder="+56 9 XXXX XXXX" required>
                        </div>

                        <div id="deliveryFields">
                            <div class="premium-input-group">
                                <label>Comuna *</label>
                                <select id="modalClientComuna" class="premium-input" onchange="updateSectores()" required>
                                    <option value="">Seleccionar Comuna</option>
                                    ${Object.keys(DELIVERY_ZONES).map(id => `<option value="${id}">${DELIVERY_ZONES[id].name}</option>`).join('')}
                                </select>
                            </div>

                            <div class="premium-input-group">
                                <label>Sector *</label>
                                <select id="modalClientSector" class="premium-input" disabled required onchange="updateDeliveryCost()">
                                    <option value="">Seleccionar Sector</option>
                                </select>
                            </div>

                            <div class="premium-input-group">
                                <label>Dirección Exacta *</label>
                                <div style="display:flex; gap:8px;">
                                    <input type="text" id="modalClientAddress" class="premium-input" placeholder="Calle, N°, Block..." required>
                                    <button type="button" class="gps-btn" onclick="getCurrentLocation('modalClientAddress')" id="btnGps">
                                        📍 <span class="desktop-only">GPS</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="premium-input-group">
                            <label>Nota adicional (Opcional)</label>
                            <textarea id="modalClientComments" class="premium-input" placeholder="Ej: Llamar al llegar..." rows="2"></textarea>
                        </div>

                        <button type="submit" class="submit-order-btn">
                            <span>Pedir por WhatsApp</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeOrderModal();
    });

    document.addEventListener('keydown', handleEscapeKey);

    setTimeout(() => {
        modal.classList.add('active');
        toggleOrderTypeFields();
    }, 10);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') closeOrderModal();
}

function updateSectores() {
    const comunaSelect = document.getElementById('modalClientComuna');
    const sectorSelect = document.getElementById('modalClientSector');
    const comuna = comunaSelect.value;
    
    sectorSelect.innerHTML = '<option value="">Seleccionar sector...</option>';
    sectorSelect.disabled = true;
    
    if (comuna && DELIVERY_ZONES[comuna]) {
        DELIVERY_ZONES[comuna].sectors.forEach(sector => {
            const option = document.createElement('option');
            option.value = sector.id;
            option.textContent = sector.name;
            sectorSelect.appendChild(option);
        });
        sectorSelect.disabled = false;
    }
    
    updateDeliveryCost();
}

function updateDeliveryCost() {
    const comunaSelect = document.getElementById('modalClientComuna');
    const sectorSelect = document.getElementById('modalClientSector');
    const costLabel = document.getElementById('modalDeliveryCost');
    const deliveryRow = document.getElementById('deliveryRow');
    const modalGrandTotal = document.getElementById('modalGrandTotal');
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let dCost = 0;

    if (orderType === 'presencial') {
        if(costLabel) costLabel.textContent = '$0';
        if(deliveryRow) deliveryRow.style.display = 'none';
    } else {
        if(deliveryRow) deliveryRow.style.display = 'flex';
        const comuna = comunaSelect.value;
        const sectorId = sectorSelect.value;
        const sectorData = (comuna && sectorId) ? DELIVERY_ZONES[comuna].sectors.find(s => s.id === sectorId) : null;
        
        if (sectorData) {
            dCost = sectorData.cost;
            costLabel.textContent = `$${dCost.toLocaleString('es-CL')}`;
            costLabel.style.color = '#2563eb';
        } else {
            costLabel.textContent = '--';
            costLabel.style.color = '#64748b';
        }
    }
    
    if (modalGrandTotal) {
        modalGrandTotal.textContent = `$${(subtotal + dCost).toLocaleString('es-CL')}`;
    }
}

function toggleOrderTypeFields() {
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'delivery';
    const deliveryFields = document.querySelectorAll('.order-delivery-field');
    const comunaSelect = document.getElementById('modalClientComuna');
    const sectorSelect = document.getElementById('modalClientSector');
    const addressInput = document.getElementById('modalClientAddress');

    const isDelivery = orderType === 'delivery';

    deliveryFields.forEach(field => {
        field.style.display = isDelivery ? '' : 'none';
    });

    if (comunaSelect) comunaSelect.required = isDelivery;
    if (sectorSelect) sectorSelect.required = isDelivery;
    if (addressInput) {
        addressInput.required = isDelivery;
        if (!isDelivery) {
            addressInput.value = 'Retiro en local';
        } else if (addressInput.value === 'Retiro en local') {
            addressInput.value = '';
        }
    }

    updateDeliveryCost();
}

function calculateDeliveryCost(comuna, sector) {
    if (!comuna || !sector) return 0;
    const zone = DELIVERY_ZONES[comuna];
    if (!zone || !zone.sectors[sector]) return 0;
    return zone.sectors[sector].cost;
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.remove('active');
        document.removeEventListener('keydown', handleEscapeKey);
        setTimeout(() => modal.remove(), 300);
    }
}

function submitOrder(event) {
    event.preventDefault();

    const orderType = document.querySelector('input[name="orderType"]:checked').value;
    const name = document.getElementById('modalClientName').value.trim();
    const phone = document.getElementById('modalClientPhone').value.trim();
    const comuna = document.getElementById('modalClientComuna').value;
    const sector = document.getElementById('modalClientSector').value;
    const address = document.getElementById('modalClientAddress').value.trim();
    const comments = document.getElementById('modalClientComments').value.trim();
    const manualGps = document.getElementById('modalClientGpsLink')?.value.trim();
    const autoGps = document.getElementById('modalCoordinates')?.value.trim();

    if (!name) return alert('Por favor ingresa tu nombre completo');
    if (!phone) return alert('Por favor ingresa tu número de teléfono');

    const phoneRegex = /^(\+56\s?9|\+569|9)\s?\d{4}\s?\d{4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return alert('Formato de teléfono inválido. Usa +56 9 XXXX XXXX');
    }

    if (orderType === 'delivery') {
        if (!comuna) return alert('Por favor selecciona tu comuna');
        if (!sector) return alert('Por favor selecciona tu sector');
        if (!address) return alert('Por favor ingresa tu dirección completa');
    }

    if (cart.length === 0) return alert('Tu carrito está vacío');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Obtenemos costo buscando sector id directamente en array
    let deliveryCost = 0;
    if(orderType === 'delivery') {
       const sectorObj = DELIVERY_ZONES[comuna]?.sectors.find(s => s.id === sector);
       deliveryCost = sectorObj ? sectorObj.cost : 0;
    }
    const total = subtotal + deliveryCost;

    const sectorName = orderType === 'delivery' ? (DELIVERY_ZONES[comuna]?.sectors.find(s => s.id === sector)?.name || '') : '';
    const comunaName = orderType === 'delivery' ? DELIVERY_ZONES[comuna]?.name : '';

    let message = `🛒 *NUEVO PEDIDO – BOTILLERÍA DIVAL*\n\n`;
    message += `🧑 Cliente: ${name}\n`;
    message += `📞 Teléfono: ${phone}\n\n`;
    
    message += `📦 Productos:\n`;
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity}\n`;
    });

    message += `\n💰 Subtotal: $${subtotal.toLocaleString('es-CL')}\n`;
    if(orderType === 'delivery') {
        message += `🚚 Delivery: $${deliveryCost.toLocaleString('es-CL')}\n`;
    } else {
        message += `🛍️ Delivery: $0 (Retiro Local)\n`;
    }
    message += `💵 Total Final: $${total.toLocaleString('es-CL')}\n\n`;

    if (orderType === 'delivery') {
        message += `🏠 Comuna: ${comunaName}\n`;
        message += `📌 Sector: ${sectorName}\n`;
        message += `🏡 Dirección: ${address}\n\n`;

        if (autoGps) {
            message += `📍 Ubicación:\nhttps://www.google.com/maps?q=${autoGps.replace(/\s/g, '')}\n\n`;
        } else if (manualGps) {
            message += `📍 Ubicación manual:\n${manualGps}\n\n`;
        }
    } else {
         message += `📍 Retiro Presencial en Local\n\n`;
    }

    if (comments) {
        message += `📝 Observaciones:\n${comments}\n`;
    }

    const nuevoPedido = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        tipo: orderType,
        cliente: {
            nombre: name,
            telefono: phone,
            comuna: comunaName || 'Local',
            sector: sectorName || 'Retiro',
            direccion: orderType === 'delivery' ? address : 'Retiro en local',
            coordenadas: autoGps || manualGps || ''
        },
        productos: cart.map(item => ({
            id: item.id,
            nombre: item.name,
            cantidad: item.quantity,
            precioUnitario: item.price,
            subtotal: item.price * item.quantity
        })),
        costos: { subtotal, delivery: deliveryCost, total },
        comentarios: comments || ''
    };

    pedidosHistorial.push(nuevoPedido);
    localStorage.setItem('pedidosHistorial', JSON.stringify(pedidosHistorial));

    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
        cart = [];
        updateCartUI();
        closeOrderModal();
        if(typeof closeCart === 'function') closeCart();
    }, 1000);
}

/* ==================== PROMOCIONES ==================== */

const PROMOS = [
    {
        id: 1001,
        name: 'Pack Pisco Party',
        price: 19900,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
        description: 'Pisco Capel Añejo + Bebida 3L + Hielo premium + Copas'
    },
    {
        id: 1002,
        name: 'Combo Cervecero Premium',
        price: 24900,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        description: '6 Cervezas Artesanales + Snacks variados + Hielo'
    },
    {
        id: 1003,
        name: 'Kit Vino Nocturno',
        price: 29900,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
        description: '2 Vinos Premium + Hielo + Copas + Snacks gourmet'
    },
    {
        id: 1004,
        name: 'Combo Familiar',
        price: 27900,
        image: 'https://images.unsplash.com/photo-1608270861620-7c80b6ff7435?w=400&h=300&fit=crop',
        description: 'Vino + Cervezas + Snacks + Bebidas no alcohólicas'
    }
];

function addPromoToCart(promoId) {
    const dynamicPromo = promociones.find(p => p.id === promoId && p.active);
    const legacyPromo = PROMOS.find(p => p.id === 1000 + promoId);
    const promo = dynamicPromo ? {
        id: dynamicPromo.id,
        name: dynamicPromo.title,
        price: Number(dynamicPromo.price) || 0,
        image: dynamicPromo.image,
        description: dynamicPromo.description
    } : legacyPromo;
    if (!promo) return;

    // Agregar como producto especial
    const cartItem = cart.find(item => item.id === promo.id);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...promo,
            quantity: 1,
            category: 'promociones'
        });
    }

    updateCartUI();
    showNotificationMessage(`✔ ${promo.name} agregado al carrito`);
}

function scrollPromo(direction) {
    const track = document.querySelector('.promo-track');
    const cardWidth = 350; // Ancho aproximado de cada card
    const scrollAmount = cardWidth * direction;
    
    track.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

/* ==================== BÚSQUEDA ==================== */

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    if (query.length < 2) {
        resultsContainer.classList.remove('active');
        return;
    }

    const results = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">No se encontraron productos</div>';
        resultsContainer.classList.add('active');
        return;
    }

    resultsContainer.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="handleSearchResultClick(${product.id})">
            <div>
                <div style="margin-bottom: 4px;">
                    <span style="font-size: 1.2rem; margin-right: 8px;">${product.emoji}</span>
                    <strong>${product.name}</strong>
                </div>
                <small style="color: var(--text-secondary);">${product.description}</small>
            </div>
            <div style="color: var(--primary-color); font-weight: 600;">$${product.price.toLocaleString('es-CL')}</div>
        </div>
    `).join('');

    resultsContainer.classList.add('active');
}

function handleSearchResultClick(productId) {
    addToCart(productId, 1, true);
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').classList.remove('active');
    openOrderForm();
}

/* ==================== HORARIOS Y ESTADO ==================== */

function updateStatus() {
    const statusBar = document.getElementById('statusBar');
    const statusText = document.getElementById('statusText');
    if (!statusBar || !statusText) return;
    
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let isOpen = false;
    let closeTime = '';

    if (day >= 0 && day <= 4) {
        isOpen = true;
        closeTime = 'hasta las 00:30';
    } else if (day === 5 || day === 6) {
        isOpen = true;
        closeTime = 'hasta las 02:30';
    }

    if (isOpen) {
        statusText.textContent = 'Abierto ' + closeTime;
        statusBar.classList.remove('closed');
    } else {
        statusText.textContent = 'Cerrado en estos momentos';
        statusBar.classList.add('closed');
    }
}


/* ==================== FUNCIONES DE DELIVERY Y PAGO ==================== */

function initializeDeliveryOptions() {
    const comunaSelect = document.getElementById('clientComuna');
    comunaSelect.innerHTML = '<option value="">Selecciona tu comuna</option>';
    
    Object.keys(DELIVERY_ZONES).forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = DELIVERY_ZONES[comuna].name;
        comunaSelect.appendChild(option);
    });
    
    // Reset sector
    document.getElementById('clientSector').innerHTML = '<option value="">Primero selecciona comuna</option>';
    selectedComuna = '';
    selectedSector = '';
    deliveryCost = 0;
    updateTotalPrice();
}

function updateSectorOptions() {
    const comunaSelect = document.getElementById('clientComuna');
    const sectorSelect = document.getElementById('clientSector');
    const selectedComunaValue = comunaSelect.value;
    
    if (!selectedComunaValue) {
        sectorSelect.innerHTML = '<option value="">Primero selecciona comuna</option>';
        deliveryCost = 0;
        updateTotalPrice();
        return;
    }
    
    selectedComuna = selectedComunaValue;
    const sectors = DELIVERY_ZONES[selectedComuna].sectors;
    
    sectorSelect.innerHTML = '<option value="">Selecciona tu sector</option>';
    sectors.forEach(sector => {
        const option = document.createElement('option');
        option.value = sector.id;
        option.textContent = `${sector.name} (+$${sector.cost.toLocaleString('es-CL')})`;
        sectorSelect.appendChild(option);
    });
    
    deliveryCost = 0;
    calculateDelivery();
}

function calculateDelivery() {
    const sectorSelect = document.getElementById('clientSector');
    const selectedSectorId = sectorSelect?.value;
    
    if (!selectedSectorId || !selectedComuna) {
        deliveryCost = 0;
    } else {
        selectedSector = selectedSectorId;
        const sectorData = DELIVERY_ZONES[selectedComuna].sectors.find(s => s.id === selectedSectorId);
        deliveryCost = sectorData ? sectorData.cost : 0;
    }
    
    updateCartUI();
}


async function getCurrentLocation(targetId = 'modalClientAddress') {
    const btn = document.getElementById('btnGps');
    const originalText = btn ? btn.innerHTML : '';
    
    if (!navigator.geolocation) {
        showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â Tu navegador no soporta geolocalizaciÃƒÂ³n.');
        return;
    }

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Obteniendo ubicaciÃƒÂ³n...';
    }
    showNotificationMessage('Ã¢Å’â€º Accediendo al GPS...');
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const coords = `${lat}, ${lng}`;
            
            // Intentar Reverse Geocoding (Convertir coordenadas a direcciÃƒÂ³n)
            try {
                showNotificationMessage('Ã°Å¸â€Â Identificando direcciÃƒÂ³n...');
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
                    headers: { 'Accept-Language': 'es' }
                });
                const data = await response.json();
                
                if (data && data.display_name) {
                    const addressField = document.getElementById('modalClientAddress');
                    if (addressField) {
                        // Limpiar direcciÃƒÂ³n de partes innecesarias
                        const cleanAddress = data.display_name.split(',').slice(0, 3).join(',').trim();
                        addressField.value = cleanAddress;
                        addressField.classList.add('gps-success');
                    }
                }
            } catch (geoError) {
                console.warn('No se pudo obtener la direcciÃƒÂ³n exacta:', geoError);
            }

            // Guardar coordenadas en campos ocultos
            const target = document.getElementById(targetId);
            const coordInput = document.getElementById('modalCoordinates');
            if (coordInput) coordInput.value = coords;
            
            // Si el target no es el de direcciÃƒÂ³n, poner las coordenadas
            if (target && targetId !== 'modalClientAddress') {
                target.value = coords;
            }

            showNotificationMessage('Ã°Å¸â€œÂ UbicaciÃƒÂ³n fijada con ÃƒÂ©xito');
            if (btn) {
                btn.disabled = false;
                btn.classList.add('btn-gps-success');
                btn.innerHTML = 'Ã¢Å“â€¦ UbicaciÃƒÂ³n Lista';
                setTimeout(() => { 
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-gps-success');
                }, 4000);
            }
        },
        (error) => {
            let msg = 'Ã¢Å¡Â Ã¯Â¸Â Error al obtener ubicaciÃƒÂ³n.';
            if (error.code === 1) msg = 'Ã¢Å¡Â Ã¯Â¸Â Permiso denegado. Activa el GPS y permite el acceso.';
            else if (error.code === 3) msg = 'Ã¢Å¡Â Ã¯Â¸Â Tiempo agotado. Intenta de nuevo.';
            
            showNotificationMessage(msg);
            console.error('GPS Error:', error);
            
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        },
        { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 0 
        }
    );
}

function removeItemFromModal(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        cart = cart.filter(i => i.id !== productId);
        updateCartUI();
        updateProductQuantityDisplay();
        saveCartState();
        
        if (cart.length === 0) {
            closeOrderModal();
            showNotificationMessage('Ã°Å¸â€ºâ€™ Carrito vacÃƒÂ­o');
            return;
        }

        // Actualizar la lista en el modal sin cerrarlo
        const itemElement = document.getElementById(`modal-item-${productId}`);
        if (itemElement) itemElement.remove();

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const modalSubtotal = document.getElementById('modalSubtotal');
        if (modalSubtotal) modalSubtotal.textContent = `Subtotal: $${subtotal.toLocaleString('es-CL')}`;

        updateDeliveryCost();
        showNotificationMessage(`Ã°Å¸â€”â€˜Ã¯Â¸Â ${item.name} eliminado`);
    }
}

function showOrderSummary() {
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientComuna = document.getElementById('clientComuna').value;
    const clientSector = document.getElementById('clientSector').value;
    const clientAddress = document.getElementById('clientAddress').value.trim();
    const clientComments = document.getElementById('clientComments').value.trim();
    const manualLocation = document.getElementById('manualLocation').value.trim();

    // Validaciones
    if (!clientName || clientName.length < 3) {
        showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â Por favor ingresa tu nombre completo');
        document.getElementById('clientName').focus();
        return;
    }

    if (!clientPhone || clientPhone.length < 8) {
        showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â Por favor ingresa un nÃƒÂºmero de telÃƒÂ©fono vÃƒÂ¡lido');
        document.getElementById('clientPhone').focus();
        return;
    }

    if (!clientComuna) {
        showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â Por favor selecciona tu comuna');
        document.getElementById('clientComuna').focus();
        return;
    }

    if (!clientSector) {
        showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â Por favor selecciona tu sector de entrega');
        document.getElementById('clientSector').focus();
        return;
    }

    if (!clientAddress || clientAddress.length < 5) {
        showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â Por favor ingresa una direcciÃƒÂ³n de entrega vÃƒÂ¡lida');
        document.getElementById('clientAddress').focus();
        return;
    }

    if (cart.length === 0) {
        showNotificationMessage('Ã°Å¸â€ºâ€™ Tu carrito estÃƒÂ¡ vacÃƒÂ­o');
        return;
    }
    
    const comunaName = DELIVERY_ZONES[clientComuna].name;
    const sectorData = DELIVERY_ZONES[clientComuna].sectors.find(s => s.id === clientSector);
    const sectorName = sectorData ? sectorData.name : clientSector;
    
    let summaryHTML = `
        <div class="order-modal-overlay" id="orderSummaryModal">
            <div class="order-modal">
                <div class="order-modal-header">
                    <h3>Ã°Å¸â€œâ€¹ Resumen de tu Pedido</h3>
                    <button class="modal-close" onclick="closeOrderSummary()">Ã¢Å“â€¢</button>
                </div>
                <div class="order-modal-content">
                    <div class="summary-section">
                        <h4>Ã°Å¸â€˜Â¤ Datos del Cliente</h4>
                        <p><strong>Nombre:</strong> ${clientName}</p>
                        <p><strong>TelÃƒÂ©fono:</strong> ${clientPhone}</p>
                        <p><strong>UbicaciÃƒÂ³n:</strong> ${comunaName} - ${sectorName}</p>
                        <p><strong>DirecciÃƒÂ³n:</strong> ${clientAddress}</p>
                        ${manualLocation ? `<p><strong>Coordenadas:</strong> ${manualLocation}</p>` : ''}
                        ${clientComments ? `<p><strong>Comentarios:</strong> ${clientComments}</p>` : ''}
                    </div>
                    
                    <div class="summary-section">
                        <h4>Ã°Å¸â€ºâ€™ Productos</h4>
                        ${cart.map(item => `
                            <div class="summary-item">
                                <span>${item.name} x${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="summary-section">
                        <h4>Ã°Å¸â€™Â° Resumen</h4>
                        <div class="summary-item">
                            <span>Subtotal productos:</span>
                            <span>$${subtotal.toLocaleString('es-CL')}</span>
                        </div>
                        <div class="summary-item">
                            <span>Delivery:</span>
                            <span>$${deliveryCost.toLocaleString('es-CL')}</span>
                        </div>
                        <div class="summary-item total">
                            <span><strong>TOTAL:</strong></span>
                            <span><strong>$${total.toLocaleString('es-CL')}</strong></span>
                        </div>
                    </div>
                    
                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeOrderSummary()">Ã¢â€ Â Modificar</button>
                        <button type="button" class="btn btn-success" onclick="sendOrderToWhatsApp()">
                            Ã°Å¸â€œÂ² Confirmar y enviar por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', summaryHTML);
}

function closeOrderSummary() {
    const modal = document.getElementById('orderSummaryModal');
    if (modal) {
        modal.remove();
    }
}

function sendOrderToWhatsApp() {
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientComuna = document.getElementById('clientComuna').value;
    const clientSector = document.getElementById('clientSector').value;
    const clientAddress = document.getElementById('clientAddress').value.trim();
    const clientComments = document.getElementById('clientComments').value.trim();
    const manualLocation = document.getElementById('manualLocation').value.trim();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryCost;
    
    const comunaName = DELIVERY_ZONES[clientComuna].name;
    const sectorData = DELIVERY_ZONES[clientComuna].sectors.find(s => s.id === clientSector);
    const sectorName = sectorData ? sectorData.name : clientSector;
    
    // Registrar pedido en historial
    const nuevoPedido = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        tipo: 'delivery',
        cliente: {
            nombre: clientName,
            telefono: clientPhone,
            comuna: comunaName,
            sector: sectorName,
            direccion: clientAddress,
            coordenadas: manualLocation
        },
        productos: cart.map(item => ({
            id: item.id,
            nombre: item.name,
            cantidad: item.quantity,
            precioUnitario: item.price,
            subtotal: item.price * item.quantity
        })),
        costos: {
            subtotal: subtotal,
            delivery: deliveryCost,
            total: total
        },
        comentarios: clientComments
    };
    
    pedidosHistorial.push(nuevoPedido);
    localStorage.setItem('pedidosHistorial', JSON.stringify(pedidosHistorial));
    
    let message = `Ã°Å¸â€ºâ€™ *NUEVO PEDIDO - Boti Dival*\n\n`;
    message += `Ã°Å¸â€˜Â¤ *Cliente:* ${clientName}\n`;
    message += `Ã°Å¸â€œÅ¾ *TelÃƒÂ©fono:* ${clientPhone}\n`;
    message += `Ã°Å¸â€œÂ *Sector:* ${sectorName}\n`;
    message += `Ã°Å¸ÂÂ  *DirecciÃƒÂ³n:* ${clientAddress}\n`;
    if (manualLocation) message += `Ã°Å¸â€œÅ’ *UbicaciÃƒÂ³n:* ${manualLocation}\n`;
    if (clientComments) message += `Ã°Å¸â€œÂ *Comentarios:* ${clientComments}\n\n`;
    
    message += `Ã°Å¸â€ºÂÃ¯Â¸Â *PRODUCTOS:*\n`;
    cart.forEach(item => {
        message += `Ã¢â‚¬Â¢ ${item.name} x${item.quantity} = $${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
    });
    
    message += `\nÃ°Å¸â€™Â° *RESUMEN:*\n`;
    message += `Ã¢â‚¬Â¢ Subtotal: $${subtotal.toLocaleString('es-CL')}\n`;
    message += `Ã¢â‚¬Â¢ Delivery: $${deliveryCost.toLocaleString('es-CL')}\n`;
    message += `Ã¢â‚¬Â¢ *TOTAL: $${total.toLocaleString('es-CL')}*\n\n`;
    
    message += `Ã¢Å“â€¦ *Pedido listo para procesar*`;
    
    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Cerrar modal y panel
    closeOrderSummary();
    closeCart();
    
    // Limpiar carrito despuÃƒÂ©s del pedido
    cart = [];
    updateCartUI();
    updateProductQuantityDisplay();
    saveCartState();
    showNotificationMessage('Ã¢Å“â€¦ Pedido enviado exitosamente');
}

/* ==================== FUNCIONES DE PROMOCIONES ==================== */

function showPromoForm() {
    document.getElementById('promoForm').style.display = 'block';
    document.getElementById('promoCreateForm').reset();
}

function hidePromoForm() {
    document.getElementById('promoForm').style.display = 'none';
}

function savePromocion(event) {
    event.preventDefault();
    
    const image = document.getElementById('promoImage').value;
    const title = document.getElementById('promoTitle').value;
    const description = document.getElementById('promoDescription').value;
    const price = document.getElementById('promoPrice').value;
    
    const nuevaPromo = {
        id: Date.now(),
        image: image,
        title: title,
        description: description,
        price: price ? parseInt(price) : null,
        active: true,
        createdAt: new Date().toISOString()
    };
    
    promociones.push(nuevaPromo);
    localStorage.setItem('promociones', JSON.stringify(promociones));
    
    hidePromoForm();
    renderPromociones();
    updateWebPromociones();
    showNotificationMessage('Ã¢Å“â€¦ PromociÃƒÂ³n creada exitosamente');
}

function deletePromocion(id) {
    if (confirm('Ã‚Â¿EstÃƒÂ¡s seguro de eliminar esta promociÃƒÂ³n?')) {
        promociones = promociones.filter(p => p.id !== id);
        localStorage.setItem('promociones', JSON.stringify(promociones));
        renderPromociones();
        updateWebPromociones();
        showNotificationMessage('Ã°Å¸â€”â€˜Ã¯Â¸Â PromociÃƒÂ³n eliminada');
    }
}

function togglePromocion(id) {
    const promo = promociones.find(p => p.id === id);
    if (promo) {
        promo.active = !promo.active;
        localStorage.setItem('promociones', JSON.stringify(promociones));
        renderPromociones();
        updateWebPromociones();
        showNotificationMessage(promo.active ? 'Ã¢Å“â€¦ PromociÃƒÂ³n activada' : 'Ã¢ÂÂ¸Ã¯Â¸Â PromociÃƒÂ³n pausada');
    }
}

function renderPromociones() {
    const grid = document.getElementById('promocionesGrid');
    if (!grid) return;
    grid.innerHTML = promociones.map(promo => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${promo.image}" class="card-img-top" alt="${promo.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${promo.title}</h5>
                    <p class="card-text flex-grow-1">${promo.description}</p>
                    ${promo.price ? `<p class="card-text"><strong>$${promo.price.toLocaleString('es-CL')}</strong></p>` : ''}
                    <div class="mt-auto">
                        <button class="btn btn-sm ${promo.active ? 'btn-warning' : 'btn-success'}" onclick="togglePromocion(${promo.id})">
                            ${promo.active ? 'Ã¢ÂÂ¸Ã¯Â¸Â Pausar' : 'Ã¢â€“Â¶Ã¯Â¸Â Activar'}
                        </button>
                        <button class="btn btn-sm btn-danger ms-1" onclick="deletePromocion(${promo.id})">
                            Ã°Å¸â€”â€˜Ã¯Â¸Â Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==================== FUNCIONES DE VIDEOS ==================== */

function showVideoForm() {
    document.getElementById('videoForm').style.display = 'block';
    document.getElementById('videoCreateForm').reset();
}

function hideVideoForm() {
    document.getElementById('videoForm').style.display = 'none';
}

function saveVideo(event) {
    event.preventDefault();
    
    const url = document.getElementById('videoUrl').value;
    const title = document.getElementById('videoTitle').value;
    const description = document.getElementById('videoDescription').value;
    
    // Extraer ID de YouTube
    const videoId = extractYouTubeId(url);
    if (!videoId) {
        showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â URL de YouTube invÃƒÂ¡lida');
        return;
    }
    
    const nuevoVideo = {
        id: Date.now(),
        videoId: videoId,
        url: url,
        title: title,
        description: description,
        active: true,
        createdAt: new Date().toISOString()
    };
    
    videos.push(nuevoVideo);
    localStorage.setItem('videos', JSON.stringify(videos));
    
    hideVideoForm();
    renderVideos();
    updateWebVideos();
    showNotificationMessage('Ã¢Å“â€¦ Video subido exitosamente');
}

function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
}

function deleteVideo(id) {
    if (confirm('Ã‚Â¿EstÃƒÂ¡s seguro de eliminar este video?')) {
        videos = videos.filter(v => v.id !== id);
        localStorage.setItem('videos', JSON.stringify(videos));
        renderVideos();
        updateWebVideos();
        showNotificationMessage('Ã°Å¸â€”â€˜Ã¯Â¸Â Video eliminado');
    }
}

function toggleVideo(id) {
    const video = videos.find(v => v.id === id);
    if (video) {
        video.active = !video.active;
        localStorage.setItem('videos', JSON.stringify(videos));
        renderVideos();
        updateWebVideos();
        showNotificationMessage(video.active ? 'Ã¢Å“â€¦ Video activado' : 'Ã¢ÂÂ¸Ã¯Â¸Â Video pausado');
    }
}

function renderVideos() {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;
    grid.innerHTML = videos.map(video => `
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <div class="ratio ratio-16x9 mb-3">
                        <iframe src="https://www.youtube.com/embed/${video.videoId}" 
                                title="${video.title}" 
                                allowfullscreen></iframe>
                    </div>
                    <h5 class="card-title">${video.title}</h5>
                    ${video.description ? `<p class="card-text">${video.description}</p>` : ''}
                    <div class="mt-auto">
                        <button class="btn btn-sm ${video.active ? 'btn-warning' : 'btn-success'}" onclick="toggleVideo(${video.id})">
                            ${video.active ? 'Ã¢ÂÂ¸Ã¯Â¸Â Pausar' : 'Ã¢â€“Â¶Ã¯Â¸Â Activar'}
                        </button>
                        <button class="btn btn-sm btn-danger ms-1" onclick="deleteVideo(${video.id})">
                            Ã°Å¸â€”â€˜Ã¯Â¸Â Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==================== FUNCIONES DE ESTADO DELIVERY ==================== */

function setDeliveryStatus(status) {
    deliveryStatus = status;
    localStorage.setItem('deliveryStatus', JSON.stringify(deliveryStatus));
    updateDeliveryStatusUI();
    updateWebDeliveryStatus();
    showNotificationMessage(status ? 'Ã°Å¸Å¡Å¡ Delivery activado' : 'Ã°Å¸ÂÂª Solo ventas presenciales activado');
}

function updateDeliveryStatusUI() {
    const statusDot = document.getElementById('deliveryStatusDot');
    const statusText = document.getElementById('deliveryStatusText');
    const currentStatus = document.getElementById('deliveryCurrentStatus');
    const activateBtn = document.getElementById('activateDeliveryBtn');
    const deactivateBtn = document.getElementById('deactivateDeliveryBtn');
    
    if (deliveryStatus) {
        statusDot.className = 'status-dot active';
        statusText.textContent = 'Delivery Activo';
        currentStatus.textContent = 'El servicio de delivery estÃƒÂ¡ funcionando normalmente.';
        activateBtn.style.display = 'none';
        deactivateBtn.style.display = 'inline-block';
    } else {
        statusDot.className = 'status-dot inactive';
        statusText.textContent = 'Solo Ventas Presenciales';
        currentStatus.textContent = 'El delivery estÃƒÂ¡ fuera de servicio. Solo se aceptan ventas presenciales.';
        activateBtn.style.display = 'inline-block';
        deactivateBtn.style.display = 'none';
    }
}

function updateWebDeliveryStatus() {
    // Esta funciÃƒÂ³n se ejecutarÃƒÂ¡ en la pÃƒÂ¡gina principal para actualizar el estado
    if (typeof updateDeliveryDisplay === 'function') {
        updateDeliveryDisplay(deliveryStatus);
    }
}


/* ==================== FUNCIONES DE CONTROL DE PEDIDOS ==================== */

function getPedidosStats() {
    const hoy = new Date().toDateString();
    const estaSemana = new Date();
    estaSemana.setDate(estaSemana.getDate() - 7);
    
    const stats = {
        totalPedidos: pedidosHistorial.length,
        pedidosHoy: pedidosHistorial.filter(p => new Date(p.fecha).toDateString() === hoy).length,
        pedidosSemana: pedidosHistorial.filter(p => new Date(p.fecha) >= estaSemana).length,
        pedidosDelivery: pedidosHistorial.filter(p => p.tipo === 'delivery').length,
        pedidosPresenciales: pedidosHistorial.filter(p => p.tipo === 'presencial').length,
        totalIngresos: pedidosHistorial.reduce((sum, p) => sum + p.costos.total, 0),
        ingresosHoy: pedidosHistorial
            .filter(p => new Date(p.fecha).toDateString() === hoy)
            .reduce((sum, p) => sum + p.costos.total, 0),
        ingresosDelivery: pedidosHistorial
            .filter(p => p.tipo === 'delivery')
            .reduce((sum, p) => sum + p.costos.delivery, 0)
    };
    
    return stats;
}

function renderPedidosDashboard() {
    const stats = getPedidosStats();
    
    // Actualizar estadÃƒÂ­sticas en el dashboard
    document.getElementById('totalPedidos').textContent = stats.totalPedidos;
    document.getElementById('pedidosHoy').textContent = stats.pedidosHoy;
    document.getElementById('pedidosSemana').textContent = stats.pedidosSemana;
    document.getElementById('pedidosDelivery').textContent = stats.pedidosDelivery;
    document.getElementById('pedidosPresenciales').textContent = stats.pedidosPresenciales;
    document.getElementById('totalIngresos').textContent = `$${stats.totalIngresos.toLocaleString('es-CL')}`;
    document.getElementById('ingresosHoy').textContent = `$${stats.ingresosHoy.toLocaleString('es-CL')}`;
    document.getElementById('ingresosDelivery').textContent = `$${stats.ingresosDelivery.toLocaleString('es-CL')}`;
}

function renderPedidosHistorial(filtroTipo = 'todos', filtroFecha = '') {
    let pedidosFiltrados = pedidosHistorial;
    
    // Aplicar filtros
    if (filtroTipo !== 'todos') {
        pedidosFiltrados = pedidosFiltrados.filter(p => p.tipo === filtroTipo);
    }
    
    if (filtroFecha) {
        const fechaFiltro = new Date(filtroFecha).toDateString();
        pedidosFiltrados = pedidosFiltrados.filter(p => new Date(p.fecha).toDateString() === fechaFiltro);
    }
    
    // Ordenar por fecha descendente
    pedidosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    const tbody = document.getElementById('pedidosTableBody');
    tbody.innerHTML = pedidosFiltrados.map(pedido => {
        const fecha = new Date(pedido.fecha).toLocaleDateString('es-CL');
        const hora = new Date(pedido.fecha).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <tr>
                <td>${pedido.id}</td>
                <td>${fecha} ${hora}</td>
                <td>${pedido.cliente.nombre}</td>
                <td>${pedido.tipo === 'delivery' ? 'Ã°Å¸Å¡Å¡ Delivery' : 'Ã°Å¸ÂÂª Presencial'}</td>
                <td>${pedido.cliente.comuna} - ${pedido.cliente.sector}</td>
                <td>${pedido.productos.length} productos</td>
                <td>$${pedido.costos.delivery.toLocaleString('es-CL')}</td>
                <td><strong>$${pedido.costos.total.toLocaleString('es-CL')}</strong></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="verDetallePedido(${pedido.id})">
                        Ã°Å¸â€˜ÂÃ¯Â¸Â Ver
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function verDetallePedido(pedidoId) {
    const pedido = pedidosHistorial.find(p => p.id === pedidoId);
    if (!pedido) return;
    
    const fecha = new Date(pedido.fecha).toLocaleDateString('es-CL');
    const hora = new Date(pedido.fecha).toLocaleTimeString('es-CL');
    
    let detalleHTML = `
        <div class="order-modal-overlay" id="pedidoDetailModal">
            <div class="order-modal order-modal--large">
                <div class="order-modal-header">
                    <h3>Ã°Å¸â€œâ€¹ Detalle del Pedido #${pedido.id}</h3>
                    <button class="modal-close" onclick="closePedidoDetail()">Ã¢Å“â€¢</button>
                </div>
                <div class="order-modal-content">
                    <div class="pedido-info-grid">
                        <div class="info-section">
                            <h4>Ã°Å¸â€œâ€¦ InformaciÃƒÂ³n General</h4>
                            <p><strong>Fecha:</strong> ${fecha} ${hora}</p>
                            <p><strong>Tipo:</strong> ${pedido.tipo === 'delivery' ? 'Ã°Å¸Å¡Å¡ Delivery' : 'Ã°Å¸ÂÂª Presencial'}</p>
                            <p><strong>Estado:</strong> Ã¢Å“â€¦ Completado</p>
                        </div>
                        
                        <div class="info-section">
                            <h4>Ã°Å¸â€˜Â¤ Datos del Cliente</h4>
                            <p><strong>Nombre:</strong> ${pedido.cliente.nombre}</p>
                            <p><strong>TelÃƒÂ©fono:</strong> ${pedido.cliente.telefono}</p>
                            <p><strong>UbicaciÃƒÂ³n:</strong> ${pedido.cliente.comuna} - ${pedido.cliente.sector}</p>
                            <p><strong>DirecciÃƒÂ³n:</strong> ${pedido.cliente.direccion}</p>
                            ${pedido.cliente.coordenadas ? `<p><strong>Coordenadas:</strong> ${pedido.cliente.coordenadas}</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h4>Ã°Å¸â€ºâ€™ Productos</h4>
                        <div class="productos-lista">
                            ${pedido.productos.map(prod => `
                                <div class="producto-item">
                                    <span class="producto-nombre">${prod.nombre}</span>
                                    <span class="producto-cantidad">x${prod.cantidad}</span>
                                    <span class="producto-precio">$${(prod.precioUnitario * prod.cantidad).toLocaleString('es-CL')}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h4>Ã°Å¸â€™Â° Resumen de Costos</h4>
                        <div class="costos-resumen">
                            <div class="costo-item">
                                <span>Subtotal productos:</span>
                                <span>$${pedido.costos.subtotal.toLocaleString('es-CL')}</span>
                            </div>
                            <div class="costo-item">
                                <span>Costo de delivery:</span>
                                <span>$${pedido.costos.delivery.toLocaleString('es-CL')}</span>
                            </div>
                            <div class="costo-item total">
                                <span><strong>TOTAL:</strong></span>
                                <span><strong>$${pedido.costos.total.toLocaleString('es-CL')}</strong></span>
                            </div>
                        </div>
                    </div>
                    
                    ${pedido.comentarios ? `
                        <div class="info-section">
                            <h4>Ã°Å¸â€™Â¬ Comentarios</h4>
                            <p>${pedido.comentarios}</p>
                        </div>
                    ` : ''}
                    
                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closePedidoDetail()">Cerrar</button>
                        <button type="button" class="btn btn-success" onclick="reenviarPedidoWhatsApp(${pedido.id})">
                            Ã°Å¸â€œÂ² Reenviar por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', detalleHTML);
}

function closePedidoDetail() {
    const modal = document.getElementById('pedidoDetailModal');
    if (modal) modal.remove();
}

function reenviarPedidoWhatsApp(pedidoId) {
    const pedido = pedidosHistorial.find(p => p.id === pedidoId);
    if (!pedido) return;
    
    let message = `Ã°Å¸ÂÂº *REENVÃƒÂO PEDIDO Boti Dival #${pedido.id}*\n\n`;
    message += `Ã°Å¸â€˜Â¤ *Cliente:* ${pedido.cliente.nombre}\n`;
    message += `Ã°Å¸â€œÅ¾ *TelÃƒÂ©fono:* ${pedido.cliente.telefono}\n`;
    message += `Ã°Å¸â€œÂ *UbicaciÃƒÂ³n:* ${pedido.cliente.comuna} - ${pedido.cliente.sector}\n`;
    message += `Ã°Å¸ÂÂ  *DirecciÃƒÂ³n:* ${pedido.cliente.direccion}\n`;
    if (pedido.cliente.coordenadas) message += `Ã°Å¸â€œÅ’ *Coordenadas:* ${pedido.cliente.coordenadas}\n`;
    if (pedido.comentarios) message += `Ã°Å¸â€™Â¬ *Comentarios:* ${pedido.comentarios}\n\n`;
    
    message += `Ã°Å¸â€ºâ€™ *PRODUCTOS:*\n`;
    pedido.productos.forEach(item => {
        message += `Ã¢â‚¬Â¢ ${item.nombre} x${item.cantidad} - $${(item.precioUnitario * item.cantidad).toLocaleString('es-CL')}\n`;
    });
    
    message += `\nÃ°Å¸â€™Â° *SUBTOTAL:* $${pedido.costos.subtotal.toLocaleString('es-CL')}\n`;
    message += `Ã°Å¸Å¡Å¡ *DELIVERY:* $${pedido.costos.delivery.toLocaleString('es-CL')}\n`;
    message += `Ã°Å¸â€™Âµ *TOTAL:* $${pedido.costos.total.toLocaleString('es-CL')}\n\n`;
    
    message += `Ã°Å¸â€â€ž *Pedido reenviado para confirmaciÃƒÂ³n*`;
    
    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function filtrarPedidos() {
    const tipoFiltro = document.getElementById('filtroTipo').value;
    const fechaFiltro = document.getElementById('filtroFecha').value;
    renderPedidosHistorial(tipoFiltro, fechaFiltro);
}

function limpiarFiltros() {
    document.getElementById('filtroTipo').value = 'todos';
    document.getElementById('filtroFecha').value = '';
    renderPedidosHistorial();
}

function updateWebPromociones() {
    const section = document.getElementById('promo-section');
    const exclusiveTrack = document.getElementById('promoExclusiveTrack');
    if (!section || !exclusiveTrack) return;

    // Filter active and not expired
    const today = new Date().setHours(0,0,0,0);
    const activePromos = promociones.filter(p => {
        if (!p.active) return false;
        if (p.endDate) {
            const end = new Date(p.endDate).setHours(23,59,59,999);
            if (today > end) return false;
        }
        return true;
    });

    if (activePromos.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    exclusiveTrack.innerHTML = activePromos.map((promo) => `
        <div class="promo-card">
            <div class="promo-image">
                <img src="${promo.image}" alt="${promo.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Promo';">
                <div class="promo-badge">OFERTA</div>
            </div>
            <div class="promo-content">
                <h3>${promo.title}</h3>
                <p class="promo-description">${promo.description}</p>
                <div class="promo-pricing">
                    ${promo.previousPrice ? `<span class="original-price">$${Number(promo.previousPrice).toLocaleString('es-CL')}</span>` : ''}
                    <span class="current-price">$${Number(promo.price).toLocaleString('es-CL')}</span>
                </div>
                <button class="btn btn-primary w-100 mt-3" onclick="addPromoToCart(${promo.id})">
                    <i class="fas fa-cart-plus me-2"></i>Aprovechar Oferta
                </button>
            </div>
        </div>
    `).join('');
}

function updateWebInstagram() {
    const section = document.getElementById('instagramVideosSection');
    const grid = document.getElementById('instagramVideosGrid');
    if (!section || !grid) return;

    const activeVideos = instagramVideos.filter(v => v.active);

    if (activeVideos.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    grid.innerHTML = activeVideos.map(v => `
        <div class="col-lg-4 col-md-6">
            <div class="instagram-video-card h-100">
                <div class="ratio-reels">
                    <iframe 
                        src="https://www.instagram.com/p/${v.videoCode}/embed" 
                        frameborder="0" 
                        scrolling="no" 
                        allowtransparency="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                </div>
                <div class="card-info text-center">
                    <h5 class="fw-bold">${v.name}</h5>
                    <a href="${v.url}" target="_blank" class="btn-ig">
                        <i class="fab fa-instagram"></i> Ver en Instagram
                    </a>
                </div>

            </div>
        </div>
    `).join('');
}

function updateDynamicMarketing() {
    const banner = document.getElementById('deliveryStatusBanner');
    if (!banner) return;

    // Si el delivery estÃƒÂ¡ activo, mostramos un mensaje positivo basado en deliveryTrips
    if (deliveryStatus) {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        
        const weekTrips = deliveryTrips.filter(t => new Date(t.fecha) >= weekStart);
        const totalEntregas = weekTrips.reduce((sum, t) => sum + t.pedidos, 0);

        if (totalEntregas > 5) {
            banner.style.display = 'block';
            banner.className = 'delivery-status-banner success';
            banner.innerHTML = `<i class="fas fa-shipping-fast me-2"></i> Ã‚Â¡Ya llevamos <strong>${totalEntregas}</strong> entregas exitosas esta semana! ConfÃƒÂ­a en nosotros.`;
        } else {
            banner.style.display = 'none';
        }
    } else {
        // Si estÃƒÂ¡ desactivado, mostramos el mensaje de fuera de servicio
        banner.style.display = 'block';
        banner.className = 'delivery-status-banner warning';
        banner.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i> Servicio de Delivery Fuera de Servicio - Solo Ventas Presenciales`;
    }
}

function updateWebCarousel() {
    const section = document.getElementById('imagesCarouselSection');
    const track = document.getElementById('imagesCarouselTrack');
    if (!section || !track) return;

    const activeImages = carouselImages.filter((img) => img.active !== false);

    if (activeImages.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    track.innerHTML = activeImages.map((img) => `
        <div class="promo-card">
            <div class="promo-image">
                <img src="${img.image}" alt="${img.title || 'Imagen promocional'}">
            </div>
            <div class="promo-content">
                <h3>${img.title || 'Imagen promocional'}</h3>
            </div>
        </div>
    `).join('');
}

function updateDeliveryDisplay(status) {
    const statusBar = document.getElementById('statusBar');
    if (!statusBar) return;

    const statusDot = statusBar.querySelector('.status-dot');
    const statusText = statusBar.querySelector('.status-text');
    
    deliveryStatus = status;

    if (!status) {
        // Actualizar barra de estado
        if(statusDot) {
            statusDot.classList.remove('active');
            statusDot.classList.add('inactive');
        }
        if(statusText) statusText.textContent = 'Ã¢ÂÂ° Delivery No Disponible';
        
        // Ocultar features de delivery en el status bar
        const features = statusBar.querySelectorAll('.feature-badge');
        features.forEach(feature => {
            if (feature.textContent.includes('Delivery') || feature.textContent.includes('Minutos')) {
                feature.style.display = 'none';
            }
        });
    } else {
        statusText.textContent = 'Ã¢ÂÂ° Delivery Disponible';
        
        // Mostrar features de delivery
        const features = statusBar.querySelectorAll('.feature-badge');
        features.forEach(feature => {
            feature.style.display = 'inline-block';
        });
    }
}

/* ==================== INICIALIZACIÃƒâ€œN DE CONTENIDO DINÃƒÂMICO ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Cargar promociones activas
    updateWebPromociones();
    
    // Cargar videos activos
    updateWebVideos();
    
    // Cargar estado del delivery
    updateDeliveryDisplay(deliveryStatus);
});

window.addEventListener('storage', (event) => {
    if (event.key === 'promociones') {
        promociones = JSON.parse(localStorage.getItem('promociones')) || [];
        updateWebPromociones();
    }
    if (event.key === 'carouselImages') {
        carouselImages = JSON.parse(localStorage.getItem('carouselImages')) || [];
        updateWebVideos();
    }
    if (event.key === 'deliveryStatus') {
        deliveryStatus = JSON.parse(localStorage.getItem('deliveryStatus'));
        updateDeliveryDisplay(deliveryStatus !== null ? deliveryStatus : true);
    }
});



function generateWhatsAppMessage(name, address, phone, comments) {
    const timestamp = new Date().toLocaleString('es-CL');
    const itemsList = cart.map(item => 
        `Ã¢â‚¬Â¢ ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CL')}`
    ).join('\n');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let message = `Ã°Å¸â€ºâ€™ *NUEVO PEDIDO BOTI DIVAL* Ã°Å¸â€ºâ€™\n\n`;
    message += `Ã°Å¸â€œÅ’ *InformaciÃƒÂ³n del Cliente*\n`;
    message += `Ã°Å¸â€˜Â¤ Nombre: ${name}\n`;
    message += `Ã°Å¸â€œÅ¾ TelÃƒÂ©fono: ${phone}\n`;
    message += `Ã°Å¸â€œÂ DirecciÃƒÂ³n: ${address}\n`;
    message += `Ã¢ÂÂ° Fecha/Hora: ${timestamp}\n\n`;
    message += `Ã°Å¸â€œÂ¦ *Productos Pedidos (${totalItems} items)*\n`;
    message += itemsList + '\n\n';
    message += `Ã°Å¸â€™Â° *Subtotal: $${subtotal.toLocaleString('es-CL')}*\n`;
    message += `Ã°Å¸Å¡Å¡ EnvÃƒÂ­o: A cotizar segÃƒÂºn distancia\n\n`;
    
    if (comments) {
        message += `Ã°Å¸â€œÂ *Comentarios*\n${comments}\n\n`;
    }
    
    message += `Ã¢Å“â€¦ *Por favor confirma disponibilidad y costo de envÃƒÂ­o*\n`;
    message += `Ã‚Â¡Gracias por tu pedido! Ã°Å¸ËœÅ `;

    return message;
}

/* ==================== CONTACTO Y CONSULTAS ==================== */

function contactShipping() {
    // Remover modal anterior si existe
    var oldModal = document.getElementById('shippingModal');
    if (oldModal) oldModal.remove();

    // Datos de zonas de envÃƒÂ­o
    var zones = [
        { comuna: "DoÃƒÂ±ihue", sector: "DoÃƒÂ±ihue Centro", price: 6600 },
        { comuna: "Coltauco", sector: "QuimÃƒÂ¡vida", price: 6000 },
        { comuna: "DoÃƒÂ±ihue", sector: "Cerrillos", price: 6000 },
        { comuna: "Coltauco", sector: "Lo de Cuevas", price: 5800 },
        { comuna: "Coltauco", sector: "Hijuela del Medio", price: 5800 },
        { comuna: "Coltauco", sector: "Rinconada de Parral", price: 4700 },
        { comuna: "Coltauco", sector: "Cuesta de Idahue", price: 4600 },
        { comuna: "Coltauco", sector: "El Molino", price: 4300 },
        { comuna: "Coltauco", sector: "Montegrande", price: 4200 },
        { comuna: "Coltauco", sector: "El Loreto", price: 4000 },
        { comuna: "Coltauco", sector: "Pampa de Idahue", price: 3900 },
        { comuna: "Coltauco", sector: "Puren", price: 3700 },
        { comuna: "Coltauco", sector: "Idahue", price: 3500 },
        { comuna: "Coltauco", sector: "El Parral", price: 3000 },
        { comuna: "Coltauco", sector: "Almendro", price: 2700 },
        { comuna: "Coltauco", sector: "Lo Droguett", price: 2600 },
        { comuna: "Coltauco", sector: "Idahuillo", price: 2500 },
        { comuna: "Coltauco", sector: "San Luis", price: 2400 },
        { comuna: "Coltauco", sector: "Lo Ulloa", price: 2400 },
        { comuna: "Coltauco", sector: "Coltauco Centro", price: 2200 }
    ];

    var prices = zones.map(function(z) { return z.price; });
    var maxP = Math.max.apply(null, prices);
    var minP = Math.min.apply(null, prices);
    var avgP = Math.round(zones.reduce(function(s,z){ return s + z.price; }, 0) / zones.length);
    var coltN = zones.filter(function(z){ return z.comuna === "Coltauco"; }).length;
    var donN = zones.filter(function(z){ return z.comuna === "DoÃƒÂ±ihue"; }).length;

    function distLevel(price) {
        var r = (price - minP) / (maxP - minP);
        if (r > 0.7) return { label: "Distancia Alta", color: "#ef4444", ring: "rgba(239,68,68,0.15)", dot: "Ã°Å¸â€Â´" };
        if (r > 0.35) return { label: "Distancia Media", color: "#f59e0b", ring: "rgba(245,158,11,0.15)", dot: "Ã°Å¸Å¸Â¡" };
        return { label: "Cercano", color: "#10b981", ring: "rgba(16,185,129,0.15)", dot: "Ã°Å¸Å¸Â¢" };
    }

    function fmt(n) { return "$" + n.toLocaleString("es-CL"); }

    function buildCards(filter, search, sortMode) {
        var list = zones.slice();
        if (filter && filter !== "all") list = list.filter(function(z){ return z.comuna === filter; });
        if (search) {
            var q = search.toLowerCase();
            list = list.filter(function(z){ return z.sector.toLowerCase().indexOf(q) >= 0 || z.comuna.toLowerCase().indexOf(q) >= 0; });
        }
        if (sortMode === "price-asc") list.sort(function(a,b){ return a.price - b.price; });
        else if (sortMode === "name") list.sort(function(a,b){ return a.sector.localeCompare(b.sector); });
        else list.sort(function(a,b){ return b.price - a.price; });

        if (list.length === 0) {
            return '<div class="shp-empty"><div class="shp-empty-ring"></div><span class="shp-empty-icon">Ã°Å¸â€œÂ</span><h4>Sin resultados</h4><p>No encontramos sectores con ese criterio</p></div>';
        }

        var html = "";
        for (var i = 0; i < list.length; i++) {
            var z = list[i];
            var d = distLevel(z.price);
            var pct = Math.max(((z.price - minP) / (maxP - minP)) * 100, 12);
            var cls = z.comuna === "DoÃƒÂ±ihue" ? "shp-donihue" : "shp-coltauco";
            var waText = encodeURIComponent("Hola Boti Dival, quiero consultar el delivery a " + z.sector + ", " + z.comuna);
            html += '<div class="shp-card" style="--delay:' + (i * 0.05) + 's" onclick="this.classList.toggle(\'expanded\')">' +
                '<div class="shp-card-left"><div class="shp-distance-ring" style="--ring-color:' + d.ring + '"><div class="shp-distance-dot" style="background:' + d.color + '"></div></div></div>' +
                '<div class="shp-card-body">' +
                    '<div class="shp-card-top">' +
                        '<div class="shp-card-meta"><span class="shp-badge-comuna ' + cls + '">' + z.comuna + '</span><span class="shp-badge-dist" style="color:' + d.color + '">' + d.dot + ' ' + d.label + '</span></div>' +
                        '<div class="shp-card-price">' + fmt(z.price) + '</div>' +
                    '</div>' +
                    '<h4 class="shp-card-sector">' + z.sector + '</h4>' +
                    '<div class="shp-bar-track"><div class="shp-bar-fill" style="--bar-width:' + pct + '%;--bar-color:' + d.color + '"></div></div>' +
                    '<div class="shp-card-expand">' +
                        '<p>Ã°Å¸â€œÅ’ RegiÃƒÂ³n: Libertador Gral. Bernardo O\'Higgins</p>' +
                        '<a href="https://wa.me/56985062378?text=' + waText + '" target="_blank" class="shp-card-wa">Ã°Å¸â€™Â¬ Consultar este sector</a>' +
                    '</div>' +
                '</div></div>';
        }
        return html;
    }

    var waFooter = encodeURIComponent("Hola Boti Dival, me gustarÃƒÂ­a consultar sobre el costo de envÃƒÂ­o a mi zona.");

    var m = '<div class="shp-overlay" id="shippingModal">' +
        '<div class="shp-modal">' +
            '<div class="shp-header"><div class="shp-header-bg"></div>' +
                '<div class="shp-header-content">' +
                    '<div class="shp-header-left">' +
                        '<div class="shp-header-icon-wrap"><span class="shp-header-icon">Ã°Å¸Å¡Å¡</span><span class="shp-header-pulse"></span></div>' +
                        '<div><h2 class="shp-title">Tarifas de Delivery</h2><p class="shp-subtitle">RegiÃƒÂ³n de O\'Higgins Ã‚Â· Precios actualizados</p></div>' +
                    '</div>' +
                    '<button class="shp-close" onclick="closeShippingModal()" aria-label="Cerrar"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 1l16 16M17 1L1 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>' +
                '</div>' +
            '</div>' +
            '<div class="shp-stats">' +
                '<div class="shp-stat-card"><span class="shp-stat-icon">Ã°Å¸â€œÂ</span><div class="shp-stat-data"><span class="shp-stat-value">' + zones.length + '</span><span class="shp-stat-label">Zonas</span></div></div>' +
                '<div class="shp-stat-card"><span class="shp-stat-icon">Ã°Å¸â€™Å¡</span><div class="shp-stat-data"><span class="shp-stat-value">' + fmt(minP) + '</span><span class="shp-stat-label">Desde</span></div></div>' +
                '<div class="shp-stat-card"><span class="shp-stat-icon">Ã°Å¸â€œÅ </span><div class="shp-stat-data"><span class="shp-stat-value">' + fmt(avgP) + '</span><span class="shp-stat-label">Promedio</span></div></div>' +
                '<div class="shp-stat-card"><span class="shp-stat-icon">Ã°Å¸â€œÅ’</span><div class="shp-stat-data"><span class="shp-stat-value">' + fmt(maxP) + '</span><span class="shp-stat-label">MÃƒÂ¡ximo</span></div></div>' +
            '</div>' +
            '<div class="shp-controls">' +
                '<div class="shp-search-wrap">' +
                    '<svg class="shp-search-svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#94a3b8" stroke-width="2"/><path d="M20 20l-4-4" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/></svg>' +
                    '<input type="text" id="shippingSearchInput" class="shp-search" placeholder="Buscar sector o comuna..." oninput="filterShippingZones()">' +
                '</div>' +
                '<div class="shp-controls-row">' +
                    '<div class="shp-filters">' +
                        '<button class="shp-filter active" onclick="setShippingFilter(this,\'all\')">Todos <span class="shp-filter-count">' + zones.length + '</span></button>' +
                        '<button class="shp-filter" onclick="setShippingFilter(this,\'Coltauco\')">Ã°Å¸ÂËœÃ¯Â¸Â Coltauco <span class="shp-filter-count">' + coltN + '</span></button>' +
                        '<button class="shp-filter" onclick="setShippingFilter(this,\'DoÃƒÂ±ihue\')">Ã°Å¸ÂÂ¡ DoÃƒÂ±ihue <span class="shp-filter-count">' + donN + '</span></button>' +
                    '</div>' +
                    '<div class="shp-sort">' +
                        '<button class="shp-sort-btn active" onclick="setShippingSort(this,\'price-desc\')" title="Mayor precio">Ã¢â€ â€œ$</button>' +
                        '<button class="shp-sort-btn" onclick="setShippingSort(this,\'price-asc\')" title="Menor precio">Ã¢â€ â€˜$</button>' +
                        '<button class="shp-sort-btn" onclick="setShippingSort(this,\'name\')" title="A-Z">A-Z</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="shp-list" id="shippingZonesList">' + buildCards("all", "", "price-desc") + '</div>' +
            '<div class="shp-footer">' +
                '<div class="shp-footer-info"><span class="shp-footer-dot"></span><p>Los precios son referenciales y pueden variar segÃƒÂºn condiciones del pedido</p></div>' +
                '<div class="shp-footer-actions">' +
                    '<button class="shp-btn-ghost" onclick="closeShippingModal()">Cerrar</button>' +
                    '<a href="https://wa.me/56985062378?text=' + waFooter + '" target="_blank" class="shp-btn-wa">' +
                        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
                        ' Consultar por WhatsApp</a>' +
                '</div>' +
            '</div>' +
        '</div></div>';

    document.body.insertAdjacentHTML('beforeend', m);
    requestAnimationFrame(function() {
        var el = document.getElementById('shippingModal');
        if (el) el.classList.add('active');
    });

    window._shp = { buildCards: buildCards, filter: "all", sort: "price-desc" };
}

function setShippingFilter(btn, filter) {
    window._shp.filter = filter;
    document.querySelectorAll('.shp-filter').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    filterShippingZones();
}

function setShippingSort(btn, sort) {
    window._shp.sort = sort;
    document.querySelectorAll('.shp-sort-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    filterShippingZones();
}

function filterShippingZones() {
    var inp = document.getElementById('shippingSearchInput');
    var search = inp ? inp.value : "";
    var list = document.getElementById('shippingZonesList');
    if (list && window._shp) {
        list.innerHTML = window._shp.buildCards(window._shp.filter, search, window._shp.sort);
    }
}

function closeShippingModal() {
    var modal = document.getElementById('shippingModal');
    if (modal) {
        modal.classList.remove('active');
        modal.classList.add('closing');
        setTimeout(function(){ modal.remove(); }, 400);
    }
}

function contactShippingWhatsApp() {
    var message = "Hola Boti Dival, me gustarÃƒÂ­a consultar sobre el costo de envÃƒÂ­o a mi zona. Mi direcciÃƒÂ³n es: [Mi direcciÃƒÂ³n]";
    window.open("https://wa.me/56985062378?text=" + encodeURIComponent(message), "_blank");
}

/* ==================== UTILIDADES ==================== */

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showNotificationMessage(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/* ==================== EFECTO PARALLAX Y SCROLL ==================== */

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-animation');
    if (parallax) {
        parallax.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.5}px))`;
    }
});

/* ==================== ANIMACIONES DE SCROLL ==================== */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Agregar clases de animaciÃƒÂ³n a elementos
    document.querySelectorAll('.promo-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
            card.classList.add('animate-slide-left');
        } else {
            card.classList.add('animate-slide-right');
        }
        observer.observe(card);
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('animate-scale');
        observer.observe(card);
    });

    document.querySelectorAll('.location-info, .delivery-info').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/* ==================== MEJORAS DE UX ==================== */

function addTouchFeedback() {
    // Agregar feedback tÃƒÂ¡ctil en mÃƒÂ³viles solo a botones y promociones
    document.querySelectorAll('.btn, .promo-card').forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', () => {
            el.style.transform = '';
        });
    });
}

function enhanceSearch() {
    // Mejorar bÃƒÂºsqueda con debounce
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e);
        }, 300);
    });
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K para focus en bÃƒÂºsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Escape para cerrar carrito
        if (e.key === 'Escape') {
            closeCart();
        }
    });
}


/* ==================== OPTIMIZACIÃƒâ€œN DE RENDIMIENTO ==================== */

function setupLazyLoad() {
    // Aplicar animaciÃƒÂ³n de entrada suave a las tarjetas (sin ocultarlas)
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
        card.classList.add('fade-in-card');
    });
}

/* ==================== DARK MODE (AutomÃƒÂ¡tico segÃƒÂºn hora) ==================== */

function checkDarkMode() {
    const hour = new Date().getHours();
    // Modo nocturno activo desde las 18:00 hasta las 06:00
    if (hour >= 18 || hour < 6) {
        document.body.style.filter = 'brightness(0.98)';
    }
}

checkDarkMode();
setInterval(checkDarkMode, 600000); // Check cada 10 minutos

/* ==================== CONTADOR DE DEMANDA ==================== */

function updateDemandStatus() {
    // SimulaciÃƒÂ³n - en producciÃƒÂ³n esto vendrÃƒÂ­a de un servidor
    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 2) {
        // "Alta demanda" en horarios pico nocturnos
        return true;
    }
    return Math.random() > 0.6;
}

/* ==================== SERVICE WORKER PARA PWA ==================== */

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        // Service worker no disponible, continuar sin ÃƒÂ©l
    });
}

/* ==================== MANEJO DE CONEXIÃƒâ€œN ==================== */

window.addEventListener('online', () => {
    showNotificationMessage('Ã¢Å“â€œ ConexiÃƒÂ³n establecida');
});

window.addEventListener('offline', () => {
    showNotificationMessage('Ã¢Å¡Â Ã¯Â¸Â Sin conexiÃƒÂ³n a internet');
});

/* ==================== PRODUCT DETAIL MODAL ==================== */

let currentModalProductId = null;
let currentModalQty = 1;

function openProductModal(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product || product.active === false) return;

    currentModalProductId = product.id;
    currentModalQty = 1;

    // Populate modal
    document.getElementById('modalProductCategory').textContent = getCategoryLabel(product.category);
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description || 'Sin descripciÃ³n detallada.';
    
    document.getElementById('modalProductPrice').textContent = '$' + product.price.toLocaleString('es-CL');
    if (product.previousPrice) {
        document.getElementById('modalProductPrevPrice').textContent = '$' + product.previousPrice.toLocaleString('es-CL');
        document.getElementById('modalProductPrevPrice').style.display = 'inline';
    } else {
        document.getElementById('modalProductPrevPrice').style.display = 'none';
    }

    const imgEl = document.getElementById('modalProductImage');
    const emojiEl = document.getElementById('modalProductImageEmoji');
    
    // Si la imagen es un emoji (empieza con un emoji) o una URL
    if (product.image && product.image.startsWith('http')) {
        imgEl.src = product.image;
        imgEl.style.display = 'block';
        emojiEl.style.display = 'none';
    } else {
        imgEl.style.display = 'none';
        emojiEl.textContent = product.image || '??';
        emojiEl.style.display = 'block';
    }

    const badge = document.getElementById('modalProductBadge');
    if (product.popular) {
        badge.textContent = '? Popular';
        badge.style.display = 'block';
        badge.style.background = 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)';
    } else {
        badge.style.display = 'none';
    }

    updateModalDisplays();

    // Show modal
    const modal = document.getElementById('productDetailModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProductModal() {
    const modal = document.getElementById('productDetailModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModalQuantity(change) {
    currentModalQty += change;
    if (currentModalQty < 1) currentModalQty = 1;
    updateModalDisplays();
}

function updateModalDisplays() {
    document.getElementById('modalCurrentQty').textContent = currentModalQty;
    const product = PRODUCTS.find(p => p.id === currentModalProductId);
    if (product) {
        const total = product.price * currentModalQty;
        document.getElementById('modalAddTotal').textContent = '$' + total.toLocaleString('es-CL');
    }
}

function confirmModalAdd() {
    if (!currentModalProductId) return;
    
    // Usamos addToCart existente
    addToCart(currentModalProductId, currentModalQty, true);
    
    // Cerrar el modal
    closeProductModal();
    
    // Opcional: mostrar un feedback visual temporal en el botÃ³n
}

// Global click listener for product cards (Event Delegation)
document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card) {
        // Ignorar clics en los botones de acciÃ³n del carrito dentro de la tarjeta
        if (e.target.closest('.product-actions')) return;
        
        const productId = parseInt(card.dataset.id);
        if (!isNaN(productId)) {
            openProductModal(productId);
        }
    }
    
    // Cerrar modal al hacer clic en el overlay oscuro
    if (e.target.classList.contains('product-modal-overlay')) {
        closeProductModal();
    }
});


// Global click listener for product cards (Event Delegation)
document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card) {
        // Ignorar clics en los botones de acción del carrito dentro de la tarjeta
        if (e.target.closest('.product-actions')) return;
        
        const productId = parseInt(card.dataset.id);
        if (!isNaN(productId)) {
            openProductModal(productId);
        }
    }
    
    // Cerrar modal al hacer clic en el overlay oscuro
    if (e.target.classList.contains('product-modal-overlay')) {
        closeProductModal();
    }
});

/* ==================== MOBILE DRAWER LOGIC ==================== */

function openMobileMenu() {
    const btn = document.getElementById('menuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    
    btn.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    document.body.classList.add('drawer-open');
}

function closeMobileMenu() {
    const btn = document.getElementById('menuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    
    btn.classList.remove('open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    document.body.classList.remove('drawer-open');
}

// Wire up hamburger button
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (this.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMobileMenu();
    });
});

// Keep drawer cart count in sync
const _origUpdateCartUI = typeof updateCartUI !== 'undefined' ? updateCartUI : null;
function syncDrawerCart() {
    const cartTotal = cart ? cart.reduce((sum, i) => sum + i.quantity, 0) : 0;
    const drawerBadge = document.getElementById('drawerCartCount');
    if (drawerBadge) {
        drawerBadge.textContent = cartTotal;
        drawerBadge.style.display = cartTotal > 0 ? 'flex' : 'none';
    }
}

// Patch addToCart to also sync drawer
const _origAddToCart = window.addToCart;
if (typeof _origAddToCart === 'function') {
    window.addToCart = function() {
        _origAddToCart.apply(this, arguments);
        syncDrawerCart();
    };
}

document.addEventListener('DOMContentLoaded', syncDrawerCart);

function showToastNotification(title, message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotification';
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-icon">âœ“</div>
            <div class="toast-content">
                <div style="font-weight: 800; font-size: 0.75rem; text-transform: uppercase; opacity: 0.7;">${title}</div>
                <div>${message}</div>
            </div>
        `;
        document.body.appendChild(toast);
    } else {
        toast.querySelector('.toast-content div:last-child').textContent = message;
        toast.querySelector('.toast-content div:first-child').textContent = title;
    }

    toast.classList.add('active');
    
    // Auto-hide after 3s
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}




