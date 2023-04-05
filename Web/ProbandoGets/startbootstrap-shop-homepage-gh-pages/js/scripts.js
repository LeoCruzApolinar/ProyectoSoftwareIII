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

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);

// // Crear la petición SOAP
// var sr =
//    `<?xml version="1.0" encoding="utf-8"?>
//    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
//      <soap:Body>
//        <ObtenerProducto xmlns="http://tempuri.org/">
//          <Orden>1</Orden>
//        </ObtenerProducto>
//      </soap:Body>
//    </soap:Envelope>`

// xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4) {
//         if (xmlhttp.status == 200) {
//             // Extraer el resultado de la respuesta
//             var responseText = xmlhttp.responseText;
//             var parser = new DOMParser();
//             var xmlDoc = parser.parseFromString(responseText, "text/xml");
//             var productos = xmlDoc.getElementsByTagName("ProductoReader");
            
//             for (var i = 0; i < productos.length; i++) {
//                 var producto = productos[i];
//                 var productoA = {}; // Nuevo objeto para cada producto
//                 productoA.Id = producto.getElementsByTagName("Id")[0].childNodes[0].nodeValue;
//                 productoA.Nombre = producto.getElementsByTagName("Nombre")[0].childNodes[0].nodeValue;
//                 productoA.Descripcion = producto.getElementsByTagName("Descripcion")[0].childNodes[0].nodeValue;
//                 productoA.Categoria = producto.getElementsByTagName("Categoria")[0].childNodes[0].nodeValue;
//                 productoA.Precio = producto.getElementsByTagName("Precio")[0].childNodes[0].nodeValue;
//                 productoA.Stock = producto.getElementsByTagName("Stock")[0].childNodes[0].nodeValue;
//                 productoA.calificacion = producto.getElementsByTagName("calificacion")[0].childNodes[0].nodeValue;
//                 productoA.FechaDeCreacion = producto.getElementsByTagName("FechaDeCreacion")[0].childNodes[0].nodeValue;
//                 productoA.FechaUltimaModificacion = producto.getElementsByTagName("FechaUltimaModificacion")[0].childNodes[0].nodeValue;
//                 productoA.Estado = producto.getElementsByTagName("Estado")[0].childNodes[0].nodeValue;
//                 productoA.ImagenPrincipal = producto.getElementsByTagName("ImagenPrincipal")[0].childNodes[0].nodeValue;
//                 productoA.Marca = producto.getElementsByTagName("Marca")[0].childNodes[0].nodeValue;
//                 products.push(productoA); 
//             }

//             procesarRespuesta(); // Llamar a la función para procesar la respuesta
//             console.log(this.response)
//         } else {
//             console.error(xmlhttp.statusText);
//         }
//     }
// };
// xmlhttp.setRequestHeader('Content-Type', 'text/xml');
// xmlhttp.send(sr);

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);

// // Build SOAP request
// var sr =
//     '<?xml version="1.0" encoding="utf-8"?>' +
//     '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
//     'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
//     'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
//     '<soap:Body>' +
//     '<ObtenerProducto xmlns="http://tempuri.org/">' +
//     '<Orden>1</Orden>' +
//     '</ObtenerProducto>' +
//     '</soap:Body>' +
//     '</soap:Envelope>';

// // Send the POST request
// xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4) {
//         if (xmlhttp.status == 200) {
//             // Handle response here
//             var response = xmlhttp.responseXML;
//             console.log(response);
//             var parser = new DOMParser();
//             var xmlDoc = parser.parseFromString(response, "text/xml");
//             var productos = xmlDoc.getElementsByTagName("ProductoReader");
//             for (var i = 0; i < productos.length; i++) {
//                                var producto = productos[i];
//                                var productoA = {}; // Nuevo objeto para cada producto
//                              productoA.Id = producto.getElementsByTagName("Id")[0].childNodes[0].nodeValue;
//                               productoA.Nombre = producto.getElementsByTagName("Nombre")[0].childNodes[0].nodeValue;
//                               productoA.Descripcion = producto.getElementsByTagName("Descripcion")[0].childNodes[0].nodeValue;
//                                productoA.Categoria = producto.getElementsByTagName("Categoria")[0].childNodes[0].nodeValue;
//                                productoA.Precio = producto.getElementsByTagName("Precio")[0].childNodes[0].nodeValue;
//                                productoA.Stock = producto.getElementsByTagName("Stock")[0].childNodes[0].nodeValue;
//                                productoA.calificacion = producto.getElementsByTagName("calificacion")[0].childNodes[0].nodeValue;
//                                productoA.FechaDeCreacion = producto.getElementsByTagName("FechaDeCreacion")[0].childNodes[0].nodeValue;
//                              productoA.FechaUltimaModificacion = producto.getElementsByTagName("FechaUltimaModificacion")[0].childNodes[0].nodeValue;
//                               productoA.Estado = producto.getElementsByTagName("Estado")[0].childNodes[0].nodeValue;
//                               productoA.ImagenPrincipal = producto.getElementsByTagName("ImagenPrincipal")[0].childNodes[0].nodeValue;
//                                productoA.Marca = producto.getElementsByTagName("Marca")[0].childNodes[0].nodeValue;
//                                products.push(productoA); 
//                           }
              
