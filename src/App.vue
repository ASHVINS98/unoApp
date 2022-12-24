<template>
  <v-app>
    <div v-if="$route.name != 'loginPage' && $route.name != 'business'">
      <top-nav
        @complete-event="toggleDrawer"
        @right-drawer="toggleRight"
      ></top-nav>
      <left-nav :openDrawer="openDrawer"></left-nav>
      <side-bar :SideDrawer="SideDrawer"></side-bar>
    </div>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      openDrawer: false,
      SideDrawer: false,
    };
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
