<template>
  <div class="cart">
    <h1 class="title">Seu carrinho</h1>
    <p v-show="!products.length">
    	<em>Seu carrinho está vazio!</em>
    	<router-link to="/">Veja nossos produtos</router-link>
    </p>
    <div class="container">
      <table class="table is-striped" v-show="products.length">
        <thead>
          <tr>
            <td>Produto</td>
            <td>Preço</td>
            <td>Quantidade</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
              <td>{{ p.name }}</td>
              <td>R$ {{ p.price }}</td>
              <td>{{ p.quantity }}</td>
            </tr>
            <tr>
              <td><strong>Total:</strong></td>
              <td></td>
              <td><strong>R$ {{ total }}</strong></td>
            </tr>
        </tbody>
      </table>
    </div>
    <p><button v-show="products.length" class='button is-primary' @click='checkout'>Pagar</button></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
  	checkout(){
      const pagarme = require('pagarme')

      pagarme.client.connect({ api_key: 'ak_test_KjUWgOT1gQXs1wghOHMWXOZfamx25X' })
        .then(client => client.splitRules.find({
          transactionId: 1234,
        }))
        .then(splitRules => console.log(splitRules))
  	}
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin: 0 auto 15px;
}
</style>
