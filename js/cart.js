let carrito = [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('agregar')) {
    validarProductoEnCarrito(evento.target.id)
  };
})

const agregarProductoAlCarrito = (producto) => {
  producto.cantidad = 1
  carrito.push(producto)
  pintarProductoCarrito(producto)
}

const actualizarProductoEnCarrito = (producto) => {
  producto.cantidad++
  const cantidad = document.getElementById(`cantidad${producto.id}`)
  cantidad.innerText = `Cantidad: ${producto.cantidad}`
  actualizarTotalesCarrito(carrito)
}

const validarProductoEnCarrito = (idProducto) => {
  const estaRepetido = carrito.some(producto => producto.id == idProducto)

  if (!estaRepetido) {
    const producto = productos.find(producto => producto.id == idProducto)
    agregarProductoAlCarrito(producto)
  } else {
    const productoRepetido = carrito.find(producto => producto.id == idProducto)
    actualizarProductoEnCarrito(productoRepetido)
  }
}

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById('carrito-contenedor')
  const div = document.createElement('div')
  div.classList.add('productoEnCarrito')
  div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>Precio: $${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
  `
  contenedor.appendChild(div)
  actualizarTotalesCarrito(carrito)
}

const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
  const totalCompra = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0)

  pintarTotalesCarrito(totalCantidad, totalCompra)
  guardarCarritoStorage(carrito)
}

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById('contador-carrito')
  const precioTotal = document.getElementById('precioTotal')

  contadorCarrito.innerText = totalCantidad
  precioTotal.innerText = totalCompra
}

const eliminarProductoCarrito = (productoId) => {
  const productoIndex = carrito.findIndex(producto => producto.id == productoId)
  carrito.splice(productoIndex, 1)
  pintarCarrito(carrito)
  actualizarTotalesCarrito(carrito)
}

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById('carrito-contenedor')

  contenedor.innerHTML = ''

  carrito.forEach(producto => {
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
      <p>${producto.nombre}</p>
      <p>Precio: $${producto.precio}</p>
      <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
  });
}

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
  return carritoStorage
}

if (localStorage.getItem('carrito')) {
  carrito = obtenerCarritoStorage()
  pintarCarrito(carrito)
  actualizarTotalesCarrito(carrito)
}
