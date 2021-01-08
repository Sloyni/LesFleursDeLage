import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store/index'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function () {
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        store.dispatch('getUser').then(() => {
          if(store.state.user==null){
            next({name: 'Login'})
          } else {
            next()
          }
        })
    } else if (to.matched.some(record => record.meta.requiresNoAuth)) {
        store.dispatch('getUser').then(() => {
          if(store.state.user!==null){
            next({name: 'Index'})
          } else {
            next()
          }
        })
    } else {
      next()
    }
  })

  return router
}
