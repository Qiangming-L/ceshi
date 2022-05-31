import { createRouter, createWebHistory } from "vue-router";

import Header from "./components/header/index.vue";
const Home = () =>
  import(/* webpackChunkName: "home" */ "./components/home/index.vue");

const routes = [
  { path: "/", name: "home", components: { header: Header, default: Home } },
  { path: "/:catchAll(.*)", components: { header: Header, default: Home } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

