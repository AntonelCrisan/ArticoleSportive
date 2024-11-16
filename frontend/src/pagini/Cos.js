import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button, IconButton, Paper } from '@mui/material';
import Navbar from '../componente/Navbar';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../componente/CantitateCos';
function Cos() {
  const [produse, setProduse] = useState([]);
  const [error, setError] = useState(null);
  const {cartQuantity, setCartQuantity} = useCart();
  // Extrage token-ul din localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8080/cos', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setProduse(response.data);
          console.log(response.data);
          const totalQuantity = response.data.reduce((sum, produs) => sum + produs.cantitate, 0);
          setCartQuantity(totalQuantity); // Actualizează cantitatea globală
        })
        .catch(error => {
          setError("Eroare la încărcarea produselor din coș.");
        });
    }
  }, [token, setCartQuantity]);

  const handleRemoveProduct = (productId) => {
    console.log("Product ID:", productId);
    // Logica pentru a șterge produsul din coș
    axios.delete(`http://localhost:8080/cos/sterge/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setProduse(produse.filter(produs => produs.id !== productId));
      })
      .catch(error => {
        setError("Eroare la ștergerea produsului.");
      });
  };

  const handleQuantityChange = (productId, change) => {
    const updatedProducts = produse.map(produs => {
      if (produs.idPordus === productId) {
        let newQuantity = produs.cantitate + change;
        if (newQuantity >= 0) {
          return { ...produs, cantitate: newQuantity };
        }
      }
      return produs;
    });

    setProduse(updatedProducts);

    // Logica pentru a actualiza cantitatea în backend
    axios.put(`http://localhost:8080/cos/sterge/${productId}`, { cantitate: updatedProducts.find(p => p.id === productId).cantitate }, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(error => {
      setError("Eroare la actualizarea cantității.");
    });
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: '20px', backgroundColor: '#fafafa' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>Coșul tău de cumpărături</Typography>
        {error ? (
          <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>
        ) : (
          produse.length > 0 ? (
            <Grid container spacing={4} direction="column">
              {produse.map((produs) => (
                <Grid item key={produs.id} xs={12} sm={12} md={12}>
                  <Paper sx={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={produs.imagine}
                        alt={produs.nume}
                        style={{ width: '120px', height: 'auto', borderRadius: '8px', marginRight: '20px' }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{produs.nume}</Typography>
                        <Typography variant="body2" sx={{ marginBottom: '10px' }}>{produs.descriere}</Typography>
                        <Typography variant="body1" sx={{ color: 'green', fontWeight: 'bold' }}>{produs.pret} RON</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handleQuantityChange(produs.id, -1)} disabled={produs.cantitate <= 0}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ margin: '0 10px' }}>{produs.cantitate}</Typography>
                      <IconButton onClick={() => handleQuantityChange(produs.id, 1)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleRemoveProduct(produs.id)} sx={{ marginLeft: '15px' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center' }}>Nu ai produse în coș.</Typography>
          )
        )}
      </Box>
    </div>
  );
}

export default Cos;
