<template>
  <div v-if="!isLoaded">
    <img
      src="http://i.stack.imgur.com/SBv4T.gif"
      alt="this slowpoke moves"
      width="250"
    />
    <h4>Loading...</h4>
  </div>
  <div id="nav" v-else>
    <div>
      <router-link :class="{ active: $route.name === 'Home' }" to="/"
        >Home</router-link
      >
      |
      <router-link :class="{ active: $route.name === 'Cart' }" to="/cart"
        >Cart</router-link
      >
      {{ returnIsLoggedIn ? "|" : "" }}
      <router-link
        v-if="returnIsLoggedIn"
        :class="{ active: $route.name === 'CreateNewProduct' }"
        to="/createproduct"
        >Create Product</router-link
      >
    </div>
    <div>
      <router-link
        :class="{ active: $route.name === 'Login' }"
        to="/login"
        v-if="!returnIsLoggedIn"
        >Login</router-link
      >
      <button class="auth-button" @click="logout()" v-else>Logout</button>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  mounted() {
    if (!localStorage.getItem("authKey")) {
      console.log("removing authKey");
      localStorage.removeItem("cart");
    } else {
      this.$store.commit("updateCartFromLocalStorage");
    }
  },
  beforeCreate() {
    fetch("http://localhost/wordpress_prc/wp-json/wp/v2/customproducts/")
      .then((res) => res.json())
      .then((data) => {
        let productDetail = [];
        for (let i = 0; i < data.length; i++) {
          let k = {
            id: data[i].id,
            name: data[i].title.rendered,
            description: data[i].acf.description,
            price: parseFloat(data[i].acf.price),
            category: data[i].acf.category,
            imageNumber: data[i].featured_media,
          };
          productDetail.push(k);
        }
        this.$store.state.items = productDetail;
        this.$store.state.isLoaded = true;
      });
  },
  computed: {
    isLoaded() {
      return this.$store.state.isLoaded;
    },
    returnIsLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    logout() {
      window.alert("Do you want to logout!!!");
      localStorage.removeItem("authKey");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.auth-button {
  float: right;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  border: none;
  background: none;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
