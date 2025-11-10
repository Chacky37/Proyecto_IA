import React, { useEffect } from "react";
import { useMetrics } from "../../../Context/MetricsContext"; // ✅ importar correctamente

export default function BottomRight2({ eg, mae, rmse, converge }) {
  const { updateMetrics } = useMetrics(); // ✅ usamos la función correcta

  // ✅ Cada vez que cambien los props, actualiza el contexto global
  useEffect(() => {
    if (
      eg !== undefined &&
      mae !== undefined &&
      rmse !== undefined &&
      converge !== undefined
    ) {
      console.log("Prop:", { eg, mae, rmse, converge });
      updateMetrics({ eg, mae, rmse, converge });
    }
  }, [eg, mae, rmse, converge, updateMetrics]);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Conclusión del Entrenamiento</h3>

      <div style={styles.metricsBox}>
        <p><strong>Error Global (EG):</strong> {eg ?? "—"}</p>
        <p><strong>Error Absoluto Medio (MAE):</strong> {mae ?? "—"}</p>
        <p><strong>Raíz del Error Cuadrático Medio (RMSE):</strong> {rmse ?? "—"}</p>
        <p>
          <strong>¿Convergió la red?:</strong>{" "}
          <span style={{ color: converge ? "green" : "red", fontWeight: "bold" }}>
            {converge ? "✅ La red converge" : "❌ No converge"}
          </span>
        </p>
      </div>

    </div>
  );
}

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
