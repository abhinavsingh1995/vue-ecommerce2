<template>
     <p v-if="!returnIsLoggedIn" style="color:orangered"> Please <router-link :class="{ active: $route.name === 'Login' }" to="/login">Login</router-link> to add product to cart</p>
    <div class="cart-item-card" v-else>
        <h3>Cart Total: ${{ cart_total.toFixed(2) }}</h3>

        <button class="view-product-button">Pay by Credit Card</button>
    </div>
</template>

<script>
    export default {
        computed: {
            cart_total() {
                return this.$store.getters.cartItems.reduce((a, b) => a + (b.price * b.quantity), 0)
            },
             returnIsLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
        }
    }
</script>