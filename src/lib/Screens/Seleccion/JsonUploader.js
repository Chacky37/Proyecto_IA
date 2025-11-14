import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { useNavigate } from "react-router-dom";
import { analizarDataset } from "../../Controllers/AnalisisDataset";
import { useDataset } from "../../../Context/DatasetContext";
import { useSubset } from "../../../Context/SubsetContext";

export default function GoogleDrivePicker({ onDatasetInfo }) {
  const [openPicker, authResponse] = useDrivePicker();
  const [datasetProcesado, setDatasetProcesado] = useState(null);
  const [fileName, setFileName] = useState("");
  const [googleToken, setGoogleToken] = useState(localStorage.getItem("google_token") || null);
  const [rawData, setRawData] = useState(null); // Guardar el conjunto original para mostrarlo
  const navigate = useNavigate();
  const { guardarDataset } = useDataset();
  const { guardarSubset } = useSubset();

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("google_token");
      if (!token) return;
      try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
        if (!response.ok) throw new Error("Token inválido o expirado");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
      } catch (error) {
        console.warn("⛔ Token expirado o inválido. Eliminando...");
        localStorage.removeItem("google_token");
        setGoogleToken(null);
      }
    };
    verificarToken();
  }, []);

  useEffect(() => {
    if (authResponse?.access_token) {
      localStorage.setItem("google_token", authResponse.access_token);
      setGoogleToken(authResponse.access_token);
    }
  }, [authResponse]);

  useEffect(() => {
    const saved = localStorage.getItem("datasetProcesado");
    const savedName = localStorage.getItem("datasetFileName");
    const savedRaw = localStorage.getItem("datasetRawData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setDatasetProcesado(data);
        if (savedName) setFileName(savedName);
        if (savedRaw) setRawData(JSON.parse(savedRaw));
        if (onDatasetInfo) onDatasetInfo(data);
      } catch (error) {
        console.error("Error al leer dataset guardado:", error);
      }
    }
  }, [onDatasetInfo]);

  const handleLoginGoogle = () => {
    openPicker({
      clientId: "347987211299-iagoggoejqg5qttuv67aeko35k29melv.apps.googleusercontent.com",
      developerKey: "AIzaSyCjaBLF33iA0LqJuPmF-UUCp1cEu8ZCkr4",
      viewId: "DOCS",
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: false,
      callbackFunction: () => {},
    });
  };

  const handleOpenPicker = () => {
    const token = googleToken || authResponse?.access_token;
    if (!token) {
      alert("🔐 Debes iniciar sesión con Google antes de abrir el selector.");
      handleLoginGoogle();
      return;
    }
    openPicker({
      clientId: "347987211299-iagoggoejqg5qttuv67aeko35k29melv.apps.googleusercontent.com",
      developerKey: "AIzaSyCjaBLF33iA0LqJuPmF-UUCp1cEu8ZCkr4",
      viewId: "DOCS",
      token,
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
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 401) {
              alert("⚠️ El token ha expirado. Vuelve a iniciar sesión.");
              localStorage.removeItem("google_token");
              setGoogleToken(null);
              return;
            }
            const jsonData = await response.json();
            if (!Array.isArray(jsonData)) {
              alert("⚠️ El archivo JSON debe ser un arreglo de objetos (ej: [{}, {}, ...])");
              return;
            }
            // Guardar la data original para mostrar columnas completas
            setRawData(jsonData);
            localStorage.setItem("datasetRawData", JSON.stringify(jsonData));
            // FILTRAR SOLO PARA GUARDAR Y ANALIZAR
            const filteredData = jsonData.map(obj => {
              const keys = Object.keys(obj);
              const { [keys[0]]: _, ...rest } = obj;
              return rest;
            });

            const info = analizarDataset(filteredData, guardarSubset);
            setFileName(fileName);
            setDatasetProcesado(info);
            localStorage.setItem("datasetProcesado", JSON.stringify(info));
            localStorage.setItem("datasetFileName", fileName);
            guardarDataset(info.subset, info);
            if (onDatasetInfo) onDatasetInfo(info);
          } catch (error) {
            alert("Error al leer el archivo: " + error.message);
          }
        }
      },
    });
  };

  const handleSiguiente = () => {
    if (!datasetProcesado) return;
    navigate("/MainEntrenamiento");
  };

  // Renderiza usando siempre el dataset crudo (con todas las columnas)
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
      {!googleToken ? (
        <button style={styles.loginButton} onClick={handleLoginGoogle}>
          Iniciar sesión con Google 🔐
        </button>
      ) : (
        <button style={styles.button} onClick={handleOpenPicker}>
          Seleccionar desde Drive
        </button>
      )}
      {datasetProcesado && rawData && (
        <div style={{ marginTop: 20, width: "100%" }}>
          <h4>📄 Archivo cargado: {fileName}</h4>
          <p>
            Entradas: <b>{datasetProcesado.entradas}</b> | Salidas:{" "}
            <b>{datasetProcesado.salidas}</b> | Patrones (80 %):{" "}
            <b>{datasetProcesado.patrones}</b>
          </p>
          {renderTable(rawData)}
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
    background: "linear-gradient(90deg, #00796B 0%, #00BFA5 100%)",
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
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#2BD8FF",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#000",
  },
  nextButton: {
    marginTop: "20px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "8px",
    color: "#007282",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
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
    background: "linear-gradient(90deg, #00796B 100%)",
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
