import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import TopNav from "./components/TopNav.vue";
import LeftNav from "./components/LeftNav.vue";
import sideBar from "./components/sideBar.vue";
Vue.config.productionTip = false;
Vue.component("top-nav", TopNav);
Vue.component("left-nav", LeftNav);
Vue.component("side-bar", sideBar);
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
