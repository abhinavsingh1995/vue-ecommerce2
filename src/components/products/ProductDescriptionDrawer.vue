<template>
  <div
    class="drawer-background"
    :class="{ show: active.product_drawer }"
    @click="$emit('closeProductDrawer')"
  />
  <div class="drawer" :class="{ show: active.product_drawer }">
    <div class="drawer-close" @click.prevent="$emit('closeProductDrawer')">
      X
    </div>
    <div v-if="product && !editProduct" class="product-details">
      <h3 class="text-center">{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>
      <h3 class="text-center">${{ product.price }}</h3>

      <div class="cart-total" v-if="product_total">
        <h3>In Cart</h3>
        <h4>{{ product_total }}</h4>
      </div>

      <p v-if="!returnIsLoggedIn" style="color:orangered"> Please log in to add product to cart</p>
      <div class="button-container">
        <button :disabled="!returnIsLoggedIn" class="remove" @click.prevent="removeFromCart()">Remove</button>
        <button :disabled="!returnIsLoggedIn" class="add" @click.prevent="addToCart()">Add</button>
        <button :disabled="!returnIsLoggedIn" class="" @click.prevent="toggleEditProduct()">
          Edit Product
        </button>
      </div>
    </div>

    <form v-if="editProduct">
      <div class="row">
        <div class="col-25">
          <label for="productName">Product Name</label>
        </div>
        <div class="col-75">
          <input class="editField" type="text" name="productName" v-model="editableData.name" />
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="category">Category</label>
        </div>
        <div class="col-75">
          <input class="editField" type="text" name="category" v-model="editableData.category" />
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="description">Description</label>
        </div>
        <div class="col-75">
          <textarea
            type="text"
            name="description"
            class="editField"
            v-model="editableData.description"
            style="height: 200px"
          ></textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="price">Price</label>
        </div>
        <div class="col-75">
          <input class="editField" name="price" v-model="editableData.price" />
        </div>
      </div>
      <button @click.prevent="updatedProduct()">Save</button>
    </form>
  </div>
</template>

<script>

export default {
  props: ["product", "active"],
  emits: ["closeProductDrawer"],
  data() {
    return {
      editProduct: false,
    };
  },
  computed: {
    editableData() {
      return {
        id: this.product.id,
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
        description: this.product.description,
      };
    },
    product_total() {
      return this.$store.getters.productQuantity(this.product);
    },
    returnIsLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.product);
    },
    removeFromCart() {
      this.$store.commit("removeFromCart", this.product);
    },

    toggleEditProduct() {
      this.editProduct = true;
    },
    updatedProduct() {
      if (!this.$store.state.authToken) {
        this.$store.commit("resetAuthTokenFromLocalStorage");
      }

      const productDetail = {
        type: "customproducts",
        status: "publish",
        title: {
          raw: this.editableData.name,
          rendered: this.editableData.name,
        },
        excerpt: {
          rendered: "",
          protected: false,
        },
        fields: {
          description: this.editableData.description,
          price: this.editableData.price,
          category: this.editableData.category,
        },
      };

      console.log("AuthToken = " + JSON.stringify(this.$store.state.authToken));
      console.log(JSON.stringify(productDetail));

      fetch(
        `http://localhost/wordpress_prc/wp-json/wp/v2/customproducts/${this.product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$store.state.authToken,
          },
          body: JSON.stringify(productDetail),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.alert("Product is updated");
          this.editProduct = false;
        })
        .catch((err) => {
          window.alert("Error came = ", err);
          console.log(err);
          this.editProduct = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-background {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(124, 124, 124, 0.541);
  z-index: 100;
  display: none;
  transition: display 0.5s;

  &.show {
    display: block;
  }
}

.drawer-background.show {
  display: block;
}

.drawer {
  width: 95vw;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: -105vw;
  padding: 15px;
  transition: left 0.5s;
  z-index: 101;
  overflow-y: scroll;

  &.show {
    left: 0;
  }
}

.drawer-close {
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  right: 10px;
  color: gray;
  width: 15px;
  float: right;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
}

.product-details {
  display: flex;
  justify-content: center;
  flex-direction: column;

  p.description {
    padding: 20px;
    line-height: 1.5rem;
  }

  .button-container {
    button {
      width: 150px;
      border: none;
      padding: 10px;
      border-radius: 5px;
      margin: 0 5px 50px 5px;
      cursor: pointer;
    }

    button.remove {
    }

    button.add {
    }
  }
}

.editField {
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: "Ubuntu", sans-serif;
}

.pass {
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: "Ubuntu", sans-serif;
}

.un:focus,
.pass:focus {
  border: 2px solid rgb(79, 160, 187) !important;
}

@media (min-width: 500px) {
  .drawer {
    width: 450px;
  }
}
</style>