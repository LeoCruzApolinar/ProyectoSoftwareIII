let products = [];
  

function procesarRespuesta(){

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
    productActions.classList.add('card-footer', 'p-4', 'pt-0', 'border-top-0', 'bg-transparent');

    const viewOptionsBtn = document.createElement('a');
    viewOptionsBtn.classList.add('btn', 'btn-outline-dark', 'mt-auto');
    viewOptionsBtn.innerText = 'View options';

    const addToCartBtn = document.createElement('a');
    addToCartBtn.classList.add('btn', 'btn-outline-dark', 'mt-auto');
    addToCartBtn.innerText = 'Add to cart';

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
            
        }
    }
};

xmlhttp.setRequestHeader('Content-Type', 'text/xml');
xmlhttp.send(sr);


const indexedDB = window.indexedDB;

if (indexedDB) {
  let db;
  const request = indexedDB.open('miTienda', 1);

  request.onsuccess = () => {
    db = request.result;
    console.log('OPEN', db);
  };

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
    // Abrir una conexión a la base de datos 'miTienda'
    const dbRequest = indexedDB.open('miTienda', 1);

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction(['usuarios'], 'readwrite');
      const objectStore = transaction.objectStore('usuarios');

      // Eliminar el contenido de la tabla 'usuarios'
      const clearRequest = objectStore.clear();

      clearRequest.onsuccess = () => {
        console.log('Contenido de la tabla "usuarios" eliminado correctamente');
        window.location = "../../LoginPage/login.html"
      };

      clearRequest.onerror = () => {
        console.log('Error al eliminar el contenido de la tabla "usuarios"');
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
}

