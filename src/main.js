import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAZDWsqcbfiNY7DpzMwLh-TiS_xOi1Inl4",
  authDomain: "proyectovue-d35dd.firebaseapp.com",
  databaseURL: "https://proyectovue-d35dd.firebaseio.com",
  projectId: "proyectovue-d35dd",
  storageBucket: "proyectovue-d35dd.appspot.com",
  messagingSenderId: "131667944176",
  appId: "1:131667944176:web:780296c191d5651cff5835"
};
firebase.initializeApp(firebaseConfig);
Vue.use(vuetify);
Vue.config.productionTip = false;

let app = null;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
