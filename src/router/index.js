import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "../components/Auth";
import Success from "../components/Success";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/success",
      component: Success,
    },
    {
      path: "/success",
      component: Success,
    },
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
