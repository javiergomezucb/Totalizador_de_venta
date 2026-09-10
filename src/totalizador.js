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
  }

  return subtotal + (subtotal * tasaImpuesto);
}