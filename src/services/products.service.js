// src/services/products.service.js
import { db } from '../firebase/config.js';
import { 
    collection, doc, getDocs, getDoc, setDoc, 
    deleteDoc, onSnapshot, query, orderBy 
} from 'firebase/firestore';

// COLECCIONES
const PRODUCTS_COLLECTION = 'products';
const PROMOTIONS_COLLECTION = 'promotions';

// ================= PRODUCTOS =================

/**
 * Escucha los productos en tiempo real.
 * Ideal para el cliente (index.html) y el admin.
 */
export function listenToProducts(callback) {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(products);
    }, (error) => {
        console.error("Error al escuchar productos:", error);
        callback([]);
    });
}

/**
 * Agrega o actualiza un producto
 */
export async function saveProductToDB(productData) {
    try {
        const id = productData.id ? productData.id.toString() : Date.now().toString();
        const docRef = doc(db, PRODUCTS_COLLECTION, id);
        
        // Guardamos todo excepto el id si lo tiene duplicado en data, aunque no pasa nada
        await setDoc(docRef, productData, { merge: true });
        return { success: true, id };
    } catch (error) {
        console.error("Error al guardar producto:", error);
        return { success: false, error };
    }
}

/**
 * Elimina un producto
 */
export async function deleteProductFromDB(id) {
    try {
        await deleteDoc(doc(db, PRODUCTS_COLLECTION, id.toString()));
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return { success: false, error };
    }
}

// ================= PROMOCIONES =================

export function listenToPromotions(callback) {
    const q = query(collection(db, PROMOTIONS_COLLECTION));
    return onSnapshot(q, (snapshot) => {
        const promos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(promos);
    }, (error) => {
        console.error("Error al escuchar promociones:", error);
        callback([]);
    });
}

export async function savePromotionToDB(promoData) {
    try {
        const id = promoData.id ? promoData.id.toString() : Date.now().toString();
        const docRef = doc(db, PROMOTIONS_COLLECTION, id);
        await setDoc(docRef, promoData, { merge: true });
        return { success: true, id };
    } catch (error) {
        console.error("Error al guardar promoción:", error);
        return { success: false, error };
    }
}

export async function deletePromotionFromDB(id) {
    try {
        await deleteDoc(doc(db, PROMOTIONS_COLLECTION, id.toString()));
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar promoción:", error);
        return { success: false, error };
    }
}
