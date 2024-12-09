// frontend/src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL
});

// При авторизации сохраняем токен в localStorage и добавляем в заголовки
export function setAuthToken(token: string) {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
