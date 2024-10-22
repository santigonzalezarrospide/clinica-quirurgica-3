import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Contacto from "./Routes/Contacto";

import { routes } from "./utils/routes";
import { Route, Routes } from "react-router-dom";
import Equipo from "./Routes/Equipo";

function App() {


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={routes.inicio} element={<Home />} />


        <Route path={routes.equipo} element={<Equipo />} />
        <Route path={routes.contacto} element={<Contacto />} />
        <Route path="*" element={<h1>Error 404 - Page not found</h1>} />
      </Routes>

    </div>
  )
}

export default App
