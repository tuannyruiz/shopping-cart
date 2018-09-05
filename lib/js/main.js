'use strict';

var products = [{
  id: '0001',
  brand: 'Zara',
  name: 'Camisa',
  price: 12.50
}, {
  id: '0002',
  brand: 'Zara',
  name: 'Calça',
  price: 20.00
}, {
  id: '0003',
  brand: 'Le Lis Blanc',
  name: 'Saia',
  price: 17.30
}, {
  id: '0004',
  brand: 'Adidas',
  name: 'Chinelo',
  price: 12.50
}, {
  id: '0005',
  brand: 'Nike',
  name: 'Camiseta',
  price: 15.50
}];

function cardConstructor(product) {
  var card = document.createElement('div');
  card.innerHTML = '\n    <h4>' + product.brand + '</h4>\n    <h3>' + product.name + '</h3>\n    <span>' + product.price + '</span>\n  ';

  return card;
}

function appendCard(list) {
  var container = document.getElementById('container');

  for (var i = 0; i < list; i++) {
    var newCard = cardConstructor(list[i]);

    container.insertBefore(newCard, container.childNodes[0]);
  }
}