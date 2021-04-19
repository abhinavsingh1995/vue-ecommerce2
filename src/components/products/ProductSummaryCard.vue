<template>
  <div class="card">
    <h3>
      {{ product.name }}
    </h3>
    <div id="product-body">
      <h5 class="price">Price: ${{ product.price }}</h5>
      <p class="description">Description: {{ description }}</p>
      <p class="text-muted">{{ product.category }}</p>
    </div>
    <div id="button-cover">
    <button
      class="view-product-button"
      @click.prevent="$emit('view-product', product)"
    >
      View Product
    </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  computed: {
    description() {
      if (this.product.description) {
        return this.product.description.substring(0, 150);
      }
      return "";
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#product-body {
  max-height: 240px;
}
#button-cover {
  position: absolute;
  bottom: 10px;
  width: 95%;
}
.card {
  width: 80%;
  height: 360px;
  margin: 10%;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 5px gray;

  h5.price {
    color: gray;
  }

  p.description {
    font-size: 0.85rem;
  }

  p.text-muted {
    color: gray;
  }
}

button.view-product-button {
  padding: 10px;
  background-color: rgb(79, 160, 187);
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.15rem;
  border-radius: 5px;
  cursor: pointer;
  width: inherit;
}

@media (min-width: 500px) {
  .card {
    width: 350px;
    margin: 10px;
  }
}
</style>