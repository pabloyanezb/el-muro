import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app'

import Auth from "../components/Auth";
import Home from "../components/Home";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        userLoggedIn: true,
      }
    },
    {
      path: "/login",
      component: Auth,
    },
  ],
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let userLoggedIn = to.matched.some(record => record.meta.userLoggedIn);

  if (userLoggedIn && !currentUser) next('/login')
  else next ()
})

export default router;
