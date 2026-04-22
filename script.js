/* ==================== PRODUCTOS ==================== */

const PRODUCTS = [
    // Cervezas
    { id: 1, name: 'Cerveza Artesanal Golden', category: 'cervezas', price: 3500, image: 'https://www.ccu.cl/wp-content/uploads/2022/07/Cervezas_cero_CCU.jpeg', description: '750ml - Dorada y refrescante', popular: true },
    { id: 2, name: 'Cerveza IPA Craft', category: 'cervezas', price: 4200, image: 'https://santaritaonline.com/wp-content/uploads/2025/08/Cervezas.png', description: '750ml - Amarga y aromática' },
    { id: 3, name: 'Cerveza Stout Premium', category: 'cervezas', price: 4800, image: 'https://www.fassbiere.com/wp-content/uploads/Fassbiere-Importacion-de-Cervezas-Pils-Pilsen-Pilsner-Pilsener.jpg', description: '750ml - Oscura y cremosa' },
    { id: 4, name: 'Six Pack Cerveza Lager', category: 'cervezas', price: 18900, image: 'https://unimarc.vtexassets.com/arquivos/ids/255961/000000000000566684-DIS-01.jpg?v=639059117791930000', description: 'Pack 6 botellas de 330ml', popular: true },
    
    // Destilados
    { id: 5, name: 'Pisco Capel Añejo', category: 'destilados', price: 12900, image: 'https://lamarinamx.vtexassets.com/assets/vtex.file-manager-graphql/images/b80536ee-4533-4fba-a4aa-96cd870208db___ea73325bc4032ce4a28a3981c27af7a6.png', description: 'Botella 750ml - Premium', popular: true },
    { id: 6, name: 'Ron Bacardi 37.5%', category: 'destilados', price: 14900, image: 'https://ewine.cl/5472-thickbox_default/pack-12-mix-asegurado.jpg', description: 'Botella 750ml - Clásico' },
    { id: 7, name: 'Whisky Johnny Walker Red', category: 'destilados', price: 17900, image: 'https://ewine.cl/4580-medium_default/pack-12-cabernet-sauvignon-1865-vina-san-pedro.jpg', description: 'Botella 750ml - Suave', popular: true },
    { id: 8, name: 'Vodka Smirnoff Premium', category: 'destilados', price: 13900, image: 'https://ewine.cl/5461-home_default/pack-12-cabernet-sauvignon-mascara-de-fuego-chateau-los-boldos.jpg', description: 'Botella 750ml - Premium' },
    
    // Vinos
    { id: 9, name: 'Vino Tinto Cabernet 2020', category: 'vinos', price: 8900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CzWuF9nqZ1znsIDQxAsdI32leqjgtdlzMQ&s', description: 'Botella 750ml - Tinto robusto' },
    { id: 10, name: 'Vino Blanco Sauvignon', category: 'vinos', price: 9500, image: 'https://unimarc.vtexassets.com/arquivos/ids/203133/000000000000140169-UN-01.jpg?v=637388479600930000', description: 'Botella 750ml - Blanco fresco' },
    { id: 11, name: 'Espumante Champaña', category: 'vinos', price: 15900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrI11WU3OScFAIMunSVjPYuZELuV26laqKuQ&s', description: 'Botella 750ml - Burbujeante', popular: true },
    { id: 12, name: 'Vino Rosado Pinot Grigio', category: 'vinos', price: 7900, image: 'https://santaisabel.vtexassets.com/arquivos/ids/409872/Vino-Santa-Emiliana-Sauvignon-Blanc-700-cc.jpg?v=638562256875500000', description: 'Botella 750ml - Rosado suave' },
    
    // Hielo
    { id: 13, name: 'Hielo Bolsa Grande', category: 'hielo', price: 3500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEpXPeiY2KFYwNXvIhfCv9n7sdVXedmny1GQ&s', description: '2kg - Cubos perfectos' },
    { id: 14, name: 'Hielo Bolsa Premium', category: 'hielo', price: 4900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsiJC_11ip55s9KHy5cuhxGZ5ftqmee7DDg&s', description: '3kg - Cilindros premium' },
    { id: 15, name: 'Hielo Picado 5kg', category: 'hielo', price: 6900, image: 'https://aguasmaquehua.cl/cdn/shop/files/Disenosintitulo_16.png?v=1757090433&width=1445', description: 'Perfecto para tragos' },
    
    // Snacks
    { id: 16, name: 'Mix de Frutos Secos', category: 'snacks', price: 4900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQffHR1NRlcwTbmZNaSsRgF0kQigCJNxlpc1Q&s', description: '200g - Premium variado' },
    { id: 17, name: 'Papas Chips Premium', category: 'snacks', price: 3900, image: 'https://unimarc.vtexassets.com/arquivos/ids/248242/000000000000670480-UN-01.jpg.jpg?v=638808672705570000', description: '150g - Variadas y crujientes' },
    { id: 18, name: 'Tostitos', category: 'snacks', price: 2900, image: 'https://distribuidorasantiago.cl/wp-content/uploads/2025/06/PRODUCTOS-WEB-5-83.png', description: '200g - Salado y delicioso' },
    { id: 19, name: 'Snacks Mix', category: 'snacks', price: 8900, image: 'https://santaisabel.vtexassets.com/arquivos/ids/156208/Snack-Mix-original-320-g.jpg?v=637469292210100000', description: 'Variado premium nocturno', popular: true },
    
    // Bebidas
    { id: 20, name: 'Bebida Energética ', category: 'bebidas', price: 2500, image: 'https://i.bolder.run/r/czo0MDY0LGc6MTAwMHg/f5baa104/1008747-7798422620137.jpg', description: '350ml - Alta energía' },
    { id: 21, name: 'Gaseosa Premium 3L', category: 'bebidas', price: 4900, image: 'https://media.istockphoto.com/id/477567550/es/foto/bebidas-helada.jpg?s=612x612&w=0&k=20&c=utvO5blVI8Ti37mn4vHsxxDo5ZvWlQO1RV6mh5e_Uvs=', description: 'Botella grande refrescante' },
    { id: 22, name: 'Agua Mineral Purísima', category: 'bebidas', price: 1900, image: 'https://i5.walmartimages.cl/asr/aca7d9f7-b12f-4383-b0b0-ecb324541c76.83dc794b5d5658c529254ba6e956e449.jpeg', description: 'Botella 500ml - Pura' },
    { id: 23, name: 'Jugo Natural Naranja 1L', category: 'bebidas', price: 3900, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4G_uhNlGkt2ZFszVfMzLGPC57SoyWuE_foA&s', description: 'Fresco y natural' },
];

// Configuración de delivery
const DELIVERY_ZONES = {
    'doñihue': {
        name: 'Doñihue',
        sectors: {
            'centro': { name: 'Centro', cost: 6600 },
            'cerrillos': { name: 'Cerrillos', cost: 6000 }
        }
    },
    'coltauco': {
        name: 'Coltauco',
        sectors: {
            'quimávida': { name: 'Quimávida', cost: 6000 },
            'lo_de_cuevas': { name: 'Lo de Cuevas', cost: 5800 },
            'hijuela_del_medio': { name: 'Hijuela del Medio', cost: 5800 },
            'rinconada_de_parral': { name: 'Rinconada de Parral', cost: 4700 },
            'cuesta_de_idahue': { name: 'Cuesta de Idahue', cost: 4600 },
            'el_molino': { name: 'El Molino', cost: 4300 },
            'montegrande': { name: 'Montegrande', cost: 4200 },
            'el_loreto': { name: 'El Loreto', cost: 4000 }
        }
    }
};

let cart = [];
let currentFilter = 'all';
let selectedComuna = '';
let selectedSector = '';
let deliveryCost = 0;

// Variables para promociones y videos
let promociones = JSON.parse(localStorage.getItem('promociones')) || [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
        title: 'Happy Hour - 2x1 en Cervezas',
        description: 'Todas las tardes de 18:00 a 20:00, lleva 2 cervezas y paga solo 1. ¡Perfecto para el after office!',
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
];
let videos = JSON.parse(localStorage.getItem('videos')) || [
    {
        id: 1,
        videoId: 'dQw4w9WgXcQ',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Conoce Nuestra Carta Premium',
        description: 'Descubre nuestra selección de bebidas premium y productos exclusivos.',
        active: true,
        createdAt: new Date().toISOString()
    }
];
let deliveryStatus = JSON.parse(localStorage.getItem('deliveryStatus')) !== null ? JSON.parse(localStorage.getItem('deliveryStatus')) : true;

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
                nombre: 'Juan Pérez',
                telefono: '+56912345678',
                comuna: 'Coltauco',
                sector: 'Centro',
                direccion: 'Calle Principal 123',
                coordenadas: '-34.4567, -71.1234'
            },
            productos: [
                { id: 1, nombre: 'Cerveza Artesanal Golden', cantidad: 2, precioUnitario: 3500, subtotal: 7000 },
                { id: 5, nombre: 'Pisco Capel Añejo', cantidad: 1, precioUnitario: 12900, subtotal: 12900 }
            ],
            costos: {
                subtotal: 19900,
                delivery: 0,
                total: 19900
            },
            comentarios: 'Entregar después de las 20:00'
        },
        {
            id: 1002,
            fecha: fechaAyer.toISOString(),
            tipo: 'delivery',
            cliente: {
                nombre: 'María González',
                telefono: '+56987654321',
                comuna: 'Doñihue',
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
                nombre: 'Carlos Rodríguez',
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
            description: 'Todas las tardes de 18:00 a 20:00, lleva 2 cervezas y paga solo 1. ¡Perfecto para el after office!',
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
            description: 'Descubre nuestra selección de bebidas premium y productos exclusivos.',
            active: true,
            createdAt: new Date().toISOString()
        }
    ]));
}

// Recargar variables después de inicialización
promociones = JSON.parse(localStorage.getItem('promociones')) || [];
videos = JSON.parse(localStorage.getItem('videos')) || [];

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

/* ==================== INICIALIZACIÓN ==================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderProducts(PRODUCTS);
    setupEventListeners();
    updateStatus();
    updateCartUI();
    initializeCarousel();
    setInterval(updateStatus, 60000); // Actualizar estado cada minuto
}

/* ==================== EVENT LISTENERS ==================== */

function setupEventListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            const filtered = currentFilter === 'all' 
                ? PRODUCTS 
                : PRODUCTS.filter(p => p.category === currentFilter);
            renderProducts(filtered);
        });
    });

    // Búsqueda
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
    document.querySelector('.cart-link').addEventListener('click', openCart);
    
    // Menu móvil
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Cerrar menu al hacer clic en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('menuToggle').classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
}

