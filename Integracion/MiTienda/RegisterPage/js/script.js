const indexedDB = window.indexedDB

//Verifico la existencia del indexedDB
if(indexedDB){
  let db;
  const request = indexedDB.open('miTienda',1)

  //Si todo sale bien la abro
  request.onsuccess = () =>{
    db = request.result
    console.log('OPEN', db)
  }

  //Si es necesario la creo agregando dos tablas
  request.onupgradeneeded = () =>{
    db = request.result
    console.log('Create', db)
    const objectStore = db.createObjectStore('productos',{
      autoIncrement: true
    })
    const objectStore2 = db.createObjectStore('usuarios',{
      autoIncrement: true
    })
  }

  //Si existe algun error se imprime por consola
  request.onerror = (e) =>{
    console.log('Error',e)
  }
}

const addData = (productos) =>{

}


// Función para guardar los datos del formulario en un objeto
function guardarDatos() {
      // Crear objeto vacío
  const formulario = document.getElementById("myForm");
  const datos = {};

  // Obtener los valores de cada campo y agregarlos al objeto
  datos.nombre = formulario.Nombre.value;
  datos.apellido = formulario.Apellido.value;
  datos.correo = formulario.Correo.value;
  datos.usuario = formulario.Usuario.value;
  datos.contraseña = formulario.Contraseña.value;
  datos.telefono = formulario.Telefono.value;
  datos.fecha = formulario.Fecha.value;

  // Devolver el objeto con los datos
  console.log(datos);

      
    //Funcion Post 
    // Llamando a un método de un servicio web en Azure desde JavaScript

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);

    console.log(datos);
      

    // Crear la petición SOAP
    var sr =
      `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <IngresarUsuario xmlns="http://Intec/">
            <user>
              <usuario>${datos.usuario}</usuario>
              <CorreoElectronico>${datos.correo}</CorreoElectronico>
              <Clave>${datos.contraseña}</Clave>
              <Nombre>${datos.nombre}</Nombre>
              <Apellido>${datos.apellido}</Apellido>
              <Telefono>${datos.telefono}</Telefono>
              <Estado>1</Estado>
              <FechaNacimiento>${datos.fecha}</FechaNacimiento>
              <ImagenUsuario>null</ImagenUsuario>
              <Direccion>null</Direccion>
            </user>
          </IngresarUsuario>
        </soap:Body>
      </soap:Envelope>`;

    // Configurar la petición
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                // Lo que te responde el metodo en este caso un true o un false
                var responseText = xmlhttp.responseText;
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(responseText, "text/xml");
                var result = xmlDoc.getElementsByTagName("IngresarUsuarioResult")[0].childNodes[0].nodeValue;
                console.log(result);

                //Si la respuesta es un true lo envia al loginPage para que ingrese
                if(result === "true"){
                  
                  setTimeout(function(){
                    window.location = "../../LoginPage/login.html"
                  },20000);
              }
              //Sino le envia una alerta de que no puede usar esas credenciales
              else{
                alert("Usuario no valido");
                location.reload();
              }

            } 
            else 
            {
                console.error(xmlhttp.statusText);
            }
          
        };
    };


    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);

    return datos;

};

