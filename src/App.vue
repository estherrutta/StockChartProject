<template>
  <v-app id="app">
    <v-app-bar dark app color="#1c344b"> </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-left>
          <div class="container"><assets-table></assets-table></div>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import assetsTable from "./components/assetsTable.vue";
import { mapActions } from "vuex";
export default Vue.extend({
  name: "App",

  components: {
    "assets-table": assetsTable,
  },
  created: function() {
    this.startObservable();
  },

  methods: {
    ...mapActions(["startObservable", "stopObservable"]),
  },
  beforeDestroy: function() {
    this.stopObservable();
  },
});
</script>
