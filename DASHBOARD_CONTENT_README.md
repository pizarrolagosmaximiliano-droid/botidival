# Dashboard Administrativo - Gestión de Contenido

## Nuevas Funcionalidades

### 🎁 **Gestión de Promociones**

#### Crear Promociones
1. Ve al panel admin (`admin-dashboard.html`)
2. Selecciona "Promociones" en el menú lateral
3. Haz clic en "Crear Nueva Promoción"
4. Completa los campos:
   - **URL de Imagen**: Link a la imagen de la promoción
   - **Título**: Nombre de la promoción
   - **Descripción**: Detalles de la oferta
   - **Precio**: Precio especial (opcional)

#### Gestionar Promociones
- **Activar/Pausar**: Controla si se muestra en la web
- **Eliminar**: Remueve la promoción permanentemente
- Las promociones activas se muestran automáticamente en la página principal

### 🎬 **Gestión de Videos**

#### Subir Videos
1. Ve al panel admin
2. Selecciona "Videos" en el menú lateral
3. Haz clic en "Subir Nuevo Video"
4. Completa los campos:
   - **URL del Video**: Link de YouTube (ej: https://www.youtube.com/watch?v=VIDEO_ID)
   - **Título**: Nombre del video
   - **Descripción**: Descripción opcional

#### Gestionar Videos
- **Activar/Pausar**: Controla si se muestra en la web
- **Eliminar**: Remueve el video permanentemente
- Los videos activos se muestran en la sección de videos de la web

### 🚚 **Estado del Delivery**

#### Control del Servicio
1. Ve al panel admin
2. Selecciona "Estado Delivery" en el menú lateral
3. Usa los botones para:
   - **Activar Delivery**: Servicio normal
   - **Desactivar Delivery**: Solo ventas presenciales

#### Estados
- **Activo**: Delivery funcionando normalmente
- **Fuera de Servicio**: Muestra banner "Solo ventas presenciales" y oculta opciones de delivery

## Persistencia de Datos

- **Promociones**: Guardadas en `localStorage` como 'promociones'
- **Videos**: Guardados en `localStorage` como 'videos'
- **Estado Delivery**: Guardado en `localStorage` como 'deliveryStatus'

## Estructura de Archivos

```
admin-dashboard.html    # Panel administrativo
admin.js               # Funcionalidad del dashboard
admin.css              # Estilos del dashboard
index.html            # Página principal (actualizada)
script.js             # Funcionalidad web (actualizada)
styles.css            # Estilos web (actualizados)
```

## Funciones JavaScript Agregadas

### Dashboard
- `showPromoForm()` / `hidePromoForm()`: Mostrar/ocultar formulario de promociones
- `savePromocion()`: Guardar nueva promoción
- `deletePromocion()` / `togglePromocion()`: Gestionar promociones
- `renderPromociones()`: Mostrar promociones en el dashboard

- `showVideoForm()` / `hideVideoForm()`: Mostrar/ocultar formulario de videos
- `saveVideo()`: Guardar nuevo video
- `deleteVideo()` / `toggleVideo()`: Gestionar videos
- `renderVideos()`: Mostrar videos en el dashboard

- `setDeliveryStatus()`: Cambiar estado del delivery
- `updateDeliveryStatusUI()`: Actualizar interfaz del dashboard

### Web
- `updateWebPromociones()`: Mostrar promociones activas en la web
- `updateWebVideos()`: Mostrar videos activos en la web
- `updateDeliveryDisplay()`: Mostrar/ocultar banner de delivery

## Secciones Web Agregadas

### Promociones
- Se muestra entre búsqueda y productos
- Grid responsivo de tarjetas
- Solo promociones activas son visibles

### Videos
- Sección dedicada después de promociones
- Videos embebidos de YouTube
- Grid responsivo

### Estado Delivery
- Banner rojo cuando está desactivado
- Actualización de barra de estado
- Ocultar/mostrar features de delivery

## Notas Técnicas

- **Responsive**: Todas las secciones se adaptan a móviles
- **Validación**: URLs de YouTube se validan automáticamente
- **Almacenamiento**: Datos persisten entre sesiones
- **Actualización**: Cambios en dashboard se reflejan inmediatamente en la web

## Próximas Mejoras

- Subida directa de imágenes (sin URLs)
- Editor de texto enriquecido para descripciones
- Programación de promociones por fecha
- Estadísticas de visualización
- Categorización de videos</content>
<parameter name="filePath">c:\Users\maxim\Desktop\Boti Dival\DASHBOARD_CONTENT_README.md