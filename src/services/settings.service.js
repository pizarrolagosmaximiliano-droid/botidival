// src/services/settings.service.js
import { db } from '../firebase/config.js';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

const SETTINGS_DOC_PATH = 'settings/store';

/**
 * Escucha la configuración de la tienda (Delivery, Horarios, etc.) en tiempo real.
 */
export function listenToSettings(callback) {
    const docRef = doc(db, SETTINGS_DOC_PATH);
    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data());
        } else {
            // Valores por defecto si no existe el documento
            callback({
                deliveryEnabled: true,
                closingTime: '00:00'
            });
        }
    }, (error) => {
        console.error("Error al escuchar configuración:", error);
    });
}

/**
 * Actualiza la configuración en Firestore.
 */
export async function updateSettings(newData) {
    try {
        const docRef = doc(db, SETTINGS_DOC_PATH);
        await setDoc(docRef, newData, { merge: true });
        return { success: true };
    } catch (error) {
        console.error("Error al actualizar configuración:", error);
        return { success: false, error };
    }
}

/**
 * Obtiene la configuración actual una sola vez.
 */
export async function getSettings() {
    try {
        const docRef = doc(db, SETTINGS_DOC_PATH);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error al obtener configuración:", error);
        return null;
    }
}
