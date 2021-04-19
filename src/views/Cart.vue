<template>
  <h2>Your Cart</h2>
  <CartItemCard v-for="item in items" :key="item.id" :item="item" />
  <CartSummaryPaymentCard />
</template>

<script>
import CartItemCard from "../components/cart/CartItemCard.vue";
import CartSummaryPaymentCard from "../components/cart/CartSummaryPaymentCard.vue";
export default {
  components: {
    CartItemCard,
    CartSummaryPaymentCard,
  },
  computed: {
    items() {
      return this.$store.getters.cartItems;
    },
  },
};
</script>

<style>
</style>