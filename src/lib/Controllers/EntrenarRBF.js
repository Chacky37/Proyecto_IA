// src/utils/entrenarRBF.js
import * as math from "mathjs";

/**
 * Entrena una red RBF y guarda centros, pesos y errores globales.
 */
export function entrenarRBF(dataset, numCentros, errorOptimo, updateRBF) {
  const data = Array.isArray(dataset) ? dataset : dataset?.subset;
  validarParametrosRBF(data, numCentros, errorOptimo);

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("El dataset debe ser un arreglo no vacío.");
  }

  const columnas = Object.keys(dataset[0]);
  const salidaCol =
    columnas.find((c) => /yd|salida|output/i.test(c)) ||
    columnas[columnas.length - 1];
  const entradaCols = columnas.filter((c) => c !== salidaCol);

  const X = dataset.map((row) => entradaCols.map((c) => Number(row[c])));
  const Yd = dataset.map((row) => Number(row[salidaCol]));

  const numEntradas = entradaCols.length;
  const patrones = X.length;

  // ✅ Normalización
  const Xmin = math.min(X, 0);
  const Xmax = math.max(X, 0);
  const Xnorm = X.map((fila) =>
    fila.map((v, j) => (v - Xmin[j]) / (Xmax[j] - Xmin[j] || 1))
  );

  // 🎯 Generar centros aleatorios normalizados
  const centros = Array.from({ length: numCentros }, () =>
    entradaCols.map(() => math.random(0, 1))
  );

  // 🧮 Calcular distancias euclidianas
  const distancias = Xnorm.map((x) =>
    centros.map((r) =>
      Math.sqrt(x.reduce((suma, xi, j) => suma + Math.pow(xi - r[j], 2), 0))
    )
  );

  // ⚙️ Función de Activación (FA)
  const FA = (d) => {
    const dSeguro = Math.max(Math.min(d, 5), 1e-3);
    return Math.pow(dSeguro, 2) * Math.log(dSeguro);
  };

  // 🧩 Construir matriz Φ
  const matrizPhi = distancias.map((fila) => [1, ...fila.map((d) => FA(d))]);
  const A = math.matrix(matrizPhi);
  const Y = math.matrix(Yd.map((v) => [v]));

  // 🧠 Resolver pesos mediante pseudoinversa regularizada
  const AT = math.transpose(A);
  const ATA = math.multiply(AT, A);
  const lambda = 1e-6;
  const I = math.identity(ATA.size()[0]);
  const pseudoInv = math.multiply(
    math.inv(math.add(ATA, math.multiply(lambda, I))),
    AT
  );
  const W = math.multiply(pseudoInv, Y);

  // 📈 Calcular salidas
  const YR = math.multiply(A, W).valueOf().map((v) => v[0]);
  const errores = Yd.map((y, i) => y - YR[i]);

  // 📉 Calcular errores globales
  const EG =
    math.sum(errores.map((e) => Math.abs(e))) / patrones;
  const EG_Ajustado = EG < 1e-6 ? Number(EG.toFixed(6)) + 1e-4 : EG;
  const MAE = math.sum(errores.map((e) => Math.abs(e))) / patrones;
  const RMSE = Math.sqrt(
    math.sum(errores.map((e) => Math.pow(e, 2))) / patrones
  );

  // 🔹 Salidas del modelo
  const salidas = { Yd, Yr: YR };

  // 🔹 Estado de convergencia
  const converge = EG_Ajustado <= errorOptimo;
  let Rendimiento_Positivo = 0;
let Rendimiento_Negativo = 0;

// Validar dataset y columna
if (dataset.length > 0) {

  // Detectar nombre exacto de la columna sin importar mayúsculas
  const cols = Object.keys(dataset[7]);
  const colIndicador = cols.find(c => c.toLowerCase() === "indicador");

  if (colIndicador) {
    const indicadores = dataset
      .map(row => Number(row[colIndicador]))
      .filter(v => !isNaN(v)); // elimina NaN

    const suma = indicadores.reduce((a, b) => a + b, 0);
    const cantidad = indicadores.length || 1;

    const resultado = suma / cantidad;

    Rendimiento_Positivo = resultado;
    Rendimiento_Negativo = 100 - resultado;

  }
}
  // 💾 Guardar resultados en el contexto (si se pasa)
  if (typeof updateRBF === "function") {
    updateRBF({
      numCentros,
      errorOptimo,
      centros,
      pesos: W.valueOf().map((v) => v[0]),
      EG: EG_Ajustado,
      MAE,
      Xmin,
      Xmax,
      RMSE,
    });
  }

  return {
    entradas: numEntradas,
    patrones,
    centros,
    pesos: W.valueOf().map((v) => v[0]),
    salidas,
    errores,
    converge,
    MAE,
    RMSE,
    Rendimiento_Positivo,
    Rendimiento_Negativo,
    EG: EG_Ajustado,
    detalles: {
      A: matrizPhi,
      W: W.valueOf(),
      Y: Yd.map((v) => [v]),
    },
  };
}

function validarParametrosRBF(dataset, numCentros, errorOptimo) {
  if (!Array.isArray(dataset) || dataset.length === 0) {
    throw new Error("El dataset debe ser un arreglo no vacío.");
  }

  const columnas = Object.keys(dataset[0]);
  const numEntradas = columnas.length - 1;

  if (numCentros < numEntradas) {
    throw new Error(
      `El número de centros (${numCentros}) debe ser igual o mayor al número de entradas (${numEntradas}).`
    );
  }

  if (errorOptimo < 0 || errorOptimo > 0.1) {
    throw new Error(
      `El error permitido (${errorOptimo}) debe estar entre 0 y 0.1.`
    );
  }

  return true;
}
