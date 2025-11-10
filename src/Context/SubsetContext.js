// src/Context/SubsetContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const SubsetContext = createContext();

export function SubsetProvider({ children }) {
  const [subset20, setSubset20] = useState([]);
  const [infoSubset, setInfoSubset] = useState(null);

  // 💾 Guardar subset e información adicional
  const guardarSubset = (nuevoSubset, nuevaInfo = null) => {
    setSubset20(nuevoSubset);
    setInfoSubset(nuevaInfo);

    // Persistencia
    localStorage.setItem("subset20", JSON.stringify(nuevoSubset));
    if (nuevaInfo) localStorage.setItem("infoSubset", JSON.stringify(nuevaInfo));
  };

  // ♻️ Cargar datos almacenados al iniciar
  useEffect(() => {
    const savedSubset = localStorage.getItem("subset20");
    const savedInfo = localStorage.getItem("infoSubset");
    if (savedSubset) setSubset20(JSON.parse(savedSubset));
    if (savedInfo) setInfoSubset(JSON.parse(savedInfo));
  }, []);

  return (
    <SubsetContext.Provider value={{ subset20, infoSubset, guardarSubset }}>
      {children}
    </SubsetContext.Provider>
  );
}

// 🪄 Hook personalizado para acceder fácilmente al contexto
export function useSubset() {
  const context = useContext(SubsetContext);
  if (!context) {
    throw new Error("useSubset debe usarse dentro de un SubsetProvider");
  }
  return context;
}
