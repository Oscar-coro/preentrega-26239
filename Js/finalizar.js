/* ============================================================
   PAGINA DE FINALIZAR COMPRA
   Muestra lo que hay en el carrito, el total, y permite comprar.
   ============================================================ */

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");

  // Si el carrito esta vacio, mostramos un mensaje y salimos
  if (carrito.length === 0) {
    lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío. <a href="index.html">Ver productos</a></p>`;
    total.textContent = formatearPrecio(0);
    return;
  }

  lista.innerHTML = "";

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];

    lista.innerHTML += `
      <div class="item-carrito">
        <span class="item-nombre">${item.nombre}</span>
        <div class="item-cantidad">
          <button class="boton-cantidad" onclick="cambiarYMostrar(${item.id}, -1)" title="Restar una hora">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span>${item.unidad} ${item.unidad === 1 ? "hora" : "horas"}</span>
          <button class="boton-cantidad" onclick="cambiarYMostrar(${item.id}, 1)" title="Sumar una hora">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <span class="item-precio">${formatearPrecio(item.precio * item.unidad)}</span>
        <button onclick="quitarYMostrar(${item.id})" title="Quitar">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  }

  total.textContent = formatearPrecio(calcularTotal());
}

// Suma o resta una hora y vuelve a dibujar la lista
function cambiarYMostrar(id, cambio) {
  cambiarUnidad(id, cambio);
  mostrarCarrito();
}

// Quita el producto y vuelve a dibujar la lista
function quitarYMostrar(id) {
  eliminarProducto(id);
  mostrarCarrito();
}

function finalizarCompra() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (obtenerCarrito().length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "No hay productos en el carrito."
    });
    return;
  }

  if (nombre === "" || email === "") {
    Swal.fire({
      icon: "error",
      title: "Faltan datos",
      text: "Completá tu nombre y tu email."
    });
    return;
  }

  // Guardamos el total ANTES de vaciar el carrito
  const total = calcularTotal();
  vaciarCarrito();

  Swal.fire({
    icon: "success",
    title: "¡Gracias por tu compra, " + nombre + "!",
    text: "Total pagado: " + formatearPrecio(total),
    confirmButtonText: "Volver a la tienda",
    confirmButtonColor: "#2F8F83"
  }).then(function () {
    // .then se ejecuta cuando el usuario cierra el cartel
    window.location.href = "index.html";
  });
}

mostrarCarrito();