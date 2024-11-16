import axios from 'axios';

export const utilizatorAutentificat = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await axios.get('http://localhost:8080/profil', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch (error) {
    console.error('Token invalid sau expirat:', error);
    return false;
  }
};