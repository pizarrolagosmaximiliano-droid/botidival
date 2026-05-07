/* ==================== CONFIGURACIÓN Y DATOS ==================== */

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
    { id: 11, name: 'Pack Cerveza Corona', category: 'cervezas', price: 14900, image: 'images/pack corona .jpeg', description: 'Balde/Pack 6 Botellas - 355ml c/u', popular: true, active: true },
    { id: 12, name: 'Vino Gato Negro Tinto', category: 'vinos', price: 3900, image: 'images/gato1.jpg.jpeg', description: 'Botella 1.5L - Varietal Cabernet Sauvignon', active: true },
    { id: 13, name: 'Vino Gato Negro Blanco', category: 'vinos', price: 3900, image: 'images/gato2.jpg.jpeg', description: 'Botella 1.5L - Varietal Sauvignon Blanc', active: true },
    { id: 14, name: 'Monster Energy', category: 'bebidas', price: 2500, image: 'images/monster.jpg.jpeg', description: 'Lata 473ml - Energía extrema', active: true },
    { id: 15, name: 'Bebida Coca-Cola 1.5L', category: 'bebidas', price: 2200, image: 'images/coca.jpg.jpeg', description: 'Botella 1.5L - Sabor original', active: true },
    { id: 16, name: 'Bebida Sprite 1.5L', category: 'bebidas', price: 2200, image: 'images/sprite.jpg.jpeg', description: 'Botella 1.5L - Lima-limón', active: true },
    { id: 17, name: 'Bolsa de Hielo 2kg', category: 'hielo', price: 1500, image: 'images/hielo.jpg.jpeg', description: 'Hielo en cubitos purificado', active: true },
    { id: 18, name: 'Deli Snacks Mix', category: 'snacks', price: 4500, image: 'images/snacks.jpg.jpeg', description: 'Variedad de snacks premium para compartir', active: true }
];

const DELIVERY_ZONES = {
    'donihue': {
        name: 'Doñihue',
        sectors: [
            { id: 'centro', name: 'Doñihue Centro', cost: 6600 },
            { id: 'cerrillos', name: 'Cerrillos', cost: 6000 }
        ]
    },
    'coltauco': {
        name: 'Coltauco',
        sectors: [
            { id: 'quimavida', name: 'Quimávida', cost: 6000 },
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

const STORAGE_KEYS = {
    productos: 'productos',
    pedidos: 'pedidosHistorial',
    promociones: 'promociones',
    carousel: 'carouselImages',
    delivery: 'deliveryStatus',
    deliveryTrips: 'deliveryTripsHistory',
    instagram: 'instagramVideos',
    deliverySchedule: 'deliverySchedule'
};
