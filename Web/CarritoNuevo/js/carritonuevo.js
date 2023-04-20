
  const miBoton = document.getElementById('comprar');

  miBoton.addEventListener('click', function() {
    document.getElementById("popup").style.display = "block";
  });
  
  function ClosePayment() {
    document.getElementById("popup").style.display = "none";
  }

  

  




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
}


import * as Activo from '../../Metodos/usuarioActivo.js';
Activo.obtenerUltimoUsuario();
Activo.UsuarioActivo();








