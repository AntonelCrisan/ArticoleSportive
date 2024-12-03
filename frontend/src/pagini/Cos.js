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
  const { cartQuantity, setCartQuantity } = useCart();
  const token = localStorage.getItem('token');
  
  // Calculează totalul prețului
  const calculateTotalPrice = () => {
    return produse.reduce((sum, produs) => sum + (produs.pret * produs.cantitate), 0);
  };

  const deliveryCost = 5; // Exemplu de cost livrare

  const calculateTotalOrderCost = () => {
    return calculateTotalPrice() + deliveryCost;
  };

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
    } else {
      // Fetch din localStorage
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setProduse(storedCart);
    }
  }, [token, setCartQuantity]);

  const handleRemoveProduct = (productId) => {
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

  const handleQuantityChange = (idCos, change) => {
    const updatedProducts = produse.map(produs => {
      if (produs.id === idCos) {
        let newQuantity = produs.cantitate + change;
        if (newQuantity >= 0) {
          return { ...produs, cantitate: newQuantity };
        }
      }
      return produs;
    });

    setProduse(updatedProducts);

    // Actualizează cantitatea în backend
    const updatedProduct = updatedProducts.find(p => p.id === idCos);

    axios.put(`http://localhost:8080/cos/actualizeaza`, 
      { idCos, cantitate: updatedProduct.cantitate },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .catch(error => {
      setError("Eroare la actualizarea cantității.");
    });
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: '20px', backgroundColor: '#fafafa', display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
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
                        <IconButton onClick={() => handleQuantityChange(produs.id, -1)} disabled={produs.cantitate <= 1}>
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

        {/* Sumărul totalului prețului */}
        <Box sx={{  width: '250px', 
          marginLeft: '20px', 
          padding: '15px', 
          backgroundColor: '#fff', 
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', 
          borderRadius: '8px', 
          height: '100%',
          marginTop: '65px'}}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Sumar Comandă</Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Typography variant="body1">Cost produs:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'green' }}>{calculateTotalPrice()} RON</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Typography variant="body1">Cost livrare:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'green' }}>{deliveryCost} RON</Typography>
          </Box>

          <Box sx={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Typography variant="body1">Total:</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'green' }}>{calculateTotalOrderCost()} RON</Typography>
          </Box>
          <Button variant="contained"  sx={{
              backgroundColor: '#CB6040',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#FD8B51',
              },
            }}>Plasează comanda</Button>
        </Box>
      </Box>
    </div>
  );
}

export default Cos;
