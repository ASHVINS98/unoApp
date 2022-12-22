<template>
  <v-app-bar app color="background" extension-height="48" flat tile value>
    <v-app-bar-nav-icon @click="updateDrawerState"></v-app-bar-nav-icon>
    <v-toolbar-title>Table</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title>welcome</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-menu top :close-on-content-click="closeOnContentClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">{{
          user.name
        }}</v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->

    <v-btn icon>
      <v-icon @click="updateRightDrawer">mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  // props: ["toggleDrawer"],
  data() {
    return {};
  },
  methods: {
    updateDrawerState() {
      console.log("emit complete event");
      this.$emit("complete-event");
    },
    updateRightDrawer() {
      this.$emit("right-drawer");
    },
  },
};
</script>