/* ==================== RENDERIZADO DE PRODUCTOS ==================== */

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.popular ? '<div class="popular-badge">🔥 Popular</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://via.placeholder.com/400?text=Sin+imagen'; this.onerror=null;">
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryLabel(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toLocaleString('es-CL')}</div>
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
        'destilados': '🥃 Destilados',
        'vinos': '🍷 Vinos',
        'hielo': '🧊 Hielo',
        'snacks': '🍟 Snacks',
        'bebidas': '🥤 Bebidas'
    };
    return labels[category] || category;
}

/* ==================== CARRITO ==================== */

function addToCart(productId, quantity = 1, showNotification = false) {
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

    if (showNotification) {
        showNotificationMessage(`✓ ${product.name} agregado al carrito`);
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
    const miniSummary = document.getElementById('miniSummary');
    const fullSections = document.getElementById('fullSections');
    const cartItems = document.getElementById('cartItems');
    const cartForm = document.getElementById('cartForm');
    const cartSummary = document.getElementById('cartSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const summaryItems = document.getElementById('summaryItems');
    const summaryTotal = document.getElementById('summaryTotal');
    const emptyCart = document.querySelector('.empty-cart');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    summaryItems.textContent = totalItems;
    summaryTotal.textContent = `$${(subtotal + deliveryCost).toLocaleString('es-CL')}`;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.innerHTML = '';
        miniSummary.style.display = 'none';
        fullSections.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        miniSummary.style.display = 'block';

        // Generar vista previa de productos en el resumen compacto
        const cartPreview = document.getElementById('cartPreview');
        cartPreview.innerHTML = cart.slice(0, 4).map(item => `
            <div class="cart-preview-item">
                <span class="cart-preview-name">${item.name}</span>
                <span class="cart-preview-qty">x${item.quantity}</span>
                <span class="cart-preview-price">$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
            </div>
        `).join('');

        if (cart.length > 4) {
            cartPreview.innerHTML += `<div class="cart-preview-item" style="justify-content: center; font-size: 0.8rem; color: var(--text-secondary);">... y ${cart.length - 4} producto(s) más</div>`;
        }

        // Render items only when expanded
        if (fullSections.style.display !== 'none') {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toLocaleString('es-CL')} x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-qty">
                            <button onclick="addToCart(${item.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button onclick="addToCart(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="addToCart(${item.id}, -${item.quantity})">🗑️</button>
                    </div>
                </div>
            `).join('');

            document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
            document.getElementById('totalPrice').textContent = `$${(subtotal + deliveryCost).toLocaleString('es-CL')}`;
            
            cartForm.style.display = 'block';
            cartSummary.style.display = 'block';
            checkoutBtn.style.display = 'block';
        }
    }
}

// New compact cart functions
let cartExpanded = false;

function openCart() {
    if (cart.length === 0) {
        showNotificationMessage('🛒 Tu carrito está vacío. Agrega productos primero.');
        return;
    }
    
    // Abrir panel lateral directamente con flujo de pago
    document.getElementById('cartPanel').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('fullSections').style.display = 'block';
    document.getElementById('miniSummary').style.display = 'none';
    updateStepIndicator(1);
    updateCartUI();
    initializeDeliveryOptions();
}

function closeCart() {
    document.getElementById('cartPanel').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('miniMenu').style.display = 'none';
    cartExpanded = false;
}

function openCartSummaryModal() {
    const modal = document.createElement('div');
    modal.id = 'cartSummaryModal';
    modal.className = 'order-modal-overlay';

    if (cart.length === 0) {
        modal.innerHTML = `
            <div class="order-modal order-modal--small">
                <div class="order-modal-header">
                    <h3>🛒 Carrito vacío</h3>
                    <button class="modal-close" onclick="closeCartSummaryModal()">✕</button>
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
                    <button class="modal-close" onclick="closeCartSummaryModal()">✕</button>
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
    closeCartSummaryModal();
    // Crear modal de pedido profesional
    const modal = document.createElement('div');
    modal.id = 'orderModal';
    modal.className = 'order-modal-overlay';
    modal.innerHTML = `
        <div class="order-modal">
            <div class="order-modal-header">
                <h3>📋 Confirmar Pedido</h3>
                <button class="modal-close" onclick="closeOrderModal()">✕</button>
            </div>

            <div class="order-modal-content">
                <div class="order-summary">
                    <h4>Tu Pedido:</h4>
                    <div class="order-items">
                        ${cart.map(item => `
                            <div class="order-item">
                                <div class="order-item-info">
                                    <span class="order-item-name">${item.name}</span>
                                    <span class="order-item-qty">x${item.quantity}</span>
                                </div>
                                <span class="order-item-price">$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <strong>Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('es-CL')}</strong>
                    </div>
                </div>

                <form class="order-form" onsubmit="submitOrder(event)">
                    <div class="form-section">
                        <h4>📍 Datos de Entrega</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nombre completo *</label>
                                <input type="text" id="modalClientName" placeholder="Tu nombre completo" required>
                            </div>
                            <div class="form-group">
                                <label>Teléfono *</label>
                                <input type="tel" id="modalClientPhone" placeholder="+56 9 XXXX XXXX" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Comuna *</label>
                                <select id="modalClientComuna" onchange="updateSectores()" required>
                                    <option value="">Seleccionar comuna</option>
                                    <option value="doñihue">Doñihue</option>
                                    <option value="coltauco">Coltauco</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Sector *</label>
                                <select id="modalClientSector" disabled required>
                                    <option value="">Seleccionar sector</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Dirección completa *</label>
                            <input type="text" id="modalClientAddress" placeholder="Dirección con referencias" required>
                        </div>
                        <div class="form-group">
                            <label id="deliveryCostLabel">Costo de Delivery: --</label>
                        </div>
                        <div class="form-group">
                            <label>Comentarios</label>
                            <textarea id="modalClientComments" placeholder="Ej: Sin hielo, llamar al llegar..." rows="2"></textarea>
                        </div>
                    </div>

                    <div class="order-notice">
                        <p>💰 <strong>Costo de envío calculado automáticamente</strong> según tu comuna y sector.</p>
                    </div>

                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeOrderModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Enviar Pedido por WhatsApp 📲</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners para cerrar modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeOrderModal();
        }
    });

    document.addEventListener('keydown', handleEscapeKey);

    // Animar entrada
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeOrderModal();
    }
}

