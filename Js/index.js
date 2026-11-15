function mostrarProductos(){
    const grilla= document.getElementById("servicios-grid");
    grilla.innerHTML="";

    productos.forEach(producto => {
    const precio = producto.precio.toLocaleString("es-AR", {
      style: "currency", currency: "ARS", maximumFractionDigits: 0
    });
    grilla.innerHTML += `
      <div class="service-card">
        <div class="service-icon"><i class="${producto.icono}"></i></div>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">${precio} / ${producto.unidad}</p>
        <button onclick="agregarProducto(${producto.id})" class="boton">Contratar<i class="fa-solid fa-handshake"></i></button>
      </div>`;
  });
}
mostrarProductos();