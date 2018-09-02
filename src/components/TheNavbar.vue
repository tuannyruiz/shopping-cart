<template>
  <nav class="nav has-shadow" style='box-shadow: 0 1px 0 rgba(219,219,219,.3);'>
    <div class="container">
      <div class="nav-left">
        <router-link to="/" class="nav-item">
          <img src="../assets/logo.png" alt="Bulma logo">
        </router-link>
      </div>

      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu">
        <router-link to="/" class="nav-item is-tab" exact-active-class="is-active">
          Produtos
        </router-link>

        <div class="nav-item is-tab" :class="activeItem">
          <div class="field is-grouped">
            <p class="control">
              <router-link to='/carrinho' class="button is-info">
                <span class="icon">
                  <i class="fa fa-shopping-cart"></i>
                </span>
                <span>Carrinho ({{itemsInCart}})</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
	</nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  computed: {
    activeItem () {
      return this.$route.path === '/carrinho' ? 'active-bottom-border' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
	height: auto;
	margin-bottom: 2rem;
}

.nav-item img {
    max-height: 3.5rem;
}

.active-bottom-border {
	border-bottom: 3px solid #00d1b2;
    color: #00d1b2;
    padding-bottom: calc(.75rem - 8px);
}
</style>