function updateSectores() {
    const comunaSelect = document.getElementById('modalClientComuna');
    const sectorSelect = document.getElementById('modalClientSector');
    const comuna = comunaSelect.value;
    
    // Limpiar opciones anteriores
    sectorSelect.innerHTML = '<option value="">Seleccionar sector</option>';
    sectorSelect.disabled = true;
    
    if (comuna && DELIVERY_ZONES[comuna]) {
        const sectores = DELIVERY_ZONES[comuna].sectors;
        Object.keys(sectores).forEach(sectorKey => {
            const option = document.createElement('option');
            option.value = sectorKey;
            option.textContent = sectores[sectorKey].name;
            sectorSelect.appendChild(option);
        });
        sectorSelect.disabled = false;
    }
    
    updateDeliveryCost();
}

function updateDeliveryCost() {
    const comunaSelect = document.getElementById('modalClientComuna');
    const sectorSelect = document.getElementById('modalClientSector');
    const costLabel = document.getElementById('deliveryCostLabel');
    
    const comuna = comunaSelect.value;
    const sector = sectorSelect.value;
    
    if (comuna && sector && DELIVERY_ZONES[comuna] && DELIVERY_ZONES[comuna].sectors[sector]) {
        const cost = DELIVERY_ZONES[comuna].sectors[sector].cost;
        costLabel.textContent = `Costo de Delivery: $${cost.toLocaleString('es-CL')}`;
        costLabel.style.color = '#1e40af';
        costLabel.style.fontWeight = 'bold';
    } else {
        costLabel.textContent = 'Costo de Delivery: --';
        costLabel.style.color = '#6b7280';
        costLabel.style.fontWeight = 'normal';
    }
    
    // Agregar event listener para actualizar costo cuando cambie el sector
    sectorSelect.addEventListener('change', updateDeliveryCost);
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
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('modalClientName').value.trim();
    const phone = document.getElementById('modalClientPhone').value.trim();
    const comuna = document.getElementById('modalClientComuna').value;
    const sector = document.getElementById('modalClientSector').value;
    const address = document.getElementById('modalClientAddress').value.trim();
    const comments = document.getElementById('modalClientComments').value.trim();

    // Validaciones
    if (!name) {
        alert('Por favor ingresa tu nombre completo');
        document.getElementById('modalClientName').focus();
        return;
    }

    if (!phone) {
        alert('Por favor ingresa tu número de teléfono');
        document.getElementById('modalClientPhone').focus();
        return;
    }

    const phoneRegex = /^(\+56\s?9|\+569|9)\s?\d{4}\s?\d{4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Formato de teléfono inválido. Usa +56 9 XXXX XXXX');
        document.getElementById('modalClientPhone').focus();
        return;
    }

    if (!comuna) {
        alert('Por favor selecciona tu comuna');
        document.getElementById('modalClientComuna').focus();
        return;
    }

    if (!sector) {
        alert('Por favor selecciona tu sector');
        document.getElementById('modalClientSector').focus();
        return;
    }

    if (!address) {
        alert('Por favor ingresa tu dirección completa');
        document.getElementById('modalClientAddress').focus();
        return;
    }

    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Calcular costos
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCost = calculateDeliveryCost(comuna, sector);
    const total = subtotal + deliveryCost;

    // Confirmación final
    const confirmMessage = `¿Confirmar pedido?\n\nProductos: ${cart.length}\nSubtotal: $${subtotal.toLocaleString('es-CL')}\nDelivery: $${deliveryCost.toLocaleString('es-CL')}\nTOTAL: $${total.toLocaleString('es-CL')}\n\nDirección: ${DELIVERY_ZONES[comuna].name} - ${DELIVERY_ZONES[comuna].sectors[sector].name}\n\nSe abrirá WhatsApp para enviar el pedido.`;

    if (!confirm(confirmMessage)) {
        return;
    }

    // Crear mensaje para WhatsApp
    let message = `🛒 *NUEVO PEDIDO - Boti Dival*\n\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📞 *Teléfono:* ${phone}\n`;
    message += `📍 *Ubicación:* ${DELIVERY_ZONES[comuna].name} - ${DELIVERY_ZONES[comuna].sectors[sector].name}\n`;
    message += `🏠 *Dirección:* ${address}\n\n`;

    message += `🛍️ *PRODUCTOS:*\n`;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `• ${item.name} x${item.quantity} = $${itemTotal.toLocaleString('es-CL')}\n`;
    });

    message += `\n💰 *RESUMEN DE COSTOS:*\n`;
    message += `• Subtotal productos: $${subtotal.toLocaleString('es-CL')}\n`;
    message += `• Costo de delivery: $${deliveryCost.toLocaleString('es-CL')}\n`;
    message += `• *TOTAL: $${total.toLocaleString('es-CL')}*\n\n`;

    if (comments) {
        message += `📝 *Comentarios:* ${comments}\n\n`;
    }

    message += `========================================\n`;
    message += `✅ Pedido listo para confirmar y procesar.`;

    // Registrar pedido en historial
    const nuevoPedido = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        tipo: 'delivery',
        cliente: {
            nombre: name,
            telefono: phone,
            comuna: DELIVERY_ZONES[comuna].name,
            sector: DELIVERY_ZONES[comuna].sectors[sector].name,
            direccion: address,
            coordenadas: ''
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
        comentarios: comments || ''
    };

    pedidosHistorial.push(nuevoPedido);
    localStorage.setItem('pedidosHistorial', JSON.stringify(pedidosHistorial));

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Limpiar carrito y cerrar modal
    setTimeout(() => {
        cart = [];
        updateCartUI();
        closeOrderModal();
        closeCart();
        alert('✅ ¡Pedido enviado exitosamente!\n\nTe contactaremos pronto por WhatsApp para confirmar los detalles.');
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
    const promo = PROMOS.find(p => p.id === 1000 + promoId);
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
    showNotificationMessage(`✓ ${promo.name} agregado al carrito`);
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
    openCart();
}

/* ==================== HORARIOS Y ESTADO ==================== */

function updateStatus() {
    const statusBar = document.getElementById('statusBar');
    const statusText = document.getElementById('statusText');
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let isOpen = false;
    let closeTime = '';

    // Domingo (0) a Jueves (4): abierto hasta 00:30 (30 minutos del día siguiente)
    // Viernes (5) y Sábado (6): abierto hasta 02:30 (150 minutos del día siguiente)

    if (day >= 0 && day <= 4) {
        // Abierto 24 horas hasta las 00:30 siguiente
        isOpen = true;
        if (currentTime >= 1440 - 30) { // Mínimo 00:30
            closeTime = 'hasta las 00:30';
        } else {
            closeTime = 'hasta las 00:30';
        }
    } else if (day === 5 || day === 6) {
        // Viernes y sábado abierto hasta 02:30
        isOpen = true;
        closeTime = 'hasta las 02:30';
    }

    if (isOpen) {
        statusText.textContent = `⏰ Abierto ${closeTime}`;
        statusText.classList.remove('closed');
    } else {
        statusText.textContent = '❌ Cerrado en estos momentos';
        statusText.classList.add('closed');
    }
}

// Mini menu functions
function showMiniMenu() {
    const menu = document.getElementById('miniMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function quickQuote() {
    showMiniMenu();
    if (cart.length === 0) {
        showNotificationMessage('🛒 Carrito vacío');
        return;
    }
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `Hola Boti Dival! Cotización rápida:\n\n` +
        `${cart.reduce((sum, item) => sum + item.quantity, 0)} items\n` +
        `Subtotal: $${subtotal.toLocaleString('es-CL')}\n\n` +
        `Necesito cotizar envío.`;
    const url = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    showNotificationMessage('💰 Cotización enviada por WhatsApp');
}

function clearCart() {
    if (confirm('¿Vaciar carrito?')) {
        cart = [];
        updateCartUI();
        showNotificationMessage('🗑️ Carrito vaciado');
        showMiniMenu();
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
        return;
    }
    
    selectedComuna = selectedComunaValue;
    const sectors = DELIVERY_ZONES[selectedComuna].sectors;
    
    sectorSelect.innerHTML = '<option value="">Selecciona tu sector</option>';
    Object.keys(sectors).forEach(sector => {
        const option = document.createElement('option');
        option.value = sector;
        option.textContent = `${sectors[sector].name} (+$${sectors[sector].cost})`;
        sectorSelect.appendChild(option);
    });
    
    calculateDelivery();
}

function calculateDelivery() {
    const sectorSelect = document.getElementById('clientSector');
    const selectedSectorValue = sectorSelect.value;
    
    if (!selectedSectorValue || !selectedComuna) {
        deliveryCost = 0;
    } else {
        selectedSector = selectedSectorValue;
        deliveryCost = DELIVERY_ZONES[selectedComuna].sectors[selectedSector].cost;
    }
    
    document.getElementById('deliveryCost').textContent = `$${deliveryCost.toLocaleString('es-CL')}`;
    updateTotalPrice();
}

function updateTotalPrice() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryCost;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
    document.getElementById('totalPrice').textContent = `$${total.toLocaleString('es-CL')}`;
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                document.getElementById('manualLocation').value = `${lat}, ${lng}`;
                showNotificationMessage('📍 Ubicación obtenida correctamente');
            },
            (error) => {
                showNotificationMessage('⚠️ No se pudo obtener tu ubicación. Ingresa manualmente.');
            }
        );
    } else {
        showNotificationMessage('⚠️ Tu navegador no soporta geolocalización.');
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
    if (!clientName) {
        showNotificationMessage('⚠️ Por favor ingresa tu nombre completo');
        document.getElementById('clientName').focus();
        return;
    }

    if (!clientPhone) {
        showNotificationMessage('⚠️ Por favor ingresa tu número de teléfono');
        document.getElementById('clientPhone').focus();
        return;
    }

    if (!clientComuna) {
        showNotificationMessage('⚠️ Por favor selecciona tu comuna');
        document.getElementById('clientComuna').focus();
        return;
    }

    if (!clientSector) {
        showNotificationMessage('⚠️ Por favor selecciona tu sector');
        document.getElementById('clientSector').focus();
        return;
    }

    if (!clientAddress) {
        showNotificationMessage('⚠️ Por favor ingresa tu dirección específica');
        document.getElementById('clientAddress').focus();
        return;
    }

    if (cart.length === 0) {
        showNotificationMessage('🛒 Tu carrito está vacío');
        return;
    }

    // Crear modal de resumen
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryCost;
    
    const comunaName = DELIVERY_ZONES[clientComuna].name;
    const sectorName = DELIVERY_ZONES[clientComuna].sectors[clientSector].name;
    
    let summaryHTML = `
        <div class="order-modal-overlay" id="orderSummaryModal">
            <div class="order-modal">
                <div class="order-modal-header">
                    <h3>📋 Resumen de tu Pedido</h3>
                    <button class="modal-close" onclick="closeOrderSummary()">✕</button>
                </div>
                <div class="order-modal-content">
                    <div class="summary-section">
                        <h4>👤 Datos del Cliente</h4>
                        <p><strong>Nombre:</strong> ${clientName}</p>
                        <p><strong>Teléfono:</strong> ${clientPhone}</p>
                        <p><strong>Ubicación:</strong> ${comunaName} - ${sectorName}</p>
                        <p><strong>Dirección:</strong> ${clientAddress}</p>
                        ${manualLocation ? `<p><strong>Coordenadas:</strong> ${manualLocation}</p>` : ''}
                        ${clientComments ? `<p><strong>Comentarios:</strong> ${clientComments}</p>` : ''}
                    </div>
                    
                    <div class="summary-section">
                        <h4>🛒 Productos</h4>
                        ${cart.map(item => `
                            <div class="summary-item">
                                <span>${item.name} x${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="summary-section">
                        <h4>💰 Total</h4>
                        <div class="summary-item">
                            <span>Subtotal productos:</span>
                            <span>$${subtotal.toLocaleString('es-CL')}</span>
                        </div>
                        <div class="summary-item">
                            <span>Delivery (${comunaName} - ${sectorName}):</span>
                            <span>$${deliveryCost.toLocaleString('es-CL')}</span>
                        </div>
                        <div class="summary-item total">
                            <span><strong>TOTAL:</strong></span>
                            <span><strong>$${total.toLocaleString('es-CL')}</strong></span>
                        </div>
                    </div>
                    
                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeOrderSummary()">← Modificar</button>
                        <button type="button" class="btn btn-success" onclick="sendOrderToWhatsApp()">
                            📲 Confirmar y enviar por WhatsApp
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
    const sectorName = DELIVERY_ZONES[clientComuna].sectors[clientSector].name;
    
    // Registrar pedido en historial
    const nuevoPedido = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        tipo: deliveryCost > 0 ? 'delivery' : 'presencial',
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
    
    let message = `🍺 *PEDIDO Boti Dival*\n\n`;
    message += `👤 *Cliente:* ${clientName}\n`;
    message += `📞 *Teléfono:* ${clientPhone}\n`;
    message += `📍 *Ubicación:* ${comunaName} - ${sectorName}\n`;
    message += `🏠 *Dirección:* ${clientAddress}\n`;
    if (manualLocation) message += `📌 *Coordenadas:* ${manualLocation}\n`;
    if (clientComments) message += `💬 *Comentarios:* ${clientComments}\n\n`;
    
    message += `🛒 *PRODUCTOS:*\n`;
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
    });
    
    message += `\n💰 *SUBTOTAL:* $${subtotal.toLocaleString('es-CL')}\n`;
    message += `🚚 *DELIVERY:* $${deliveryCost.toLocaleString('es-CL')}\n`;
    message += `💵 *TOTAL:* $${total.toLocaleString('es-CL')}\n\n`;
    
    message += `✅ *Pedido listo para confirmar*`;
    
    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Cerrar modal y panel
    closeOrderSummary();
    closeCart();
    
    // Limpiar carrito después del pedido
    clearCart();
    showNotificationMessage('✅ Pedido enviado por WhatsApp y registrado en el historial.');
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
    showNotificationMessage('✅ Promoción creada exitosamente');
}

