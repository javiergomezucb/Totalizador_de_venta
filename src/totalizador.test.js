import { calcularTotal } from "./totalizador";

describe("Totalizador de ventas", () => {
  it("debería calcular el precio total multiplicando cantidad por precio unitario", () => {
    const cantidad = 5;
    const precioUnitario = 10;
    const resultado = calcularTotal(cantidad, precioUnitario, "");
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

  it("debería calcular el precio con impuesto para el estado CA por defecto", () => {
    const resultado = calcularTotal(5, 10, "CA");
    expect(resultado).toEqual(54.125);
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

  it("debería calcular el precio total incluyendo el impuesto para el estado AL (4%)", () => {
    const resultado = calcularTotal(5, 10, "AL");
    expect(resultado).toEqual(52);
  });

  it("debería calcular el precio total incluyendo el impuesto para el estado CA (8.25%)", () => {
    const resultado = calcularTotal(5, 10, "CA");
    expect(resultado).toEqual(54.125);
  });

  it("debería aplicar un 3% de descuento si el precio neto es mayor o igual a 1000", () => {
    const resultado = calcularTotal(100, 10, "AL");
    expect(resultado).toEqual(1008.8);
  });

  it("debería aplicar un 5% de descuento si el precio neto es mayor o igual a 3000", () => {
    const resultado = calcularTotal(300, 10, "AL");
    expect(resultado).toEqual(2964);
  });

  it("debería aplicar un 7% de descuento si el precio neto es mayor o igual a 7000", () => {
    const resultado = calcularTotal(700, 10, "AL");
    expect(resultado).toEqual(6770.4);
  });

  it("debería aplicar un 10% de descuento si el precio neto es mayor o igual a 10000", () => {
    const resultado = calcularTotal(1000, 10, "AL");
    expect(resultado).toEqual(9360);
  });
});