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
                  @click="selected(item.id, item.name)"
                  class="font-weight-bold"
                  dark
                  color="#FF5752"
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
//https://auth.dev.api.unoapp.io/api/v1/businesses/b641f415-9861-4f8d-a22e-f690bd7912c1
import axios from "axios";
export default {
  data() {
    return {
      lists: [],
      selectedItem: "",
      id: "",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (!user) {
      this.$router.push({ name: "loginPage" });
    }

    console.log(user, "user"); // post -- url, body, config , patch, put
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
      console.log(this.lists, "lists of businesss");
    };

    getBusinessList();
  },
  methods: {
    logout() {
      console.log("logout");
      // let user = localStorage.removeItem("user-info");
      localStorage.removeItem("user-info");
      localStorage.removeItem("selected-location");

      // JSON.parse(localStorage.removeItem("selected-location");
      //if (!user) {
      this.$router.push({ name: "loginPage" });
      // }
    },
    selected(id, name) {
      this.id = id;
      console.log(name, "businessName");

      if (JSON.parse(localStorage.getItem("user-info"))) {
        localStorage.setItem("selected-location", id);
      }
      const user = JSON.parse(localStorage.getItem("user-info"));
      const getBusinessList = async () => {
        const selectedAppId = localStorage.getItem("selected-location");
        if (selectedAppId) {
          await axios.patch(
            `https://auth.dev.api.unoapp.io/api/v1/users/businesses/${selectedAppId}`,
            {},
            {
              headers: {
                "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
                "auth-token": user["auth-token"],
              },
            }
          );
          await axios
            .get(
              `https://auth.dev.api.unoapp.io/api/v1/businesses/${selectedAppId}?withBranding=true`,
              {
                headers: {
                  "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
                  "auth-token": user["auth-token"],
                },
              }
            )
            .then(() => {
              this.$router.push({ name: "home" });
            });
        }
      };
      getBusinessList();
      console.log("idofbusiness", this.id);
    },
  },
};
</script>
