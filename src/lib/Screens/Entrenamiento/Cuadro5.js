import React from "react";

export default function Cuadro5() {
  return (
    <div style={styles.cuadro}>
      <h3>Cuadro 5</h3>
      <p>Contenido del cuadro 5</p>
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
