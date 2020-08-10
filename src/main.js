import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify';

import firebase from 'firebase/app'
import 'firebase/auth' // Imports para la autentificación
import VueFirestore from 'vue-firestore';

import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});

const store = new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    setUderId(state, new_user) {
      state.user = new_user
    },
    setError(state, set_error) {
      state.error = set_error
    },
  },
  actions: {
    register(context, datos) {
      console.log('llegamos',context,datos)
      firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
      .then(function (response) {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    } 
  }
})


new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
