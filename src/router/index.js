import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Login from "../components/login/Login.vue";
import CreateNewProduct from "../components/products/CreateNewProduct.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/createproduct',
    name:'CreateNewProduct',
    component: CreateNewProduct
  },
]

const router = createRouter({
  // mode:'history',
  history:createWebHistory(),
  routes
})

export default router
