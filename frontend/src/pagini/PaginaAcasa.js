import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Navbar from '../componente/Navbar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Filtrare from '../componente/Filtrare';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import ImageSlider from '../componente/ImageSlider';
import EditareProdusDialog from '../componente/EditarePordusDialog';
import AdaugareProduse from '../componente/AdaugareProduse';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.85rem',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
}));

export default function PaginaAcasa() {
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState(4);

  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Eroare la obținerea datelor:', error);
      });
  }, []);
  const handleAddToCart = async (produsId, cantitate) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Dacă utilizatorul nu este autentificat, adaugă produsul în localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ idProdus: produsId, cantitate: cantitate });
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Produs adăugat în localStorage:', { idProdus: produsId, cantitate: cantitate });
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:8080/cos/adauga',
        null,
        {
          params: { idProdus: produsId, cantitate: cantitate },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if(response.status === 200) {
        console.log('Produs adăugat în coș:', response.data);
      }
    } catch (error) {
      console.error('Eroare la adăugare:', error);
    }
  };
  const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));  // Decodifici partea middle a tokenului JWT
        return payload.rol;  // Extragi rolul utilizatorului
    }
    return null;
};
const role = getRoleFromToken();
  
  return (
    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5' }}>
      <Navbar />
      <Box>
        <ImageSlider/>
      </Box>
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <Filtrare />
      </Box>
      {role === 'admin' ? <AdaugareProduse/> : null}
      
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, padding: '16px', marginLeft: '16px' }}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            {data.map((item, index) => (
              <Grid item xs={5} sm={3} md={2} key={index}>
                <Item sx={{ position: 'relative' }}> {/* Setăm relative pentru a putea poziționa iconița */} 
                  <FavoriteIcon 
                    sx={{
                      position: 'absolute',  // Plasăm iconița în colțul stâng sus
                      top: 0,
                      left: 0,
                      fontSize: '1.5rem',
                      margin: '5px',
                      backgroundColor: '#54545410',
                      borderRadius: '50%',
                      padding: '10px',
                      cursor: 'pointer'
                    }} 
                  />
                  {role === 'admin' ? <EditareProdusDialog idProdus={item.id}/> : null}
                 
                <Link to={`/detaliiProdus?nume=${item.nume}&id=${item.id}`}>
                  <img
                    src={item.imagine}
                    alt={item.nume}
                    style={{ width: '100%', height: 'auto', marginBottom: '8px', cursor: 'pointer' }}
                  />
                  </Link>
                  <h4 style={{ margin: '5px 0', fontSize: '0.9rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.nume}</h4>
                  <p style={{ margin: '3px 0', fontSize: '0.8rem', color: '#CB6040' }}><strong>{item.pret} RON</strong></p>
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}> {/* Centrăm Rating-ul */} 
                    <Rating
                      style={{ margin: '3px 0' }}
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      key={index}
                    />
                  </Box>
                  
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#CB6040',
                      color: '#fff',
                      fontSize: '0.75rem',
                      '&:hover': {
                        backgroundColor: '#FD8B51',
                      },
                    }}
                    onClick={() => handleAddToCart(item.id, 1)}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </Button>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
  
}
