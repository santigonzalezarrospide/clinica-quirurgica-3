import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Routes/Home";
import Contacto from "./Routes/Contacto";

import { routes } from "./utils/routes";
import { Route, Routes } from "react-router-dom";
import Equipo from "./Routes/Equipo";
import Login from "./Routes/Login";
import AdminPanel from "./Routes/AdminPanel";
import InfoPaciente from "./Routes/InfoPaciente";
import PublicEstudiantesDeGrado from "./Routes/PublicEstudiantesDeGrado";
import PublicPostgrado from "./Routes/PublicPostgrado";
import PublicBiblioteca from "./Routes/PublicBiblioteca";
import PublicUnidades from "./Routes/PublicUnidades";

function App() {


  return (
    <div className="app">
      <Navbar />
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
      <Footer />
    </div>
  )
}

export default App
