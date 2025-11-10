import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧭 Navegación y pantallas
import Navbar from "./lib/Screens/Navbar";
import Home from "./lib/Screens/Seleccion/Home";
import Templates from "./lib/Screens/Templates";
import Main_Entrenamiento from "./lib/Screens/Entrenamiento/MainEntrenamiento";
import Main_Simulacion from "./lib/Screens/Simulacion/MainSimulacion";
import ScrollToTop from "./lib/Components/ScrollToTop";

// 🧩 Contextos globales
import { DatasetProvider } from "./Context/DatasetContext";
import { SubsetProvider } from "./Context/SubsetContext";
import { RBFProvider } from "./Context/RBFContext";
import { MetricsProvider } from "./Context/MetricsContext";

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* 🟩 Todos los Providers envuelven la app dentro del Router */}
      <DatasetProvider>
        <SubsetProvider>
          <RBFProvider>
            <MetricsProvider>
              <Navbar />
              <div style={{ paddingTop: "80px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/Main_Entrenamiento" element={<Main_Entrenamiento />} />
                  <Route path="/Main_Simulacion" element={<Main_Simulacion />} />
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
