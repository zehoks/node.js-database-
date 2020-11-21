import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Sign_in from '../views/Sign_in.vue'
import UserOrder from '../views/UserOrder.vue'
import store from '../store'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/menu',
    name: '/Menu',
    component: Menu,
  },
  {
    path: '/sign_in',
    name: '/Sign_in',
    component: Sign_in,
    meta: {
      authRequired : false
    }
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

router.beforeEach((to, from, next) => {
  if (to.meta.noAuth) {

    if (!to.meta.authRequired) {
    
    next()
    return
    }
  }

  
  
  const token = localStorage.getItem('token')
  if (token) {
    store.dispatch('auth/setAuth', token)
    if (to.name == 'Sign_In') {
      next({ name: 'Home' })
      
    } else {
      next()
    } 
  } else {
    next({name: 'Sign_in'})
  }
})

export default router
