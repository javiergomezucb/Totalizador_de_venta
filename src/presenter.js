import { calcularTotal } from "./totalizador";

const cantidadInput = document.querySelector("#cantidad-items");
const precioInput = document.querySelector("#precio-item");
const estadoSelect = document.querySelector("#codigo-estado");
const categoriaSelect = document.querySelector("#categoria-producto");
const pesoInput = document.querySelector("#peso-volumetrico");
const clienteSelect = document.querySelector("#tipo-cliente");

const form = document.querySelector("#totalizador-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cantidad = Number.parseInt(cantidadInput.value);
  const precioUnitario = Number.parseFloat(precioInput.value);
  const estado = estadoSelect.value;
  const categoria = categoriaSelect.value;
  const pesoVolumetrico = Number.parseFloat(pesoInput.value) || 0;
  const tipoCliente = clienteSelect.value;

  const precioNeto = cantidad * precioUnitario;
  const resultadoTotal = calcularTotal(cantidad, precioUnitario, estado, categoria, pesoVolumetrico, tipoCliente);

  // Mostramos el desglose detallado requerido por la rúbrica
  div.innerHTML = `
    <h3>Desglose de la Venta:</h3>
    <p>Precio neto (${cantidad} * $${precioUnitario}): $${precioNeto.toFixed(2)}</p>
    <p>Estado seleccionado: ${estado}</p>
    <p>Categoría: ${categoria}</p>
    <p>Tipo de cliente: ${tipoCliente}</p>
    <p>Peso volumétrico por unidad: ${pesoVolumetrico}</p>
    <hr/>
    <p><strong>Precio Total Final: $${resultadoTotal.toFixed(2)}</strong></p>
  `;
});