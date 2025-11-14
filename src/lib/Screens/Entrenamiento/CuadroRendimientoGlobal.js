import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Los props pueden ser: rendimientoPositivo, rendimientoNegativo
 */
export default function CuadroRendimientoGlobal({
  positivo = 50,
  negativo = 50,
}) {
   console.log("🔎 CuadroRendimientoGlobal:", {
    rendimientoPositivo: positivo,
    rendimientoNegativo: negativo,
  });
  const totalIndicadores = positivo + negativo;

  const data = [
    { name: "Rendimiento Positivo", value: positivo },
    { name: "Rendimiento Negativo", value: negativo },
  ];

  const COLORS = ["#33A3FF", "#003D99"];


  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h3 style={styles.titulo}>Rendimiento Global Del Semestre</h3>
        <div style={styles.contenedor}>
          <div style={styles.grafica}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
  data={data}
  innerRadius={70}
  outerRadius={100}
  paddingAngle={3}
  dataKey="value"
label={(entry) => `${entry.value.toFixed(2)}%`}// ← Labels = positivo / negativo
  labelStyle={{
    fill: "#000",      // color del texto
    fontSize: 14,
    fontWeight: "bold",
  }}
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index]} />
  ))}
</Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.info}>
            <h1 style={styles.total}>{totalIndicadores.toLocaleString()}%</h1>
            <p> </p>
            <div style={styles.leyenda}>
              <div style={{ ...styles.colorBox, background: COLORS[0] }} />
              <span>
                Rendimiento Positivo
              </span>
            </div>
            <div style={styles.leyenda}>
              <div style={{ ...styles.colorBox, background: COLORS[1] }} />
              <span>
                Rendimiento Negativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#fdfdfdff",
    borderRadius: "12px",
    padding: "10px",          // Controla el 'aire' entre el borde exterior y la tarjeta
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    width: "100%",           // Ajusta según tu layout
    boxSizing: "border-box",
  },

  card: {
    background: "#E6FAF5",    // Fondo similar a la tarjeta de la imagen
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
    textAlign: "center",
    fontFamily: "sans-serif",
    minHeight: "250px",
    height: "auto",
    width: "100%",
    boxSizing: "border-box",
  },

  titulo: {
    color: "#007bff",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "12px",
    textTransform: "uppercase",
  },

  contenedor: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "25px",
  },

  grafica: {
    flex: 2,
    padding: "12px",
  },

  info: {
    flex: 1,
    textAlign: "left",
    paddingLeft: "10px",
  },

  total: {
    fontSize: "38px",
    color: "#007bff",
    margin: "0",
  },

  textoTotal: {
    fontSize: "14px",
    marginBottom: "12px",
  },

  leyenda: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    marginBottom: "6px",
  },

  colorBox: {
    width: "14px",
    height: "14px",
    marginRight: "8px",
    borderRadius: "3px",
  },
};
