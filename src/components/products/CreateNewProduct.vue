<template>
  <div class="drawer-background" :class="{ show: show }" />
  <div class="drawer" :class="{ show: show }">
    <div class="drawer-close" @click.prevent="closeForm()">X</div>
    <div class="product-details">
      <div class="container">
        <form>
          <div class="row">
            <div class="col-25">
              <label for="productName">Product Name</label>
            </div>
            <div class="col-75">
              <input class="un" type="text" name="productName" v-model="name" />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="category">Category</label>
            </div>
            <div class="col-75">
              <input class="un" type="text" name="category" v-model="category" />
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
                class="un"
                v-model="description"
                style="height: 200px"
              ></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="price">Price</label>
            </div>
            <div class="col-75">
              <input class="un" id="subject" name="price" v-model="price" />
            </div>
          </div>
          <button @click.prevent="createProduct()">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      name: "Jon Doe",
      description: "Lorem Ispum",
      price: 0,
      category: "mobile",
    };
  },
  mounted() {
    this.$store.commit('toggleCreateProductForm');
  },

  methods: {
    closeForm() {
      this.$store.commit('toggleCreateProductForm');
      window.location.replace('http://localhost:8080/');
    },
    createProduct() {
      if(!this.$store.state.authToken) {
        this.$store.commit('resetAuthTokenFromLocalStorage');
      }

      const productDetail = {
        type: "customproducts",
        status: "publish",
        title: {
          raw: this.name,
          rendered: this.name,
        },
        excerpt: {
          rendered: "",
          protected: false,
        },
        fields: {
          description: this.description,
          price: this.price,
          category: this.category,
        },
      };


      if (!this.description || !this.price || !this.category || !this.name) {
        console.log('Cannot create product. Missing details of product')
        return;
      }

      fetch("http://localhost/wordpress_prc/wp-json/wp/v2/customproducts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.$store.state.authToken,
        },
        body: JSON.stringify(productDetail),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
  },
  computed: {
    ...mapGetters({show:'returnShowCreateProductForm'}),
    isLoggedIn() {
      if (this.$store.state.authKey) return true;
      else return false;
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

// input[type="text"],
// select,
// textarea {
//   width: 100%;
//   padding: 12px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   resize: vertical;
// }

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

.container {
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.un {
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

  .col-25,
  .col-75,
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
}
</style>