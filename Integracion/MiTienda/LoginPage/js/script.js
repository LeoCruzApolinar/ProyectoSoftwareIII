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


  
  //Funcion que a partir de un objeto ingresa datos a la tabla usuarios del indexedDB
  function addData(objeto){
    const transaction = db.transaction(['usuarios'],'readwrite')
    const objectStore = transaction.objectStore('usuarios')
    const request = objectStore.add(objeto)
  }


}



// var formulario = document.getElementById("myForm");
        
//Obteniendo interaccion con el formulario
const  correo = document.getElementById('Correo');
const contraseña = document.getElementById('Contraseña');
const button = document.getElementById('button')


//Lamada al metodo (IniciarSesionFirebase) al hacer click en loguearse
function validarFormulario() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);
  
  // Build SOAP request
  var sr = `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <IniciarSesionFirebase xmlns="http://Intec/">
                  <email>${correo.value}</email>
                  <contrasena>${contraseña.value}</contrasena>
                </IniciarSesionFirebase>
              </soap:Body>
            </soap:Envelope>`;
  
  // Send the POST request
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        // Lo que te responde el metodo en este caso un objeto: Token,Estado,User
        let response = xmlhttp.responseXML;
        let json = response.getElementsByTagName("IniciarSesionFirebaseResult")[0].textContent;
        let objeto = JSON.parse(json);

        console.log(objeto);
        console.log(objeto.Token);
        console.log(objeto.Estado);
        console.log(objeto.User);
        console.log(correo.value)

        //Si el estado que llega del metodo es true
        //Redirecciona al usuario a la pagina principal
        //Todo manejado con un setTimeout para que espere 2 segundos en lo que el metodo responde
        if (objeto.Estado === true) {
          Swal.fire({
            icon: 'success',
            title: 'Todo Bien',
            // text: 'Log In con Exito!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          setTimeout(function(){
            window.location = "../../startbootstrap-shop-homepage-gh-pages/homepage.html";

            //Guardo los datos que luego ingresare en el indexDB
            const data = {
              token:objeto.Token,
              user:objeto.User

            }
            //Con la funcion addData partir de un objeto ingresa datos a la tabla usuarios del indexedDB
            addData(data)
          }, 2000);
        } 
        //Si el estado que llega es false pues no lo redireccionara
        // y mostrara una alerta de que las credenciales no son correctas
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            // text: 'Something went wrong!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          
        }
        
      }
    }
  };
  
  //Esta parte hace la comunicacion con el WebService
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(sr);
}       
        
       


       


        

          
       
         
          
         
      
      
