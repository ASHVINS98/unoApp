<template>
  <div>
    <v-navigation-drawer
      :value="SideDrawer"
      app
      color="white"
      fixed
      height="100vh"
      mini-variant
      mini-variant-width="410"
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
              <v-list-item v-for="item in locationsList" :key="item.id">
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
      selectedItem: "",
      locationsList: [],
      locationID: "",
    };
  },

  methods: {
    selectedLocation(id) {
      this.locationID = id;
      console.log(this.locationID, "location id");
      //localStorage.setItem("selected-Location", id);

      // this.$router.push({ name: "table" });
      const getLocationsID = async () => {
        const user = JSON.parse(localStorage.getItem("user-info"));

        //const selectedLocationId = localStorage.getItem("selected-Location", id);
        await axios
          .patch(
            `https://auth.dev.api.unoapp.io/api/v1/users/locations/${id}`,
            {},
            {
              headers: {
                "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
                "auth-token": user["auth-token"],
              },
            }
          )
          .then(() => {
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            if (
              error.name !== "NavigationDuplicated" &&
              !error.message.includes(
                "Avoided redundant navigation to current location"
              )
            ) {
              console.log(error);
            }
          });
      };
      getLocationsID();
    },
  },

  created() {
    const user = JSON.parse(localStorage.getItem("user-info"));
    //const user = JSON.parse(localStorage.getItem("user-info"));
    axios
      .get(
        "https://auth.dev.api.unoapp.io/api/v1/locations/users/me?active_only=true",
        {
          headers: {
            "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
            "auth-token": user["auth-token"],
            Accept: "application/json, text/plain, */*",
          },
        }
      )
      .then((res) => {
        this.locationsList = res.data.payload;
        console.log(this.locationsList, "LOCATION list");
        this.$router.push({ name: "home" });
        // console.log(this.welcome, "welcomeName");
      })
      .catch((err) => {
        console.error(err);
      });
    // console.log(result.data.payload);
  },
};
</script>
