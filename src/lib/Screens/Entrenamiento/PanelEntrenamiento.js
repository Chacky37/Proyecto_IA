import React, { useState } from "react";
import { entrenarRBF } from "../../Controllers/EntrenarRBF";
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
      setErrorMsg("⚠️ CAMPOS VACÍOS");
      return;
    }

    try {
      const info = entrenarRBF(
        dataset,
        parseInt(centros),
        parseFloat(errorPermitido),
        updateRBF
      );
      console.log("✅ Resultado RBF:", info);

      if (onDetallesListos) {
        onDetallesListos({
          detalles: info.detalles,
          salidas: info.salidas,
          Eg: info.EG,
          errorPermitido: parseFloat(errorPermitido),
          converge: info.converge,
          mae: info.MAE,
          rmse: info.RMSE,
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
        <h1 style={styles.title}>CONFIGURACIÓN DE ENTRENAMIENTO</h1>
        <p style={styles.subtitle}>
          Ingrese los parámetros para entrenar el modelo con el dataset cargado.
        </p>

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

// 🎨 Estilos coherentes con tu panel superior
const styles = {
  container: {
    width: "100%",
    background: "linear-gradient(90deg, #007282, #00c6ff)",
    color: "#fff",
    padding: "1.5rem",
    textAlign: "center",
    borderBottomLeftRadius: "18px",
    borderBottomRightRadius: "18px",
    fontFamily: "'Times New Roman', Times, serif",
    fontStyle: "italic",
    boxShadow: "0 6px 20px rgba(14,30,37,0.13)",
  },

  title: {
    fontSize: "3rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#ffffff",
    textShadow:
      "0 0 8px rgba(255,255,255,0.25), 0 2px 6px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.15)",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "1rem",
    opacity: 0.9,
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "15px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  label: {
    fontSize: "1rem",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#ffffff",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },

  input: {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.4)",
    outline: "none",
    width: "160px",
    fontFamily: "'Times New Roman', Times, serif",
    fontStyle: "italic",
    fontSize: "1rem",
    color: "#003C43",
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
