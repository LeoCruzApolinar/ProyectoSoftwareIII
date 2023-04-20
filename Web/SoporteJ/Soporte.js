// Seleccionamos todos los botones del menú
const toggleButtons = document.querySelectorAll('.toggle-button');

// A cada botón, le agregamos un escuchador de eventos para detectar el clic
toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Seleccionamos el contenido correspondiente al botón clickeado
    const toggleContent = button.nextElementSibling;

    // Cambiamos la visibilidad del contenido
    const faqAnswers = document.querySelectorAll('.faq-answer');

    faqAnswers.forEach(answer => {
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
        button.classList.toggle('active');
      });

  
  });
});