function deletePromocion(id) {
    if (confirm('¿Estás seguro de eliminar esta promoción?')) {
        promociones = promociones.filter(p => p.id !== id);
        localStorage.setItem('promociones', JSON.stringify(promociones));
        renderPromociones();
        updateWebPromociones();
        showNotificationMessage('🗑️ Promoción eliminada');
    }
}

function togglePromocion(id) {
    const promo = promociones.find(p => p.id === id);
    if (promo) {
        promo.active = !promo.active;
        localStorage.setItem('promociones', JSON.stringify(promociones));
        renderPromociones();
        updateWebPromociones();
        showNotificationMessage(promo.active ? '✅ Promoción activada' : '⏸️ Promoción pausada');
    }
}

function renderPromociones() {
    const grid = document.getElementById('promocionesGrid');
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
                            ${promo.active ? '⏸️ Pausar' : '▶️ Activar'}
                        </button>
                        <button class="btn btn-sm btn-danger ms-1" onclick="deletePromocion(${promo.id})">
                            🗑️ Eliminar
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
        showNotificationMessage('⚠️ URL de YouTube inválida');
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
    showNotificationMessage('✅ Video subido exitosamente');
}

function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
}

function deleteVideo(id) {
    if (confirm('¿Estás seguro de eliminar este video?')) {
        videos = videos.filter(v => v.id !== id);
        localStorage.setItem('videos', JSON.stringify(videos));
        renderVideos();
        updateWebVideos();
        showNotificationMessage('🗑️ Video eliminado');
    }
}

