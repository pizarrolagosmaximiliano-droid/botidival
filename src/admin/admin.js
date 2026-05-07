// admin.js - Panel administrativo profesional
import { uploadImageToImgBB } from '../services/imgbb.service.js';
import { checkAuth, logout, getCurrentUser } from '../services/auth.service.js';
import { 
    listenToProducts, saveProductToDB, deleteProductFromDB,
    listenToPromotions, savePromotionToDB, deletePromotionFromDB 
} from '../services/products.service.js';
import { listenToOrders, updateOrderStatusInDB } from '../services/orders.service.js';
import { listenToSettings, updateSettings } from '../services/settings.service.js';

if (!window.BASE_URL) {
    window.BASE_URL = (() => {
        const href = window.location.href;
        if (href.includes('github.io') || href.includes('botidival')) {
            return '/botidival/';
        }
        return '/';
    })();
}

const STORAGE_KEYS = {
    productos: 'productos',
    pedidos: 'pedidosHistorial',
    promociones: 'promociones',
    carousel: 'carouselImages',
    delivery: 'deliveryStatus',
    deliveryTrips: 'deliveryTripsHistory',
    instagram: 'instagramVideos',
    closingTime: 'closingTime'
};

const ORDER_STATUS = ['nuevo', 'preparando', 'en-camino', 'entregado', 'cancelado'];

let editingPromoId = null;
let editingCarouselId = null;
let editingProductId = null;

let firestoreProducts = [];
let firestorePromotions = [];
let firestoreOrders = [];
let firestoreSettings = { deliveryEnabled: true, closingTime: '' };

// Escuchar cambios en Firestore en tiempo real
listenToProducts((data) => {
    firestoreProducts = data;
    if (typeof renderAdminProducts === 'function') renderAdminProducts();
    if (typeof renderDashboard === 'function') renderDashboard();
});

listenToPromotions((data) => {
    firestorePromotions = data;
    if (typeof renderPromociones === 'function') renderPromociones();
});

listenToOrders((data) => {
    firestoreOrders = data;
    if (typeof renderOrders === 'function') renderOrders();
    if (typeof renderDashboard === 'function') renderDashboard();
});

listenToSettings((data) => {
    firestoreSettings = data;
    if (typeof renderDeliveryStatus === 'function') renderDeliveryStatus();
});

function readStorageArray(key) {
    if (key === STORAGE_KEYS.productos) return firestoreProducts;
    if (key === STORAGE_KEYS.promociones) return firestorePromotions;
    if (key === STORAGE_KEYS.pedidos) return firestoreOrders;
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
}

