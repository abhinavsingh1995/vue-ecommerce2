import { createStore } from "vuex";

function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default createStore({
  state: {
    cart: [],
    items: [],
    authToken: "",
    isLoggedIn: localStorage.getItem("authKey") ? true : false,
    showLoginForm: false,
    showCreateProductForm:  false,
    isLoaded: false,
  },
  getters: {
    // function curring, returning another arrow-function for a arrow-function
    productQuantity: (state) => (product) => {
      const item = state.cart.find((i) => i.id === product.id);

      if (item) return item.quantity;
      else return null;
    },
    cartItems(state) {
      return state.cart;
    },
    returnIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    returnShowCreateProductForm(state) {
      return state.showCreateProductForm;
    }
  },
  mutations: {
    toggleCreateProductForm(state) { state.showCreateProductForm = !state.showCreateProductForm},
    updateAuthToken(state, authData) {
      state.authToken = authData;
    },
    resetAuthTokenFromLocalStorage(state) {
      if (state.authToken === "") {
        state.authToken = localStorage.getItem("authKey");
        console.log("udpated auth = ", state.authToken);
      }
    },
    addToCart(state, product) {
      let item = state.cart.find((i) => i.id === product.id);

      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      updateLocalStorage(state.cart);
    },

    removeFromCart(state, product) {
      // find if the product exits in the cart
      let item = state.cart.find((i) => i.id === product.id);

      if (item) {
        if (item.quantity > 1) {
          // if product exists and its quantity is more than 1 then remove 1 item
          item.quantity--;
        } else {
          state.cart = state.cart.filter((i) => i.id !== product.id);
        }
      }
      updateLocalStorage(state.cart);
    },

    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },

    toggleShowLoginForm(state) {
      console.log(state);
      state.showLoginForm = !state.showLoginForm;
      console.log(state);
      console.log('Toggled show login form');
    }
  },
  actions: {},
  modules: {},
});

