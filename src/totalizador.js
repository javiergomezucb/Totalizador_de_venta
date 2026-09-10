export function calcularTotal(cantidad, precioUnitario, estado = "CA", categoria = "Varios", pesoVolumetrico = 0, tipoCliente = "Normal") {
  // Validaciones de cantidad (Requisitos 2 y 47)
  if (cantidad === undefined || cantidad === null || isNaN(cantidad) || cantidad <= 0) {
    return "Error: Cantidad inválida";
  }
  
  // Validaciones de precio unitario (Requisitos 3 y 47)
  if (precioUnitario === undefined || precioUnitario === null || isNaN(precioUnitario) || precioUnitario < 0) {
    return "Error: Precio inválido";
  }

  // Validaciones de peso volumétrico (Requisitos 35 y 47)
  if (pesoVolumetrico === undefined || pesoVolumetrico === null || isNaN(pesoVolumetrico) || pesoVolumetrico < 0) {
    return "Error: Peso volumétrico inválido";
  }

  const precioNeto = cantidad * precioUnitario;
  
  let descuentoVolumen = 0;
  if (precioNeto >= 30000) {
    descuentoVolumen = 0.15;
  } else if (precioNeto >= 10000) {
    descuentoVolumen = 0.10;
  } else if (precioNeto >= 7000) {
    descuentoVolumen = 0.07;
  } else if (precioNeto >= 3000) {
    descuentoVolumen = 0.05;
  } else if (precioNeto >= 1000) {
    descuentoVolumen = 0.03;
  }

  const categoriasReglas = {
    "Alimentos": { impuestoAdicional: 0, descuentoAdicional: 0.02 },
    "Bebidas alcohólicas": { impuestoAdicional: 0.07, descuentoAdicional: 0 },
    "Material de escritorio": { impuestoAdicional: 0, descuentoAdicional: 0.015 },
    "Muebles": { impuestoAdicional: 0.03, descuentoAdicional: 0 },
    "Electrónicos": { impuestoAdicional: 0.04, descuentoAdicional: 0.01 },
    "Vestimenta": { impuestoAdicional: 0.02, descuentoAdicional: 0 },
    "Varios": { impuestoAdicional: 0, descuentoAdicional: 0 }
  };

  const reglaCategoria = categoriasReglas[categoria] || categoriasReglas["Varios"];

  const descuentoTotal = descuentoVolumen + reglaCategoria.descuentoAdicional;
  let subtotalConDescuento = precioNeto - (precioNeto * descuentoTotal);
  
  let descuentoFijo = 0;
  if (tipoCliente === "Recurrente" && precioNeto > 3000 && categoria === "Alimentos") {
    descuentoFijo = 100;
  } else if (tipoCliente === "Especial" && precioNeto > 7000 && categoria === "Electrónicos") {
    descuentoFijo = 200;
  }

  subtotalConDescuento = Math.max(0, subtotalConDescuento - descuentoFijo);

  let costoEnvioUnitario = 0;
  if (pesoVolumetrico > 200) {
    costoEnvioUnitario = 9;
  } else if (pesoVolumetrico >= 101) {
    costoEnvioUnitario = 8;
  } else if (pesoVolumetrico >= 80) {
    costoEnvioUnitario = 6.5;
  } else if (pesoVolumetrico >= 41) {
    costoEnvioUnitario = 6;
  } else if (pesoVolumetrico >= 21) {
    costoEnvioUnitario = 5;
  } else if (pesoVolumetrico >= 11) {
    costoEnvioUnitario = 3.5;
  } else {
    costoEnvioUnitario = 0;
  }

  const costoEnvioBase = cantidad * costoEnvioUnitario;

  const clienteDescuentosEnvio = {
    "Normal": 0,
    "Recurrente": 0.005,
    "Antiguo Recurrente": 0.01,
    "Especial": 0.015
  };

  const descuentoEnvioTasa = clienteDescuentosEnvio[tipoCliente] || 0;
  const costoEnvioTotal = costoEnvioBase - (costoEnvioBase * descuentoEnvioTasa);

  const tasasImpuestos = {
    UT: 0.0665,
    NV: 0.08,
    TX: 0.0625,
    AL: 0.04,
    CA: 0.0825
  };

  const tasaImpuestoBase = tasasImpuestos[estado] || tasasImpuestos["CA"];
  const tasaImpuestoTotal = tasaImpuestoBase + reglaCategoria.impuestoAdicional;

  const subtotalConImpuestos = subtotalConDescuento + (subtotalConDescuento * tasaImpuestoTotal);

  return subtotalConImpuestos + costoEnvioTotal;
}