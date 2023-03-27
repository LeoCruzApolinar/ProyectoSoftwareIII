const products = [
    {
      name: 'Jean y Jorge',
      price: '$40.00 - $80.00',
      imageUrl: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
    },
    {
      name: 'Fancy Product 2',
      price: '$50.00 - $90.00',
      imageUrl: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
    },
    // Agrega más productos aquí
  ];
  

// Obtener el contenedor donde se agregarán las cards
const productContainer = document.getElementById('product-container');

// Iterar a través de la lista de productos y crear una card para cada uno
products.forEach(product => {
  // Crear un div con la clase "col mb-5" para agregar la card
  const productCol = document.createElement('div');
  productCol.classList.add('col', 'mb-5');

  // Crear la card
  const productCard = document.createElement('div');
  productCard.classList.add('card', 'h-100');

  // Agregar la imagen del producto
  const productImage = document.createElement('img');
  productImage.classList.add('card-img-top');
  productImage.src = product.imageUrl;
  productImage.alt = 'Product image';
  productCard.appendChild(productImage);

  // Agregar los detalles del producto
  const productDetails = document.createElement('div');
  productDetails.classList.add('card-body', 'p-4');

  const productName = document.createElement('h5');
  productName.classList.add('fw-bolder');
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  const productPrice = document.createElement('p');
  productPrice.innerText = product.price;
  productDetails.appendChild(productPrice);

  productCard.appendChild(productDetails);

  // Agregar los botones de acción
  const productActions = document.createElement('div');
  productActions.classList.add('card-footer', 'p-4', 'pt-0', 'border-top-0', 'bg-transparent');

  const viewOptionsBtn = document.createElement('a');
  viewOptionsBtn.classList.add('btn', 'btn-outline-dark', 'mt-auto');
  viewOptionsBtn.innerText = 'View options';

  const addToCartBtn = document.createElement('a');
  addToCartBtn.classList.add('btn', 'btn-outline-dark', 'mt-auto');
  addToCartBtn.innerText = 'Add to cart';

  productActions.appendChild(viewOptionsBtn);
  productActions.appendChild(addToCartBtn);

  productCard.appendChild(productActions);

  productCol.appendChild(productCard);
  productContainer.appendChild(productCol);
});
