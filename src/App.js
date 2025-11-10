import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// 🧭 Navegación y pantallas
import Navbar from "./lib/Screens/Navbar";
import Home from "./lib/Screens/Seleccion/Home";
import Templates from "./lib/Screens/Templates";
import MainEntrenamiento from "./lib/Screens/Entrenamiento/MainEntrenamiento";
import MainSimulacion from "./lib/Screens/Simulacion/MainSimulacion";
import ScrollToTop from "./lib/Components/ScrollToTop";

// 🧩 Contextos globales
import { DatasetProvider } from "./Context/DatasetContext";
import { SubsetProvider } from "./Context/SubsetContext";
import { RBFProvider } from "./Context/RBFContext";
import { MetricsProvider } from "./Context/MetricsContext";

// 👇 Este componente fuerza que el Navbar se remonte al cambiar de ruta
function ForceRerenderNavbar() {
  const location = useLocation();
  return <Navbar key={location.pathname} />;
}

function App() {
  return (
    <Router>
      <ForceRerenderNavbar /> {/* 🔹 Navbar se re-renderiza al cambiar de ruta */}
      <ScrollToTop />

      {/* 🟩 Todos los Providers envuelven la app dentro del Router */}
      <DatasetProvider>
        <SubsetProvider>
          <RBFProvider>
            <MetricsProvider>
              <div style={{ paddingTop: "80px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/MainEntrenamiento" element={<MainEntrenamiento />} />
                  <Route path="/MainSimulacion" element={<MainSimulacion />} />
                </Routes>
              </div>
            </MetricsProvider>
          </RBFProvider>
        </SubsetProvider>
      </DatasetProvider>
    </Router>
  );
}

export default App;