//                            procesarRespuesta(); // Llamar a la función para procesar la respuesta
//                            console.log(this.response)
//         }
//     }
// };
// xmlhttp.setRequestHeader('Content-Type', 'text/xml');
// xmlhttp.send(sr);

var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);

// Build SOAP request
var sr =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
    'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body>' +
    '<ObtenerProducto xmlns="http://tempuri.org/">' +
    '<Orden>1</Orden>' +
    '</ObtenerProducto>' +
    '</soap:Body>' +
    '</soap:Envelope>';

// Send the POST request
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            // Handle response here
            let response = xmlhttp.responseXML;
            let productos = response.getElementsByTagName("Producto");
            console.log(response);
            let listaProductos = [];

            for (let i = 0; i < productos.length; i++) {
                let producto = productos[i];
                let Id = producto.getElementsByTagName("Id")[0].textContent;
                let Nombre = producto.getElementsByTagName("Nombre")[0].textContent;
                let Descripcion = producto.getElementsByTagName("Descripcion")[0].textContent;
                let Categoría = producto.getElementsByTagName("Categoría")[0].textContent;
                let Precio = producto.getElementsByTagName("Precio")[0].textContent;
                let ListaImagenes = [];
                for (let a = 0; a < producto.getElementsByTagName("Imágenes").length; a++)
                {
                    let imagen = producto.getElementsByTagName("Imágenes")[a];
                    let Nombre = imagen.getElementsByTagName("Nombre")[0].textContent;
                    let URL = imagen.getElementsByTagName("URL")[0].textContent;
                    let FechaDeAsignacion = imagen.getElementsByTagName("FechaDeAsignacion")[0].textContent;
                    let ObjetoImagen =
                    {
 
                        Nombre: Nombre,
                        URL: URL,
                        FechaDeAsignacion: FechaDeAsignacion,

                    }
                    ListaImagenes.push(ObjetoImagen);
                }
                let Stock = producto.getElementsByTagName("Stock")[0].textContent;
                let calificacion = producto.getElementsByTagName("calificacion")[0].textContent;
                let FechaDeCreacion = producto.getElementsByTagName("FechaDeCreacion")[0].textContent;
                let FechaUltimaModificacion = producto.getElementsByTagName("FechaUltimaModificacion")[0].textContent;
                let Estado = producto.getElementsByTagName("Estado")[0].textContent;
                let Marca = producto.getElementsByTagName("Marca")[0].textContent;
                let ImagenPrincipal = producto.getElementsByTagName("ImagenPrincipal")[0].textContent;



                let objetoProducto = {
                    Id: Id,
                    Nombre: Nombre,
                    Descripcion: Descripcion,
                    Categoría: Categoría,
                    Precio: Precio,
                    ListaImagenes: ListaImagenes,
                    Stock: Stock,
                    calificacion: calificacion,
                    FechaDeCreacion: FechaDeCreacion,
                    FechaUltimaModificacion: FechaUltimaModificacion,
                    Estado: Estado,
                    Marca: Marca,
                    ImagenPrincipal: ImagenPrincipal

                };
                products.push(objetoProducto);
                
            }
            
            console.log(products);
        }
        procesarRespuesta()
    }
};

xmlhttp.setRequestHeader('Content-Type', 'text/xml');
xmlhttp.send(sr);
