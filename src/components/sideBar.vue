<template>
  <div>
    <v-navigation-drawer
      :value="SideDrawer"
      app
      color="white"
      fixed
      height="100vh"
      mini-variant
      mini-variant-width="210"
      mobileBreakPoint="1264"
      disable-resize-watcher
      tag="nav"
      right
      width="260"
    >
      <v-container>
        <v-card flat color="red">SELECT LOCATIONS</v-card>
        <v-layout>
          <v-list dense>
            <v-list-item-group v-model="selectedItem">
              <v-list-item v-for="item in lists" :key="item.id">
                <v-list-item-content>
                  <v-btn text @click="selectedLocation(item.id)">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["SideDrawer"],
  data() {
    return {
      lists: [],
      selectedItem: "",
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user-info"));
    console.log(user, "user logged");
    if (!user) {
      this.$router.push({
        name: "loginPage",
      });
    } else {
      const getLocations = async () => {
        const user = JSON.parse(localStorage.getItem("user-info"));
        let result = await axios.get(
          "https://auth.dev.api.unoapp.io/api/v1/locations/users/me?active_only=true",
          {
            headers: {
              "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
              "auth-token": user["auth-token"],
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        this.lists = result.data.payload;
        console.log(result.data.payload);
      };
      // const getLocationsID = async () => {
      //   const selectedLocationId = localStorage.getItem("selected-Location");
      //   await axios.patch(
      //     `https://auth.dev.api.unoapp.io/api/v1/users/locations/${selectedLocationId}`,
      //     {},
      //     {
      //       headers: {
      //         "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
      //         "auth-token": user["auth-token"],
      //       },
      //     }
      //   );
      // };
      //getLocationsID();
      getLocations();
    }
  },
  methods: {
    selectedLocation(id) {
      //localStorage.setItem("selected-Location", id);

      // this.$router.push({ name: "table" });
      const getLocationsID = async () => {
        const user = JSON.parse(localStorage.getItem("user-info"));

        //const selectedLocationId = localStorage.getItem("selected-Location", id);
        await axios.patch(
          `https://auth.dev.api.unoapp.io/api/v1/users/locations/${id}`,
          {},
          {
            headers: {
              "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
              "auth-token": user["auth-token"],
            },
          }
        );
      };
      getLocationsID();
    },
  },
};
</script>
