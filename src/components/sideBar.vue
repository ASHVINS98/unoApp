<template>
  <div>
    <v-navigation-drawer
      :value="SideDrawer"
      app
      color="white"
      fixed
      height="100vh"
      mini-variant
      mini-variant-width="170"
      mobileBreakPoint="1264"
      disable-resize-watcher
      tag="nav"
      right
      width="260"
    >
      <v-card class="mx-auto" elevation="8" tile>
        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="#ff5572">
            <v-list-item v-for="item in lists" :key="item.id">
              <v-list-item-content>
                <v-btn
                  @click="selected"
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
    </v-navigation-drawer>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  props: ["SideDrawer"],
  data() {
    return {
      lists: [],
      selectedItem: "",
    };
  },
  // mounted() {
  //   const user = JSON.parse(localStorage.getItem("user-info"));
  //   console.log(user, "user logged");
  //   if (!user) {
  //     this.$router.push({
  //       name: "loginPage",
  //     });
  //   } else {
  //     const getTableList = async () => {
  //       let result = await axios.get(
  //         "https://auth.dev.api.unoapp.io/api/v1/locations/users/me?active_only=true",
  //         {
  //           headers: {
  //             "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
  //             "auth-token": "3c181235ecc70eb857b877469c512afb96eab1c3",
  //             Accept: "application/json, text/plain, */*",
  //           },
  //         }
  //       );
  //       this.lists = result.data.payload;
  //       console.log(result.data.payload);
  //     };
  //     getTableList();
  //   }
  // },
};
</script>
