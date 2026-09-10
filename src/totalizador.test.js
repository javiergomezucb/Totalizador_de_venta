import { calcularTotal } from "./totalizador";

describe("Totalizador de ventas", () => {
  it("debería calcular el precio total multiplicando cantidad por precio unitario", () => {
    const cantidad = 5;
    const precioUnitario = 10;
    const resultado = calcularTotal(cantidad, precioUnitario);
    expect(resultado).toEqual(50);
  });
});