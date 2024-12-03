import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditarePordusDialog = ({idProdus}) => {
  const [open, setOpen] = useState(false);
  const [imagine, setImagine] = useState('')
  const [pret, setPret] = useState('')
  const [nume, setNume] = useState('')
  const [descriere, setDescriere] = useState('')
  const [categorie, setCategorie] = useState('')
  const [subcategorie, setSubcategorie] = useState('')
  const [cantitate, setCantitate] = useState('')
  const actualizareArticol = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8080/actualizareProdus/${idProdus}`, {
            imagine: imagine || null,
            pret: pret || null,
            nume: nume || null,
            descriere: descriere || null,
            categorie: categorie || null,
            subcategorie: subcategorie || null,
            cantitate: cantitate || null,
        });
        console.log("Articol actualizat cu succes!", response.data);
        handleClose();
    } catch (error) {
        console.error("Eroare la actualizarea produsului!", error);
    }
  };
  const stergeArticol = async () => {
    try {
        await axios.delete(`http://localhost:8080/stergeProdus/${idProdus}`);
        console.log("Produs șters cu succes!");
        handleClose(); // Închide dialogul după ștergere
    } catch (error) {
        console.error("Eroare la ștergerea produsului:", error);
    }
};
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <EditIcon
      variant="outlined" onClick={handleClickOpen}
            sx={{
            position: 'absolute',  // Plasăm iconița în colțul stâng sus
            top: 0,
            right: 0,
            fontSize: '1.5rem',
            margin: '5px',
            backgroundColor: '#54545410',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer'
            }} 
            />
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
        <DialogActions>
          <Button color='success' onClick={actualizareArticol}>Salveaza</Button>
          <Button onClick={handleClose}>Anuleaza</Button>
          <Button  color="error" onClick={stergeArticol}>Sterge</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default EditarePordusDialog;