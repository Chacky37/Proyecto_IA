import React from "react";
import {
  ScatterChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function BottomRight({ salidas }) {
  // Evita errores si salidas viene vacío
  const Yd = salidas?.Yd || [];
  const Yr = salidas?.Yr || [];

  // Construir los puntos (pares Yd, Yr)
  const data = Yd.map((yd, i) => ({
    Yd: parseFloat(yd),
    Yr: parseFloat(Yr[i]),
  })).sort((a, b) => a.Yd - b.Yd); // 🔥 Asegura que estén ordenados por Yd

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Gráfica YR vs YD</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 10, right: 20, bottom: 10, left: 10 }} // 🔥 margen reducido
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="Yd"
              domain={["auto", "auto"]}
              tickCount={20} // 🔥 más granular
              name="Salida Deseada (YD)"
              label={{ value: "YD", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="Yr"
              domain={["auto", "auto"]}
              tickCount={10}
              name="Salida Real (YR)"
              label={{ value: "YR", angle: -90, position: "insideLeft" }}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name) => [value.toFixed(3), name]}
            />

            {/* Ejes de referencia */}
            <ReferenceLine y={0} stroke="#ccc" />
            <ReferenceLine x={0} stroke="#ccc" />

            {/* 🔥 Línea que conecta los puntos */}
            <Line
              type="monotone"
              dataKey="Yr"
              data={data}
              stroke="#1184a3ff"
              strokeWidth={2}
              dot={false}
            />

            {/* 🔵 Puntos */}
            <Scatter name="YR vs YD" data={data} fill="#1184a3ff" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <p style={styles.placeholder}>No hay datos para graficar</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#e7fff9",
    borderRadius: "12px",
    padding: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    overflowX: "hidden",
    height: "auto",
    minHeight: "250px",
  },
  header: {
    textAlign: "center",
    color: "#1184a3ff",
    marginBottom: "10px",
  },
  placeholder: {
    textAlign: "center",
    color: "#888",
  },
};
