// src/services/imgbb.service.js

/**
 * Sube una imagen a ImgBB y devuelve la URL pública.
 * @param {File|Blob|string} imageFile - El archivo de imagen o base64 (sin el prefijo data:image/...).
 * @returns {Promise<string|null>} URL de la imagen subida o null si falla.
 */
export async function uploadImageToImgBB(imageFile) {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
        console.error("No se encontró la API Key de ImgBB en las variables de entorno.");
        return null;
    }

    const formData = new FormData();
    
    // Si la imagen es un archivo
    if (imageFile instanceof File || imageFile instanceof Blob) {
        formData.append('image', imageFile);
    } 
    // Si la imagen es un base64 (en caso de que vengamos de un canvas o de la versión legacy)
    else if (typeof imageFile === 'string') {
        // Limpiar el prefijo si lo tiene
        const base64Data = imageFile.replace(/^data:image\/[a-z]+;base64,/, "");
        formData.append('image', base64Data);
    } else {
        console.error("Formato de imagen no soportado.");
        return null;
    }

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return data.data.url; // Retorna la URL directa de la imagen
        } else {
            console.error("Error al subir imagen a ImgBB:", data.error.message);
            return null;
        }
    } catch (error) {
        console.error("Excepción al subir a ImgBB:", error);
        return null;
    }
}
