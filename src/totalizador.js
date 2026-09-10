export function calcularTotal(cantidad, precioUnitario, estado = "CA", categoria = "Varios") {
  if (cantidad <= 0) {
    return "Error: Cantidad inválida";
  }
  if (precioUnitario < 0 || isNaN(precioUnitario)) {
    return "Error: Precio inválido";
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
    "Varios": { impuestoAdicional: 0, descuentoAdicional: 0 }
  };

  const reglaCategoria = categoriasReglas[categoria] || categoriasReglas["Varios"];

  const descuentoTotal = descuentoVolumen + reglaCategoria.descuentoAdicional;
  const subtotalConDescuento = precioNeto - (precioNeto * descuentoTotal);
  
  const tasasImpuestos = {
    UT: 0.0665,
    NV: 0.08,
    TX: 0.0625,
    AL: 0.04,
    CA: 0.0825
  };

  const tasaImpuestoBase = tasasImpuestos[estado] || 0;
  const tasaImpuestoTotal = tasaImpuestoBase + reglaCategoria.impuestoAdicional;

  return subtotalConDescuento + (subtotalConDescuento * tasaImpuestoTotal);
}