import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { useNavigate } from "react-router-dom";
import { analizarDataset } from "../../Controllers/AnalisisDataset";
import { useDataset } from "../../../Context/DatasetContext"; // ✅ contexto global
import { useSubset } from "../../../Context/SubsetContext"; // ✅ nuevo impor

export default function GoogleDrivePicker({ onDatasetInfo }) {
  const [openPicker, authResponse] = useDrivePicker();
  const [datasetProcesado, setDatasetProcesado] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const { guardarDataset } = useDataset(); // ✅ aquí
  const { guardarSubset  } = useSubset(); // ✅ usamos el contexto del subset 20%

  // ✅ Cargar dataset guardado al montar el componente
  useEffect(() => {
    const saved = localStorage.getItem("datasetProcesado");
    const savedName = localStorage.getItem("datasetFileName");

    if (saved) {
      try {
        const data = JSON.parse(saved);
        setDatasetProcesado(data);
        if (savedName) setFileName(savedName);
        if (onDatasetInfo) onDatasetInfo(data);
      } catch (error) {
        console.error("Error al leer dataset guardado:", error);
      }
    }
  }, [onDatasetInfo]);

  // 📂 Abrir selector de Google Drive
  const handleOpenPicker = () => {
    openPicker({
      clientId: "347987211299-iagoggoejqg5qttuv67aeko35k29melv.apps.googleusercontent.com",
      developerKey: "AIzaSyCjaBLF33iA0LqJuPmF-UUCp1cEu8ZCkr4",
      viewId: "DOCS",
      token: authResponse?.access_token,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      callbackFunction: async (data) => {
        if (data.action === "picked") {
          const fileId = data.docs[0].id;
          const fileName = data.docs[0].name;
          const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

          try {
            const response = await fetch(downloadUrl, {
              headers: { Authorization: `Bearer ${authResponse.access_token}` },
            });
            const jsonData = await response.json();

            if (!Array.isArray(jsonData)) {
              alert("⚠️ El archivo JSON debe ser un arreglo de objetos (ej: [{}, {}, ...])");
              return;
            }

            const info = analizarDataset(jsonData, guardarSubset);
            setFileName(fileName);
            setDatasetProcesado(info);

            // 💾 Guardar en localStorage
            localStorage.setItem("datasetProcesado", JSON.stringify(info));
            localStorage.setItem("datasetFileName", fileName);

            // ✅ Guardar en contexto global
            guardarDataset(info.subset, info);

            if (onDatasetInfo) onDatasetInfo(info);
          } catch (error) {
            alert("Error al leer el archivo: " + error.message);
          }
        }
      },
    });
  };

  // 🧭 Botón “Siguiente”
  const handleSiguiente = () => {
    if (!datasetProcesado) return;
    navigate("/MainEntrenamiento");
  };
  // 🧾 Tabla
  const renderTable = (data) => {
    if (!data || data.length === 0) return <p>No hay datos para mostrar.</p>;
    const headers = Object.keys(data[0]);

    return (
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} style={styles.th}>
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header} style={styles.td}>
                    {String(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h3>Cargar archivo JSON desde Google Drive ☁️</h3>

      <button style={styles.button} onClick={handleOpenPicker}>
        Seleccionar desde Drive
      </button>

      {datasetProcesado && (
        <div style={{ marginTop: 20, width: "100%" }}>
          <h4>📄 Archivo cargado: {fileName}</h4>
          <p>
            Entradas: <b>{datasetProcesado.entradas}</b> | Salidas:{" "}
            <b>{datasetProcesado.salidas}</b> | Patrones (80 %):{" "}
            <b>{datasetProcesado.patrones}</b>
          </p>

          {renderTable(datasetProcesado.subset)}

          <button style={styles.nextButton} onClick={handleSiguiente}>
            Siguiente ➜
          </button>
        </div>
      )}
    </div>
  );
}

// 🎨 Estilos
const styles = {
  container: {
    background: "#007282",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "90%",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  button: {
    backgroundColor: "#2BD8FF",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: "20px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "8px",
    color: "#007282",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  tableContainer: {
    marginTop: "20px",
    overflowX: "auto",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "8px",
    padding: "10px",
    maxHeight: "400px",
    overflowY: "auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    backgroundColor: "#007282",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #2BD8FF",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  td: {
    borderBottom: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
  },
};
