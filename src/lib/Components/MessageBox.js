import React from "react";
import errorImg from "../../lib/Images/error.png"; // ✅ importa la imagen

export default function MessageBox({ message, onClose }) {
  if (!message) return null; // 🔹 No renderiza nada si no hay mensaje

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3 style={styles.title}>ERROR</h3>

        {/* 🖼️ Imagen del error */}
        <img src={errorImg} alt="Error" style={styles.image} />

        <p style={styles.text}>{message}</p>

        <button style={styles.button} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  box: {
    backgroundColor: "#fff",
    padding: "25px 35px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    fontFamily: "'Times New Roman', Times, serif", // ✅ Fuente general clásica
  },
  title: {
    color: "#b71c1c",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    marginBottom: "15px",
  },
  text: {
    color: "#000",
    fontSize: "18px",
    fontWeight: "bold", // ✅ Negrita
    fontFamily: "'Times New Roman', Times, serif", // ✅ Fuente clásica
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007282",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: "'Times New Roman', Times, serif", // ✅ Igual estilo
  },
};
