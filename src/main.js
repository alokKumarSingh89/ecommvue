import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css'
import store from '@/store';
Vue.use(Vuetify)
import { INIT, SET_USER } from '@/store/actionType'
Vue.config.productionTip = false
import interceptor from '@/helper/interceptor'
interceptor(store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch(INIT)
    let currentPAth = this.$route.path;
    this.$router.push('/')
    var config = {
      apiKey: "AIzaSyAYsOjNVJe4xTCk7sc45-QlBF-xpCsVyO0",
      authDomain: "vuelibrary-17ec0.firebaseapp.com",
      databaseURL: "https://vuelibrary-17ec0.firebaseio.com",
      projectId: "vuelibrary-17ec0",
      storageBucket: "vuelibrary-17ec0.appspot.com",
      messagingSenderId: "826809509361"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch(SET_USER)
        if (this.$route.name == 'Home')
          this.$router.push('/dashbord')
          this.$router.push(currentPAth)
      }

    })
  }
})
