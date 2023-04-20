
function borrarDB() {
  const request = indexedDB.open('miTienda', 1);
  
  request.onsuccess = () => {
    const db = request.result;

    // Obtener el nombre de todas las tablas en la base de datos
    const objectStoreNames = db.objectStoreNames;

    // Iterar sobre todas las tablas y eliminar su contenido
    for (let i = 0; i < objectStoreNames.length; i++) {
      let clearRequest = null;
      if (objectStoreNames[i] === 'usuarios') {
        const transaction = db.transaction([objectStoreNames[i]], 'readwrite');
        const objectStore = transaction.objectStore(objectStoreNames[i]);
        clearRequest = objectStore.clear();
      }
    

      //Si todo sale bien redirecciona al usuario al loginPage
      if (clearRequest) {
        clearRequest.onsuccess = () => {
          console.log(`Contenido de la tabla "${objectStoreNames[i]}" eliminado correctamente`);
          Swal.fire({
            icon: 'success',
            title: 'Todo Bien',
          });
          setTimeout(function(){
            window.location = "../../LoginPage/login.html";
          }, 2000);
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
    }
  };

  request.onerror = (e) => {
    console.log('Error', e);
  };
}






  
  
  
  
  
  
  