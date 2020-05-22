import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/Home.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "home" */ "../components/Cart.vue")
  },
  {
    path: "/item",
    name: "Item",
    props: true,
    component: () =>
      import(/* webpackChunkName: "post" */ "../components/Item.vue")
  },
  {
    path: "/camera",
    name: "Camera",
    component: () =>
      import(/* webpackChunkName: "camera" */ "../components/Camera.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
