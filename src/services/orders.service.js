// src/services/orders.service.js
import { db } from '../firebase/config.js';
import { 
    collection, doc, getDocs, getDoc, setDoc, updateDoc,
    deleteDoc, onSnapshot, query, orderBy, addDoc, serverTimestamp 
} from 'firebase/firestore';

const ORDERS_COLLECTION = 'orders';

/**
 * Escucha todos los pedidos en tiempo real.
 * Usado por el panel de administración.
 */
export function listenToOrders(callback) {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('fecha', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(orders);
    }, (error) => {
        console.error("Error al escuchar pedidos:", error);
        callback([]);
    });
}

/**
 * Crea un nuevo pedido en la base de datos.
 * Usado por el cliente al finalizar el checkout.
 */
export async function createOrderToDB(orderData) {
    try {
        // En Firestore, es mejor dejar que genere el ID automáticamente o usar uno propio (como el timestamp)
        // Para mantener compatibilidad, podemos usar la fecha como string en un doc personalizado, 
        // pero usaremos `addDoc` para generar un ID único limpio o `setDoc` con el ID numérico
        const id = orderData.id ? orderData.id.toString() : Date.now().toString();
        const docRef = doc(db, ORDERS_COLLECTION, id);
        
        await setDoc(docRef, {
            ...orderData,
            createdAt: serverTimestamp() // Tiempo del servidor para evitar problemas de relojes locales
        });
        
        return { success: true, id };
    } catch (error) {
        console.error("Error al crear pedido:", error);
        return { success: false, error };
    }
}

/**
 * Actualiza el estado de un pedido.
 * Usado por el administrador.
 */
export async function updateOrderStatusInDB(orderId, newStatus) {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, orderId.toString());
        await updateDoc(docRef, {
            estado: newStatus,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error al actualizar estado del pedido:", error);
        return { success: false, error };
    }
}
