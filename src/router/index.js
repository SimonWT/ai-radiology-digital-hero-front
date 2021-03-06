import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import Login from '../views/Login.vue'
import Observation from '../views/Observation.vue'
import Profile from '../views/Profile.vue'
import PatientReport from '../views/PatientReport.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/observation/:id',
    name: 'Observation',
    component: Observation
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/patient/report/:id',
    name: 'PatientReport',
    component: PatientReport
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path.includes('report'))
  if(to.path.includes('report')){ 
    next()
    return
  }
  if(to.path !== '/login'){
    if(store.getters.isLoggedIn){
      next()
    }else next('/login')
  }else next()
})

export default router
