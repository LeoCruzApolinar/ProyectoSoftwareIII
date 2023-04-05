$(document).ready(function() {
    $('.boton-menu').click(function() {
      $('.menu-lateral').toggleClass('retraido');
      $('.contenido-principal').toggleClass('retraido');
    });
  });