import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function BottomRight({ salidas }) {
  const Yd = salidas?.Yd || [];
  const Yr = salidas?.Yr || [];

  // 🔹 Construir puntos (pares Yd, Yr)
  const data = Yd.map((yd, i) => ({
    Yd: parseFloat(yd),
    Yr: parseFloat(Yr[i]),
  })).filter((p) => !isNaN(p.Yd) && !isNaN(p.Yr));

  // 🔹 Calcular límites
  const minYd = Math.min(...data.map((d) => d.Yd));
  const maxYd = Math.max(...data.map((d) => d.Yd));
 

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Gráfica YR vs YD</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* 🔹 Eje X → YD */}
            <XAxis
              type="number"
              dataKey="Yd"
              domain={[minYd, maxYd]}
              tickCount={10}
              name="Salida Deseada (YD)"
              label={{ value: "YD", position: "insideBottom", offset: -5 }}
            />

            {/* 🔹 Eje Y → YR */}
            <YAxis
              type="number"
              dataKey="Yr"
              domain={["auto", "auto"]}
              tickCount={10}
              name="Salida Real (YR)"
              label={{ value: "YR", angle: -90, position: "insideLeft" }}
            />

            {/* 🔹 Tooltip */}
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name) => [value.toFixed(3), name]}
            />

            {/* 🔹 Línea ascendente de referencia (y = x) */}
            <ReferenceLine
              segment={[
                { x: minYd, y: minYd },
                { x: maxYd, y: maxYd },
              ]}
              stroke="#1184a3ff"
              strokeWidth={2}
              strokeDasharray="4 4"
            />

            {/* 🔵 Puntos de dispersión */}
            <Scatter
              name="YR vs YD"
              data={data}
              fill="#1184a3ff"
              shape="circle"
            />
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
    backgroundColor: "#e7fff1ff",
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