function writeStorageArray(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function ensurePedidosHaveStatus() {
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    let changed = false;
    pedidos.forEach((pedido) => {
        if (!pedido.estado) {
            pedido.estado = 'nuevo';
            changed = true;
        }
    });
    if (changed) {
        writeStorageArray(STORAGE_KEYS.pedidos, pedidos);
    }
}

async function protectDashboard() {
    const isDashboard = window.location.href.includes('admin-dashboard.html');
    if (!isDashboard) return;

    const user = await checkAuth();
    if (!user) {
        window.location.href = window.BASE_URL + 'admin-login.html';
        return;
    }

    const userNameSpan = document.querySelector('.dropdown-toggle span.fw-medium');
    const userImg = document.querySelector('.dropdown-toggle img');
    
    if (user) {
        const displayName = user.displayName || user.email.split('@')[0] || 'Administrador';
        if (userNameSpan) userNameSpan.textContent = displayName;
        if (userImg) userImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0D8ABC&color=fff`;
    }
    
    setupLogout();
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await logout();
        window.location.href = 'index.html';
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('[id$="Section"]');
    
    // Mobile Offcanvas Menu Logic
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('mobileMenuClose');

    function closeMobileMenu() {
        if (sidebar) sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if(sidebar) sidebar.classList.add('show');
            if(overlay) overlay.classList.add('show');
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = `${link.getAttribute('data-section')}Section`;
            sections.forEach((section) => {
                section.style.display = 'none';
            });
            const target = document.getElementById(sectionId);
            if (target) target.style.display = 'block';
            navLinks.forEach((nav) => nav.classList.remove('active'));
            link.classList.add('active');
            
            // Auto close mobile menu when a section is clicked
            if (window.innerWidth < 992) {
                closeMobileMenu();
            }
        });
    });
}

function sumMoney(pedidos) {
    return pedidos.reduce((sum, p) => sum + (p?.costos?.total || 0), 0);
}

function getDashboardStats() {
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    const now = new Date();
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now);
    monthStart.setDate(now.getDate() - 30);

    const today = pedidos.filter((p) => new Date(p.fecha) >= dayStart);
    const week = pedidos.filter((p) => new Date(p.fecha) >= weekStart);
    const month = pedidos.filter((p) => new Date(p.fecha) >= monthStart);

    const productos = readStorageArray(STORAGE_KEYS.productos);
    const activos = productos.filter(p => p.active !== false).length;

    return {
        totalPedidos: pedidos.length,
        pedidosHoy: today.length,
        ventasHoy: sumMoney(today),
        ventasSemana: sumMoney(week),
        ventasMes: sumMoney(month),
        ingresosTiempoReal: sumMoney(pedidos),
        productosActivos: activos
    };
}

function animateValue(obj, start, end, duration, prefix = '', isCurrency = false) {
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        if (isCurrency) {
            obj.textContent = `${prefix}${current.toLocaleString('es-CL')}`;
        } else {
            obj.textContent = `${prefix}${current}`;
        }
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (isCurrency) {
                obj.textContent = `${prefix}${end.toLocaleString('es-CL')}`;
            } else {
                obj.textContent = `${prefix}${end}`;
            }
        }
    };
    window.requestAnimationFrame(step);
}

let ventasChartInstance = null;

function renderDashboard() {
    const stats = getDashboardStats();
    
    // Animate numbers
    animateValue(document.getElementById('metricPedidos'), 0, stats.totalPedidos, 1000);
    animateValue(document.getElementById('metricPedidosHoy'), 0, stats.pedidosHoy, 1000);
    animateValue(document.getElementById('metricVentasHoy'), 0, stats.ventasHoy, 1000, '$', true);
    animateValue(document.getElementById('metricVentasSemana'), 0, stats.ventasSemana, 1000, '$', true);
    if(document.getElementById('metricProductos')) {
        animateValue(document.getElementById('metricProductos'), 0, stats.productosActivos, 1000);
    }
    
    // Top product calculation
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    let productCounts = {};
    pedidos.forEach(p => {
        if (p.productos && Array.isArray(p.productos)) {
            p.productos.forEach(prod => {
                productCounts[prod.name] = (productCounts[prod.name] || 0) + (prod.quantity || 1);
            });
        }
    });
    const topProduct = Object.entries(productCounts).sort((a,b) => b[1] - a[1])[0];
    if (document.getElementById('metricTopProduct')) {
        document.getElementById('metricTopProduct').textContent = topProduct ? topProduct[0] : 'N/A';
    }

    const lastUpdate = document.getElementById('lastUpdateTime');
    if (lastUpdate) {
        lastUpdate.textContent = `Última actualización: ${new Date().toLocaleTimeString('es-CL')}`;
    }

    // Chart.js
    const ctx = document.getElementById('ventasChart');
    if (ctx && window.Chart) {
        // Generate last 7 days data
        const labels = [];
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric' }));
            
            const startOfDay = new Date(d.setHours(0,0,0,0));
            const endOfDay = new Date(d.setHours(23,59,59,999));
            
            const daySales = pedidos
                .filter(p => {
                    const pDate = new Date(p.fecha);
                    return pDate >= startOfDay && pDate <= endOfDay;
                })
                .reduce((sum, p) => sum + (p.costos?.total || 0), 0);
            data.push(daySales);
        }

        if (ventasChartInstance) {
            ventasChartInstance.data.datasets[0].data = data;
            ventasChartInstance.labels = labels;
            ventasChartInstance.update();
        } else {
            ventasChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Ventas Diarias ($)',
                        data: data,
                        borderColor: '#D4AF37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [2,4] } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }
    }

    // Render Recent Orders
    const latestTable = document.getElementById('latestOrdersTable');
    if (latestTable) {
        const sortedPedidos = [...pedidos].sort((a,b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
        latestTable.innerHTML = sortedPedidos.map(p => `
            <tr>
                <td><span class="fw-bold">#${String(p.id).slice(-4)}</span></td>
                <td>${p.cliente?.nombre || 'Cliente'}</td>
                <td><span class="badge ${p.estado === 'nuevo' ? 'bg-primary' : 'bg-secondary'}">${p.estado?.toUpperCase() || 'NUEVO'}</span></td>
                <td class="text-end fw-bold text-success">$${(p.costos?.total || 0).toLocaleString('es-CL')}</td>
            </tr>
        `).join('');
        if (sortedPedidos.length === 0) {
            latestTable.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay pedidos recientes</td></tr>';
        }
    }
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function savePromocion(event) {
    event.preventDefault();
    const imageFile = document.getElementById('promoImageFile').files[0];
    const imageUrl = document.getElementById('promoImageUrl').value.trim();
    const title = document.getElementById('promoTitle').value.trim();
    const description = document.getElementById('promoDescription').value.trim();
    const currentPrice = Number(document.getElementById('promoPrice').value || 0);
    const previousPriceValue = document.getElementById('promoPreviousPrice').value;
    const previousPrice = previousPriceValue ? Number(previousPriceValue) : null;
    const startDate = document.getElementById('promoStartDate').value;
    const endDate = document.getElementById('promoEndDate').value;

    if (!title || !description || !currentPrice || !startDate || !endDate) {
        alert('Completa titulo, descripcion, precio actual y fechas.');
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        alert('La fecha de inicio no puede ser mayor a la fecha de término.');
        return;
    }

    let image = imageUrl;
    if (imageFile) {
        document.getElementById('promoSaveBtn').textContent = 'Subiendo imagen...';
        document.getElementById('promoSaveBtn').disabled = true;
        image = await uploadImageToImgBB(imageFile);
        document.getElementById('promoSaveBtn').textContent = 'Guardar promocion';
        document.getElementById('promoSaveBtn').disabled = false;
    }
    if (!image) {
        alert('Debes subir una imagen o pegar URL.');
        return;
    }

    // Auto-active logic based on dates
    const today = new Date().setHours(0,0,0,0);
    const end = new Date(endDate).setHours(23,59,59,999);
    const isActive = today <= end;

    let promoData = {
        image,
        title,
        description,
        price: currentPrice,
        previousPrice,
        startDate,
        endDate,
        active: isActive
    };

    if (editingPromoId) {
        promoData.id = editingPromoId;
    } else {
        promoData.createdAt = new Date().toISOString();
    }

    document.getElementById('promoSaveBtn').textContent = 'Guardando en la nube...';
    document.getElementById('promoSaveBtn').disabled = true;

    await savePromotionToDB(promoData);

    resetPromoForm();
    // No necesitamos llamar a renderPromociones() aquí, porque onSnapshot lo hará automáticamente
}

function editPromocion(id) {
    const promociones = readStorageArray(STORAGE_KEYS.promociones);
    const promo = promociones.find((p) => p.id === id);
    if (!promo) return;
    editingPromoId = id;
    document.getElementById('promoTitle').value = promo.title;
    document.getElementById('promoDescription').value = promo.description;
    document.getElementById('promoPrice').value = promo.price || '';
    document.getElementById('promoPreviousPrice').value = promo.previousPrice || '';
    document.getElementById('promoStartDate').value = promo.startDate || '';
    document.getElementById('promoEndDate').value = promo.endDate || '';
    document.getElementById('promoImageUrl').value = promo.image?.startsWith('data:') ? '' : promo.image;
    document.getElementById('promoSaveBtn').textContent = 'Actualizar promocion';
}

async function deletePromocion(id) {
    if (!confirm('Eliminar esta promocion permanentemente de la base de datos?')) return;
    await deletePromotionFromDB(id);
}

async function togglePromocion(id) {
    const promociones = readStorageArray(STORAGE_KEYS.promociones);
    const promo = promociones.find((p) => p.id === id);
    if (!promo) return;
    
    await savePromotionToDB({ id: promo.id, active: !promo.active });
}

function resetPromoForm() {
    editingPromoId = null;
    document.getElementById('promoCreateForm').reset();
    document.getElementById('promoSaveBtn').textContent = 'Guardar promocion';
}

function checkPromocionesExpiration() {
    let promociones = readStorageArray(STORAGE_KEYS.promociones);
    let updated = false;
    const today = new Date().setHours(0,0,0,0);
    
    promociones.forEach(p => {
        if (p.active && p.endDate) {
            const end = new Date(p.endDate).setHours(23,59,59,999);
            if (today > end) {
                p.active = false;
                updated = true;
            }
        }
    });
    
    if (updated) {
        writeStorageArray(STORAGE_KEYS.promociones, promociones);
    }
}

function renderPromociones() {
    checkPromocionesExpiration();
    const promociones = readStorageArray(STORAGE_KEYS.promociones);
    const grid = document.getElementById('promocionesGrid');
    
    grid.innerHTML = promociones.map((promo) => {
        const today = new Date().setHours(0,0,0,0);
        const isExpired = promo.endDate ? today > new Date(promo.endDate).setHours(23,59,59,999) : false;
        
        return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 ${!promo.active ? 'opacity-50' : ''} ${isExpired ? 'border-danger' : ''}">
                <img src="${promo.image}" class="card-img-top" alt="${promo.title}" style="height:200px;object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title mb-0">${promo.title}</h5>
                        ${isExpired ? '<span class="badge bg-danger">Vencida</span>' : (promo.active ? '<span class="badge bg-success">Activa</span>' : '<span class="badge bg-secondary">Inactiva</span>')}
                    </div>
                    <p class="card-text text-muted mb-2">${promo.description}</p>
                    <div class="small mb-3">
                        <div><i class="far fa-calendar-alt me-1"></i> Inicio: ${promo.startDate || 'N/A'}</div>
                        <div><i class="far fa-calendar-times me-1"></i> Fin: <span class="${isExpired ? 'text-danger fw-bold' : ''}">${promo.endDate || 'N/A'}</span></div>
                    </div>
                    <div class="mb-3">
                        ${promo.previousPrice ? `<span class="text-muted text-decoration-line-through me-2">$${promo.previousPrice.toLocaleString('es-CL')}</span>` : ''}
                        <span class="fw-bold text-success fs-5">$${promo.price.toLocaleString('es-CL')}</span>
                    </div>
                    <div class="mt-auto d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm flex-grow-1 ${promo.active ? 'btn-warning' : 'btn-success'}" onclick="togglePromocion(${promo.id})" ${isExpired ? 'disabled' : ''}>
                            ${promo.active ? 'Desactivar' : 'Activar'}
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="editPromocion(${promo.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deletePromocion(${promo.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
    
    if (promociones.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center py-4 text-muted"><p>No hay promociones registradas.</p></div>';
    }
}


function getOrderStatusBadge(status) {
    const map = {
        nuevo: 'bg-primary',
        preparando: 'bg-warning text-dark',
        'en-camino': 'bg-info text-dark',
        entregado: 'bg-success',
        cancelado: 'bg-danger'
    };
    return map[status] || 'bg-secondary';
}

async function updateOrderStatus(id, status) {
    // Optimistic update local
    const pedido = firestoreOrders.find(p => p.id === id || p.id === id.toString());
    if (pedido) {
        pedido.estado = status;
        renderOrders();
    }
    
    // DB Update
    await updateOrderStatusInDB(id, status);
}

function renderOrders() {
    const tbody = document.getElementById('pedidosTableBody');
    const isMobile = window.innerWidth < 992;
    let pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    pedidos = pedidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    if (isMobile) {
        // Vista de Tarjetas para Mvil
        const container = tbody.parentElement.parentElement; // table-responsive
        if (container) {
            container.innerHTML = `<div id="pedidosMobileCards" class="row g-3 p-2"></div>`;
            const cardContainer = document.getElementById('pedidosMobileCards');
            cardContainer.innerHTML = pedidos.map((pedido) => `
                <div class="col-12">
                    <div class="card shadow-sm border-0 rounded-4">
                        <div class="card-body p-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="fw-bold text-primary">#${pedido.id}</span>
                                <span class="badge ${getOrderStatusBadge(pedido.estado || 'nuevo')}">${pedido.estado || 'nuevo'}</span>
                            </div>
                            <div class="mb-3">
                                <h6 class="mb-1 fw-bold">${pedido.cliente?.nombre || 'Sin nombre'}</h6>
                                <p class="small text-muted mb-0"><i class="fas fa-clock me-1"></i> ${new Date(pedido.fecha).toLocaleString('es-CL')}</p>
                                <p class="small text-muted mb-0"><i class="fas fa-map-marker-alt me-1"></i> ${pedido.cliente?.comuna || '-'} - ${pedido.cliente?.sector || '-'}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge ${pedido.tipo === 'delivery' ? 'bg-info bg-opacity-10 text-info' : 'bg-secondary bg-opacity-10 text-secondary'}">
                                    ${pedido.tipo === 'delivery' ? '🚚 Delivery' : '🏪 Retiro'}
                                </span>
                                <span class="fw-bold fs-5 text-success">$${(pedido.costos?.total || 0).toLocaleString('es-CL')}</span>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <div class="d-flex gap-1 overflow-auto pb-1" style="scrollbar-width: none;">
                                    ${ORDER_STATUS.map((status) => `
                                        <button class="btn btn-sm ${pedido.estado === status ? 'btn-dark' : 'btn-outline-dark'} flex-shrink-0" 
                                            onclick="updateOrderStatus(${pedido.id}, '${status}')" style="font-size: 0.7rem;">
                                            ${status}
                                        </button>
                                    `).join('')}
                                </div>
                                <button class="btn btn-primary w-100 mt-1" onclick="verDetallePedido(${pedido.id})">
                                    <i class="fas fa-eye me-2"></i> Ver Detalles Completos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            if (pedidos.length === 0) {
                cardContainer.innerHTML = '<div class="col-12 text-center py-5 text-muted">No hay pedidos registrados.</div>';
            }
            return;
        }
    }

    // Vista de Tabla para PC
    tbody.innerHTML = pedidos.map((pedido) => `
        <tr>
            <td>${pedido.id}</td>
            <td>${new Date(pedido.fecha).toLocaleDateString('es-CL')} ${new Date(pedido.fecha).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</td>
            <td>${pedido.cliente?.nombre || '-'}</td>
            <td><span class="badge ${pedido.tipo === 'delivery' ? 'bg-primary' : 'bg-secondary'}">${pedido.tipo === 'delivery' ? 'Delivery' : 'Presencial'}</span></td>
            <td><span class="badge ${getOrderStatusBadge(pedido.estado || 'nuevo')}">${pedido.estado || 'nuevo'}</span></td>
            <td>${pedido.cliente?.comuna || '-'} - ${pedido.cliente?.sector || '-'}</td>
            <td>$${(pedido.costos?.total || 0).toLocaleString('es-CL')}</td>
            <td>
                <div class="btn-group btn-group-sm mb-1">
                    ${ORDER_STATUS.map((status) => `<button class="btn btn-outline-dark" onclick="updateOrderStatus(${pedido.id}, '${status}')">${status}</button>`).join('')}
                </div>
                <button class="btn btn-sm btn-info" onclick="verDetallePedido(${pedido.id})">Detalle</button>
            </td>
        </tr>
    `).join('');
}

