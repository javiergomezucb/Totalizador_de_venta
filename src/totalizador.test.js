import { calcularTotal } from "./totalizador";

describe("Totalizador de ventas", () => {
  it("debería calcular el precio total multiplicando cantidad por precio unitario", () => {
    const cantidad = 5;
    const precioUnitario = 10;
    const resultado = calcularTotal(cantidad, precioUnitario);
    expect(resultado).toEqual(50);
  });

  it("debería mostrar un mensaje de error si la cantidad es cero o negativa", () => {
    const resultado = calcularTotal(0, 10);
    expect(resultado).toEqual("Error: Cantidad inválida");
  });

  it("debería mostrar un mensaje de error si el precio es negativo", () => {
    const resultado = calcularTotal(5, -10);
    expect(resultado).toEqual("Error: Precio inválido");
  });

  it("debería mostrar un mensaje de error si el precio no es un número", () => {
    const resultado = calcularTotal(5, "abc");
    expect(resultado).toEqual("Error: Precio inválido");
  });

  it("debería aceptar un código de estado en el cálculo básico", () => {
    const resultado = calcularTotal(5, 10, "CA");
    expect(resultado).toEqual(50);
  });

  it("debería calcular el precio total incluyendo el impuesto para el estado UT (6.65%)", () => {
    const resultado = calcularTotal(5, 10, "UT");
    expect(resultado).toEqual(53.325);
  });

  it("debería calcular el precio total incluyendo el impuesto para el estado NV (8%)", () => {
    const resultado = calcularTotal(5, 10, "NV");
    expect(resultado).toEqual(54);
  });

  it("debería calcular el precio total incluyendo el impuesto para el estado TX (6.25%)", () => {
    const resultado = calcularTotal(5, 10, "TX");
    expect(resultado).toEqual(53.125);
  });
});