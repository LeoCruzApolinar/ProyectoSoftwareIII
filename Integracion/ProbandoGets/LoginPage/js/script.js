const indexedDB = window.indexedDB

if(indexedDB){
  let db;
  const request = indexedDB.open('miTienda',1)

  request.onsuccess = () =>{
    db = request.result
    console.log('OPEN', db)
  }

  request.onupgradeneeded = () =>{
    db = request.result
    console.log('Create', db)
    const objectStore = db.createObjectStore('productos')
    const objectStore2 = db.createObjectStore('usuarios',{
      autoIncrement: true
    })
  }

  request.onerror = (e) =>{
    console.log('Error',e)
  }


  // function validarToken(token) {
  //   const request = indexedDB.open("miTienda", 1);
  //   request.onerror = (event) => {
  //     console.error("Error al abrir la base de datos", event);
  //   };
  //   request.onsuccess = (event) => {
  //     const db = event.target.result;
  //     const transaction = db.transaction(["usuarios"], "readonly");
  //     const objectStore = transaction.objectStore("usuarios");
  //     const request = objectStore.get(token);
  //     request.onerror = (event) => {
  //       console.error("Error al obtener el token", event);
  //     };
  //     request.onsuccess = (event) => {
  //       const existeToken = event.target.result;
  //       if (existeToken) {
  //         console.log(`El token ${token} ya existe en la base de datos.`);
  //       } else {
  //         console.log(`El token ${token} no existe en la base de datos.`);
  //         // Si el token no existe, lo agrega a la base de datos
  //         const addRequest = objectStore.add(token);
  //         addRequest.onerror = (event) => {
  //           console.error("Error al agregar el token a la base de datos", event);
  //         };
  //         addRequest.onsuccess = (event) => {
  //           console.log(`El token ${token} ha sido agregado a la base de datos.`);
  //         };
  //       }
  //     };
  //   };
  // }

  //  function addData(objeto) {
  //    const transaction = db.transaction(['usuarios'], 'readwrite');
  //    const objectStore = transaction.objectStore('usuarios');
  
  // //   // Verificar si ya existe un objeto con el mismo token en la base de datos
  //    const tokenIndex = objectStore.index('token');
  //    const request = tokenIndex.get(objeto.token);
  //    request.onsuccess = function(event) {
  //      const existingObject = event.target.result;
  //      if (!existingObject) {
  //        // No existe un objeto con el mismo token, se puede agregar el nuevo objeto
  //        objectStore.add(objeto);
  //      } else {
  //        // Ya existe un objeto con el mismo token, no se puede agregar el nuevo objeto
  //        console.log('Ya existe un objeto con el mismo token en la base de datos');
  //      }
  //    }
  //  }

//    function addData(objeto) {
//      const transaction = db.transaction(['usuarios'], 'readwrite');
//      const objectStore = transaction.objectStore('usuarios');
//      const request = objectStore.openCursor();
  
//      // Verificar si ya existe un objeto con el mismo token en la base de datos
//      request.onsuccess = function(event) {
//        const cursor = event.target.result;
//        if (cursor) {
//          if (cursor.value.token === objeto.Token) {
//            // Ya existe un objeto con el mismo token, no se puede agregar el nuevo objeto
//            console.log('Ya existe un objeto con el mismo token en la base de datos');
//          return;
//          }
//          cursor.continue();
//        } else {
//          // No existe un objeto con el mismo token, se puede agregar el nuevo objeto
//          const data = {
//            token: objeto.Token,
//            estado: objeto.Estado
//          };
//          objectStore.add(data);
//        }
//      }
//    }
// }

function addData(objeto){
  const transaction = db.transaction(['usuarios'],'readwrite')
  const objectStore = transaction.objectStore('usuarios')
  const request = objectStore.add(objeto)
}


}



        var formulario = document.getElementById("myForm");
        

        const  correo = document.getElementById('Correo');
        const contraseña = document.getElementById('Contraseña');
        const button = document.getElementById('button')

        // button.addEventListener('click', (e)=>{
        //     e.preventDefault()
        //     const data = {
        //         correos: correo.value,
        //         contraseñas: contraseña.value
        //     }
        //     console.log(data);
            
        // })

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
                // Handle response here
                let response = xmlhttp.responseXML;
                let json = response.getElementsByTagName("IniciarSesionFirebaseResult")[0].textContent;
                let objeto = JSON.parse(json);
                console.log(objeto);
                console.log(objeto.Token);
                console.log(objeto.Estado);
                console.log(objeto.User);
                console.log(correo.value)
                
                if (objeto.Estado === true) {
                  setTimeout(function(){
                    window.location = "../../startbootstrap-shop-homepage-gh-pages/homepage.html";
                    const data = {
                      token:objeto.Token,
                      user:objeto.User

                    }
                    addData(data)
                  }, 2000);
                } else {
                  setTimeout(function(){
                    alert("Credenciales incorrectas");
                  }, 2000);
                }
                
              }
            }
          };
          
          xmlhttp.setRequestHeader('Content-Type', 'text/xml');
          xmlhttp.send(sr);
        }
        
       


       


        

          
       
         
          
         
      
      
