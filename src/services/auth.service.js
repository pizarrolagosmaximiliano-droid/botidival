// src/services/auth.service.js
import { auth } from '../firebase/config.js';
import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';

/**
 * Inicia sesión con Firebase Auth
 */
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Login Error:", error);
        let message = 'Error de autenticación';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            message = 'Credenciales inválidas.';
        } else if (error.code === 'auth/too-many-requests') {
            message = 'Demasiados intentos. Cuenta temporalmente bloqueada.';
        }
        return { success: false, error: message };
    }
}

/**
 * Cierra sesión
 */
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, error };
    }
}

/**
 * Verifica si hay un usuario autenticado (Promesa)
 */
export function checkAuth() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); // solo queremos saber el estado actual
            resolve(user);
        });
    });
}

/**
 * Obtiene el usuario actual (sincrono, puede ser null si no ha cargado)
 */
export function getCurrentUser() {
    return auth.currentUser;
}
