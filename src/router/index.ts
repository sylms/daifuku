import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Search from "../views/Search.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Search",
    component: Search,
    meta: { title: "sylms Explorer" },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { title: "sylms Explorer とは" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
