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

  useEffect(() => {
    axios.get('http://localhost:8080/api/')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Eroare la obținerea datelor:', error);
      });
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Navbar />
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <Filtrare />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, padding: '16px', marginLeft: '16px' }}> {/* Adăugăm spațiu între secțiuni */}
          <Grid container rowSpacing={2} columnSpacing={2}>
            {data.map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Item>
                  <img
                    src={item.imagine}
                    alt={item.nume}
                    style={{ width: '100%', height: 'auto', marginBottom: '8px' }}
                  />
                  <h4 style={{ margin: '5px 0', fontSize: '0.9rem',  overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item.nume}</h4>
                  <p style={{ margin: '3px 0', fontSize: '0.8rem', color: '#CB6040' }}><strong>{parseFloat((item.pret * 4.61).toFixed(2))} RON</strong></p>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#CB6040',
                      color: '#fff',
                      fontSize: '0.75rem', // Font mai mic pentru buton
                      '&:hover': {
                        backgroundColor: '#FD8B51',
                      },
                    }}
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
