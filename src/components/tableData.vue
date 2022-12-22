<template>
  <div>
    <top-nav
      @complete-event="toggleDrawer"
      @right-drawer="toggleRight"
    ></top-nav>
    <left-nav :openDrawer="openDrawer"></left-nav>
    <side-bar :SideDrawer="SideDrawer"></side-bar>
    <div>
      <h1>Dashboard</h1>
      <v-data-table
        :headers="headers"
        :items="dataTable"
        :items-per-page="5"
        class="elevation-1"
        @click:row="selectRow"
        :multi-sort="true"
        ><template v-slot:[`item.is_vacant`]="{ item }">
          <v-simple-checkbox
            v-model="item.is_vacant"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
      <!-- <v-snackbar v-model="snackbar">
        You have selected {{ dataTable.Name }}
        <v-btn color="pink" text @click="snackbar = false"> Close </v-btn>
      </v-snackbar> -->
    </div>
  </div>
</template>

<script>
//https://tables.dev.api.unoapp.io/api/v1/tables?page=2&limit=1
//ttps://auth.dev.api.unoapp.io/api/v1/businesses/b641f415-9861-4f8d-a22e-f690bd7912c1?withBranding=true
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      snackbar: false,
      // selectedEmployee: "",
      openDrawer: true,
      SideDrawer: true,
      headers: [
        {
          text: "Name",
          value: "label",
        },
        {
          text: "is Vacant",
          value: "is_vacant",
        },
        {
          text: "slug",
          value: "slug",
        },
        {
          text: "Number",
          value: "table_number",
        },
        {
          text: "Actions",
          value: "",
        },
      ],
      dataTable: [],
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
      const getTableList = async () => {
        let result = await axios.get(
          "https://tables.dev.api.unoapp.io/api/v1/tables?page=2&limit=1",
          {
            headers: {
              //"api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
              // "auth-token": "3c181235ecc70eb857b877469c512afb96eab1c3",
              "auth-token": user["auth-token"],
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        this.dataTable = result.data.results;
        console.log(result.data.results);
      };
      getTableList();
    }
  },
  methods: {
    toggleDrawer() {
      this.openDrawer = !this.openDrawer;
    },
    toggleRight() {
      this.SideDrawer = !this.SideDrawer;
    },
    selectRow() {
      this.snackbar = true;
      //   this.selectedEmployee = this.dataTable["label"];
      // console.log(this.selectedEmployee);
      //   this.selectedEmployee.title = event.title;
    },
  },
};
</script>
