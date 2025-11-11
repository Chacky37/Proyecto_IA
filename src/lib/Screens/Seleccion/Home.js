import GoogleDrivePicker from "./JsonUploader";


export default function Home() {
  return (
    <div style={styles.container}>
      {/* 🔷 PANEL SUPERIOR SOLO TÍTULO */}
      <div style={styles.topPanel}>
        <h1 style={styles.panelTitle}>SEMÁFORO INTELIGENTE DE RIESGO ACADÉMICO</h1>
      </div>

      {/* 🔽 CONTENIDO INFERIOR ORIGINAL */}
      <div style={styles.content}>
        {/* 🔹 IZQUIERDA (Texto + Imagen del Semáforo) */}
        <div style={styles.left}>
          <div style={styles.textBox}>
            <p style={styles.text}>
              En la era de la transformación digital, la Inteligencia Artificial se ha convertido
              en una herramienta esencial para optimizar los procesos educativos. Este proyecto
              propone la implementación de un semáforo inteligente, capaz de clasificar las
              asignaturas universitarias según su nivel de riesgo académico.
            </p>

            <div style={styles.textWithImage}>
              <img
                src={require("../../../lib/Images/semaforo.png")}
                alt="Semáforo de riesgo académico"
                style={styles.semaforo}
              />
              <p style={styles.text}>
                A través del análisis de datos históricos de rendimiento estudiantil, el sistema
                identifica patrones que permiten distinguir entre materias de bajo{" "}
                <b style={{ color: "#009c3b" }}>🟢Verde: 0–30%</b>, medio{" "}
                <b style={{ color: "#ffb300" }}>🟡Amarillo: 31–60%</b> y alto riesgo{" "}
                <b style={{ color: "#d32f2f" }}>🔴Rojo: 61–100%</b> de reprobación. <br />
                Su propósito es brindar a la Universidad Popular del Cesar una herramienta
                predictiva y visual que fortalezca la toma de decisiones académicas y
                mejore la retención estudiantil.
              </p>
            </div>

            <p style={styles.text}>
              Con el uso de modelos de Machine Learning como Perceptrón Multicapa (MLP),
              SVM y Árboles de Decisión, el sistema aprende del comportamiento histórico
              y permite anticipar escenarios futuros con mayor precisión.
            </p>

            <p style={styles.text}>
              A continuación, selecciona el dataset institucional desde Google Drive para iniciar
              el proceso de análisis, preprocesamiento y entrenamiento del modelo de IA que dará vida
              al Semáforo Académico Inteligente.
              <br />
            </p>
          </div>
        </div>

        {/* 🔹 DERECHA (Componente de Google Drive) */}
        <div style={styles.right}>
          <GoogleDrivePicker />
        </div>
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
    height: "100vh",
    overflowX: "hidden",
    fontFamily: "'Times New Roman', Times, serif",
  },

  topPanel: {
    width: "100%",
    background: "linear-gradient(90deg, #005d50 0%, #009688 100%)",
    color: "#fff",
    padding: "1.2rem 2.5rem",
    boxShadow: "0 6px 20px rgba(14,30,37,0.13)",
    borderBottomLeftRadius: "18px",
    borderBottomRightRadius: "18px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70px",
    height: "auto",
    overflow: "hidden",
    backdropFilter: "blur(1.5px)",
    textAlign: "center",
    fontStyle: "italic",
  },

  panelTitle: {
    textAlign: "center",
    fontSize: "2.4rem",
    fontWeight: "700",
    textTransform: "uppercase",
    fontFamily: "'Times New Roman', Times, serif",
    letterSpacing: "1.5px",
    lineHeight: "1.3",
    color: "#ffffff",
    textShadow:
      "0 0 8px rgba(255,255,255,0.25), 0 2px 6px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease, text-shadow 0.4s ease",
    cursor: "default",
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "90%",
  },

  content: {
    display: "flex",
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
  },

  left: {
    flex: 1,
    minWidth: "320px",
    //fontWeight: "bold" ,
    backgroundColor: "#e7fff9",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
   fontStyle: "italic",
  },

  right: {
    flex: 1,
    minWidth: "320px",
    backgroundColor: "#eaf9ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    fontStyle: "italic",
  },

  textBox: {
    borderLeft: "6px solid #007282",
    backgroundColor: "#f9f9f9",
    padding: "1.5rem",
    fontSize: "1rem",
    lineHeight: "1.6",
    width: "90%",
    maxWidth: "550px",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
  },

  textWithImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
  },

  semaforo: {
    width: "230px",
    height: "auto",
    marginRight: "1rem",
  },

  text: {
    textAlign: "justify",
    color: "#333",
    marginBottom: "0.8rem",
    fontSize: "1.05rem",
    lineHeight: "1.7",
  },
};
