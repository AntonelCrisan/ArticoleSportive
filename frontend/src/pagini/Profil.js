import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Avatar, Button, Grid, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../componente/Navbar';
const ProfilePage = () => {
  const [utilizator, setUtilizator] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:8080/profil", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUtilizator(response.data);
        }
      } catch (error) {
        console.error("Eroare la obținerea datelor utilizatorului:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!utilizator) {
    return <Typography variant="h6">Se încarcă...</Typography>;
  }

  return (
    <div>
        <Navbar />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
       
      <Paper elevation={3} sx={{ padding: '30px', borderRadius: '10px', maxWidth: '600px', width: '100%' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Avatar
            sx={{ width: 80, height: 80, margin: 'auto', backgroundColor: '#CB6040' }}
          >
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h5" sx={{ marginTop: '15px', fontWeight: 'bold' }}>
            Bun venit, {utilizator.nume}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {utilizator.email}
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Typography variant="h6">Detalii cont</Typography>
            <Typography><strong>Nume:</strong> {utilizator.nume}</Typography>
            <Typography><strong>Email:</strong> {utilizator.email}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: '30px', textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#CB6040',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#FD8B51',
              },
            }}
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/autentificare';
            }}
          >
            Deconectare
          </Button>
        </Box>
      </Paper>
    </Box>
    </div>
  );
};

export default ProfilePage;
