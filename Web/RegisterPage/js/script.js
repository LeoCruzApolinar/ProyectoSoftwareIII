// const indexedDB = window.indexedDB

// import { RegistroUsuario } from "../../Metodos/MetodosUsuario";



// //Verifico la existencia del indexedDB
// if(indexedDB){
//   let db;
//   const request = indexedDB.open('miTienda',1)

//   //Si todo sale bien la abro
//   request.onsuccess = () =>{
//     db = request.result
//     console.log('OPEN', db)
//   }

//   //Si es necesario la creo agregando dos tablas
//   request.onupgradeneeded = () =>{
//     db = request.result
//     console.log('Create', db)
//     const objectStore = db.createObjectStore('productos',{
//       autoIncrement: true
//     })
//     const objectStore2 = db.createObjectStore('usuarios',{
//       autoIncrement: true
//     })
//   }

//   //Si existe algun error se imprime por consola
//   request.onerror = (e) =>{
//     console.log('Error',e)
//   }
// }

// const addData = (productos) =>{

// }




      

const datos = {
  // Nombre: "",
  // Apellido: "",
  // CorreoElectronico: "",
  // usuario: "",
  // Clave : "",
  // Telefono: 0,
  // Estado: 1,
  // FechaNacimiento: null,
  // ImagenUsuario : null,
  // Direccion : null
};


 async function guardarDatos(){
  
  
     const formulario = document.getElementById("myForm");

     
     
    datos.Nombre = formulario.Nombre.value;
    datos.Apellido = formulario.Apellido.value;
    datos.CorreoElectronico = formulario.Correo.value;
    datos.usuario = formulario.Usuario.value;
    datos.Clave = formulario.Contraseña.value;
    datos.Telefono = formulario.Telefono.value;
    datos.FechaNacimiento = formulario.Fecha.value

  usuario = JSON.stringify(datos)
  // Llamada a la función
  console.log(datos)
  console.log(usuario)
 let a =  await RegistroUsuario(datos.usuario, datos.CorreoElectronico, datos.Clave, datos.Nombre, datos.Apellido, datos.Telefono,datos.FechaNacimiento,datos.usuario);
  console.log(a)
  

  if(a === true){
      window.location = "../../LoginPage/login.html"
    
    }
      //Sino le envia una alerta de que no puede usar esas credenciales
      else{
    alert("Usuario no valido");
    location.reload();
    }

  console.log(a);
}