function verDetallePedido(id) {
    const pedidos = readStorageArray(STORAGE_KEYS.pedidos);
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;

    document.getElementById('modalPedidoId').textContent = pedido.id;
    document.getElementById('modalClienteNombre').textContent = pedido.cliente?.nombre || '-';
    document.getElementById('modalClienteTelefono').textContent = pedido.cliente?.telefono || '-';
    document.getElementById('modalClienteComuna').textContent = pedido.cliente?.comuna || '-';
    document.getElementById('modalClienteSector').textContent = pedido.cliente?.sector || '-';
    document.getElementById('modalClienteDireccion').textContent = pedido.cliente?.direccion || '-';
    document.getElementById('modalClienteCoordenadas').textContent = pedido.cliente?.coordenadas || '-';
    document.getElementById('modalPedidoFecha').textContent = new Date(pedido.fecha).toLocaleString('es-CL');
    document.getElementById('modalPedidoTipo').textContent = pedido.tipo || '-';
    document.getElementById('modalPedidoComentarios').textContent = pedido.comentarios || '-';
    document.getElementById('modalSubtotal').textContent = (pedido.costos?.subtotal || 0).toLocaleString('es-CL');
    document.getElementById('modalDelivery').textContent = (pedido.costos?.delivery || 0).toLocaleString('es-CL');
    document.getElementById('modalTotal').textContent = (pedido.costos?.total || 0).toLocaleString('es-CL');
    document.getElementById('modalProductosTable').innerHTML = (pedido.productos || []).map((p) => `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>$${(p.precioUnitario || 0).toLocaleString('es-CL')}</td>
            <td>$${(p.subtotal || 0).toLocaleString('es-CL')}</td>
        </tr>
    `).join('');

    new bootstrap.Modal(document.getElementById('pedidoDetailModal')).show();
}

