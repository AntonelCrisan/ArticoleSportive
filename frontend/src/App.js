import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaAcasa from './pagini/PaginaAcasa'; // Componenta pentru produsele tale
import Autentificare from './pagini/Autentificare'; // Componenta de autentificare
import Inregistrare from './pagini/Inregistrare';
import DetaliiProdus from './pagini/DetaliiProdus';
import Profil from './pagini/Profil';
import Cos from './pagini/Cos';
import { CantitateCos } from './componente/CantitateCos';
function App() {
  return (
    <CantitateCos>
      <Router>
            <Routes>
              <Route path="/" element={<PaginaAcasa />} />
              <Route path="/autentificare" element={<Autentificare />} />
              <Route path="/inregistrare" element={<Inregistrare />} />
              <Route path="/detaliiProdus" element={<DetaliiProdus />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/cos" element={<Cos />} />
            </Routes>
          </Router>
    </CantitateCos>
  );
}

export default App;
