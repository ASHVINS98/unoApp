import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import loginPage from "../views/loginPage.vue";
import businessesList from "../views/businessesList.vue";
import TableData from "../components/tableData.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "loginPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: loginPage,
  },
  {
    path: "/business",
    name: "business",
    component: businessesList,
  },
  {
    path: "/table",
    name: "table",
    component: TableData,
  },
  {
    path: "/edit/:id",
    name: "EditForm",
    component: () => import("../components/EditForm.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
