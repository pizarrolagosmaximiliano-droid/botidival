// admin.js - Funcionalidad del panel administrativo

// Configurar BASE_URL si no está definido
if (!window.BASE_URL) {
    window.BASE_URL = (() => {
        const href = window.location.href;
        if (href.includes('github.io') || href.includes('botidival')) {
            return '/botidival/';
        }
        return '/';
    })();
}

// Login functionality
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in a real app, this would be server-side)
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = window.BASE_URL + 'admin-dashboard.html';
        } else {
            document.getElementById('errorMessage').style.display = 'block';
        }
    });
}

// Check if logged in for dashboard
if (window.location.pathname.includes('admin-dashboard.html') || window.location.href.includes('admin-dashboard.html')) {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = window.BASE_URL + 'admin-login.html';
    }
}

// Logout functionality
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = window.BASE_URL + 'admin-login.html';
    });
}

// Navigation between sections
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('[id$="Section"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section') + 'Section';

        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show selected section
        document.getElementById(sectionId).style.display = 'block';

        // Update active nav link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
    });
});

// WhatsApp integration
function sendWhatsAppMessage(phone, message) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// WhatsApp buttons in pedidos
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('whatsapp-btn')) {
        const phone = e.target.getAttribute('data-phone');
        const message = e.target.getAttribute('data-message');
        sendWhatsAppMessage(phone, message);
    }
});

// WhatsApp form
if (document.getElementById('whatsappForm')) {
    document.getElementById('whatsappForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.getElementById('phoneNumber').value;
        const message = document.getElementById('message').value;
        sendWhatsAppMessage(phone, message);
    });
}

// Mock data updates (in a real app, this would come from an API)
function updateDashboardStats() {
    // Simulate fetching data
    setTimeout(() => {
        document.getElementById('pedidosHoy').textContent = Math.floor(Math.random() * 20) + 10;
        document.getElementById('ventasTotales').textContent = '$' + (Math.floor(Math.random() * 2000) + 1000) + '.00';
        document.getElementById('pedidosPendientes').textContent = Math.floor(Math.random() * 10) + 1;
        document.getElementById('clientesActivos').textContent = Math.floor(Math.random() * 100) + 20;
    }, 1000);
}

// Update stats on page load
if (document.getElementById('dashboardSection')) {
    updateDashboardStats();
}// Panel Administrativo - Dashboard
class AdminDashboard {
    constructor() {
        this.isLoggedIn = false;
        this.adminUser = {
            username: 'admin',
            password: '1234' // Cambiar en producción
        };
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
        this.promotions = JSON.parse(localStorage.getItem('promotions')) || this.getDefaultPromotions();
        this.deliveryActive = JSON.parse(localStorage.getItem('deliveryActive') !== null ? localStorage.getItem('deliveryActive') : true);
    }

    getDefaultPromotions() {
        return [
            { id: 1, title: 'Pack Pisco Party', description: 'Pisco + Bebida + Hielo', discount: '23%', image: '', active: true },
            { id: 2, title: 'Combo Cervecero', description: '6 Cervezas + Snacks', discount: '14%', image: '', active: true }
        ];
    }

    // Validar login
    validateLogin(username, password) {
        if (username === this.adminUser.username && password === this.adminUser.password) {
            this.isLoggedIn = true;
            localStorage.setItem('adminLoggedIn', 'true');
            return true;
        }
        return false;
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('adminLoggedIn');
        this.showLoginForm();
    }

    // Crear/actualizar promoción
    savePromotion(id, title, description, discount, image) {
        if (id) {
            const index = this.promotions.findIndex(p => p.id === id);
            if (index !== -1) {
                this.promotions[index] = { id, title, description, discount, image, active: this.promotions[index].active };
            }
        } else {
            const newId = Math.max(...this.promotions.map(p => p.id), 0) + 1;
            this.promotions.push({ id: newId, title, description, discount, image, active: true });
        }
        localStorage.setItem('promotions', JSON.stringify(this.promotions));
        return true;
    }

