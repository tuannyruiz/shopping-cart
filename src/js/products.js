const products = [
  {
    id: 1,
    name: 'Produto 1',
    price: 150.00,
    image: 'https://via.placeholder.com/550x250'
  },
  {
    id: 2,
    name: 'Produto 2',
    price: 80.50,
    image: 'https://via.placeholder.com/550x250'
  },
  {
    id: 3,
    name: 'Produto 3',
    price: 100.00,
    image: 'https://via.placeholder.com/550x250'
  },
  {
    id: 4,
    name: 'Produto 4',
    price: 120.00,
    image: 'https://via.placeholder.com/550x250'
  },
  {
    id: 5,
    name: 'Produto 5',
    price: 60.00,
    image: 'https://via.placeholder.com/550x250'
  },
  {
    id: 6,
    name: 'Produto 6',
    price: 75.30,
    image: 'https://via.placeholder.com/550x250'
  },
  {
    id: 7,
    name: 'Produto 7',
    price: 200.20,
    image: 'https://via.placeholder.com/550x250'
  },
  {
    id: 8,
    name: 'Produto 8',
    price: 90.00,
    image: 'https://via.placeholder.com/550x250'
  }
]

const wrapper = document.getElementById('products');

const card = products.map(product => `
  <div class="col-md-4 col-sm-6">
    <div class="product">
      <img class="product__image" src="${product.image}" alt="">
      <div class="product__wrapper" data-name="${product.name}" data-price="${product.price}">
        <h3 class="product__name">${product.name}</h3>
        <p class="product__price">R$ ${product.price}</p>
        <form class="add-to-cart" action="cart.html" method="post">
          <div>
            <label for="qty-${product.id}" class="add-to-cart__label">Quantidade</label>
            <input type="text" name="qty-${product.id}" id="qty-${product.id}" class="add-to-cart__quantity" value="1"/>
          </div>
          <input type="submit" value="Adicionar ao carrinho" class="btn add-to-cart__button" />
        </form>
      </div>
    </div>
  </div>
`).join('');

wrapper.innerHTML = card;
