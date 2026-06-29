import { createRouter, createWebHistory } from "vue-router";

import Profile from "../component/Profile.vue";
import About from "../component/About.vue";
import Home from "../component/layout/Home.vue";
import Login from "../component/Login.vue";
import PromptAi from "../component/PromptAi.vue";
import Task from "../component/Task.vue";
import Tambah from "../component/Tambah.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/prompt",
      name: "prompt",
      component: PromptAi,
    },
    {
      path: "/task",
      name: "task",
      component: Task,
    },
    {
      path: "/tambah",
      name: "tambah",
      component: Tambah,
    },
  ],
});

export default router;