function triggerNewOrderAlert() {
    const alertEl = document.getElementById('newOrderAlert');
    if (alertEl) {
        alertEl.classList.remove('d-none');
        setTimeout(() => alertEl.classList.add('d-none'), 5000);
    }
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Premium Ding-Dong sound
        const playTone = (freq, startTime, duration) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, startTime);
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };
        
        const now = audioCtx.currentTime;
        playTone(880, now, 0.4);      // Ding (A5)
        playTone(659.25, now + 0.3, 0.6); // Dong (E5)
        
    } catch (_e) {
        // Sin audio disponible
    }
}

function watchOrdersRealtime() {
    const currentCount = readStorageArray(STORAGE_KEYS.pedidos).length;
    const prevCount = Number(sessionStorage.getItem('adminOrderCount') || 0);
    if (currentCount > prevCount && prevCount !== 0) {
        triggerNewOrderAlert();
    }
    sessionStorage.setItem('adminOrderCount', String(currentCount));
}

async function setDeliveryStatus(status) {
    const closingTime = document.getElementById('closingTimeInput')?.value.trim() || firestoreSettings.closingTime || '';
    
    await updateSettings({
        deliveryEnabled: status,
        closingTime: closingTime
    });
}

function renderDeliveryStatus() {
    const isCurrentlyOpen = firestoreSettings.deliveryEnabled !== undefined ? firestoreSettings.deliveryEnabled : true;
    const closingTime = firestoreSettings.closingTime || '';

    const dot = document.getElementById('deliveryStatusDot');
    const text = document.getElementById('deliveryStatusText');
    const message = document.getElementById('deliveryCurrentStatus');
    const activateBtn = document.getElementById('activateDeliveryBtn');
    const deactivateBtn = document.getElementById('deactivateDeliveryBtn');
    const closingTimeInput = document.getElementById('closingTimeInput');

    if (!dot) return;

    if (closingTimeInput) {
        closingTimeInput.value = closingTime;
    }

    if (isCurrentlyOpen) {
        dot.className = 'status-dot active';
        text.textContent = 'Delivery ACTIVO';
        message.textContent = 'Delivery Disponible para clientes.';
        if (activateBtn) activateBtn.style.display = 'none';
        if (deactivateBtn) deactivateBtn.style.display = 'inline-block';
        if (closingTimeInput) closingTimeInput.disabled = false;
    } else {
        dot.className = 'status-dot inactive';
        text.textContent = 'Delivery INACTIVO';
        message.textContent = 'Delivery No Disponible. Solo retiro presencial.';
        if (activateBtn) activateBtn.style.display = 'inline-block';
        if (deactivateBtn) deactivateBtn.style.display = 'none';
        if (closingTimeInput) closingTimeInput.disabled = true;
    }
}

