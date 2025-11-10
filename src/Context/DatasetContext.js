import React, { createContext, useContext, useState, useEffect } from "react";

const DatasetContext = createContext();

export function DatasetProvider({ children }) {
  const [dataset, setDataset] = useState(null);
  const [info, setInfo] = useState(null);

  const guardarDataset = (nuevoDataset, nuevaInfo) => {
    setDataset(nuevoDataset);
    setInfo(nuevaInfo);
    localStorage.setItem("dataset", JSON.stringify(nuevoDataset));
    localStorage.setItem("info", JSON.stringify(nuevaInfo));
  };

  const cargarDesdeStorage = () => {
    const savedDataset = localStorage.getItem("dataset");
    const savedInfo = localStorage.getItem("info");
    if (savedDataset && savedInfo) {
      setDataset(JSON.parse(savedDataset));
      setInfo(JSON.parse(savedInfo));
    }
  };

  useEffect(() => {
    cargarDesdeStorage();
  }, []);

  return (
    <DatasetContext.Provider value={{ dataset, info, guardarDataset }}>
      {children} {/* 👈 ESTA LÍNEA es la clave, no debe faltar */}
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  return useContext(DatasetContext);
}
