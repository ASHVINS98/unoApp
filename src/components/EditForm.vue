<template>
  <v-app>
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
        <v-btn @click="UpdateSubmit" class="mx-auto mt-n5" dark color="#FF5722">
          <v-icon large dark> mdi-pencil </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      label: "",
      slug: "",
      tableNumber: Number,
      isVacant: false,
    };
  },
  methods: {
    UpdateSubmit() {
      let user = JSON.parse(localStorage.getItem("user-info"));
      axios
        .patch(
          "https://tables.dev.api.unoapp.io/api/v1/tables/" + this.id,
          {
            label: this.label,
            slug: this.slug,
            is_vacant: this.isVacant,
            table_number: this.tableNumber,
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
          this.$router.push("/table");
        });
    },
  },
  async mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    let result = await axios.get(
      "https://tables.dev.api.unoapp.io/api/v1/tables/" + this.id,
      {
        headers: {
          "api-token": "6090a6ee31d7d70b13857118a7ead5d6a5d83a8a",
          // "auth-token": "3c181235ecc70eb857b877469c512afb96eab1c3",
          "auth-token": user["auth-token"],
          Accept: "application/json, text/plain, */*",
        },
      }
    );
    this.label = result.data.label;
    this.slug = result.data.slug;
    this.isVacant = result.data.is_vacant;
    this.tableNumber = result.data.table_number;
  },
};
</script>
