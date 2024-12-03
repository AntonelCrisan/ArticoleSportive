import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import Alert from "@mui/material/Alert";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const AdaugareProduse = () => {
    const [open, setOpen] = useState(false);
    const [imagine, setImagine] = useState('')
    const [pret, setPret] = useState('')
    const [nume, setNume] = useState('')
    const [descriere, setDescriere] = useState('')
    const [categorie, setCategorie] = useState('')
    const [subcategorie, setSubcategorie] = useState('')
    const [cantitate, setCantitate] = useState('')
    const [error, setError] = useState("");
    const adaugaProdus = async (event) => {
        event.preventDefault();
        if (
            !imagine ||
            !nume ||
            !pret ||
            !categorie ||
            !subcategorie ||
            !cantitate ||
            !descriere
          ) {
            setError("Toate câmpurile sunt obligatorii!");
            return;
          }
      
          try {
            const response = await axios.post("http://localhost:8080/adauga", {
              imagine,
              nume,
              pret,
              categorie,
              subcategorie,
              cantitate: parseInt(cantitate), // Asigură-te că este un număr
              descriere,
            });
            setError(""); 
            console.log("Articol adăugat:", response.data);
            handleClose();
          } catch (err) {
            console.error("Eroare la adăugarea articolului:", err);
            setError("A apărut o eroare la adăugarea articolului.");
          }
    }
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    return (
        <React.Fragment>
          <Button
          onClick={handleClickOpen}
      sx={{
        backgroundColor: '#257180',
        color: '#fff',
        fontSize: '0.75rem', // Font mai mic pentru buton
        marginTop: '2rem',
        marginLeft: '3rem'
      }}
      >Adauga produs</Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Editare produs"}</DialogTitle>
            <DialogContent>
            <TextField
              fullWidth
              value={imagine}
              onChange={(e) => setImagine(e.target.value)}
              label="Imagine"
              type="text"
              required
              variant="outlined"
              sx={{ marginBottom: '15px', marginTop: '15px' }}
            />
               <TextField
              fullWidth
              value={nume}
              onChange={(e) => setNume(e.target.value)}
              label="Nume"
              type="text"
              required
              variant="outlined"
              sx={{ marginBottom: '15px' }}
            />
               <TextField
              fullWidth
              value={pret}
              onChange={(e) => setPret(e.target.value)}
              label="Pret"
              type="text"
              required
              variant="outlined"
              sx={{ marginBottom: '15px' }}
            />
               <TextField
              fullWidth
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              label="Categorie"
              type="text"
              required
              variant="outlined"
              sx={{ marginBottom: '15px' }}
            />
              <TextField
              fullWidth
              value={subcategorie}
              onChange={(e) => setSubcategorie(e.target.value)}
              label="Subcategorie"
              type="text"
              required
              variant="outlined"
              sx={{ marginBottom: '15px' }}
            />
              <TextField
              fullWidth
              value={cantitate}
              onChange={(e) => setCantitate(e.target.value)}
              label="Cantitate"
              type="number"
              required
              variant="outlined"
              sx={{ marginBottom: '15px' }}
            />
              <TextField
              fullWidth
              value={descriere}
              onChange={(e) => setDescriere(e.target.value)}
              label="Descriere"
              type="text"
              required
              variant="outlined"
              sx={{ marginBottom: '15px' }}
            />
            </DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <DialogActions>
              <Button color='success' onClick={adaugaProdus}>Salveaza</Button>
              <Button onClick={handleClose}>Anuleaza</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}

export default AdaugareProduse;