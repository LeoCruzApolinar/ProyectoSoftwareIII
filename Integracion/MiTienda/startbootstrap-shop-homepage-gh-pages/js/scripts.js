let product = [];


//Funcion que recibe un objeto de tipo producto y pinta una Card en la pagina principal
function procesarRespuesta(products){

  // Obtener el contenedor donde se agregarán las cards
  const productContainer = document.getElementById('product-container');

  // Iterar a través de la lista de productos y crear una card para cada uno
  products.forEach(product => {
    // Crear un div con la clase "col mb-5" para agregar la card
    const productCol = document.createElement('div');
    productCol.classList.add('col', 'mb-5');

    // Crear la card
    const productCard = document.createElement('div');
    productCard.classList.add('card', 'h-100');

    // Agregar la imagen del producto
    const productImage = document.createElement('img');
    productImage.classList.add('card-img-top');
    productImage.src = product.ImagenPrincipal;
    productImage.alt = 'Product image';
    productCard.appendChild(productImage);

    // Agregar los detalles del producto
    const productDetails = document.createElement('div');
    productDetails.classList.add('card-body', 'p-4');

    const productName = document.createElement('h5');
    productName.classList.add('fw-bolder');
    productName.innerText = product.Nombre;
    productDetails.appendChild(productName);

    const productPrice = document.createElement('p');
    productPrice.innerText = product.Precio;
    productDetails.appendChild(productPrice);

    productCard.appendChild(productDetails);

        // Agregar los botones de acción
    const productActions = document.createElement('div');
    productActions.classList.add('card-footer', 'p-1', 'border-top-0', 'bg-transparent', 'd-flex', 'justify-content-around');

    const viewOptionsBtn = document.createElement('button'); // cambiar a button en lugar de a
    viewOptionsBtn.classList.add('btn', 'btn-outline-dark', 'mx-2');
    viewOptionsBtn.innerText = 'View options';

    const addToCartBtn = document.createElement('button'); // cambiar a button en lugar de a
    addToCartBtn.classList.add('btn', 'btn-outline-dark', 'mx-2');
    addToCartBtn.innerText = 'Add to cart';

    // Agregar controladores de eventos para cada botón de acción
    viewOptionsBtn.addEventListener('click', (e) => {
      e.preventDefault()
      // Aquí puedes definir la acción que quieres que se ejecute cuando se hace clic en "View options"
      console.log('Mostrar detalles del producto');
    });

    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault()
      // Aquí puedes definir la acción que quieres que se ejecute cuando se hace clic en "Add to cart"
      console.log('Agregar producto al carrito');
    });

    productActions.appendChild(viewOptionsBtn);
    productActions.appendChild(addToCartBtn);

    productCard.appendChild(productActions);

    productCol.appendChild(productCard);
    productContainer.appendChild(productCol);

  });
}





var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);

// Build SOAP request
var sr =
   `<?xml version="1.0" encoding="utf-8"?>
   <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
     <soap:Body>
       <ComandoProductos xmlns="http://Intec/">
         <Orden>1</Orden>
       </ComandoProductos>
     </soap:Body>
   </soap:Envelope>`;

// Send the POST request\

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            // Handle response here
            let response = xmlhttp.responseXML;
            let json = response.getElementsByTagName("ComandoProductosResult")[0].textContent;
            let objeto = JSON.parse(json);
            console.log(objeto);
            console.log(objeto[0].Nombre);
            // procesarRespuesta(objeto)

            
            setTimeout(addData(objeto),1000)
            
        }
    }
};

xmlhttp.setRequestHeader('Content-Type', 'text/xml');
xmlhttp.send(sr);


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
    const objectStore = db.createObjectStore('productos');
    const objectStore2 = db.createObjectStore('usuarios', {
      autoIncrement: true,
    });
  };

  request.onerror = (e) => {
    console.log('Error', e);
  };

  // Agregar un controlador de eventos para el botón 'eliminar datos'
  const eliminarDatosBtn = document.getElementById('eliminar-datos-btn');
  eliminarDatosBtn.addEventListener('click', () => {
    const request = indexedDB.open('miTienda', 1);

  request.onsuccess = () => {
    const db = request.result;

    // Obtener el nombre de todas las tablas en la base de datos
    const objectStoreNames = db.objectStoreNames;

    // Iterar sobre todas las tablas y eliminar su contenido
    for (let i = 0; i < objectStoreNames.length; i++) {
      const transaction = db.transaction([objectStoreNames[i]], 'readwrite');
      const objectStore = transaction.objectStore(objectStoreNames[i]);
      const clearRequest = objectStore.clear();

      //Si todo sale bien redirecciona al usuario al loginPage
      clearRequest.onsuccess = () => {
        console.log(`Contenido de la tabla "${objectStoreNames[i]}" eliminado correctamente`);
        window.location = "../../LoginPage/login.html"
      };

      //Un error lo muestra por consola
      clearRequest.onerror = () => {
        console.log(`Error al eliminar el contenido de la tabla "${objectStoreNames[i]}"`);
      };


      //Cuando acaba cierra la conexion
      transaction.oncomplete = () => {
        db.close();
      };
    }
  };

  request.onerror = (e) => {
    console.log('Error', e);
  };
  });

  //Funcion que a partir de un objeto ingresa datos a la tabla usuarios del indexedDB
  function addData(objeto){
    const transaction = db.transaction(['productos'],'readwrite')
    const objectStore = transaction.objectStore('productos')
    const request = objectStore.add(objeto)

    // Abrir una conexión a la base de datos 'miTienda'
    const dbRequest = indexedDB.open('miTienda', 1);

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction(['productos'], 'readwrite');
      const objectStore = transaction.objectStore('productos');
    
    const cursorRequest = objectStore.openCursor(null, 'prev'); // obtiene el cursor en orden inverso (desde el último objeto hasta el primero)

      //obtenemos el ultimo producto guardado en el indexDB
    cursorRequest.onsuccess = () => {
      const cursor = cursorRequest.result;
      if (cursor) {
        ultimoProducto = cursor.value;
        console.log(ultimoProducto)
        
        //Llamamos la funcion para poder pintar los productos en el mainPage
        procesarRespuesta(ultimoProducto)
      }
    }
    }
  }
}

