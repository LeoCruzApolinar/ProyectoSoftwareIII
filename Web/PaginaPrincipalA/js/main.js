


function procesarRespuesta(products){

  // Obtener el contenedor donde se agregarán las cards
  const productContainer = document.getElementById('product-container');

  // Crear un div con la clase "small-container" para agregar las cards
  const smallContainer = document.createElement('div');
  smallContainer.classList.add('small-container');

  // Crear un div con la clase "row" para cada fila de productos
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Iterar a través de la lista de productos y crear una card para cada uno
  products.forEach(product => {
    // Crear un div con la clase "col-4" para agregar la información de cada producto
    const productCol = document.createElement('div');
    productCol.classList.add('col-4');
    

    // Agregar la imagen del producto con un enlace
  const productLink = document.createElement('a');
  productLink.href = `../../ProductoDetail/productoDetail.html?id=`+product.Id;
  const productImage = document.createElement('img');
  productImage.src = product.ImagenPrincipal;
  productLink.appendChild(productImage);
  productCol.appendChild(productLink);

    // Agregar el nombre del producto
    const productName = document.createElement('h4');
    productName.innerText = product.Nombre;
    productCol.appendChild(productName);

    // Agregar el precio del producto
    const productPrice = document.createElement('p');
    productPrice.innerText = product.Precio;
    productCol.appendChild(productPrice);

    rowDiv.appendChild(productCol);
  });

  smallContainer.appendChild(rowDiv);
  productContainer.appendChild(smallContainer);

}



// procesarRespuesta(objeto)



//*************ESTO ES UNA PRUEBA PARA SIMPLIFICAR*************** */
const eliminarDatosBtn = document.getElementById('btn-logout');
const indexedDB = window.indexedDB;

//Verifico la existencia del indexedDB
if (indexedDB) {
  
  let db;
  const request = indexedDB.open('miTienda', 1);
  
  //Si todo sale bien la abro
  request.onsuccess = () => {
    db = request.result;
    console.log('OPEN', db);

    
  };

  //Si es necesario la creo agregando dos tablas
  request.onupgradeneeded = () => {
    db = request.result;
    console.log('Create', db);
    const objectStore = db.createObjectStore('productos',{
      autoIncrement: true
    });
    const objectStore2 = db.createObjectStore('usuarios', {
      autoIncrement: true,
    });
  };

  request.onerror = (e) => {
    console.log('Error', e);
  };

  const eliminarDatosBtn = document.getElementById('btn-logout');
  eliminarDatosBtn.addEventListener('click', () => {

    borrarDB()
  })

  let objeto

  try {
    //Llamo a obtener producto del core
     objeto =  await ObtenerProducto(1,"Anonimo",1)
     console.log(objeto)
  } catch (error) {
     
  }

  

  function addData(objeto){

    // Iterar sobre todas las tablas y eliminar su contenido
    const objectStoreNames = db.objectStoreNames;
    for (let i = 0; i < objectStoreNames.length; i++) {
    if (objectStoreNames[i] === 'productos') {
        const transaction = db.transaction([objectStoreNames[i]], 'readwrite');
        const objectStore = transaction.objectStore(objectStoreNames[i]);
        const clearRequest = objectStore.clear();
      }

    const transaction = db.transaction(['productos'],'readwrite')
    const objectStore = transaction.objectStore('productos')
    

   
    const request = objectStore.add(objeto)
    }
  }
  
  
    // Abrir una conexión a la base de datos 'miTienda'
    const dbRequest = indexedDB.open('miTienda', 1);

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction(['productos'], 'readwrite');
      const objectStore = transaction.objectStore('productos');

      // Agregar event listener
  const botonAgregar = document.getElementById('ordenPrecio');
  botonAgregar.addEventListener('click', () => {
    const ordenarPorPrecio = true; // variable que indica si se debe ordenar por precio
    if (ordenarPorPrecio) {
      const getAllRequest = objectStore.getAll();
      getAllRequest.onsuccess = () => {
        const productos = getAllRequest.result;
        productos.sort((a, b) => a.precio - b.precio); // ordenar por precio de forma ascendente
        // Limpiar el objectStore
        objectStore.clear();
        // Insertar los objetos ordenados en el objectStore
        productos.forEach(producto => objectStore.add(producto));
      };
    } else {
      // Insertar objeto normalmente
      const request = objectStore.add(objeto);
      // Resto del código
    }
  });
    
    const cursorRequest = objectStore.openCursor(null, 'prev'); // obtiene el cursor en orden inverso (desde el último objeto hasta el primero)
    
      //obtenemos el ultimo producto guardado en el indexDB
    cursorRequest.onsuccess = () => {
      const cursor = cursorRequest.result;
      console.log(objeto)
      
      if(!cursor){
        let ultimoProducto = cursor.value;
        console.log(objeto)
        //Llamamos la funcion para poder pintar los productos en el mainPage

        try {
          if(objeto === undefined){
            throw error;
          }
          addData(objeto)
          procesarRespuesta(ultimoProducto)
        } catch (error) {
          procesarRespuesta(ultimoProducto)
        }
      }
      else if (cursor) {
        let ultimoProducto = cursor.value;
        
        console.log(ultimoProducto)
        
        //Llamamos la funcion para poder pintar los productos en el mainPage
        
        try {
          if(objeto === undefined){
            throw error;
          }
          addData(objeto)
          procesarRespuesta(ultimoProducto)
        } catch (error) {
          procesarRespuesta(ultimoProducto)
        }
      }
    }
  }
  

}





// Luego puedes llamar la función




import * as Activo from '../../Metodos/usuarioActivo.js';
//Verificamos si hay un usuario logueado
Activo.UsuarioActivo();

//Aqui pondremos el nombre del usuario y su imagen
Activo.obtenerUltimoUsuario().then(() => {
  console.log('Se obtuvo el último usuario correctamente');
}).catch((error) => {
  console.error('Hubo un error al obtener el último usuario:', error);
});
