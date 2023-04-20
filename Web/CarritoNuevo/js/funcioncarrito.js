
await ActualizarProductoCarrito(2,'Jorge24r',10,'Jorge24',1)


function agregarProductoAlCarrito(producto, nuevoCarrito) {
  const cartTable = document.getElementById('cart-table');
  const tbody = document.createElement('tbody');
  cartTable.appendChild(tbody);
   

  

 
    const productosHere = document.createElement('tr');
    // ... resto del código para crear los elementos de la fila

    const td1 = document.createElement('td');
    productosHere.appendChild(td1);
  
    const cartInfo = document.createElement('div');
    cartInfo.classList.add('cart-info');
  
    const cartImg = document.createElement('img');
    cartImg.src = producto.ImagenPrincipal;
    cartImg.classList.add('cart-img');
    cartImg.id = ('cart-img');
  
    const divFirst = document.createElement('div')
  
    const itemTitle = document.createElement('p');
    itemTitle.classList.add('item-title');
    itemTitle.innerText = producto.Nombre;
  
    const smallPrecio = document.createElement('small');
    smallPrecio.innerText = 'Precio:';
  
    const initialPrice = document.createElement('small');
    initialPrice.classList.add('initial-price');
    initialPrice.dataset.precio = producto.Precio;
    initialPrice.innerText = '$' + producto.Precio;
  
    const button = document.createElement('button');
    button.classList.add('button');
    button.type = 'button';
  
    const buttonText = document.createElement('span');
    buttonText.classList.add('button__text');
    buttonText.innerText = 'Eliminar';
    button.id = 'eliminar-btn-' + producto.Id;

    
  
    button.appendChild(buttonText);
    

    // Agregamos el event listener al botón
    button.addEventListener('click', function() {
    // Aquí puedes agregar el código para eliminar el producto del carrito
    console.log('El producto ' + producto.Nombre + ' ha sido eliminado del carrito');
    Swal.fire({
      title: 'Estas seguro de eliminar este producto?',
      text: "No puedes revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        )
        EliminarProductoCarrito(producto.Id,usuario,usuario,1)
      }
    })
    
    
    });
  
    divFirst.appendChild(cartImg);
    divFirst.appendChild(itemTitle);
    divFirst.appendChild(smallPrecio);
    divFirst.appendChild(initialPrice);
    divFirst.appendChild(button);
  
    cartInfo.appendChild(divFirst);
  
    td1.appendChild(cartInfo);
  
    const td2 = document.createElement('td');
    productosHere.appendChild(td2);
  
    const cartQuantity = document.createElement('div');
    cartQuantity.classList.add('cart-quantity');
  
    const restarIcon = document.createElement('i');
    restarIcon.classList.add('fas', 'fa-minus', 'restar');
  
    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.value = nuevoCarrito.Cantidad;
    inputCantidad.classList.add('quantity');
    inputCantidad.disabled = true;
  
    const sumarIcon = document.createElement('i');
    sumarIcon.classList.add('fas', 'fa-plus', 'sumar');
  
    cartQuantity.appendChild(restarIcon);
    cartQuantity.appendChild(inputCantidad);
    cartQuantity.appendChild(sumarIcon);

    sumarIcon.addEventListener('click', async function() {
        const currentValue = parseInt(inputCantidad.value);
        if(await ActualizarProductoCarrito(producto.Id,usuario,currentValue+1,usuario,1) === true){
            
        console.log('Se ha sumado la cantidad del producto');
        
        inputCantidad.value = currentValue + 1;
        let subtotalTd = document.getElementById('total-price-subtotal');
        ActualizarPrecios() 
        td3.textContent = producto.Precio * parseInt(inputCantidad.value)
        }else{
            console.log('no Se ha sumado la cantidad del producto')
        }

        
        
    });

    restarIcon.addEventListener('click', async function() {
        const currentValue = parseInt(inputCantidad.value);
        if(await ActualizarProductoCarrito(producto.Id,usuario,currentValue-1,usuario,1) === true){
            
        console.log('Se ha restado la cantidad del producto');
        
        inputCantidad.value = currentValue - 1;
        let subtotalTd = document.getElementById('total-price-subtotal');
        ActualizarPrecios()
        td3.textContent = '$' + producto.Precio * parseInt(inputCantidad.value)
        }else{
            console.log('no Se ha restado la cantidad del producto')
        }
    });
  
    td2.appendChild(cartQuantity);
  
    const td3 = document.createElement('td');
    td3.classList.add('cart-item-price');
    td3.classList.add('subtotal');
    td3.dataset.precio = producto.Precio;
    td3.innerText = '$' + (producto.Precio * nuevoCarrito.Cantidad).toFixed(2);
  
    productosHere.appendChild(td3);

    tbody.appendChild(productosHere);

    ActualizarPrecios()

    function ActualizarPrecios() {
        const subtotales = document.querySelectorAll('.subtotal');
        let totalSubtotal = 0;
        subtotales.forEach((subtotal) => {
          const cantidad = subtotal.parentElement.querySelector('.quantity').value;
          totalSubtotal += parseFloat(subtotal.dataset.precio) * parseInt(cantidad);
        });
        let subtotalTd = document.getElementById('total-price-subtotal');
        subtotalTd.textContent = '$' + totalSubtotal.toFixed(2);
      }
      

    
  }

  
  
  
const impuestosTd = document.getElementById('impuestos');
const totalTd = document.getElementById('total');










   
   import * as Activo from '../../Metodos/usuarioActivo.js';
   let usuario = await Activo.obtenerUltimoUsuarioNormal();
    console.log( usuario)

    let nuevoCarrito = await ObtenerProductosEnCarrito(usuario,usuario,1)

    console.log(nuevoCarrito)

    const indexedDB = window.indexedDB;

    if (indexedDB) {
      let db;
      const request = indexedDB.open('miTienda', 1);
    
      request.onsuccess = () => {
        db = request.result;
    
        const transaction = db.transaction('productos', 'readonly');
        const objectStore = transaction.objectStore('productos');
      
        const getAllRequest = objectStore.getAll();
      
        getAllRequest.onsuccess = () => {
          const productos = getAllRequest.result;
      
          const productosEncontrados = [];
      
          for (let i = 0; i < productos[0].length; i++) {
            const producto = productos[0][i];
            const id = producto.Id;
      
            for (let j = 0; j < nuevoCarrito.length; j++) {
              if (id === nuevoCarrito[j].IdProducto) {
                productosEncontrados.push(producto);
                break;
              }
            }
          }
      
          console.log('Productos encontrados:', productosEncontrados);
          for (let i = 0; i < productosEncontrados.length; i++) {
            agregarProductoAlCarrito(productosEncontrados[i],nuevoCarrito[i]);
           }

        };
      
        getAllRequest.onerror = () => {
          console.log('Error al obtener todos los objetos de la tabla');
        };
      };
    }
    


   
  

