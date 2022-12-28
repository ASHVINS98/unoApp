<template>
  <div>
    <div>
      <h1>Dashboard</h1>
      <v-data-table
        :headers="headers"
        :items="tableData"
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
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            :to="{ name: 'EditForm', params: { id: item.id } }"
            fab
            small
            dark
            color="green"
            v-model="item.action"
            ><v-icon small dark> mdi-pencil-box </v-icon>
          </v-btn>
          <v-btn
            @click="deleteId(item.id)"
            class="ml-2"
            fab
            small
            dark
            color="green"
            v-model="item.action"
            ><v-icon small dark> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-card-text style="position: relative">
            <v-fab-transition>
              <v-btn
                color="green"
                dark
                fixed
                bottom
                tile
                right
                v-bind="attrs"
                v-on="on"
                fab
                ><v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>
        </template>
        <v-card width="700" elevation="8" class="mx-auto mt-n18">
          <v-card-text>
            <v-form @submit.prevent="UpdateSubmit">
              <v-text-field
                class="mt-8"
                label="Label"
                v-model="label"
                color="#FF5722"
              />
              <v-text-field
                class="mt-3"
                label="slug"
                v-model="slug"
                color="#FF5722"
              />
              <v-text-field
                class="mt-3"
                label="tableNumber"
                v-model="tableNumber"
                color="#FF5722"
              />
              <v-checkbox v-model="isVacant">
                <template v-slot:label>
                  <p class="font-weight-regular">is_vacant</p></template
                >
              </v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                addTable();
                closeDialog();
              "
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- <v-snackbar v-model="snackbar">
        You have selected {{ tableData.Name }}
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
      dialog: false,
      label: "",
      slug: "",
      tableNumber: "",
      isVacant: false,
      // snackbar: false,
      // selectedEmployee: "",
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
          value: "action",
        },
      ],
      // brandDetails: {},
      tableData: [],
    };
  },
  // mounted() {
  //   const user = JSON.parse(localStorage.getItem("user-info"));
  //   console.log(user, "user logged");
  //   if (!user) {
  //     this.$router.push({
  //       name: "loginPage",
  //     });
  //   }
  // },
  methods: {
    selectRow() {
      this.snackbar = true;
    },
    async addTable() {
      const user = JSON.parse(localStorage.getItem("user-info"));

      await axios
        .post(
          "https://tables.dev.api.unoapp.io/api/v1/tables",
          {
            label: this.label,
            slug: this.slug,
            is_vacant: this.isVacant,
            table_number: +this.tableNumber,
          },
          {
            headers: {
              "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
              // "auth-token": "3c181235ecc70eb857b877469c512afb96eab1c3",
              "auth-token": user["auth-token"],
              Accept: "application/json, text/plain, */*",
            },
          }
        )
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
    async deleteId(id) {
      this.deletedid = id;
      const user = JSON.parse(localStorage.getItem("user-info"));
      await axios
        .delete(
          "https://tables.dev.api.unoapp.io/api/v1/tables/" + this.deletedid,
          {
            headers: {
              "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
              // "auth-token": "3c181235ecc70eb857b877469c512afb96eab1c3",
              "auth-token": user["auth-token"],
              Accept: "application/json, text/plain, */*",
            },
          }
        )
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user-info"));
    axios
      .get(
        //`https://tables.dev.api.unoapp.io/api/v1/tables?page=2&limit=${selectedAppId}`,
        "https://tables.dev.api.unoapp.io/api/v1/tables??page=1&limit=10",
        {
          headers: {
            "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
            // "auth-token": "3c181235ecc70eb857b877469c512afb96eab1c3",
            "auth-token": user["auth-token"],
            Accept: "application/json, text/plain, */*",
          },
        }
      )
      .then((res) => {
        this.tableData = res.data.results;
        console.log(res.data, "table data");
      })
      .catch((err) => {
        this.tableData = [];
        console.error(err);
      });
  },
};
</script>
