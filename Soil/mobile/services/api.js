import axios from 'axios';

// Backend URL'ni sozlang
const API_BASE_URL = 'http://SIZNING_SERVER_IP:8000';  // Buni o'zgartiring!

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Tuproq rasmini tahlil qilish
 * @param {string} imageUri - Rasmning mahalliy URI
 * @returns {Promise} Tahlil natijalari
 */
export const analyzeSoil = async (imageUri) => {
  try {
    const formData = new FormData();
    
    // URI dan fayl nomini olish
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';
    
    formData.append('file', {
      uri: imageUri,
      name: filename,
      type: type,
    });
    
    const response = await api.post('/analyze-soil', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('API Xatosi:', error);
    throw error;
  }
};

/**
 * PDF yuklab olish URL'ni olish
 * @param {string} pdfPath - Tahlil natijasidan PDF yo'li
 * @returns {string} To'liq URL
 */
export const getPDFUrl = (pdfPath) => {
  return `${API_BASE_URL}${pdfPath}`;
};

/**
 * Sog'liqni tekshirish
 * @returns {Promise} Sog'liq holati
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Sog\'liqni tekshirishda xatolik:', error);
    throw error;
  }
};

export default api;