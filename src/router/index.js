import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sort/bubble',
    name: 'BubbleSort',
    component: () =>
      import(/* webpackChunkName: "sort" */ '../views/sort/Bubble.vue')
  },
  {
    path: '/sort/selection',
    name: 'SelectionSort',
    component: () =>
      import(/* webpackChunkName: "sort" */ '../views/sort/Selection.vue')
  },
  {
    path: '/sort/insertion',
    name: 'InsertionSort',
    component: () =>
      import(/* webpackChunkName: "sort" */ '../views/sort/Insertion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
