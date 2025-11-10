// src/utils/analizarDataset.js
export function analizarDataset(jsonData, guardarSubset) {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.warn("⚠️ El dataset está vacío o no es válido.");
    return { entradas: 0, salidas: 0, patrones: 0, subset: [] };
  }

  // 📊 Separar 80% (entrenamiento) y 20% (pruebas)
  const total = jsonData.length;
  const limite = Math.floor(total * 0.8);
  const subsetEntrenamiento = jsonData.slice(0, limite);
  const subsetPrueba = jsonData.slice(limite);

  // 🔍 Detectar columnas
  const columnas = Object.keys(subsetEntrenamiento[0]);

  // 🧹 Detectar columnas numéricas
  const columnasNumericas = columnas.filter((col) =>
    subsetEntrenamiento.every((row) => {
      const valor = row[col];
      return valor !== "" && !isNaN(Number(valor));
    })
  );

  // 📋 Detectar columnas eliminadas
  const columnasEliminadas = columnas.filter(
    (col) => !columnasNumericas.includes(col)
  );

  // 🧾 Crear subset limpio (solo numéricos)
  const subset = subsetEntrenamiento.map((row) => {
    const limpio = {};
    columnasNumericas.forEach((col) => (limpio[col] = Number(row[col])));
    return limpio;
  });
// 💾 Si se pasa guardarSubset desde el contexto, guardar el 20%
let registroExitoso = false;

if (typeof guardarSubset === "function") {
  try {
    const subsetLimpioPrueba = subsetPrueba.map((row) => {
      const limpio = {};
      columnasNumericas.forEach((col) => (limpio[col] = Number(row[col])));
      return limpio;
    });

    guardarSubset(subsetLimpioPrueba, {
      columnasNumericas,
      columnasEliminadas,
      total,
      porcentaje: "20%",
    });

    // ✅ Verificar si se guardó correctamente en localStorage
    const stored = localStorage.getItem("subset20");
    if (stored) registroExitoso = true;
  } catch (error) {
    console.error("❌ Error al guardar el subset:", error);
    registroExitoso = false;
  }
}

if (registroExitoso) {
  console.log("✅ Subset guardado exitosamente");
} else {
  console.warn("⚠️ No se pudo guardar el subset");
}


  // 🧮 Cálculos de estructura
  const entradas = columnasNumericas.length - 1;
  const salidas = 1;
  const patrones = subset.length;

  // 📄 Crear reporte
  const reporte = `
 -----------------------------------------
    📊 REPORTE DE ANÁLISIS DE DATASET
------------------------------------------
📁 Total de registros originales: ${total}
📉 Registros usados (80%): ${patrones}
📈 Registros de prueba (20%): ${subsetPrueba.length}

📌 Columnas originales (${columnas.length}):
${columnas.join(", ")}

✅ Columnas numéricas usadas (${columnasNumericas.length}):
${columnasNumericas.join(", ")}

❌ Columnas eliminadas (${columnasEliminadas.length}):
${columnasEliminadas.length > 0 ? columnasEliminadas.join(", ") : "Ninguna"}

🔢 Entradas: ${entradas}
🎯 Salidas: ${salidas}
`;

  // 💾 Crear archivo descargable
  const blob = new Blob([reporte], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "reporte_dataset.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { entradas, salidas, patrones, subset };
}
