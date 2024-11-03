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

function App() {


  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path={routes.inicio} element={<Home />} />

          <Route path={routes.equipo} element={<Equipo />} />
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
