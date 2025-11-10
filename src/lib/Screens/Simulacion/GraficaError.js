import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function GraficaError({ eg, errorPermitido }) {
  let data = [];

  if (Array.isArray(eg) && Array.isArray(errorPermitido)) {
    data = eg.map((valor, i) => ({
      epoca: i + 1,
      eg: parseFloat(valor),
      errorPermitido: parseFloat(errorPermitido[i] ?? errorPermitido.at(-1) ?? 0),
    }));
  } else if (typeof eg === "number" && typeof errorPermitido === "number") {
    data = [{ epoca: 1, eg: eg, errorPermitido: errorPermitido }];
  }

  // 🧮 Calculamos el promedio del error global (para ubicar la línea)
  const promedioEG =
    data.length > 0
      ? data.reduce((acc, d) => acc + d.eg, 0) / data.length
      : 0;

  // 🎯 Etiqueta personalizada para los puntos
  const CustomLabel = ({ x, y, value, name }) => {
    return (
      <text
        x={x}
        y={y - 10}
        textAnchor="middle"
        fontSize={10}
        fill={name === "eg" ? "#007282" : "#FF5733"}
        fontWeight="bold"
      >
        {`${name === "eg" ? "Error Global" : "Error Permitido"}: ${value.toFixed(4)}`}
      </text>
    );
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Error Global vs Error Permitido</h3>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="epoca"
              label={{ value: "Iteración", position: "insideBottom", offset: -5 }}
            />

            <YAxis
              label={{
                value: "Errores",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              formatter={(value, name) => [
                value.toFixed(6),
                name === "eg" ? "EG" : "Error Permitido",
              ]}
            />

            {/* 🔹 Línea guía horizontal mínima (nivel promedio del EG) */}
            <ReferenceLine
              y={promedioEG}
              stroke="#007282"
              strokeDasharray="4 4"
              strokeWidth={0.8}
              opacity={0.6}
              label={{
                position: "right",
                fill: "#007282",
                fontSize: 10,
              }}
            />

            {/* 🔹 Línea del Error Global */}
            <Line
              type="monotone"
              dataKey="eg"
              stroke="#007282"
              strokeWidth={2}
              name="Error Global"
              dot={{ r: 3 }}
              label={<CustomLabel name="eg" />}
            />

            {/* 🔸 Línea del Error Permitido */}
            <Line
              type="monotone"
              dataKey="errorPermitido"
              stroke="#FF5733"
              strokeWidth={2}
              name="Error Permitido"
              dot={{ r: 3 }}
              label={<CustomLabel name="errorPermitido" />}
            />

            {/* 🔸 Línea base (y=0) */}
            <ReferenceLine y={0} stroke="#ccc" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p style={styles.placeholder}>No hay datos de error para graficar</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fbffe7ff",
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