window.saveClosingTime = async function() {
    const closingTimeInput = document.getElementById('closingTimeInput');
    if (closingTimeInput) {
        const val = closingTimeInput.value.trim();
        
        await updateSettings({
            closingTime: val
        });
        
        // Show temporary feedback on button
        const btn = document.getElementById('saveClosingTimeBtn');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = '¡GUARDADO!';
            btn.classList.replace('btn-primary', 'btn-success');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.replace('btn-success', 'btn-primary');
            }, 2000);
        }
    }
};
/* =================== PRODUCTOS (CATÁLOGO) =================== */

async function saveProducto(event) {
    event.preventDefault();
    const imageFile = document.getElementById('prodImageFile').files[0];
    const imageUrl = document.getElementById('prodImageUrl').value.trim();
    const name = document.getElementById('prodName').value.trim();
    const description = document.getElementById('prodDescription').value.trim();
    const price = Number(document.getElementById('prodPrice').value || 0);
    const category = document.getElementById('prodCategory').value;
    const popular = document.getElementById('prodPopular').checked;
    const active = document.getElementById('prodActive').checked;

    if (!name || !price || !category) {
        alert('Completa nombre, precio y categoría.');
        return;
    }

    let image = imageUrl || 'https://via.placeholder.com/400?text=Sin+imagen';
    if (imageFile) {
        document.getElementById('prodSaveBtn').textContent = 'Subiendo imagen...';
        document.getElementById('prodSaveBtn').disabled = true;
        const uploadedUrl = await uploadImageToImgBB(imageFile);
        if (uploadedUrl) {
            image = uploadedUrl;
        } else {
            alert('Error al subir la imagen.');
            document.getElementById('prodSaveBtn').textContent = editingProductId ? 'Actualizar Producto' : 'Guardar Producto';
            document.getElementById('prodSaveBtn').disabled = false;
            return;
        }
        document.getElementById('prodSaveBtn').textContent = editingProductId ? 'Actualizar Producto' : 'Guardar Producto';
        document.getElementById('prodSaveBtn').disabled = false;
    }

    let productData = {
        name,
        description,
        price,
        category,
        popular,
        active
    };

    if (editingProductId) {
        productData.id = editingProductId;
        const productos = readStorageArray(STORAGE_KEYS.productos);
        const prod = productos.find(p => p.id === editingProductId);
        productData.image = imageFile ? image : (imageUrl ? imageUrl : (prod ? prod.image : image));
    } else {
        productData.image = image;
    }

    document.getElementById('prodSaveBtn').textContent = 'Guardando en la nube...';
    document.getElementById('prodSaveBtn').disabled = true;

    await saveProductToDB(productData);

    // Close modal
    const modalEl = document.getElementById('productoModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }
    
    resetProductoForm();
    // onSnapshot update handles renderAdminProducts and renderDashboard automatically
}

function editProducto(id) {
    const productos = readStorageArray(STORAGE_KEYS.productos);
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    
    editingProductId = id;
    document.getElementById('prodName').value = prod.name;
    document.getElementById('prodDescription').value = prod.description || '';
    document.getElementById('prodPrice').value = prod.price || '';
    document.getElementById('prodCategory').value = prod.category || 'cervezas';
    document.getElementById('prodPopular').checked = !!prod.popular;
    document.getElementById('prodActive').checked = prod.active !== false;
    document.getElementById('prodImageUrl').value = prod.image?.startsWith('data:') ? '' : prod.image;
    document.getElementById('prodSaveBtn').textContent = 'Actualizar Producto';
    
    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    modal.show();
}

async function deleteProducto(id) {
    if (!confirm('¿Eliminar este producto permanentemente de la base de datos?')) return;
    await deleteProductFromDB(id);
}

async function toggleProductoStatus(id) {
    const productos = readStorageArray(STORAGE_KEYS.productos);
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    
    await saveProductToDB({ id: prod.id, active: !prod.active });
}

function resetProductoForm() {
    editingProductId = null;
    document.getElementById('productoForm').reset();
    document.getElementById('prodActive').checked = true;
    document.getElementById('prodSaveBtn').textContent = 'Guardar Producto';
}

function renderAdminProducts() {
    const grid = document.getElementById('productosGrid');
    if (!grid) return;
    
    const searchQuery = (document.getElementById('adminSearchProduct')?.value || '').toLowerCase();
    const categoryFilter = document.getElementById('adminFilterCategory')?.value || 'all';
    
    const productos = readStorageArray(STORAGE_KEYS.productos);
    
    const filtered = productos.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchQuery) || (p.description || '').toLowerCase().includes(searchQuery);
        const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    grid.innerHTML = filtered.map(prod => `
        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="card h-100 ${prod.active === false ? 'opacity-75' : ''}">
                <div style="position: relative;">
                    ${prod.popular ? '<span class="badge bg-warning position-absolute top-0 end-0 m-2">Popular</span>' : ''}
                    ${prod.active === false ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2">Agotado</span>' : ''}
                    <img src="${prod.image}" class="card-img-top" alt="${prod.name}" style="height:200px; object-fit:cover;">
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="text-muted small text-uppercase mb-1">${prod.category}</div>
                    <h5 class="card-title fs-6 fw-bold mb-1">${prod.name}</h5>
                    <p class="card-text text-muted small mb-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${prod.description || ''}</p>
                    <div class="mt-auto">
                        <div class="fw-bold text-success fs-5 mb-3">$${(prod.price || 0).toLocaleString('es-CL')}</div>
                        <div class="d-flex gap-2 flex-wrap">
                            <button class="btn btn-sm flex-grow-1 ${prod.active === false ? 'btn-success' : 'btn-outline-secondary'}" onclick="toggleProductoStatus(${prod.id})">
                                ${prod.active === false ? '<i class="fas fa-check me-1"></i>Activar' : '<i class="fas fa-ban me-1"></i>Agotar'}
                            </button>
                            <button class="btn btn-sm btn-primary flex-grow-1" onclick="editProducto(${prod.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger flex-grow-1" onclick="deleteProducto(${prod.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center py-5 text-muted"><i class="fas fa-box-open fs-1 mb-3"></i><p>No se encontraron productos.</p></div>';
    }
}

/* =================== VUELTAS DELIVERY =================== */
function setupDeliveryTrips() {
    const form = document.getElementById('vueltaCreateForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const pedidos = Number(document.getElementById('vueltaPedidos').value);
            const sector = document.getElementById('vueltaSector').value.trim();
            const total = Number(document.getElementById('vueltaTotal').value);
            
            const trips = readStorageArray(STORAGE_KEYS.deliveryTrips);
            trips.unshift({
                id: Date.now(),
                fecha: new Date().toISOString(),
                pedidos,
                sector,
                total
            });
            writeStorageArray(STORAGE_KEYS.deliveryTrips, trips);
            
            form.reset();
            renderVueltas();
        });
    }
}

window.deleteVuelta = function(id) {
    if (!confirm('¿Eliminar este registro de vuelta?')) return;
    let trips = readStorageArray(STORAGE_KEYS.deliveryTrips);
    trips = trips.filter(t => t.id !== id);
    writeStorageArray(STORAGE_KEYS.deliveryTrips, trips);
    renderVueltas();
}

function renderVueltas() {
    const trips = readStorageArray(STORAGE_KEYS.deliveryTrips);
    const tbody = document.getElementById('vueltasTableBody');
    if (!tbody) return;

    const isMobile = window.innerWidth < 992;

    if (isMobile) {
        const container = tbody.parentElement.parentElement; // table-responsive
        if (container) {
            container.innerHTML = `<div id="vueltasMobileCards" class="row g-3 p-2"></div>`;
            const cardContainer = document.getElementById('vueltasMobileCards');
            cardContainer.innerHTML = trips.map(t => `
                <div class="col-12">
                    <div class="card shadow-sm border-0 rounded-4">
                        <div class="card-body p-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="fw-bold text-primary">Viaje #${String(t.id).slice(-4)}</span>
                                <span class="badge bg-secondary bg-opacity-10 text-secondary">${new Date(t.fecha).toLocaleString('es-CL', {dateStyle: 'short', timeStyle: 'short'})}</span>
                            </div>
                            <div class="mb-2">
                                <p class="mb-1"><i class="fas fa-map-marker-alt text-danger me-1"></i> <strong>Sector:</strong> ${t.sector}</p>
                                <p class="mb-1"><i class="fas fa-box text-info me-1"></i> <strong>Pedidos:</strong> ${t.pedidos}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                <span class="fw-bold fs-5 text-success">$${t.total.toLocaleString('es-CL')}</span>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteVuelta(${t.id})">
                                    <i class="fas fa-trash me-1"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            if (trips.length === 0) {
                cardContainer.innerHTML = '<div class="col-12 text-center py-4 text-muted">No hay viajes registrados.</div>';
            }
            return;
        }
    }

    tbody.innerHTML = trips.map(t => `
        <tr>
            <td>#${String(t.id).slice(-4)}</td>
            <td>${new Date(t.fecha).toLocaleString('es-CL', {dateStyle: 'short', timeStyle: 'short'})}</td>
            <td>${t.sector}</td>
            <td>${t.pedidos}</td>
            <td class="text-success fw-bold">$${t.total.toLocaleString('es-CL')}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteVuelta(${t.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
    
    if (trips.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay viajes registrados.</td></tr>';
    }

    // Update Stats
    updateVueltasStats(trips);
}

function updateVueltasStats(trips) {
    const now = new Date();
    const dayStart = new Date(now).setHours(0,0,0,0);
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    
    const todayTrips = trips.filter(t => new Date(t.fecha) >= dayStart);
    const weekTrips = trips.filter(t => new Date(t.fecha) >= weekStart);
    
    // Hoy
    const pedidosHoy = todayTrips.reduce((sum, t) => sum + t.pedidos, 0);
    const recaudacionHoy = todayTrips.reduce((sum, t) => sum + t.total, 0);
    
    if(document.getElementById('metricVueltasHoy')) document.getElementById('metricVueltasHoy').textContent = todayTrips.length;
    if(document.getElementById('metricPedidosVueltaHoy')) document.getElementById('metricPedidosVueltaHoy').textContent = `${pedidosHoy} pedidos entregados`;
    if(document.getElementById('metricRecaudacionVueltaHoy')) document.getElementById('metricRecaudacionVueltaHoy').textContent = `$${recaudacionHoy.toLocaleString('es-CL')}`;
    
    // Semana
    if(document.getElementById('metricTotalVueltasSemana')) document.getElementById('metricTotalVueltasSemana').textContent = `${weekTrips.length} vueltas en la semana`;
    
    const sectorCounts = {};
    weekTrips.forEach(t => {
        const sectors = t.sector.split(',').map(s => s.trim());
        sectors.forEach(s => sectorCounts[s] = (sectorCounts[s] || 0) + 1);
    });
    
    const topSector = Object.entries(sectorCounts).sort((a,b) => b[1] - a[1])[0];
    if(document.getElementById('metricSectorFrecuente')) {
        document.getElementById('metricSectorFrecuente').textContent = topSector ? topSector[0] : '-';
    }
}

/* =================== INSTAGRAM VIDEOS =================== */
function setupInstagram() {
    const form = document.getElementById('igCreateForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('igName').value.trim();
            const url = document.getElementById('igUrl').value.trim();
            
            // Extract code from Instagram reel url
            let videoCode = '';
            const match = url.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                videoCode = match[1];
            } else {
                alert('URL de Instagram no válida. Asegúrate de copiar el enlace correctamente.');
                return;
            }

            const videos = readStorageArray(STORAGE_KEYS.instagram);
            videos.push({
                id: Date.now(),
                name,
                url,
                videoCode,
                active: true,
                order: videos.length
            });
            writeStorageArray(STORAGE_KEYS.instagram, videos);
            
            form.reset();
            renderInstagram();
        });
    }
}

window.deleteIgVideo = function(id) {
    if (!confirm('¿Eliminar este video?')) return;
    let videos = readStorageArray(STORAGE_KEYS.instagram);
    videos = videos.filter(v => v.id !== id);
    writeStorageArray(STORAGE_KEYS.instagram, videos);
    renderInstagram();
}

window.toggleIgVideo = function(id) {
    const videos = readStorageArray(STORAGE_KEYS.instagram);
    const video = videos.find(v => v.id === id);
    if (!video) return;
    video.active = !video.active;
    writeStorageArray(STORAGE_KEYS.instagram, videos);
    renderInstagram();
}

function renderInstagram() {
    const grid = document.getElementById('instagramGrid');
    if (!grid) return;
    
    const videos = readStorageArray(STORAGE_KEYS.instagram);
    grid.innerHTML = videos.map(v => `
        <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm ${!v.active ? 'opacity-50' : ''}">
                <div class="card-body">
                    <h6 class="fw-bold mb-3">${v.name}</h6>
                    <div class="ratio ratio-1x1 bg-light rounded d-flex align-items-center justify-content-center mb-3 border position-relative overflow-hidden">
                        <i class="fab fa-instagram fa-3x text-muted position-absolute" style="z-index: 1;"></i>
                        <iframe src="https://www.instagram.com/p/${v.videoCode}/embed" frameborder="0" scrolling="no" allowtransparency="true" class="position-absolute w-100 h-100" style="z-index: 2;"></iframe>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm flex-grow-1 ${v.active ? 'btn-warning' : 'btn-success'}" onclick="toggleIgVideo(${v.id})">
                            ${v.active ? 'Desactivar' : 'Activar'}
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteIgVideo(${v.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    if (videos.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center py-4 text-muted"><p>No hay videos guardados.</p></div>';
    }
}

function bootAdmin() {
    ensurePedidosHaveStatus();
    protectDashboard();
    setupNavigation();
    renderDashboard();
    renderPromociones();
    renderOrders();
    renderDeliveryStatus();
    renderAdminProducts();
    
    setupDeliveryTrips();
    renderVueltas();
    setupInstagram();
    renderInstagram();
    
    // Inicializar Seguridad
    renderSecurityLogs();
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', handlePasswordChange);
    }

    document.getElementById('promoCreateForm')?.addEventListener('submit', savePromocion);
    const prodForm = document.getElementById('productoForm');
    if (prodForm) prodForm.addEventListener('submit', saveProducto);

    const searchInput = document.getElementById('adminSearchProduct');
    if (searchInput) searchInput.addEventListener('input', renderAdminProducts);
    const filterCat = document.getElementById('adminFilterCategory');
    if (filterCat) filterCat.addEventListener('change', renderAdminProducts);

    watchOrdersRealtime();
    setInterval(() => {
        renderDashboard();
        renderOrders();
        watchOrdersRealtime();
    }, 3000);

    window.addEventListener('storage', (event) => {
        if ([STORAGE_KEYS.pedidos, STORAGE_KEYS.promociones, STORAGE_KEYS.carousel, STORAGE_KEYS.delivery, STORAGE_KEYS.productos, STORAGE_KEYS.deliveryTrips, STORAGE_KEYS.instagram].includes(event.key)) {
            renderDashboard();
            renderPromociones();
            renderOrders();
            renderDeliveryStatus();
            renderAdminProducts();
            renderVueltas();
            renderInstagram();
            watchOrdersRealtime();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootAdmin);
} else {
    bootAdmin();
}

/* ==================== SEGURIDAD Y AUDITORÍA ==================== */

function renderSecurityLogs() {
    const container = document.getElementById('securityLogsContainer');
    if (!container) return;

    const logs = Auth.getSecurityLogs();
    
    if (logs.length === 0) {
        const noLogsMsg = document.getElementById('noLogsMsg');
        if (noLogsMsg) noLogsMsg.classList.remove('d-none');
        container.innerHTML = '';
        return;
    }

    const noLogsMsg = document.getElementById('noLogsMsg');
    if (noLogsMsg) noLogsMsg.classList.add('d-none');
    
    // Invertir para ver lo más reciente arriba
    const sortedLogs = [...logs].reverse();

    container.innerHTML = sortedLogs.map(log => {
        const date = new Date(log.timestamp).toLocaleString('es-CL');
        const icon = getSecurityIcon(log.type);
        const color = getSecurityColor(log.type);

        return `
            <div class="d-flex gap-3 mb-3 pb-3 border-bottom border-light">
                <div class="flex-shrink-0">
                    <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; background: ${color}20; color: ${color}">
                        <i class="fas ${icon}"></i>
                    </div>
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between">
                        <h6 class="mb-0 fw-bold small">${log.type}</h6>
                        <span class="text-muted" style="font-size: 0.75rem;">${date}</span>
                    </div>
                    <p class="mb-0 text-muted small">${formatSecurityData(log.data)}</p>
                </div>
            </div>
        `;
    }).join('');
}

function getSecurityIcon(type) {
    const icons = {
        'LOGIN_SUCCESS': 'fa-user-check',
        'LOGIN_FAILED': 'fa-user-times',
        'LOGOUT': 'fa-sign-out-alt',
        'PASSWORD_CHANGED': 'fa-key',
        'PASSWORD_PASTE_ATTEMPT': 'fa-paste'
    };
    return icons[type] || 'fa-shield-alt';
}

function getSecurityColor(type) {
    const colors = {
        'LOGIN_SUCCESS': '#10b981',
        'LOGIN_FAILED': '#ef4444',
        'PASSWORD_CHANGED': '#f59e0b',
        'PASSWORD_PASTE_ATTEMPT': '#3b82f6'
    };
    return colors[type] || '#64748b';
}

function formatSecurityData(data) {
    if (!data) return 'Sin detalles adicionales';
    if (data.email) return `Usuario: ${data.email}`;
    return JSON.stringify(data);
}

function handlePasswordChange(e) {
    e.preventDefault();
    const currentPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmNewPassword').value;

    if (newPass !== confirmPass) {
        alert('❌ Las contraseñas nuevas no coinciden.');
        return;
    }

    if (newPass.length < 8) {
        alert('❌ La nueva contraseña debe tener al menos 8 caracteres.');
        return;
    }

    const result = { success: false, error: 'Cambio de contraseña temporalmente deshabilitado en esta versión.' }; // Auth.changePassword(currentPass, newPass);
    
    if (result.success) {
        alert('✅ Contraseña actualizada correctamente. Se ha registrado el evento de seguridad.');
        e.target.reset();
        renderSecurityLogs();
    } else {
        alert('❌ Error: ' + result.error);
    }
}

// ==========================================
// EXPOSICIÓN GLOBAL (Para compatibilidad con HTML y onclicks)
// ==========================================
window.protectDashboard = protectDashboard;
window.renderDashboard = renderDashboard;
window.setupNavigation = setupNavigation;
window.renderOrders = renderOrders;
window.watchOrdersRealtime = watchOrdersRealtime;
window.updateOrderStatus = updateOrderStatus;
window.verDetallePedido = verDetallePedido;

window.saveProducto = saveProducto;
window.editProducto = editProducto;
window.deleteProducto = deleteProducto;
window.resetProductoForm = resetProductoForm;
window.renderAdminProducts = window.renderAdminProducts || function(){};

window.savePromocion = savePromocion;
window.editPromocion = editPromocion;
window.deletePromocion = deletePromocion;
window.togglePromocion = togglePromocion;
window.resetPromoForm = resetPromoForm;
window.scrollPromo = window.scrollPromo || function(){};

window.setDeliveryStatus = setDeliveryStatus;
window.saveClosingTime = window.saveClosingTime || function(){};
window.setupDeliveryTrips = window.setupDeliveryTrips || function(){};

