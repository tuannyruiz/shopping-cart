import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations'

Vue.use(Vuex)

const state = {
  added: [],
  all: [
    {
      id: 'abc123',
      name: 'Produto 1',
      description: 'Produto utilizado a fim de testes',
      price: 15
    },
    {
      id: 'def456',
      name: 'Produto 2',
      description: 'Também usaremos esse produto pra teste',
      price: 8
    },
    {
      id: 'ghi789',
      name: 'Produto 3',
      description: 'Esse é o último produto que usaremos pra teste',
      price: 24
    }
  ]
}

const getters = {
	allProducts: state => state.all,
	getNumberOfProducts: (state) => (state.all) ? state.all.length : 0,
	cartProducts: state => {
		return state.added.map(({ id, quantity }) => {
			const product = state.all.find(p => p.id === id)

			return {
				name: product.name,
				price: product.price,
				quantity
			}
		})
	}
}

const actions = {
	addToCart({ commit }, product){
		commit(types.ADD_TO_CART, {
			id: product.id
		})
	}
}

const mutations = {
	[types.ADD_TO_CART] (state, { id }) {
	    const record = state.added.find(p => p.id === id)

	    if (!record) {
	      state.added.push({
	        id,
	        quantity: 1
	      })
	    } else {
	      record.quantity++
	    }
	  }
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