function toggleVideo(id) {
    const video = videos.find(v => v.id === id);
    if (video) {
        video.active = !video.active;
        localStorage.setItem('videos', JSON.stringify(videos));
        renderVideos();
        updateWebVideos();
        showNotificationMessage(video.active ? '✅ Video activado' : '⏸️ Video pausado');
    }
}

function renderVideos() {
    const grid = document.getElementById('videosGrid');
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
                            ${video.active ? '⏸️ Pausar' : '▶️ Activar'}
                        </button>
                        <button class="btn btn-sm btn-danger ms-1" onclick="deleteVideo(${video.id})">
                            🗑️ Eliminar
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
    showNotificationMessage(status ? '🚚 Delivery activado' : '🏪 Solo ventas presenciales activado');
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
        currentStatus.textContent = 'El servicio de delivery está funcionando normalmente.';
        activateBtn.style.display = 'none';
        deactivateBtn.style.display = 'inline-block';
    } else {
        statusDot.className = 'status-dot inactive';
        statusText.textContent = 'Solo Ventas Presenciales';
        currentStatus.textContent = 'El delivery está fuera de servicio. Solo se aceptan ventas presenciales.';
        activateBtn.style.display = 'inline-block';
        deactivateBtn.style.display = 'none';
    }
}

function updateWebDeliveryStatus() {
    // Esta función se ejecutará en la página principal para actualizar el estado
    if (typeof updateDeliveryDisplay === 'function') {
        updateDeliveryDisplay(deliveryStatus);
    }
}

