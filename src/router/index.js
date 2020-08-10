import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "../components/Auth";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/login",
      component: Auth,
    },
    // {
    //   path: "/login",
    //   component: Login,
    // }
  ],
});
