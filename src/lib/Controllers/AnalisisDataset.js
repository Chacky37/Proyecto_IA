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

  // 🔢 Detectar columnas numéricas (solamente para convertirlas)
  const columnasNumericas = columnas.filter((col) =>
    subsetEntrenamiento.every((row) => {
      const valor = row[col];
      return valor !== "" && !isNaN(Number(valor));
    })
  );

  // ❌ Ya NO se eliminan columnas
  const columnasEliminadas = []; // <- Siempre vacío

  // 🧾 Crear subset SIN eliminar columnas
  const subset = subsetEntrenamiento.map((row) => {
    const limpio = {};

    columnas.forEach((col) => {
      const valor = row[col];

      if (columnasNumericas.includes(col)) {
        limpio[col] = Number(valor);  // convertir numéricos
      } else {
        limpio[col] = valor;          // mantener texto
      }
    });

    return limpio;
  });

  // 💾 Guardar subset del 20% si se solicita
  let registroExitoso = false;

  if (typeof guardarSubset === "function") {
    try {
      const subsetLimpioPrueba = subsetPrueba.map((row) => {
        const limpio = {};
        columnas.forEach((col) => {
          const valor = row[col];
          if (columnasNumericas.includes(col)) {
            limpio[col] = Number(valor);
          } else {
            limpio[col] = valor;
          }
        });
        return limpio;
      });

      guardarSubset(subsetLimpioPrueba, {
        columnasNumericas,
        columnasEliminadas,
        total,
        porcentaje: "20%",
      });

      const stored = localStorage.getItem("subset20");
      if (stored) registroExitoso = true;
    } catch (error) {
      console.error("❌ Error al guardar el subset:", error);
      registroExitoso = false;
    }
  }

  if (registroExitoso) {
    console.log("✅ Subset (20%) guardado exitosamente");
  } else {
    console.warn("⚠️ No se pudo guardar el subset");
  }

  // 🧮 Cálculos de estructura (solo numéricos)
  const entradas = columnasNumericas.length - 1;
  const salidas = 1;
  const patrones = subset.length;

  return {
    entradas,
    salidas,
    patrones,
    subset,
    columnasNumericas,
    columnasEliminadas,
    total,
  };
}
