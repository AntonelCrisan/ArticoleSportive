import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaAcasa from './pagini/PaginaAcasa'; // Componenta pentru produsele tale
import Autentificare from './pagini/Autentificare'; // Componenta de autentificare
import Inregistrare from './pagini/Inregistrare';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaAcasa />} />
        <Route path="/autentificare" element={<Autentificare />} />
        <Route path="/inregistrare" element={<Inregistrare />} />
      </Routes>
    </Router>
  );
}

export default App;
