import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Routes/Home";
import Contacto from "./Routes/Contacto";

import { routes } from "./utils/routes";
import { Route, Routes, useLocation } from "react-router-dom";
import Equipo from "./Routes/Equipo";
import Login from "./Routes/Login";
import AdminPanel from "./Routes/AdminPanel";
import InfoPaciente from "./Routes/InfoPaciente";
import PublicEstudiantesDeGrado from "./Routes/PublicEstudiantesDeGrado";
import PublicPostgrado from "./Routes/PublicPostgrado";
import PublicBiblioteca from "./Routes/PublicBiblioteca";
import PublicUnidades from "./Routes/PublicUnidades";

import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';   

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== routes.adminPanel && <Navbar />}
      <div className="content">
        <Routes>
          <Route path={routes.inicio} element={<Home />} />
          <Route path={routes.grado} element={<PublicEstudiantesDeGrado />} />
          <Route path={routes.postgrado} element={<PublicPostgrado />} />
          <Route path={routes.paciente} element={<InfoPaciente />} />
          <Route path={routes.equipo} element={<Equipo />} />
          <Route path={routes.biblioteca} element={<PublicBiblioteca />} />
          <Route path={routes.unidades} element={<PublicUnidades />} />
          <Route path={routes.contacto} element={<Contacto />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.adminPanel} element={<AdminPanel />} />

          <Route path="*" element={<h1>Error 404 - Page not found</h1>} />
        </Routes>
      </div>
      {location.pathname !== routes.adminPanel && <Footer />}

      <ToastContainer />
    </div>
  );
}

export default App;
