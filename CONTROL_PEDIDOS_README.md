# Sistema de Control de Pedidos

## Descripción

Sistema completo para gestionar y controlar todos los pedidos realizados a través de la plataforma. Incluye estadísticas en tiempo real, historial detallado y filtros avanzados.

## Funcionalidades

### 📊 **Estadísticas en Tiempo Real**
- **Total de pedidos**: Conteo acumulado de todos los pedidos
- **Pedidos del día**: Pedidos realizados en la fecha actual
- **Pedidos de la semana**: Pedidos de los últimos 7 días
- **Ingresos totales**: Suma de todos los montos facturados
- **Ingresos del día**: Facturación del día actual
- **Ingresos por delivery**: Total recaudado solo por costos de envío

### 📈 **Métricas por Tipo**
- **Pedidos delivery**: Cantidad de pedidos con envío a domicilio
- **Pedidos presenciales**: Cantidad de retiros en tienda
- **Distribución porcentual**: Proporción entre delivery y presencial

### 📋 **Historial Completo**
Cada pedido registra automáticamente:
- **ID único**: Identificador numérico del pedido
- **Fecha y hora**: Timestamp exacto del pedido
- **Cliente**: Nombre, teléfono, ubicación completa
- **Tipo**: Delivery o presencial
- **Productos**: Lista detallada con cantidades y precios
- **Costos**: Subtotal, delivery y total
- **Comentarios**: Notas especiales del cliente

### 🔍 **Sistema de Filtros**
- **Por tipo**: Todos, delivery o presenciales
- **Por fecha**: Filtrar pedidos de una fecha específica
- **Combinación**: Usar ambos filtros simultáneamente

### 👁️ **Vista Detallada**
- **Modal expandido**: Ver todos los detalles del pedido
- **Información del cliente**: Datos completos de contacto
- **Lista de productos**: Cantidades, precios y subtotales
- **Resumen financiero**: Desglose completo de costos
- **Reenvío**: Opción de reenviar pedido por WhatsApp

## 🗺️ **Tabla de Delivery**

### **Doñihue**
- **Centro**: $6.600
- **Cerrillos**: $6.000

### **Coltauco**
- **Quimávida**: $6.000
- **Lo de Cuevas**: $5.800
- **Hijuela del Medio**: $5.800
- **Rinconada de Parral**: $4.700
- **Cuesta de Idahue**: $4.600
- **El Molino**: $4.300
- **Montegrande**: $4.200
- **El Loreto**: $4.000

### **Cálculo Automático**
- El costo de delivery se calcula automáticamente al seleccionar comuna y sector
- Se muestra en tiempo real en el formulario de pedido
- Se incluye automáticamente en el mensaje de WhatsApp
- Se registra en el historial de pedidos

## Registro Automático

### ✅ **Al Completar Pedido**
Cuando un cliente finaliza su pedido:
1. Se registra automáticamente en el historial
2. Se guarda en `localStorage` como 'pedidosHistorial'
3. Se actualizan las estadísticas en tiempo real
4. Se incluye toda la información del formulario

### 📍 **Datos Registrados**
- Ubicación completa (comuna, sector, dirección)
- Costo de delivery calculado
- Coordenadas GPS (si se proporcionaron)
- Todos los productos del carrito
- Información de contacto del cliente

## Dashboard Administrativo

### 📊 **Panel de Estadísticas**
- Cards con métricas principales
- Actualización automática al cargar
- Visualización clara y responsive

### 📋 **Tabla de Historial**
- Vista tabular completa
- Columnas: ID, Fecha, Cliente, Tipo, Ubicación, Productos, Delivery, Total, Acciones
- Paginación implícita (scroll)
- Acciones: Ver detalle

### 🎛️ **Controles de Filtro**
- Selectores intuitivos
- Aplicación inmediata de filtros
- Botón para limpiar filtros

## Persistencia de Datos

- **localStorage**: `pedidosHistorial` - Array de objetos de pedidos
- **Estructura JSON**: Datos estructurados para fácil manipulación
- **Backup automático**: Cada pedido se guarda inmediatamente

## Estructura de Datos

```javascript
{
  id: 1001,                    // Número único
  fecha: "2024-01-15T14:30:00.000Z", // ISO string
  tipo: "delivery",            // "delivery" | "presencial"
  cliente: {
    nombre: "Juan Pérez",
    telefono: "+56912345678",
    comuna: "Coltauco",
    sector: "Centro",
    direccion: "Calle Principal 123",
    coordenadas: "-34.4567, -71.1234" // Opcional
  },
  productos: [
    {
      id: 1,
      nombre: "Cerveza Artesanal Golden",
      cantidad: 2,
      precioUnitario: 3500,
      subtotal: 7000
    }
  ],
  costos: {
    subtotal: 19900,    // Suma de productos
    delivery: 0,        // Costo de envío
    total: 19900        // Total final
  },
  comentarios: "Entregar después de las 20:00" // Opcional
}
```

## Funciones JavaScript

### Estadísticas
- `getPedidosStats()`: Calcula todas las métricas
- `renderPedidosDashboard()`: Actualiza dashboard

### Historial
- `renderPedidosHistorial()`: Muestra tabla filtrada
- `filtrarPedidos()`: Aplica filtros
- `limpiarFiltros()`: Resetea filtros

### Detalles
- `verDetallePedido(id)`: Modal con detalles completos
- `closePedidoDetail()`: Cierra modal
- `reenviarPedidoWhatsApp(id)`: Reenvía pedido

## Archivos Modificados

- `admin-dashboard.html`: Nueva sección "Control Pedidos"
- `script.js`: Funciones de control y estadísticas
- `styles.css`: Estilos para modales y tablas

## Próximas Mejoras

- Exportación a Excel/CSV
- Gráficos de tendencias
- Filtros por rango de fechas
- Búsqueda por cliente
- Estadísticas mensuales/anuales
- Notificaciones de nuevos pedidos</content>
<parameter name="filePath">c:\Users\maxim\Desktop\Boti Dival\CONTROL_PEDIDOS_README.md