import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Autentificare() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response =  await axios.post('http://localhost:8080/autentificare', { email, parola });
      if(response.status === 200){
        localStorage.setItem('token', response.data);
        navigate('/');
      }
    } catch (error) {
      setError("Email sau parolă incorectă");
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <form onSubmit={handleLogin}>
      <Box
        sx={{
          width: '350px',
          padding: '30px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Autentificare
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          label="Parola"
          type="password"
          required
          onChange={(e) => setParola(e.target.value)}
          variant="outlined"
          sx={{  marginBottom: '15px' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.9rem',
            color: '#777',
            marginBottom: '15px',
          }}
        >
         
          <Link href="#" underline="hover" sx={{
            color: '#8a8a8a',
          }}>
            Ai uitat parola?
          </Link>
        </Box>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
        type='submit'
          fullWidth
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
          Autentifica-te
        </Button>
        <Link href="/inregistrare" underline="hover"
        sx={{
          color: '#8a8a8a',
        }}>
            Ai nevoie de cont?
        </Link>
      </Box>
      </form>
      
    </Box>
  );
}
