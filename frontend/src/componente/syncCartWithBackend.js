import axios from 'axios';

// Funcția care sincronizează produsele din localStorage cu backend-ul
export const syncCartWithBackend = async () => {
  const token = localStorage.getItem('token');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  console.log('Sincronizare coș cu backend. Produse din localStorage:', cart);

  if (cart.length > 0 && token) {
    try {
      for (const item of cart) {
        const response = await axios.post(
          'http://localhost:8080/cos/adauga',
          null,
          {
            params: { idProdus: item.idProdus, cantitate: item.cantitate },
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        console.log(`Produs sincronizat: ${item.idProdus}, răspuns backend:`, response.data);
      }
    } catch (error) {
      console.error('Eroare la sincronizarea coșului:', error);
    }
  } else {
    console.log('Nu există produse în localStorage pentru sincronizare sau utilizatorul nu este autentificat.');
  }
};
