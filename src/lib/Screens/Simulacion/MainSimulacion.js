// src/lib/Screens/Simulacion/Main_Simulacion.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import TopSectionSimulacion from "./TopSection";
import BottomRight from "./GraficaYdvsYr";
import BottomRight2 from "./Info";
import GraficaError from "./GraficaError";
import GraficaDisper from "./GraficaDisper";

export default function MainSimulacion() {
  const navigate = useNavigate();
  const contentRef = useRef();

  const [salidas, setSalidas] = useState([]);
  const [eg, setEg] = useState(null);
  const [errorPermitido, setErrorPermitido] = useState(null);
  const [converge, setConverge] = useState(false);
  const [mae, setMae] = useState(null);
  const [rmse, setRmse] = useState(null);

  const handleResultadosSimulacion = (data) => {
    setSalidas(data.salidas);
    setEg(data.Eg);
    setErrorPermitido(data.errorPermitido);
    setConverge(data.converge);
    setMae(data.mae);
    setRmse(data.rmse);
  };

  // 🧾 Exportar PDF capturando toda la pantalla
  const handleExportPDF = async () => {
    const input = contentRef.current;
    if (!input) return;

    // Captura con html2canvas
    const canvas = await html2canvas(input, {
      scale: 2, // Mejor resolución
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY, // Captura todo el contenido
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4"); // tamaño A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Simulacion_RBF.pdf");
  };

  return (
    <div style={styles.container} ref={contentRef}>
      {/* 🔹 Sección superior */}
      <div style={styles.top}>
        <TopSectionSimulacion onDetallesListos={handleResultadosSimulacion} />
      </div>

      {/* 🔹 Sección inferior con las gráficas e info */}
      <div style={styles.bottomGrid}>
        <div style={styles.bottomRight}>
          <BottomRight salidas={salidas} />
        </div>
        <div style={styles.bottomRight2}>
          <BottomRight2 eg={eg} mae={mae} rmse={rmse} converge={converge} />
        </div>
        <div style={styles.bottomGraficaError}>
          <GraficaError eg={eg} errorPermitido={errorPermitido} />
        </div>
        <div style={styles.bottomGraficaDisper}>
          <GraficaDisper salidas={salidas} />
        </div>
      </div>

      {/* 🔹 Botón Exportar PDF */}
      <div style={styles.buttonContainer}>
        <button style={styles.buttonGuardar} onClick={handleExportPDF}>
          📄 Guardar
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
    background: "#e7ecef",
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
    gap: "2px",
    padding: "4px",
    background: "#e7ecef",
    overflow: "visible",
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
    overflowY: "auto",
    maxHeight: "450px",
  },
  bottomGraficaDisper: {
    gridColumn: "2 / 3",
    background: "#ffffff",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
    maxHeight: "450px",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "15px",
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
    transition: "0.3s",
  },
};
