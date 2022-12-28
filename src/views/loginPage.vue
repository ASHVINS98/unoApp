<template>
  <v-app>
    <v-card flat class="mt-16"
      ><v-card-title>
        <v-img
          height="100"
          width="100"
          contain
          src="../assets/uno-logo.b761cb80 (1).png"
        ></v-img>
      </v-card-title>
    </v-card>

    <v-card-title>
      <v-card
        color="#FF5722"
        elevation="8"
        width="600"
        dark
        height="65"
        class="mx-auto mt-10"
        style="z-index: 9999"
      >
        <v-card-title>
          <h1 class="display-1 mx-auto font-weight-bold">
            LOGIN
          </h1></v-card-title
        >
      </v-card>
    </v-card-title>
    <v-card width="700" elevation="8" class="mx-auto mt-n10">
      <v-card-text>
        <v-form>
          <v-text-field
            class="mt-8"
            label="Username"
            v-model="email"
            prepend-icon="mdi-account-circle"
            color="#FF5722"
          />
          <v-text-field
            class="mt-3"
            label="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-account-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            color="#FF5722"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn
          @click="loginUser"
          class="mx-auto mt-n5"
          fab
          dark
          color="#FF5722"
        >
          <v-icon large dark> mdi-arrow-right-thin </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showPassword: false,
      email: null,
      password: null,
    };
  },
  methods: {
    async loginUser() {
      let result = await axios.post(
        "https://auth.dev.api.unoapp.io/api/v1/auth/login/local/",
        { email: this.email, password: this.password },
        {
          headers: {
            "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
          },
        }
      );
      console.log(result);
      if (result.status == 200) {
        localStorage.setItem("user-info", JSON.stringify(result.data.payload));
        this.$router.push({ name: "business" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "business" });
    }
  },
};
</script>
