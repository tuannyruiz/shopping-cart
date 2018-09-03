<template>
	<div>
		<h1 class="title">All Products</h1>
    	<p>{{length}} products</p>
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="product in products" :key="product.id">
            <div class="card">
              <h3 class="title">{{product.name}}</h3>
              <p class="subtitle">{{product.description}}</p>
              <span>{{product.price}}</span>
              <button @click='addToCart(product)' class='button is-info'>Add to cart</button>

            </div>
          </div>
        </div>
    </div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters({
    products: 'allProducts',
    length: 'getNumberOfProducts'
  }),
  methods: mapActions([
    'addToCart'
  ])
}
</script>

<style lang="scss">

</style>
