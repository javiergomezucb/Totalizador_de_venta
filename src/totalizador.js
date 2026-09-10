export function calcularTotal(cantidad, precioUnitario, estado = "CA") {
  if (cantidad <= 0) {
    return "Error: Cantidad inválida";
  }
  if (precioUnitario < 0 || isNaN(precioUnitario)) {
    return "Error: Precio inválido";
  }

  const subtotal = cantidad * precioUnitario;
  
  let tasaImpuesto = 0;
  if (estado === "UT") {
    tasaImpuesto = 0.0665;
  } else if (estado === "NV") {
    tasaImpuesto = 0.08;
  } else if (estado === "TX") {
    tasaImpuesto = 0.0625;
  } else if (estado === "AL") {
    tasaImpuesto = 0.04;
  } else if (estado === "CA") {
    tasaImpuesto = 0.0825;
  }

  return subtotal + (subtotal * tasaImpuesto);
}