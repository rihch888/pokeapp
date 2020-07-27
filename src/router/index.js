import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Register from '../views/Auth/Register';
import Login from '../views/Auth/Login';
import PokemonDetail from '../views/PokemonDetail';
import PageNotFound from '../views/PageNotFound';
import firebase from 'firebase';

Vue.use(VueRouter)

  const routes = [
  {
    path: "*",
    name: 'pageNotFound',
    component: PageNotFound,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/pokemonDetail',
    name: 'pokemonDetail',
    component: PokemonDetail,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
})

export default router
