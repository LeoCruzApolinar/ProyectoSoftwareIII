let usuario={}

const usuarioInput = document.getElementById('usuario');
            const correoInput = document.getElementById('correo');
            const contraseñaInput = document.getElementById('contraseña');
            const nombreInput = document.getElementById('nombre');
            const apellidoInput = document.getElementById('apellido');
            const telefonoInput = document.getElementById('telefono');
            const estadoInput = document.getElementById('estado');
            const fechaNacimientoInput = document.getElementById('fechaNacimiento');
            const imagenInput = document.getElementById('imagenUser');
            const direccionInput = document.getElementById('direccion');

const request = indexedDB.open('miTienda', 1);
let ultimoUsuario;

request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction(['usuarios'], 'readonly');
  const objectStore = transaction.objectStore('usuarios');
  
  const cursorRequest = objectStore.openCursor(null, 'prev'); // obtiene el cursor en orden inverso (desde el último objeto hasta el primero)

  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (cursor) {
      ultimoUsuario = cursor.value;
      console.log(ultimoUsuario.user); // imprime el nombre del último usuario almacenado
      
      // Build SOAP request
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);

      const sr = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ObtenerUsuario xmlns="http://Intec/">
            <Usuario>${ultimoUsuario.user}</Usuario>
          </ObtenerUsuario>
        </soap:Body>
      </soap:Envelope>`;

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            // Handle response here
            const responseText = xmlhttp.responseText;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(responseText, "text/xml");
            const result = xmlDoc.getElementsByTagName("ObtenerUsuarioResult")[0].childNodes[0].nodeValue;
            console.log(result);

            const response = xmlhttp.responseXML;
            const json = response.getElementsByTagName("ObtenerUsuarioResult")[0].textContent;
            const objeto = JSON.parse(json);
            console.log(objeto);
            let usuarioLogIN = {
                usuario: objeto.usuario,
                correo: objeto.CorreoElectronico,
                clave: objeto.Clave,
                nombre: objeto.Nombre,
                apellido: objeto.Apellido,
                telefono: objeto.Telefono,
                fechaNacimiento: objeto.FechaNacimiento,
                imagenUsuario: objeto.ImagenUsuario,
                direccion: objeto.Direccion
            }
            // usuario.push(usuarioLogIN)
            console.log(usuario)
            usuario = usuarioLogIN
            console.log(usuario.correo)
            console.log(usuario.usuario)

            

            usuarioInput.value = usuarioLogIN.usuario;
            correoInput.value = usuarioLogIN.correo;
            contraseñaInput.value = usuarioLogIN.clave;
            nombreInput.value = usuarioLogIN.nombre;
            apellidoInput.value = usuarioLogIN.apellido;
            telefonoInput.value = usuarioLogIN.telefono;
            fechaNacimientoInput.value = usuarioLogIN.fechaNacimiento;
            imagenInput.src = usuarioLogIN.imagenUsuario;
            direccionInput.value = usuarioLogIN.direccion;
          }
        }
      };

      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(sr);

    }
  };

  cursorRequest.onerror = () => {
    console.log('Error al obtener el cursor');
  };

  transaction.oncomplete = () => { 
    db.close();
  };
};










function ActualizarUsuario() {

    

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://serviciowebtienda20230326235427.azurewebsites.net/ServicioA.asmx', true);
    
    // Build SOAP request
    var sr = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ActualizarUsuario xmlns="http://Intec/">
          <user>
            <usuario>${usuarioInput.value}</usuario>
            <CorreoElectronico>${correoInput.value}</CorreoElectronico>
            <Clave>${contraseñaInput.value}</Clave>
            <Nombre>${nombreInput.value}</Nombre>
            <Apellido>${apellidoInput.value}</Apellido>
            <Telefono>${telefonoInput.value}</Telefono>
            <Estado>1</Estado>
            <FechaNacimiento>${fechaNacimientoInput.value}</FechaNacimiento>
            <ImagenUsuario>null</ImagenUsuario>
            <Direccion>${direccionInput.value}</Direccion>
          </user>
          <CorreoAnterior>${usuario.correo}</CorreoAnterior>
          <UsuaioAnterior>${usuario.usuario}</UsuaioAnterior>
        </ActualizarUsuario>
      </soap:Body>
    </soap:Envelope>`;
    
    // Send the POST request
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          // Handle response here
          var responseText = xmlhttp.responseText;
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(responseText, "text/xml");
          var result = xmlDoc.getElementsByTagName("ActualizarUsuarioResult")[0].childNodes[0].nodeValue;
          
          console.log(result);
          
          if(result === "true"){
            // settimeout(window.location = "../../startbootstrap-shop-homepage-gh-pages/homepage.html",2000);
            setTimeout(function(){
                alert('Volveras a la pagina de inicio')
              window.location = "../../LoginPage/login.html"
            },2000);
        }
          
        }
      }
    };
    
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }