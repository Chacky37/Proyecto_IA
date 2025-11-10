import React, { useEffect, useState } from "react";
import { useMetrics } from "../../../../Context/MetricsContext";

// ===============================
// Componente principal: muestra métricas y actualiza el contexto
// ===============================
export function InfoEntrenamiento({ eg, mae, rmse, converge }) {
  const { metrics, updateMetrics } = useMetrics();

  // 🔹 Estado inicial combinando props y contexto
  const [values, setValues] = useState({
    eg: eg ?? metrics.eg,
    mae: mae ?? metrics.mae,
    rmse: rmse ?? metrics.rmse,
    converge: converge ?? metrics.converge,
  });

  // 🔹 Effect que actualiza el estado local y el contexto
  useEffect(() => {
    const merged = {
      eg: eg ?? metrics.eg,
      mae: mae ?? metrics.mae,
      rmse: rmse ?? metrics.rmse,
      converge: converge ?? metrics.converge,
    };

    console.log("🔹 InfoEntrenamiento - Valores combinados:", merged);
    setValues(merged);

    // Solo actualiza el contexto si todos los props están definidos
    if (
      eg !== undefined &&
      mae !== undefined &&
      rmse !== undefined &&
      converge !== undefined
    ) {
      console.log("🔹 InfoEntrenamiento - Actualizando contexto con:", { eg, mae, rmse, converge });
      updateMetrics({ eg, mae, rmse, converge });
    }
  }, [eg, mae, rmse, converge, metrics, updateMetrics]);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Datos del Entrenamiento</h3>
      <div style={styles.metricsBox}>
        <p><strong>Error Global (EG):</strong> {values.eg ?? "—"}</p>
        <p><strong>Error Absoluto Medio (MAE):</strong> {values.mae ?? "—"}</p>
        <p><strong>Raíz del Error Cuadrático Medio (RMSE):</strong> {values.rmse ?? "—"}</p>
        <p>
          <strong>¿Convergió la red?:</strong>{" "}
          <span style={{ color: values.converge ? "green" : "red", fontWeight: "bold" }}>
            {values.converge ? "✅ Sí" : "❌ No"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ===============================
// Componente secundario: solo lectura (conclusión)
// ===============================
export function BottomRight2({ eg, mae, rmse, converge }) {
  const { metrics } = useMetrics();

  const values = {
    eg: eg ?? metrics.eg,
    mae: mae ?? metrics.mae,
    rmse: rmse ?? metrics.rmse,
    converge: converge ?? metrics.converge,
  };

  console.log("🔹 BottomRight2 - Valores a mostrar:", values);
  console.log("🔹 BottomRight2 - Metrics del contexto:", metrics);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Conclusión del Entrenamiento</h3>
      <div style={styles.metricsBox}>
        <p><strong>Error Global (EG):</strong> {values.eg ?? "—"}</p>
        <p><strong>Error Absoluto Medio (MAE):</strong> {values.mae ?? "—"}</p>
        <p><strong>Raíz del Error Cuadrático Medio (RMSE):</strong> {values.rmse ?? "—"}</p>
        <p>
          <strong>¿Convergió la red?:</strong>{" "}
          <span style={{ color: values.converge ? "green" : "red", fontWeight: "bold" }}>
            {values.converge ? "✅ La red converge" : "❌ No converge"}
          </span>
        </p>
      </div>
    </div>
  );
}

// ===============================
// Estilos compartidos
// ===============================
const styles = {
  container: {
    backgroundColor: "#e7e7ffff",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#003566",
    marginBottom: "15px",
  },
  metricsBox: {
    textAlign: "left",
    backgroundColor: "#f9fbfd",
    borderRadius: "10px",
    padding: "10px 15px",
    width: "100%",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};
