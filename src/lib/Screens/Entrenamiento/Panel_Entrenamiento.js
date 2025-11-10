import React, { useState } from "react";
import { entrenarRBF } from "../../Controllers/Entrenar_RBF";
import { useDataset } from "../../../Context/DatasetContext";
import MessageBox from "../../Components/MessageBox";
import { useRBF } from "../../../Context/RBFContext";

export default function TopSection({ onDetallesListos }) {
  const { dataset } = useDataset();
  const [centros, setCentros] = useState("");
  const [errorPermitido, setErrorPermitido] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { updateRBF } = useRBF();

  const handleEntrenar = () => {
    if (!dataset) {
      setErrorMsg("⚠️ No hay dataset cargado.");
      return;
    }
    if (!centros || !errorPermitido) {
      setErrorMsg("CAMPOS VACÍOS");
      return;
    }

    try {
      const info = entrenarRBF(dataset, parseInt(centros), parseFloat(errorPermitido), updateRBF);
      console.log("✅ Resultado RBF:", info);

      if (onDetallesListos) {
         onDetallesListos({
         detalles: info.detalles,
         salidas: info.salidas,
         Eg: info.EG,
         errorPermitido: parseFloat(errorPermitido),
         converge: info.converge,
         mae: info.MAE,
         rsme: info.RMSE
      });
}

    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      {errorMsg && <MessageBox message={errorMsg} onClose={() => setErrorMsg("")} />}

      <div style={styles.container}>
        <h1 style={styles.title}>Configuración del Entrenamiento RBF</h1>
        <p style={styles.subtitle}>Ingrese los parámetros para entrenar el modelo con el dataset cargado.</p>

        <div style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Centros Radiales:</label>
            <input
              type="number"
              value={centros}
              onChange={(e) => setCentros(e.target.value)}
              style={styles.input}
              min="1"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Error permitido:</label>
            <input
              type="number"
              step="0.01"
              value={errorPermitido}
              onChange={(e) => setErrorPermitido(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.button} onClick={handleEntrenar}>
            Entrenar 🧠
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    background: "linear-gradient(90deg, #007282, #00c6ff)",
    color: "white",
    padding: "2px",
    textAlign: "center",
    borderRadius: "0 0 10px 10px",
  },
  title: { marginBottom: "10px" },
  subtitle: { marginBottom: "20px", fontSize: "0.95rem", opacity: 0.9 },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  field: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
  label: { fontSize: "0.9rem", marginBottom: "5px" },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    width: "150px",
  },
  button: {
    backgroundColor: "#003C43",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "23px",
  },
};
