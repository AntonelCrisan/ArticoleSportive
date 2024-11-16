import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Inregistrare() {
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {nume, email, parola};
    axios.post('http://localhost:8080/inregistrare', data)
      .then(response => {
        navigate('/autentificare');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setError('Email-ul este deja folosit.');
        } else {
          setError('Eroare la înregistrare. Te rugăm să încerci din nou.');
        }
      });
  }
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
      <form onSubmit={handleSubmit}> 
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
          Creare cont
        </Typography>
        <TextField
          fullWidth
          label="Nume"
          type="text"
          id="nume"
          required
          
          value={nume}
          onChange={(e) => setNume(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: '15px' }}
        />
         <TextField
          fullWidth
          label="Email"
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          label="Parola"
          type="password"
          id="parola"
          required

            value={parola}
            onChange={(e) => setParola(e.target.value)}
          variant="outlined"
          sx={{  marginBottom: '15px' }}
        />
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
        Inregistreaza-te
        </Button>
        <Link href="/autentificare" underline="hover" sx={{
            color: '#8a8a8a',
          }}>
            Ai deja cont?
        </Link>
      </Box>
      </form>
    </Box>
  );
}
