import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Sign_in from '../views/Sign_in.vue'
import UserOrder from '../views/UserOrder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/menu',
    name: '/Menu',
    component: Menu,
  },
  {
    path: '/sign_in',
    name: '/Sign_in',
    component:Sign_in,
  },
  {
    path: '/user_order',
    name: 'UserOrder',
    component: UserOrder,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
