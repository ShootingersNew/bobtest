import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FirstTaskView from "../views/FirstTask/FirstTaskView.vue";
import SecondTaskView from "../views/SecondTask/SecondTaskView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "FirstTask",
    component: FirstTaskView,
  },
  {
    path: "/second",
    name: "SecondTask",
    component: SecondTaskView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
