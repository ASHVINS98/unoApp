<template>
  <v-app>
    <h1>home</h1>
  </v-app>
</template>

<script>
// @ is an alias to /src
//https://auth.dev.api.unoapp.io/api/v1/users/businesses
// https://auth.dev.api.unoapp.io/api/v1/users/businesses/b641f415-9861-4f8d-a22e-f690bd7912c1
//b641f415-9861-4f8d-a22e-f690bd7912c1
export default {
  components: {},

  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "loginPage" });
    }
  },
};
</script>
