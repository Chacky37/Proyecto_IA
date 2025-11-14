import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import TopSection from "./PanelEntrenamiento";
import BottomLeft from "./Matriz";
import BottomRight from "./GraficaYdvsYr";
import BottomRight2 from "./Info";
import GraficaError from "./GraficaError";
import GraficaDisper from "./GraficaDisper";

// 🔹 Importar los 6 cuadros
import Cuadro1 from "./Cuadro1";
import Cuadro2 from "./Cuadro2";
import Cuadro3 from "./Cuadro3";
import Cuadro4 from "./Cuadro4";
import Cuadro5 from "./CuadroRendimientoGlobal";
import Cuadro6 from "./Cuadro6";

export default function MainLayout() {
  const navigate = useNavigate();
  const [detalles, setDetalles] = useState(null);
  const [salidas, setSalidas] = useState([]);
  const [eg, setEg] = useState(null);
  const [errorPermitido, setErrorPermitido] = useState(null);
  const [converge, setConverge] = useState(false);
  const [mae, setMae] = useState(null);
  const [rmse, setRmse] = useState(null);
  const [Rendimiento_Positivo, setRendimiento_Positivo] = useState(null);
  const [Rendimiento_Negativo, setRendimiento_Negativo] = useState(null);

  const pantallaRef = useRef(null);

  const handleDetallesListos = (data) => {
    setDetalles(data.detalles);
    setSalidas(data.salidas);
    setEg(data.Eg);
    setErrorPermitido(data.errorPermitido);
    setConverge(data.converge);
    setMae(data.mae);
    setRmse(data.rmse);
    setRendimiento_Positivo(data.Rendimiento_Positivo);
    setRendimiento_Negativo(data.Rendimiento_Negativo);
  };

  const handleGuardar = () => {
    console.log("Datos guardados:", { detalles, salidas, eg, mae, rmse, Rendimiento_Positivo, Rendimiento_Negativo});
    navigate("/MainSimulacion");
  };

  const handleCapturarPDF = async () => {
    try {
      const elemento = pantallaRef.current;
      if (!elemento) return;
      const canvas = await html2canvas(elemento, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft > 0) pdf.addPage();
        position = -pageHeight;
      }
      pdf.save("captura_entrenamiento.pdf");
    } catch (error) {
      console.error("❌ Error al generar el PDF:", error);
    }
  };

  return (
    <div ref={pantallaRef} style={styles.container}>
      {/* 🔹 Sección superior */}
      <div style={styles.top}>
        <TopSection onDetallesListos={handleDetallesListos} />
      </div>

      {/* 🔹 Sección inferior */}
      <div style={styles.bottomGrid}>
        <div style={styles.bottomRight}>
          <BottomRight salidas={salidas} />
        </div>

        <div style={styles.bottomRight2}>
          <BottomRight2 eg={eg} mae={mae} rmse={rmse} converge={converge} />
        </div>

        {/* 🔹 Gráfica de error */}
        <div style={styles.bottomGraficaError}>
          <GraficaError eg={eg} errorPermitido={errorPermitido} />
        </div>

        {/* 🔹 Gráfica de dispersión */}
        <div style={styles.bottomGraficaDisper}>
          <GraficaDisper salidas={salidas} />
        </div>

        {/* 🔹 6 Cuadros (2 columnas × 3 filas) */}
        <Cuadro1 />
        <Cuadro2 />
        <Cuadro3 />
        <Cuadro4 />
        <Cuadro5
          positivo={Rendimiento_Positivo || 0}
          negativo={Rendimiento_Negativo || 0}
        />
        <Cuadro6 />

        {/* 🔹 Matriz */}
        <div style={styles.bottomLeft}>
          <BottomLeft detalles={detalles} />
        </div>
      </div>

      {/* 🔹 Botones */}
      <div style={styles.buttonContainer}>
        <button style={styles.buttonGuardar} onClick={handleGuardar}>
          🧮 Simular →
        </button>
        <button style={styles.buttonCaptura} onClick={handleCapturarPDF}>
          📸 Exportar
        </button>
      </div>
    </div>
  );
}

// 🎨 Estilos
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowY: "auto",
    fontStyle: "italic",
  },
  top: {
    flexShrink: 0,
    width: "100%",
    background: "linear-gradient(90deg, #007282, #00c6ff)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    zIndex: 2,
  },
  bottomGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "min-content",
    gap: "6px",
    padding: "8px",
    background: "#e7ecef",
  },
  bottomRight: {
    gridColumn: "1 / 2",
    background: "#ffffff",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
    maxHeight: "450px",
  },
  bottomRight2: {
    gridColumn: "2 / 3",
    background: "#ffffff",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
    maxHeight: "450px",
  },
  bottomGraficaError: {
    gridColumn: "1 / 2",
    background: "#ffffff",
    borderRadius: "10px",
    padding: "10px",
  },
  bottomGraficaDisper: {
    gridColumn: "2 / 3",
    background: "#ffffff",
    borderRadius: "10px",
    padding: "10px",
  },
  bottomLeft: {
    gridColumn: "1 / span 2",
    background: "#ffffff",
    borderRadius: "10px",
    overflowY: "auto",
    padding: "10px",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  buttonGuardar: {
    backgroundColor: "#007282",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  buttonCaptura: {
    backgroundColor: "#00b4d8",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
