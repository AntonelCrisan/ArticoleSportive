import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import Navbar from '../componente/Navbar';
function DetaliiProdus() {
    const [produs, setprodus] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const produsId = queryParams.get('id');
  const nume = queryParams.get('nume');
  useEffect(() => {
    if (produsId) {
      axios.get(`http://localhost:8080/detaliiProdus/${nume}/${produsId}`)
        .then(response => {
          setprodus(response.data); // Setează produsul primit
        })
        .catch(error => {
          setError("Eroare la încărcarea produsului.");
        });
    }
  }, [nume, produsId]); 
  const handleAddToCart = async (produsId, cantitate) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        'http://localhost:8080/cos/adauga',
        null,
        {
          params: { idProdus: produsId, cantitate: cantitate },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Produs adăugat:', response.data);
    } catch (error) {
      console.error('Eroare la adăugare:', error);
    }
  };
  return (
    <div>
     <Navbar />
    {produs ? (
         <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Imagine produs */}
        <Grid item xs={12} sm={6} md={4}>
          <img
            src={produs.imagine}
            alt={produs.nume}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>

        {/* Detalii produs */}
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h4" sx={{ marginBottom: '16px' }}>
            {produs.nume}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', color: 'gray' }}>
            {produs.descriere}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
            {produs.pret} RON
          </Typography>

          {/* Buton de adăugare în coș */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#CB6040',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#FD8B51',
              },
            }}
            onClick={() => {handleAddToCart(produsId, 1)}}
          >
            Adaugă în coș
          </Button>
        </Grid>
      </Grid>
    </Box>
    ) : (
      <p>Produsul nu a fost găsit.</p>
    )}
  </div>
  );
}

export default DetaliiProdus;