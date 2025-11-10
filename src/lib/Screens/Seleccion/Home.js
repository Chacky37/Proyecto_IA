import GoogleDrivePicker from "./JsonUploader";
import Base_Radiales from "../../../lib/Images/BaseRadiales.png"; // usa tu imagen

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Izquierda: texto + imagen */}
      <div style={styles.left}>
        <div style={styles.textBox}>
          <p style={styles.text}>
            A continuación, selecciona el archivo correspondiente para iniciar el proceso de entrenamiento. 
            Este archivo contiene la información necesaria para comenzar la configuración y carga de datos, 
            por lo que es importante asegurarte de elegir el documento correcto antes de continuar.
          </p>
        </div>
        <img src={Base_Radiales} alt="Cerebro IA" style={styles.image} />
      </div>

      {/* Derecha: componente JsonUploader */}
      <div style={styles.right}>
        <GoogleDrivePicker />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    flexWrap: "wrap", // ✅ Permite que las columnas se apilen si no caben
  },
  left: {
    flex: 1,
    minWidth: "320px", // ✅ Evita que se comprima demasiado
    backgroundColor: "#fff",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
  right: {
    flex: 1,
    minWidth: "320px",
    backgroundColor: "#eaf9ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
  textBox: {
    border: "1px solid #0099cc",
    padding: "1.2rem",
    fontSize: "1rem",
    lineHeight: "1.6",
    width: "90%",
    maxWidth: "500px",
    marginBottom: "1.5rem",
    boxSizing: "border-box",
  },
  text: {
    textAlign: "justify",
  },
  image: {
    width: "80%",
    maxWidth: "450px", // ✅ Limita el tamaño máximo
    height: "auto", // ✅ Mantiene proporciones originales
    borderRadius: "10px",
    objectFit: "contain",
  },
};