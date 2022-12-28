<template>
  <v-app>
    <h2>home</h2>
    <v-card dark height="30" class="mx-auto">
      <v-btn color="#ff5752">
        <RouterLink to="/table"><h1>GO TO TABLELIST</h1></RouterLink>
      </v-btn>
    </v-card>
  </v-app>
</template>

<script>
// @ is an alias to /src
//https://auth.dev.api.unoapp.io/api/v1/users/businesses
// https://auth.dev.api.unoapp.io/api/v1/users/businesses/b641f415-9861-4f8d-a22e-f690bd7912c1

import { RouterLink } from "vue-router";

//b641f415-9861-4f8d-a22e-f690bd7912c1
export default {
  components: { RouterLink },

  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "loginPage" });
    }
  },
};
</script>
<style scoped>
h1 {
  color: azure;
  text-align: center;
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>
