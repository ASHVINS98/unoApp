<template>
  <v-app-bar app color="background" extension-height="48" flat tile value>
    <v-app-bar-nav-icon @click="updateDrawerState"></v-app-bar-nav-icon>
    <v-toolbar-title>Table</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title>welcome</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout" class="mr-5" dark color="#FF5722"
      ><v-icon>mdi-logout</v-icon></v-btn
    >
    <!-- <topNavBusinessVue /> -->

    <v-btn icon>
      <v-icon @click="updateRightDrawer">mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
// import topNavBusinessVue from "./topNavBusiness.vue";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    updateDrawerState() {
      console.log("emit complete event");
      this.$emit("complete-event");
    },
    updateRightDrawer() {
      this.$emit("right-drawer");
    },

    logout() {
      console.log("logout");
      // let user = localStorage.removeItem("user-info");
      localStorage.removeItem("user-info");
      localStorage.removeItem("selected-location");
      //if (!user) {
      this.$router.push({ name: "loginPage" });
      // }
    },
  },
  // inject:['listTop']
};
</script>
