<template>
  <v-app>
    <top-nav
      @complete-event="toggleDrawer"
      @right-drawer="toggleRight"
    ></top-nav>
    <left-nav :openDrawer="openDrawer"></left-nav>
    <side-bar :SideDrawer="SideDrawer"></side-bar>
    <div class="home">
      <h1>home</h1>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
//https://auth.dev.api.unoapp.io/api/v1/users/businesses
// https://auth.dev.api.unoapp.io/api/v1/users/businesses/b641f415-9861-4f8d-a22e-f690bd7912c1
//b641f415-9861-4f8d-a22e-f690bd7912c1
export default {
  // name: "Top-nav",
  components: {},
  data() {
    return {
      openDrawer: true,
      SideDrawer: false,
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "loginPage" });
    }
  },
  methods: {
    toggleDrawer() {
      this.openDrawer = !this.openDrawer;
    },
    toggleRight() {
      this.SideDrawer = !this.SideDrawer;
    },
  },
};
</script>
