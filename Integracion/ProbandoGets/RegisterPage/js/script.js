
//   var form = document.getElementById("myForm");
//   form.addEventListener("submit", function(event) {
//     // Obtener todos los campos de entrada dentro del formulario
//     var inputs = form.querySelectorAll("input");

//     // Validar si algún campo está vacío
//     for (var i = 0; i < inputs.length; i++) {
//       if (inputs[i].value.trim() === "") {
//         // Si un campo está vacío, mostrar un mensaje de error y evitar que se envíe el formulario
//         alert("Por favor complete todos los campos.");
//         event.preventDefault();
//         return;
//       }
//     }
//   });



  function validarFormulario() {
    var formulario = document.getElementById("myForm");
    if (formulario.checkValidity()) {
      // Si el formulario es válido, redirigir al usuario a la página principal
      window.location = "file:///C:/Users/Lenovo/Documents/ProyectoFinalSoftIII/Pruebajs/ProbandoGets/startbootstrap-shop-homepage-gh-pages/homepage.html";
      
    } 
      
    
  }

  // Obtener referencia al formulario
const formulario = document.getElementById("myForm");

// Función para guardar los datos del formulario en un objeto
function guardarDatos() {
  // Crear objeto vacío
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
  return datos;
  
}

