export function calcularTotal(cantidad, precioUnitario) {
  if (cantidad <= 0) {
    return "Error: Cantidad inválida";
  }
  return cantidad * precioUnitario;
}