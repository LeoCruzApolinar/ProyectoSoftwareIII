



    // function saludo(){
    //     document.getElementById("formulario").addEventListener("submit", function() {
    //         // Redirigir a la página de destino
    //         window.location.href = "https://www.youtube.com/";
    //     });
    // }
    

    // function validarFormulario() {
        var formulario = document.getElementById("myForm");
        

        const  usuario = document.getElementById('Usuario');
        const contraseña = document.getElementById('Contraseña');
        const button = document.getElementById('button')

        button.addEventListener('click', (e)=>{
            e.preventDefault()
            const data = {
                usuario: usuario.value,
                contraseña: contraseña.value
            }
            console.log(data);
            if (usuario.value == "Jean" && contraseña.value == "123") {
                // Si el formulario es válido, redirigir al usuario a la página principal
                window.location ="http://127.0.0.1:5501/ProbandoGets/startbootstrap-shop-homepage-gh-pages/homepage.html";
                console.log(data);
              } 
        })

         
          
        
      

