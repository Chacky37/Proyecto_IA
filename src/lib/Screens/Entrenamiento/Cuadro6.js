import React from "react";

export default function Cuadro6() {
  return (
    <div style={styles.cuadro}>
      <h3>Cuadro 6</h3>
      <p>Contenido del cuadro 6</p>
    </div>
  );
}

const styles = {
  cuadro: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};
