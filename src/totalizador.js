export function calcularTotal(cantidad, precioUnitario) {
  if (cantidad <= 0) {
    return "Error: Cantidad inválida";
  }
  if (precioUnitario < 0 || isNaN(precioUnitario)) {
    return "Error: Precio inválido";
  }
  return cantidad * precioUnitario;
}