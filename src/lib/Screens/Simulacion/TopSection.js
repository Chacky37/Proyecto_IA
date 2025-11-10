import React, { useState, useEffect } from "react";
import { useEvaluarRBF } from "../../Controllers/SimularRBF";
import { useEvaluarRBF_Patron } from "../../Controllers/SimularRBF"; // ✅ corregido import
import { useDataset } from "../../../Context/DatasetContext";
import MessageBox from "../../Components/MessageBox";

export default function TopSectionSimulacion({ onDetallesListos }) {
  const { dataset } = useDataset();
  const { evaluarRBF } = useEvaluarRBF();
  const { evaluarPatron } = useEvaluarRBF_Patron();

  const [modo, setModo] = useState("dataset");
  const [errorMsg, setErrorMsg] = useState("");
  const [entradas, setEntradas] = useState([]);

  // 🔹 Calcular número de entradas según el dataset
  useEffect(() => {
    if (dataset && dataset.length > 0) {
      const columnas = Object.keys(dataset[0]);
      const salidaCol =
        columnas.find((c) => /yd|salida|output/i.test(c)) ||
        columnas[columnas.length - 1];
      const entradaCols = columnas.filter((c) => c !== salidaCol);
      setEntradas(new Array(entradaCols.length).fill(""));
    }
  }, [dataset]);

  // 🔹 Manejar cambio en inputs
  const handleEntradaChange = (index, value) => {
    const nuevas = [...entradas];
    nuevas[index] = value;
    setEntradas(nuevas);
  };

  // 🔹 Ejecutar simulación
  const handleSimular = () => {
    try {
      if (modo === "dataset") {
        const res = evaluarRBF();
        if (!res || res.patrones === 0) {
          setErrorMsg("⚠️ No hay datos o configuración disponible para simular.");
          return;
        }

        console.log("📊 Resultados RBF:", res);

        // ✅ Envía resultados al padre (MainLayout)
        if (onDetallesListos) {
          onDetallesListos({
            detalles: res.detalles,
            salidas: res.salidas,
            Eg: res.EG,
            mae: res.MAE,
            rmse: res.RMSE,
            errorPermitido: res.errorPermitido,
            converge: res.converge,
          });
        }
      }

      // 🔹 Modo generar (entrada manual)
      else if (modo === "generar") {
        if (!entradas.length || entradas.some((v) => v === "")) {
          setErrorMsg("⚠️ Por favor completa todas las entradas.");
          return;
        }

        const entradaNumerica = entradas.map((v) => parseFloat(v));
        const resultado = evaluarPatron(entradaNumerica);

        console.log("🧩 Resultado de patrón:", resultado);

        // ✅ Envía también al padre los valores individuales
        if (onDetallesListos && resultado) {
          onDetallesListos({
            detalles: [resultado], // para mantener formato uniforme
            salidas: {
              Yd: [resultado.Yd ?? 0],
              Yr: [resultado.Yr ?? 0],
            },
            Eg: resultado.EG ?? 0,
            mae: Math.abs(resultado.error ?? 0),
            rmse: resultado.EG ?? 0,
            errorPermitido: resultado.errorOptimo ?? 0.001,
            converge: resultado.converge ?? false,
          });
        }
      }
    } catch (err) {
      console.error("❌ Error en simulación:", err);
      setErrorMsg("Ocurrió un error durante la simulación.");
    }
  };

  return (
    <>
      {errorMsg && <MessageBox message={errorMsg} onClose={() => setErrorMsg("")} />}

      <div style={styles.container}>
        <h1 style={styles.title}>Simulación del Modelo RBF</h1>
        <p style={styles.subtitle}>
          Visualiza cómo responde la red neuronal radial a tus datos o entradas generadas.
        </p>

        {/* 🔘 Modo de simulación */}
        <div style={styles.radioContainer}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="dataset"
              checked={modo === "dataset"}
              onChange={(e) => setModo(e.target.value)}
              style={styles.radioInput}
            />
            Simular datos del dataset
          </label>

          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="generar"
              checked={modo === "generar"}
              onChange={(e) => setModo(e.target.value)}
              style={styles.radioInput}
            />
            Generar datos de prueba
          </label>
        </div>

        {/* 🔹 Campos de entrada solo si está en modo “generar” */}
        {modo === "generar" && (
          <div style={styles.inputsContainer}>
            <h3 style={{ marginBottom: 10 }}>Introduce las entradas:</h3>
            <div style={styles.inputsGrid}>
              {entradas.map((valor, i) => (
                <input
                  key={i}
                  type="number"
                  value={valor}
                  onChange={(e) => handleEntradaChange(i, e.target.value)}
                  placeholder={`Entrada ${i + 1}`}
                  style={styles.input}
                />
              ))}
            </div>
          </div>
        )}

        {/* 🔘 Botón de acción */}
        <div style={styles.buttonsContainer}>
          <button style={styles.button} onClick={handleSimular}>
            Simular 🚀
          </button>
        </div>
      </div>
    </>
  );
}

// 🎨 Estilos
const styles = {
  container: {
    width: "100%",
    padding: "30px 0",
    textAlign: "center",
    background: "linear-gradient(135deg, #004e92, #000428)",
    color: "white",
    borderRadius: "0 0 20px 20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  title: { fontSize: "2rem", fontWeight: "700", marginBottom: "10px" },
  subtitle: { fontSize: "1rem", opacity: 0.8, marginBottom: "25px" },
  radioContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1rem",
    fontWeight: "500",
  },
  radioInput: { transform: "scale(1.3)", cursor: "pointer" },
  inputsContainer: { marginBottom: "20px" },
  inputsGrid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  input: {
    width: "100px",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  buttonsContainer: { display: "flex", justifyContent: "center" },
  button: {
    backgroundColor: "#1e90ff",
    border: "none",
    padding: "10px 25px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