    // Eliminar promoción
    deletePromotion(id) {
        this.promotions = this.promotions.filter(p => p.id !== id);
        localStorage.setItem('promotions', JSON.stringify(this.promotions));
    }

    // Controlar estado de delivery
    toggleDelivery() {
        this.deliveryActive = !this.deliveryActive;
        localStorage.setItem('deliveryActive', JSON.stringify(this.deliveryActive));
        return this.deliveryActive;
    }

    // Guardar pedido
    saveOrder(orderData) {
        const order = {
            id: Date.now(),
            date: new Date().toLocaleDateString('es-CL'),
            time: new Date().toLocaleTimeString('es-CL'),
            cliente: orderData.cliente,
            items: orderData.items,
            subtotal: orderData.subtotal,
            deliveryPrice: orderData.deliveryPrice,
            total: orderData.total,
            status: 'pendiente',
            notas: orderData.notas
        };
        this.orders.push(order);
        localStorage.setItem('orders', JSON.stringify(this.orders));
        return order;
    }

    // Obtener estadísticas
    getStatistics() {
        const stats = {
            totalOrders: this.orders.length,
            totalRevenue: this.orders.reduce((sum, o) => sum + o.total, 0),
            totalDelivery: this.orders.reduce((sum, o) => sum + o.deliveryPrice, 0),
            ordersByCommune: {}
        };

        // Agrupar por comuna
        this.orders.forEach(o => {
            const commune = o.cliente.comuna || 'Otros';
            stats.ordersByCommune[commune] = (stats.ordersByCommune[commune] || 0) + 1;
        });

        return stats;
    }

