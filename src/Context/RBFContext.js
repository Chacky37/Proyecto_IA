// src/Context/RBFContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const RBFContext = createContext();

export function RBFProvider({ children }) {
  const [configRBF, setConfigRBF] = useState({
    numCentros: null,
    errorOptimo: null,
    centros: [],
    pesos: [],
  });

  // 💾 Actualiza y guarda en localStorage
  const updateRBF = (nuevaConfig) => {
    console.log("🔄 Actualizando RBF:", nuevaConfig);
    setConfigRBF((prev) => ({ ...prev, ...nuevaConfig }));

    // Persistencia local
    localStorage.setItem("configRBF", JSON.stringify({ ...configRBF, ...nuevaConfig }));
  };

  // ♻️ Carga los datos almacenados al iniciar
  useEffect(() => {
    const savedConfig = localStorage.getItem("configRBF");
    if (savedConfig) {
      setConfigRBF(JSON.parse(savedConfig));
      console.log("📂 Configuración RBF cargada desde localStorage");
    }
  }, []);

  return (
    <RBFContext.Provider value={{ configRBF, updateRBF }}>
      {children}
    </RBFContext.Provider>
  );
}

// 🪄 Hook personalizado para acceder al contexto fácilmente
export function useRBF() {
  const context = useContext(RBFContext);
  if (!context) {
    throw new Error("useRBF debe usarse dentro de un RBFProvider");
  }
  return context;
}
