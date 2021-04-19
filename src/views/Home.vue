<template>
  <div class="home">
    <div v-if="isLoaded">
      <ProductDescriptionDrawer
        :product="product"
        :active="active"
        v-on:closeProductDrawer="closeProductDrawer()"
      />
    </div>
    <div class="product-cards-container" v-if="isLoaded">
      <ProductSummaryCard
        v-for="(item, i) in computedItems"
        :key="i"
        :product="item"
        v-on:view-product="viewProduct($event)"
      />
    </div>
  </div>
</template>

<script>
import ProductSummaryCard from "../components/products/ProductSummaryCard.vue";
import ProductDescriptionDrawer from "../components/products/ProductDescriptionDrawer.vue";

export default {
  name: "Home",
  components: {
    ProductDescriptionDrawer,
    ProductSummaryCard,
  },
  data() {
    return {
      // items: this.$store.state.items,
      product: null,
      active: {
        product_drawer: false,
      },
    };
  },
  computed: {
    isLoaded() {
      return this.$store.state.isLoaded;
    },
    computedItems() {
      return this.$store.state.items;
    },
  },
  methods: {
    viewProduct(product) {
      this.product = product;
      this.active.product_drawer = true;
    },
    closeProductDrawer() {
      this.active.product_drawer = false;
    },
    closeLoginForm() {
      this.active.showLoginForm = false;
      this.active.createProduct = false;
    },
    showCreateProductForm() {
      this.active.createProduct = true;
    },
  },
};
</script>

<style lang="scss">
.product-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
