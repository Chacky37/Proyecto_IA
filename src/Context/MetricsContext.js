import React, { createContext, useContext, useState } from "react";

// 📘 1️⃣ Crear el contexto
const MetricsContext = createContext();

// 📗 2️⃣ Proveedor del contexto
export const MetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    eg: null,
    mae: null,
    rmse: null,
    converge: false,
  });

  // 📈 Función para actualizar métricas
  const updateMetrics = (newMetrics) => {
    setMetrics((prev) => ({
      ...prev,
      ...newMetrics, // fusiona lo nuevo con lo anterior
    }));
  };

  return (
    <MetricsContext.Provider value={{ metrics, updateMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};

// 📙 3️⃣ Hook personalizado para usar el contexto fácilmente
export const useMetrics = () => useContext(MetricsContext);
