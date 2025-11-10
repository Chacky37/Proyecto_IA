import React from "react";

export default function BottomLeft({ detalles }) {
  if (!detalles || !detalles.A || !detalles.W || !detalles.Y) {
    return (
      <div style={styles.card}>
        <h3 style={styles.title}>⚠️ No hay datos de entrenamiento aún</h3>
      </div>
    );
  }

  const { A, W, Y } = detalles;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📊 Datos del modelo RBF</h3>
      <p style={styles.subtitle}>A * W = Y</p>

      <div style={styles.container}>
        {/* Matriz A */}
        <div style={styles.matrixBoxA}>
          <h4 style={styles.matrixTitle}>A</h4>
          <table style={styles.table}>
            <tbody>
              {A.map((fila, i) => (
                <tr key={i}>
                  {fila.map((v, j) => (
                    <td key={j} style={styles.td}>
                      {typeof v === "number" ? v.toFixed(5) : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Matriz W */}
        <div style={styles.matrixBoxSmall}>
          <h4 style={styles.matrixTitle}>W</h4>
          <table style={styles.table}>
            <tbody>
              {W.map((fila, i) => (
                <tr key={i}>
                  {fila.map((v, j) => (
                    <td key={j} style={styles.td}>
                      {typeof v === "number" ? v.toFixed(5) : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Matriz Y */}
        <div style={styles.matrixBoxSmall}>
          <h4 style={styles.matrixTitle}>Y</h4>
          <table style={styles.table}>
            <tbody>
              {Y.map((fila, i) => (
                <tr key={i}>
                  {Array.isArray(fila) ? (
                    fila.map((v, j) => (
                      <td key={j} style={styles.td}>
                        {typeof v === "number" ? v.toFixed(5) : v}
                      </td>
                    ))
                  ) : (
                    <td style={styles.td}>
                      {typeof fila === "number" ? fila.toFixed(5) : fila}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
const styles = {
  card: {
    backgroundColor: "#E3FDFD",
    borderRadius: "12px",
    padding: "0px",
    margin: "0px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginTop: "20px",
    textAlign: "center",
    width: "100%",
  },

  title: { color: "#007282", marginBottom: "5px" },
  subtitle: { color: "#007282", fontWeight: "bold", marginBottom: "15px" },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: "12px",
    width: "100%",
    overflow: "hidden",
    transition: "all 0.3s ease-in-out",
  },

  // 🔹 Matriz A ocupa más espacio y se adapta automáticamente
  matrixBoxA: {
    flex: "3 1 55%", // crece más si tiene muchas columnas
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    overflowX: "auto",
    overflowY: "auto",
    maxHeight: "260px",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease-in-out",
  },

  // 🔹 Matriz W y Z más pequeñas y flexibles
  matrixBoxSmall: {
    flex: "1 1 20%", // se reduce más si A crece
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    overflowX: "auto",
    overflowY: "auto",
    maxHeight: "260px",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease-in-out",
  },

  matrixTitle: { color: "#007282", marginBottom: "5px" },
  table: {
    borderCollapse: "collapse",
    fontSize: "0.85rem",
    width: "max-content",
    minWidth: "100%",
  },

  td: {
    border: "1px solid #ccc",
    padding: "4px 6px",
    textAlign: "center",
    fontFamily: "monospace",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};
