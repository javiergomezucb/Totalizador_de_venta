export function calcularTotal(cantidad, precioUnitario, estado = "CA") {
  if (cantidad <= 0) {
    return "Error: Cantidad inválida";
  }
  if (precioUnitario < 0 || isNaN(precioUnitario)) {
    return "Error: Precio inválido";
  }

  const precioNeto = cantidad * precioUnitario;
  
  // Descuentos por volumen según la tabla oficial[cite: 1]
  let descuento = 0;
  if (precioNeto >= 30000) {
    descuento = 0.15;
  } else if (precioNeto >= 10000) {
    descuento = 0.10;
  } else if (precioNeto >= 7000) {
    descuento = 0.07;
  } else if (precioNeto >= 3000) {
    descuento = 0.05;
  } else if (precioNeto >= 1000) {
    descuento = 0.03;
  }

  const subtotalConDescuento = precioNeto - (precioNeto * descuento);
  
  const tasasImpuestos = {
    UT: 0.0665,
    NV: 0.08,
    TX: 0.0625,
    AL: 0.04,
    CA: 0.0825
  };

  const tasaImpuesto = tasasImpuestos[estado] || 0;

  return subtotalConDescuento + (subtotalConDescuento * tasaImpuesto);
}