/* ==================== INICIALIZACIÓN ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar promociones
    renderPromociones();
    
    // Inicializar videos
    renderVideos();
    
    // Inicializar estado delivery
    updateDeliveryStatusUI();
    
    // Inicializar control de pedidos (solo en dashboard)
    if (document.getElementById('control-pedidosSection')) {
        renderPedidosDashboard();
        renderPedidosHistorial();
    }
    
    // Event listeners para formularios
    document.getElementById('promoCreateForm').addEventListener('submit', savePromocion);
    document.getElementById('videoCreateForm').addEventListener('submit', saveVideo);
});

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
    
    // Actualizar estadísticas en el dashboard
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
                <td>${pedido.tipo === 'delivery' ? '🚚 Delivery' : '🏪 Presencial'}</td>
                <td>${pedido.cliente.comuna} - ${pedido.cliente.sector}</td>
                <td>${pedido.productos.length} productos</td>
                <td>$${pedido.costos.delivery.toLocaleString('es-CL')}</td>
                <td><strong>$${pedido.costos.total.toLocaleString('es-CL')}</strong></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="verDetallePedido(${pedido.id})">
                        👁️ Ver
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
                    <h3>📋 Detalle del Pedido #${pedido.id}</h3>
                    <button class="modal-close" onclick="closePedidoDetail()">✕</button>
                </div>
                <div class="order-modal-content">
                    <div class="pedido-info-grid">
                        <div class="info-section">
                            <h4>📅 Información General</h4>
                            <p><strong>Fecha:</strong> ${fecha} ${hora}</p>
                            <p><strong>Tipo:</strong> ${pedido.tipo === 'delivery' ? '🚚 Delivery' : '🏪 Presencial'}</p>
                            <p><strong>Estado:</strong> ✅ Completado</p>
                        </div>
                        
                        <div class="info-section">
                            <h4>👤 Datos del Cliente</h4>
                            <p><strong>Nombre:</strong> ${pedido.cliente.nombre}</p>
                            <p><strong>Teléfono:</strong> ${pedido.cliente.telefono}</p>
                            <p><strong>Ubicación:</strong> ${pedido.cliente.comuna} - ${pedido.cliente.sector}</p>
                            <p><strong>Dirección:</strong> ${pedido.cliente.direccion}</p>
                            ${pedido.cliente.coordenadas ? `<p><strong>Coordenadas:</strong> ${pedido.cliente.coordenadas}</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h4>🛒 Productos</h4>
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
                        <h4>💰 Resumen de Costos</h4>
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
                            <h4>💬 Comentarios</h4>
                            <p>${pedido.comentarios}</p>
                        </div>
                    ` : ''}
                    
                    <div class="order-actions">
                        <button type="button" class="btn btn-secondary" onclick="closePedidoDetail()">Cerrar</button>
                        <button type="button" class="btn btn-success" onclick="reenviarPedidoWhatsApp(${pedido.id})">
                            📲 Reenviar por WhatsApp
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
    
    let message = `🍺 *REENVÍO PEDIDO Boti Dival #${pedido.id}*\n\n`;
    message += `👤 *Cliente:* ${pedido.cliente.nombre}\n`;
    message += `📞 *Teléfono:* ${pedido.cliente.telefono}\n`;
    message += `📍 *Ubicación:* ${pedido.cliente.comuna} - ${pedido.cliente.sector}\n`;
    message += `🏠 *Dirección:* ${pedido.cliente.direccion}\n`;
    if (pedido.cliente.coordenadas) message += `📌 *Coordenadas:* ${pedido.cliente.coordenadas}\n`;
    if (pedido.comentarios) message += `💬 *Comentarios:* ${pedido.comentarios}\n\n`;
    
    message += `🛒 *PRODUCTOS:*\n`;
    pedido.productos.forEach(item => {
        message += `• ${item.nombre} x${item.cantidad} - $${(item.precioUnitario * item.cantidad).toLocaleString('es-CL')}\n`;
    });
    
    message += `\n💰 *SUBTOTAL:* $${pedido.costos.subtotal.toLocaleString('es-CL')}\n`;
    message += `🚚 *DELIVERY:* $${pedido.costos.delivery.toLocaleString('es-CL')}\n`;
    message += `💵 *TOTAL:* $${pedido.costos.total.toLocaleString('es-CL')}\n\n`;
    
    message += `🔄 *Pedido reenviado para confirmación*`;
    
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
    const section = document.getElementById('promoWebSection');
    const grid = document.getElementById('promoWebGrid');
    
    const activePromos = promociones.filter(p => p.active);
    
    if (activePromos.length > 0) {
        section.style.display = 'block';
        grid.innerHTML = activePromos.map(promo => `
            <div class="promo-web-card">
                <img src="${promo.image}" alt="${promo.title}" class="promo-web-image">
                <div class="promo-web-content">
                    <h3 class="promo-web-title">${promo.title}</h3>
                    <p class="promo-web-description">${promo.description}</p>
                    ${promo.price ? `<p class="promo-web-price">$${promo.price.toLocaleString('es-CL')}</p>` : ''}
                </div>
            </div>
        `).join('');
    } else {
        section.style.display = 'none';
    }
}

function updateWebVideos() {
    const section = document.getElementById('videosWebSection');
    const grid = document.getElementById('videosWebGrid');
    
    const activeVideos = videos.filter(v => v.active);
    
    if (activeVideos.length > 0) {
        section.style.display = 'block';
        grid.innerHTML = activeVideos.map(video => `
            <div class="video-web-card">
                <iframe src="https://www.youtube.com/embed/${video.videoId}" 
                        class="video-web-iframe" 
                        title="${video.title}" 
                        allowfullscreen></iframe>
                <div class="video-web-content">
                    <h3 class="video-web-title">${video.title}</h3>
                    ${video.description ? `<p class="video-web-description">${video.description}</p>` : ''}
                </div>
            </div>
        `).join('');
    } else {
        section.style.display = 'none';
    }
}

function updateDeliveryDisplay(status) {
    const banner = document.getElementById('deliveryStatusBanner');
    const statusBar = document.getElementById('statusBar');
    const statusDot = statusBar.querySelector('.status-dot');
    const statusText = statusBar.querySelector('.status-text');
    
    if (!status) {
        // Mostrar banner de "solo ventas presenciales"
        banner.style.display = 'block';
        
        // Actualizar barra de estado
        statusDot.classList.remove('active');
        statusDot.classList.add('inactive');
        statusText.textContent = '⏰ Solo ventas presenciales';
        
        // Ocultar features de delivery
        const features = statusBar.querySelectorAll('.feature-badge');
        features.forEach(feature => {
            if (feature.textContent.includes('Delivery')) {
                feature.style.display = 'none';
            }
        });
    } else {
        // Ocultar banner
        banner.style.display = 'none';
        
        // Restaurar barra de estado
        statusDot.classList.remove('inactive');
        statusDot.classList.add('active');
        statusText.textContent = '⏰ Abierto hasta las 00:30';
        
        // Mostrar features de delivery
        const features = statusBar.querySelectorAll('.feature-badge');
        features.forEach(feature => {
            feature.style.display = 'inline-block';
        });
    }
}

/* ==================== INICIALIZACIÓN DE CONTENIDO DINÁMICO ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Cargar promociones activas
    updateWebPromociones();
    
    // Cargar videos activos
    updateWebVideos();
    
    // Cargar estado del delivery
    updateDeliveryDisplay(deliveryStatus);
    
    // Inicializar carrusel
    initializeCarousel();
    
    // Inicializar búsqueda
    initializeSearch();
});

function finalizeOrder() {
    const clientName = document.getElementById('clientName').value.trim();
    const clientAddress = document.getElementById('clientAddress').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientComments = document.getElementById('clientComments').value.trim();

    // Validación mejorada
    if (!clientName) {
        showNotificationMessage('⚠️ Por favor ingresa tu nombre completo');
        document.getElementById('clientName').focus();
        return;
    }

    if (!clientAddress) {
        showNotificationMessage('⚠️ Por favor ingresa tu dirección completa');
        document.getElementById('clientAddress').focus();
        return;
    }

    if (!clientPhone) {
        showNotificationMessage('⚠️ Por favor ingresa tu número de teléfono');
        document.getElementById('clientPhone').focus();
        return;
    }

    // Validar formato de teléfono chileno
    const phoneRegex = /^(\+56\s?9|\+569|9)\s?\d{4}\s?\d{4}$/;
    if (!phoneRegex.test(clientPhone.replace(/\s/g, ''))) {
        showNotificationMessage('⚠️ Formato de teléfono inválido. Usa +56 9 XXXX XXXX');
        document.getElementById('clientPhone').focus();
        return;
    }

    if (cart.length === 0) {
        showNotificationMessage('🛒 Tu carrito está vacío');
        return;
    }

    // Mostrar confirmación antes de enviar
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    updateStepIndicator(3); // Paso de confirmación
    
    const confirmMessage = `¿Confirmar pedido?\n\n📦 ${totalItems} productos\n💰 Subtotal: $${subtotal.toLocaleString('es-CL')}\n📍 Entrega: ${clientAddress}\n\nSe abrirá WhatsApp para confirmar.`;
    
    if (!confirm(confirmMessage)) {
        updateStepIndicator(2); // Volver al formulario
        return;
    }

    // Generar mensaje
    const message = generateWhatsAppMessage(clientName, clientAddress, clientPhone, clientComments);
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/56964044114?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Limpiar formulario y carrito
    setTimeout(() => {
        cart = [];
        document.getElementById('clientName').value = '';
        document.getElementById('clientAddress').value = '';
        document.getElementById('clientPhone').value = '';
        document.getElementById('clientComments').value = '';
        setCompactMode(true);
        showNotificationMessage('✅ ¡Pedido enviado! Te contactaremos pronto.');
        closeCart();
    }, 1000);
}

function generateWhatsAppMessage(name, address, phone, comments) {
    const timestamp = new Date().toLocaleString('es-CL');
    const itemsList = cart.map(item => 
        `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CL')}`
    ).join('\n');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let message = `🛒 *NUEVO PEDIDO BOTI DIVAL* 🛒\n\n`;
    message += `📌 *Información del Cliente*\n`;
    message += `👤 Nombre: ${name}\n`;
    message += `📞 Teléfono: ${phone}\n`;
    message += `📍 Dirección: ${address}\n`;
    message += `⏰ Fecha/Hora: ${timestamp}\n\n`;
    message += `📦 *Productos Pedidos (${totalItems} items)*\n`;
    message += itemsList + '\n\n';
    message += `💰 *Subtotal: $${subtotal.toLocaleString('es-CL')}*\n`;
    message += `🚚 Envío: A cotizar según distancia\n\n`;
    
    if (comments) {
        message += `📝 *Comentarios*\n${comments}\n\n`;
    }
    
    message += `✅ *Por favor confirma disponibilidad y costo de envío*\n`;
    message += `¡Gracias por tu pedido! 😊`;

    return message;
}

/* ==================== CONTACTO Y CONSULTAS ==================== */