    // Renderizar panel administrativo
    renderAdminPanel() {
        if (!this.isLoggedIn) {
            this.showLoginForm();
            return;
        }

        const html = `
            <div id="adminPanel" class="admin-panel">
                <div class="admin-header">
                    <h1>📊 Panel Administrativo - Boti Dival</h1>
                    <button class="btn btn-danger" onclick="adminDashboard.logout()">Cerrar Sesión</button>
                </div>

                <div class="admin-tabs">
                    <button class="tab-btn active" onclick="switchAdminTab('dashboard')">Dashboard</button>
                    <button class="tab-btn" onclick="switchAdminTab('promotions')">Promociones</button>
                    <button class="tab-btn" onclick="switchAdminTab('orders')">Pedidos</button>
                    <button class="tab-btn" onclick="switchAdminTab('reports')">Reportes</button>
                    <button class="tab-btn" onclick="switchAdminTab('settings')">Configuración</button>
                </div>

                <!-- TAB: Dashboard -->
                <div id="dashboardTab" class="admin-tab active">
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <h3>📦 Total de Pedidos</h3>
                            <p class="stat-number">${this.orders.length}</p>
                        </div>
                        <div class="stat-card">
                            <h3>💰 Ingresos Totales</h3>
                            <p class="stat-number">$${this.getStatistics().totalRevenue.toLocaleString('es-CL')}</p>
                        </div>
                        <div class="stat-card">
                            <h3>🚚 Ganancias Delivery</h3>
                            <p class="stat-number">$${this.getStatistics().totalDelivery.toLocaleString('es-CL')}</p>
                        </div>
                    </div>

                    <div class="recent-orders">
                        <h3>📋 Últimos Pedidos</h3>
                        <table class="orders-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Comuna</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.orders.slice(-5).reverse().map(o => `
                                    <tr>
                                        <td>${o.date}</td>
                                        <td>${o.cliente.nombre}</td>
                                        <td>${o.cliente.comuna}</td>
                                        <td>$${o.total.toLocaleString('es-CL')}</td>
                                        <td><span class="status-badge">${o.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- TAB: Promotions -->
                <div id="promotionsTab" class="admin-tab">
                    <div class="promotions-actions">
                        <button class="btn btn-primary" onclick="openPromoForm()">+ Nueva Promoción</button>
                    </div>

                    <div id="promoForm" class="promo-form" style="display: none;">
                        <h3>Crear/Editar Promoción</h3>
                        <form onsubmit="savePromoForm(event)">
                            <input type="hidden" id="promoId">
                            <div class="form-group">
                                <label>Título *</label>
                                <input type="text" id="promoTitle" required>
                            </div>
                            <div class="form-group">
                                <label>Descripción *</label>
                                <textarea id="promoDescription" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Descuento (%) *</label>
                                <input type="number" id="promoDiscount" required>
                            </div>
                            <div class="form-group">
                                <label>Imagen (URL)</label>
                                <input type="url" id="promoImage" placeholder="https://...">
                            </div>
                            <button type="submit" class="btn btn-success">Guardar</button>
                            <button type="button" class="btn btn-secondary" onclick="closePromoForm()">Cancelar</button>
                        </form>
                    </div>

                    <div class="promotions-list">
                        ${this.promotions.map(p => `
                            <div class="promo-admin-card">
                                <div class="promo-header">
                                    <h4>${p.title}</h4>
                                    <span class="promo-badge">${p.discount}</span>
                                </div>
                                <p>${p.description}</p>
                                <div class="promo-actions">
                                    <button class="btn btn-sm btn-primary" onclick="editPromo(${p.id})">Editar</button>
                                    <button class="btn btn-sm btn-danger" onclick="deletePromo(${p.id})">Eliminar</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- TAB: Orders -->
                <div id="ordersTab" class="admin-tab">
                    <div class="filters">
                        <input type="date" id="dateFilter" onchange="filterOrdersByDate()">
                        <select id="communeFilter" onchange="filterOrdersByCommune()">
                            <option value="">Todas las comunas</option>
                            ${Object.keys(this.getStatistics().ordersByCommune).map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>

                    <table class="orders-table full">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Cliente</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Comuna</th>
                                <th>Sector</th>
                                <th>Costo Delivery</th>
                                <th>Total</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody id="ordersTableBody">
                            ${this.orders.map(o => `
                                <tr>
                                    <td>${o.date}</td>
                                    <td>${o.time}</td>
                                    <td>${o.cliente.nombre}</td>
                                    <td>${o.cliente.telefono}</td>
                                    <td>${o.cliente.direccion}</td>
                                    <td>${o.cliente.comuna}</td>
                                    <td>${o.cliente.sector}</td>
                                    <td>$${o.deliveryPrice.toLocaleString('es-CL')}</td>
                                    <td>$${o.total.toLocaleString('es-CL')}</td>
                                    <td><button class="btn btn-sm btn-info" onclick="viewOrder(${o.id})">Ver</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- TAB: Reports -->
                <div id="reportsTab" class="admin-tab">
                    <div class="reports-grid">
                        <div class="report-card">
                            <h3>📈 Pedidos por Comuna</h3>
                            <ul>
                                ${Object.entries(this.getStatistics().ordersByCommune).map(([c, count]) => `
                                    <li>${c}: <strong>${count}</strong> pedidos</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="report-card">
                            <h3>💹 Resumen Financiero</h3>
                            <ul>
                                <li>Total Ingresos: <strong>$${this.getStatistics().totalRevenue.toLocaleString('es-CL')}</strong></li>
                                <li>Ingresos por Delivery: <strong>$${this.getStatistics().totalDelivery.toLocaleString('es-CL')}</strong></li>
                                <li>Ingresos por Productos: <strong>$${(this.getStatistics().totalRevenue - this.getStatistics().totalDelivery).toLocaleString('es-CL')}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- TAB: Settings -->
                <div id="settingsTab" class="admin-tab">
                    <div class="settings-group">
                        <h3>🚚 Estado del Delivery</h3>
                        <div class="setting-item">
                            <label>Delivery Status</label>
                            <button class="btn btn-toggle ${this.deliveryActive ? 'active' : ''}" onclick="toggleDeliveryStatus()">
                                ${this.deliveryActive ? '✓ Activo' : '✕ Inactivo'}
                            </button>
                            <p class="setting-note">${this.deliveryActive ? 'El delivery está disponible' : 'Mostrando: Solo ventas presenciales disponibles'}</p>
                        </div>
                    </div>

                    <div class="settings-group">
                        <h3>📥 Exportar Datos</h3>
                        <button class="btn btn-primary" onclick="exportOrdersToCSV()">📊 Descargar Pedidos (CSV)</button>
                        <button class="btn btn-primary" onclick="exportReportsToExcel()">📈 Descargar Reporte (Excel)</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', html);
    }

    showLoginForm() {
        const loginHTML = `
            <div id="adminLoginModal" class="modal-overlay">
                <div class="modal-content">
                    <h2>🔐 Acceso Administrativo</h2>
                    <form onsubmit="handleAdminLogin(event)">
                        <div class="form-group">
                            <label>Usuario</label>
                            <input type="text" id="adminUsername" required>
                        </div>
                        <div class="form-group">
                            <label>Contraseña</label>
                            <input type="password" id="adminPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Ingresar</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', loginHTML);
    }
}

// Instancia global
let adminDashboard = new AdminDashboard();

// Funciones globales del admin
function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function handleAdminLogin(e) {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    if (adminDashboard.validateLogin(username, password)) {
        document.getElementById('adminLoginModal').remove();
        adminDashboard.renderAdminPanel();
    } else {
        alert('Credenciales incorrectas');
    }
}

function openPromoForm() {
    document.getElementById('promoForm').style.display = 'block';
}

function closePromoForm() {
    document.getElementById('promoForm').style.display = 'none';
    document.getElementById('promoId').value = '';
    document.getElementById('promoTitle').value = '';
    document.getElementById('promoDescription').value = '';
    document.getElementById('promoDiscount').value = '';
}

function savePromoForm(e) {
    e.preventDefault();
    const id = document.getElementById('promoId').value ? parseInt(document.getElementById('promoId').value) : null;
    adminDashboard.savePromotion(id, 
        document.getElementById('promoTitle').value,
        document.getElementById('promoDescription').value,
        document.getElementById('promoDiscount').value,
        document.getElementById('promoImage').value
    );
    closePromoForm();
    location.reload();
}

function deletePromo(id) {
    if (confirm('¿Eliminar esta promoción?')) {
        adminDashboard.deletePromotion(id);
        location.reload();
    }
}

function toggleDeliveryStatus() {
    const newStatus = adminDashboard.toggleDelivery();
    alert(`Delivery ${newStatus ? 'Activado' : 'Desactivado'}`);
    location.reload();
}

function exportOrdersToCSV() {
    let csv = 'Fecha,Hora,Cliente,Teléfono,Dirección,Comuna,Sector,Delivery,Total\n';
    adminDashboard.orders.forEach(o => {
        csv += `${o.date},${o.time},"${o.cliente.nombre}",${o.cliente.telefono},"${o.cliente.direccion}",${o.cliente.comuna},${o.cliente.sector},${o.deliveryPrice},${o.total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedidos-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// ===== FUNCIONES DE CONTROL DE PEDIDOS =====

// Variables globales para control de pedidos
let pedidosFiltrados = [];

// Inicializar dashboard de pedidos cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin-dashboard.html')) {
        // Inicializar dashboard de control de pedidos
        renderPedidosDashboard();
        renderPedidosHistorial();
    }
});

// Calcular estadísticas de pedidos
function getPedidosStats() {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - 7);
    
    const stats = {
        totalPedidos: pedidosHistorial.length,
        pedidosHoy: 0,
        pedidosSemana: 0,
        pedidosDelivery: 0,
        ingresosTotales: 0,
        ingresosHoy: 0,
        ingresosDelivery: 0
    };
    
    pedidosHistorial.forEach(pedido => {
        const fechaPedido = new Date(pedido.fecha);
        
        // Pedidos de hoy
        if (fechaPedido.toDateString() === hoy.toDateString()) {
            stats.pedidosHoy++;
            stats.ingresosHoy += pedido.costos.total;
        }
        
        // Pedidos de la semana
        if (fechaPedido >= inicioSemana) {
            stats.pedidosSemana++;
        }
        
        // Pedidos delivery
        if (pedido.tipo === 'delivery') {
            stats.pedidosDelivery++;
            stats.ingresosDelivery += pedido.costos.delivery;
        }
        
        // Ingresos totales
        stats.ingresosTotales += pedido.costos.total;
    });
    
    return stats;
}

// Renderizar dashboard de estadísticas
function renderPedidosDashboard() {
    const stats = getPedidosStats();
    
    document.getElementById('totalPedidos').textContent = stats.totalPedidos;
    document.getElementById('pedidosHoy').textContent = stats.pedidosHoy;
    document.getElementById('pedidosSemana').textContent = stats.pedidosSemana;
    document.getElementById('pedidosDelivery').textContent = stats.pedidosDelivery;
    
    document.getElementById('ingresosTotales').textContent = `$${stats.ingresosTotales.toLocaleString('es-CL')}`;
    document.getElementById('ingresosHoy').textContent = `$${stats.ingresosHoy.toLocaleString('es-CL')}`;
    document.getElementById('ingresosDelivery').textContent = `$${stats.ingresosDelivery.toLocaleString('es-CL')}`;
}

// Renderizar tabla de historial de pedidos
function renderPedidosHistorial(filtrados = null) {
    const pedidos = filtrados || pedidosHistorial;
    const tbody = document.getElementById('pedidosTableBody');
    
    tbody.innerHTML = pedidos.map(pedido => {
        const fecha = new Date(pedido.fecha);
        const productosCount = pedido.productos.length;
        const productosText = productosCount === 1 ? 
            pedido.productos[0].nombre : 
            `${productosCount} productos`;
        
        return `
            <tr>
                <td>${pedido.id}</td>
                <td>${fecha.toLocaleDateString('es-CL')} ${fecha.toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}</td>
                <td>${pedido.cliente.nombre}</td>
                <td>
                    <span class="badge ${pedido.tipo === 'delivery' ? 'bg-primary' : 'bg-secondary'}">
                        ${pedido.tipo === 'delivery' ? '🚚 Delivery' : '🏪 Presencial'}
                    </span>
                </td>
                <td>${pedido.cliente.comuna} - ${pedido.cliente.sector}</td>
                <td>${productosText}</td>
                <td>$${pedido.costos.delivery.toLocaleString('es-CL')}</td>
                <td><strong>$${pedido.costos.total.toLocaleString('es-CL')}</strong></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="verDetallePedido(${pedido.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Filtrar pedidos
function filtrarPedidos() {
    const tipoFiltro = document.getElementById('filtroTipo').value;
    const fechaFiltro = document.getElementById('filtroFecha').value;
    
    let filtrados = pedidosHistorial;
    
    // Filtrar por tipo
    if (tipoFiltro !== 'todos') {
        filtrados = filtrados.filter(p => p.tipo === tipoFiltro);
    }
    
    // Filtrar por fecha
    if (fechaFiltro) {
        const fechaSeleccionada = new Date(fechaFiltro);
        filtrados = filtrados.filter(p => {
            const fechaPedido = new Date(p.fecha);
            return fechaPedido.toDateString() === fechaSeleccionada.toDateString();
        });
    }
    
    renderPedidosHistorial(filtrados);
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtroTipo').value = 'todos';
    document.getElementById('filtroFecha').value = '';
    renderPedidosHistorial();
}

// Ver detalle del pedido
function verDetallePedido(id) {
    const pedido = pedidosHistorial.find(p => p.id === id);
    if (!pedido) return;
    
    // Llenar modal con datos del pedido
    document.getElementById('modalPedidoId').textContent = pedido.id;
    document.getElementById('modalClienteNombre').textContent = pedido.cliente.nombre;
    document.getElementById('modalClienteTelefono').textContent = pedido.cliente.telefono;
    document.getElementById('modalClienteComuna').textContent = pedido.cliente.comuna;
    document.getElementById('modalClienteSector').textContent = pedido.cliente.sector;
    document.getElementById('modalClienteDireccion').textContent = pedido.cliente.direccion;
    document.getElementById('modalClienteCoordenadas').textContent = pedido.cliente.coordenadas || 'No especificadas';
    
    const fecha = new Date(pedido.fecha);
    document.getElementById('modalPedidoFecha').textContent = 
        `${fecha.toLocaleDateString('es-CL')} ${fecha.toLocaleTimeString('es-CL')}`;
    document.getElementById('modalPedidoTipo').textContent = 
        pedido.tipo === 'delivery' ? '🚚 Delivery' : '🏪 Presencial';
    document.getElementById('modalPedidoComentarios').textContent = pedido.comentarios || 'Sin comentarios';
    
    // Llenar tabla de productos
    const productosTable = document.getElementById('modalProductosTable');
    productosTable.innerHTML = pedido.productos.map(producto => `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precioUnitario.toLocaleString('es-CL')}</td>
            <td>$${producto.subtotal.toLocaleString('es-CL')}</td>
        </tr>
    `).join('');
    
    // Llenar resumen de costos
    document.getElementById('modalSubtotal').textContent = pedido.costos.subtotal.toLocaleString('es-CL');
    document.getElementById('modalDelivery').textContent = pedido.costos.delivery.toLocaleString('es-CL');
    document.getElementById('modalTotal').textContent = pedido.costos.total.toLocaleString('es-CL');
    
    // Configurar botón de reenviar
    document.getElementById('reenviarPedidoBtn').onclick = () => reenviarPedidoWhatsApp(id);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('pedidoDetailModal'));
    modal.show();
}

// Reenviar pedido por WhatsApp
function reenviarPedidoWhatsApp(id) {
    const pedido = pedidosHistorial.find(p => p.id === id);
    if (!pedido) return;
    
    // Construir mensaje de WhatsApp
    let mensaje = `🛒 *PEDIDO #${pedido.id}*\n\n`;
    mensaje += `👤 *Cliente:* ${pedido.cliente.nombre}\n`;
    mensaje += `📞 *Teléfono:* ${pedido.cliente.telefono}\n`;
    mensaje += `📍 *Dirección:* ${pedido.cliente.direccion}, ${pedido.cliente.sector}, ${pedido.cliente.comuna}\n\n`;
    
    mensaje += `🛍️ *PRODUCTOS:*\n`;
    pedido.productos.forEach(producto => {
        mensaje += `• ${producto.nombre} x${producto.cantidad} = $${producto.subtotal.toLocaleString('es-CL')}\n`;
    });
    
    mensaje += `\n💰 *TOTAL:* $${pedido.costos.total.toLocaleString('es-CL')}`;
    if (pedido.costos.delivery > 0) {
        mensaje += ` (Delivery: $${pedido.costos.delivery.toLocaleString('es-CL')})`;
    }
    
    if (pedido.comentarios) {
        mensaje += `\n\n📝 *Comentarios:* ${pedido.comentarios}`;
    }
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroWhatsApp = pedido.cliente.telefono.replace(/\D/g, ''); // Solo números
    
    // Abrir WhatsApp
    window.open(`https://wa.me/56${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
}
