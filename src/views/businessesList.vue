<template>
  <v-app>
    <v-container fluid>
      <v-card height="60" dense class="d-flex justify-space-between">
        <h1 class="orange--text font-weight-bold mx-6 my-auto">ACCOUNTS</h1>
        <v-btn @click="logout" class="mr-5" fab dark color="#FF5722"
          ><v-icon>mdi-logout</v-icon></v-btn
        >
      </v-card>
      <v-divider color="#FF5752"></v-divider>
      <v-card class="mx-auto" elevation="8" tile>
        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="#ff5572">
            <v-list-item v-for="item in lists" :key="item.id">
              <v-list-item-content>
                <v-btn
                  @click="selected"
                  class="font-weight-bold"
                  :disabled="item.name !== 'Relm Cannabis'"
                  dark
                  color="#FF5752"
                  to="/"
                  >{{ item.name }}</v-btn
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>

    <!-- <h1 :key="item.id" v-for="item in lists">{{ item.name }}</h1> -->
  </v-app>
</template>
<script>
//https://auth.dev.api.unoapp.io/api/v1/businesses/b641f415-9861-4f8d-a22e-f690bd7912c1?withBranding=true
import axios from "axios";
export default {
  data() {
    return {
      lists: [],
      selectedItem: "",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (!user) {
      this.$router.push({ name: "loginPage" });
    }

    console.log(user, "jj");
    const getBusinessList = async () => {
      let result = await axios.get(
        "https://auth.dev.api.unoapp.io/api/v1/users/businesses",
        {
          headers: {
            "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
            "auth-token": user["auth-token"],
          },
        }
      );
      this.lists = result.data.payload;
      //console.log(result.data.payload);
    };
    getBusinessList();
  },
  methods: {
    logout() {
      console.log("logout");
      let user = localStorage.removeItem("user-info");
      if (!user) {
        this.$router.push({ name: "loginPage" });
      }
    },
    selected() {},
  },
};
</script>
