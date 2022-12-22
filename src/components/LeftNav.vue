<template>
  <div>
    <v-navigation-drawer
      :value="openDrawer"
      app
      color="green"
      fixed
      height="100vh"
      mini-variant
      mini-variant-width="90"
      mobileBreakPoint="991"
      tag="nav"
      width="290"
    >
      <v-list tile>
        <v-list-item router to="/" fixed open-on-hover link>
          <v-list-item-action>
            <v-tooltip right nudge-right="20">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="white" fixed small dark v-bind="attrs" v-on="on">
                  mdi-home
                </v-icon>
              </template>
              <span>Home</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
        <v-list-item router to="/table" fixed open-on-hover link>
          <v-list-item-action>
            <v-tooltip right nudge-right="20">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="white" fixed small dark v-bind="attrs" v-on="on">
                  mdi-table
                </v-icon>
              </template>
              <span>table</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  props: ["openDrawer"],
  data() {
    return {};
  },
  methods: {},
};
</script>