function contactShipping() {
    const message = `Hola Boti Dival, me gustaría consultar sobre el costo de envío a mi zona. Mi dirección es: [Mi dirección]`;
    const whatsappUrl = `https://wa.me/56985062378?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

    // Agregar clases de animación a elementos
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
    // Agregar feedback táctil en móviles solo a botones y promociones
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
    // Mejorar búsqueda con debounce
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
        // Ctrl/Cmd + K para focus en búsqueda
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

/* ==================== INICIALIZACIÓN MEJORADA ==================== */

function initializeApp() {
    renderProducts(PRODUCTS);
    setupEventListeners();
    updateStatus();
    updateCartUI();
    initializeCarousel();
    initScrollAnimations();
    addTouchFeedback();
    enhanceSearch();
    addKeyboardShortcuts();
    setInterval(updateStatus, 60000); // Actualizar estado cada minuto
    setupLazyLoad();
}

/* ==================== OPTIMIZACIÓN DE RENDIMIENTO ==================== */

function setupLazyLoad() {
    const lazyObserverOptions = {
        threshold: 0.1
    };

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                lazyObserver.unobserve(entry.target);
            }
        });
    }, lazyObserverOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        lazyObserver.observe(card);
    });
}

/* ==================== DARK MODE (Automático según hora) ==================== */

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
    // Simulación - en producción esto vendría de un servidor
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
        // Service worker no disponible, continuar sin él
    });
}

/* ==================== MANEJO DE CONEXIÓN ==================== */

window.addEventListener('online', () => {
    showNotificationMessage('✓ Conexión establecida');
});

window.addEventListener('offline', () => {
    showNotificationMessage('⚠️ Sin conexión a internet');
});
