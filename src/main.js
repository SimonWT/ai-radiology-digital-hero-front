import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase';
import axios from 'axios'
import VueAxios from 'vue-axios'
const env = require('../env')
export const backendUrl = env.backend_url
export const frontendUrl = env.frontend_url
 
Vue.use(VueAxios, axios)

Vue.use(ElementUI, { locale });


Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyBdbNAkWESgdz_Zv9-qM3usvQKp1nvS9fY',
  authDomain: 'digiathero---med.firebaseapp.com',
  databaseURL: 'https://digiathero---med.firebaseio.com',
  projectId: 'digiathero---med',
  storageBucket: 'digiathero---med.appspot.com',
  messagingSenderId: '518940199497',
  appId: '1:518940199497:web:850f0e5ffed9e5333b0d98',
});

export const fbApp = firebase.app();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
