(function($) {
	$.Shop = function(element) {
		this.$element = $(element);
		this.init();
	};
	
	$.Shop.prototype = {
		init: function() {
			this.cartPrefix = "brecho-";
			this.cartName = this.cartPrefix + "cart";
			this.total = this.cartPrefix + "total";
			this.storage = sessionStorage;

			this.formAddToCart = this.$element.find("form.add-to-cart");
			this.formCart = this.$element.find("#shopping-cart");
      this.listCart = this.$element.find("#shopping-cart__list");
			this.subTotal = this.$element.find("#stotal");
      this.totalItems = this.$element.find("#total-items");
			this.shoppingCartActions = this.$element.find("#shopping-cart-actions");
			this.updateCartBtn = this.shoppingCartActions.find("#update-cart");
			this.emptyCartBtn = this.shoppingCartActions.find("#empty-cart");
			this.currency = "R$";
			
			this.createStorageCart();
			this.handleAddToCartForm();
			this.emptyCart();
			this.updateCart();
			this.displayCart();
			this.deleteItem();						
		},
		
		// Métodos públicos:

		createStorageCart: function() {
			if(this.storage.getItem(this.cartName) == null) {
				var cart = {};
				cart.items = [];
				this.storage.setItem(this.cartName, this._toJSONString(cart));
				this.storage.setItem(this.total, "0");
			}
		},

		deleteItem: function() {
			var self = this;
			if(self.listCart.length) {
				var cart = this._toJSONObject(this.storage.getItem(this.cartName));
				var items = cart.items;

				$(document).on("click", ".cart-item__remove", function(e) {
					e.preventDefault();
          var productName = $(this).data("product");
					var newItems = [];
					for(var i = 0; i < items.length; ++i) {
						var item = items[i];
						var product = item.product;	
						if(product == productName) {
							items.splice(i, 1);
						}
					}
					newItems = items;
					var updatedCart = {};
					updatedCart.items = newItems;
          
          var itemsLength = items.length;
          self.totalItems.html('('+ itemsLength +' ' + self._plural(itemsLength) + ')');

					var updatedTotal = 0;
					var totalQty = 0;
					if(newItems.length == 0) {
						updatedTotal = 0;
						totalQty = 0;
					} else {
						for(var j = 0; j < newItems.length; ++j) {
							var prod = newItems[j];
							var sub = prod.price * prod.qty;
							updatedTotal += sub;
							totalQty += prod.qty;
						}
					}

					self.storage.setItem(self.total, self._convertNumber(updatedTotal));
					self.storage.setItem(self.cartName, self._toJSONString(updatedCart));
					$(this).parents(".cart-item").remove();
					self.subTotal[0].innerHTML = self.currency + " " + self.storage.getItem(self.total);
				});
			}
		},

		displayCart: function() {
      var self = this;
			if(this.formCart.length) {
				var cart = this._toJSONObject(this.storage.getItem(this.cartName));
				var items = cart.items;
				var tableCart = this.formCart.find(".shopping-cart");
				var listCartBody = tableCart.find("#shopping-cart__list");
        var detailsCart = this.formCart.find("#details");

				if(items.length == 0) {
          var detailEmpty = `
            <p class="details__empty">Você ainda não adicionou nenhum item no carrinho</p>
          `;

					listCartBody.html("");
          detailsCart.html(detailEmpty);
				} else {
					for(var i = 0; i < items.length; ++i) {
						var item = items[i];
						var product = item.product;
						var image = item.image;
						var price = this.currency + " " + item.price;
						var qty = item.qty;
            var total = this.currency + ' ' + (item.price * item.qty);
            var listItemHtml = `
              <div class="cart-item">
                <img src="${image}" alt="Foto de ${product}" class="cart-item__image">
                <div class="cart-item__wrapper">
                  <h3 class="cart-item__title">${product}</h3>
                  <span class="cart-item__price">${price}</span>
                  <input class="cart-item__quantity" type="text" value="${qty}">
                  <a href='' class="cart-item__remove" data-product="${product}">Remover do carrinho</a>
                </div>
              </div>
            `;
            var detailHtml = `
              <li class="details__item">
                <span>${product}</span>
                <span>${total}</span>
              </li>
            `
					
						listCartBody.html(listCartBody.html() + listItemHtml);
            detailsCart.html(detailsCart.html() + detailHtml);
          }

          var itemsLength = items.length;
          this.totalItems.html('('+ itemsLength + ' ' + self._plural(itemsLength) + ')');
				}

				if(items.length == 0) {
					this.subTotal[0].innerHTML = this.currency + " " + 0.00;
				} else {	
					var total = this.storage.getItem(this.total);
					this.subTotal[0].innerHTML = this.currency + " " + total;
				}
			}
		},

		emptyCart: function() {
			var self = this;
			if(self.emptyCartBtn.length) {
				self.emptyCartBtn.on("click", function() {
					self._emptyCart();
				});
			}
		},

		updateCart: function() {
			var self = this;
		  if(self.updateCartBtn.length) {
        self.updateCartBtn.on("click", function() {
          var rows = self.listCart.find(".cart-item");
          var cart = self.storage.getItem(self.cartName);
          var total = self.storage.getItem(self.total);
          
          var updatedTotal = 0;
          var totalQty = 0;
          var updatedCart = {};
          updatedCart.items = [];
          
          rows.each(function() {
            var row = $(this);
            var pname = row.find(".cart-item__title").text();
            var pqty = self._convertString(row.find(".cart-item__quantity").val());
            var pprice = self._convertString(self._extractPrice(row.find(".cart-item__price")));
            var pimage = row.find(".cart-item__image").attr('src');
            
            var cartObj = {
              product: pname,
              price: pprice,
              qty: pqty,
              image: pimage
            };
            
            updatedCart.items.push(cartObj);
            
            var subTotal = pqty * pprice;
            updatedTotal += subTotal;
            totalQty += pqty;
          });
          
          self.storage.setItem(self.total, self._convertNumber(updatedTotal));
          self.storage.setItem(self.cartName, self._toJSONString(updatedCart));
        });
		  }
		},
		
		handleAddToCartForm: function() {
			var self = this;
			self.formAddToCart.each(function() {
				var form = $(this);
				var product = form.parent();
				var price = self._convertString(product.data("price"));
				var name =  product.data("name");
        var image = product.data("image");
				
				form.on("submit", function() {
					var qty = self._convertString(form.find(".add-to-cart__quantity").val());
					var subTotal = qty * price;
					var total = self._convertString(self.storage.getItem(self.total));
					var sTotal = total + subTotal;
					self.storage.setItem(self.total, sTotal);

					self._addToCart({
						product: name,
						price: price,
						qty: qty,
            image: image
					});
				});
			});
		},
		
		// Métodos privados

		_emptyCart: function() {
			this.storage.clear();
		},
		
		_extractPrice: function(element) {
			var self = this;
			var text = element.text();
			var price = text.replace(self.currency, "").replace(" ", "");
			return price;
		},
		
		_convertString: function(numStr) {
			var num;
			if(/^[-+]?[0-9]+\.[0-9]+$/.test(numStr)) {
				num = parseFloat(numStr);
			} else if(/^\d+$/.test(numStr)) {
				num = parseInt(numStr, 10);
			} else {
				num = Number(numStr);
			}
			
			if(!isNaN(num)) {
				return num;
			} else {
				console.warn(numStr + " não pode ser convertido");
				return false;
			}
		},

    _plural: function (length) {
      if (length <= 1) {
        return "item";
      } else {
        return "itens";
      }
    },
		
		_convertNumber: function(n) {
			var str = n.toString();
			return str;
		},
		
		_toJSONObject: function(str) {
			var obj = JSON.parse(str);
			return obj;
		},
	
  	_toJSONString: function(obj) {
			var str = JSON.stringify(obj);
			return str;
		},
		
		_addToCart: function(values) {
			var cart = this.storage.getItem(this.cartName);
			
			var cartObject = this._toJSONObject(cart);
			var cartCopy = cartObject;
			var items = cartCopy.items;
			items.push(values);
			
			this.storage.setItem(this.cartName, this._toJSONString(cartCopy));
		},
	};
	
	$(function() {
		var shop = new $.Shop("#site");
	});

})(jQuery);