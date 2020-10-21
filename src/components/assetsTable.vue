<template>
  <div>
    <v-row> <v-card-title class="text-h4">Assets</v-card-title> </v-row
    ><v-row>
      <v-col cols="11"
        ><v-expansion-panels v-model="selected"
          ><v-expansion-panel>
            <v-expansion-panel-header>
              <span class=".text-heading-5 mt-1 grey--text"
                >Filters</span
              > </v-expansion-panel-header
            ><v-expansion-panel-content>
              <v-row align="center">
                <v-col cols="auto"> <span>Asset Id</span> </v-col
                ><v-col cols="1">
                  <v-text-field
                    v-model="filterByAssetId"
                    type="number"
                    label="Id"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="auto"> <span>Asset Name</span> </v-col
                ><v-col cols="1">
                  <v-text-field
                    v-model="filterByName"
                    type="string"
                    label="Name"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="auto"> <span>Asset Price</span> </v-col
                ><v-col cols="1">
                  <v-text-field
                    v-model="filterByPrice"
                    type="number"
                    label="Less Than"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="auto"> <span>Last Update</span> </v-col
                ><v-col cols="2">
                  <v-text-field
                    v-model="filterByLastUpdate"
                    type="date"
                    label="Less Than"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="auto"> <span>Asset Type</span> </v-col
                ><v-col cols="1">
                  <v-text-field
                    v-model="filterByType"
                    type="string"
                    label="Type"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="1"
                  ><v-btn
                    outlined
                    class="mt-12"
                    color="indigo"
                    @click="clearFilters"
                    >Clear Filters</v-btn
                  >
                </v-col>
              </v-row></v-expansion-panel-content
            >
          </v-expansion-panel>
        </v-expansion-panels></v-col
      ></v-row
    >
    <v-row
      ><v-col cols="11"
        ><v-data-table
          :headers="headers"
          :items="sortedAssetlist"
          :items-per-page="15"
          class="elevation-6"
        >
          <template v-slot:item.lastUpdate="{ item }">
            <span>{{ new Date(item.lastUpdate).toLocaleString() }}</span>
          </template>
          <template v-slot:item.price="{ item }">
            <span>${{ item.price }}</span>
          </template>
          <template v-slot:item.isFavorite="{ item }">
            <v-btn icon @click="toggleIsFavorite(item.assetId)"
              ><v-icon v-if="item.isFavorite" color="yellow darken-3">
                mdi-star</v-icon
              >

              <v-icon v-else color="grey lighten-1">
                mdi-star-outline
              </v-icon>
            </v-btn>
          </template>
        </v-data-table></v-col
      ></v-row
    >
  </div>
</template>
<script lang="ts">
import { mapGetters } from "vuex";
import Vue from "vue";

import Vuex from "vuex";
export default Vue.extend({
  computed: {
    ...mapGetters(["assetList"]),
    sortedAssetlist() {
      if (Array.isArray(this.assetList)) {
        return this.assetList.sort((x, y) => y.isFavorite - x.isFavorite);
      }
      return [];
    },
  },
  data() {
    return {
      selected: [],
      filterByAssetId: "",
      filterByName: "",
      filterByPrice: "",
      filterByLastUpdate: "",
      filterByType: "",
      headers: [
        {
          text: "ID",
          align: "start",
          value: "assetId",
          filter: (value) => {
            if (!this.filterByAssetId) return true;
            return value == parseInt(this.filterByAssetId);
          },
        },
        {
          text: "Name",
          value: "assetName",
          filter: (value) => {
            return (value + "")
              .toLowerCase()
              .includes(this.filterByName.toLowerCase());
          },
        },
        {
          text: "Price",
          value: "price",
          filter: (value) => {
            if (!this.filterByPrice) return true;
            return value < parseInt(this.filterByPrice);
          },
        },
        {
          text: "Last Update",
          value: "lastUpdate",
          filter: (value) => {
            if (!this.filterByLastUpdate) return true;
            return value == parseInt(this.filterByLastUpdate);
          },
        },
        {
          text: "Type",
          value: "assetType",
          filter: (value) => {
            return (value + "")
              .toLowerCase()
              .includes(this.filterByType.toLowerCase());
          },
        },
        {
          text: "Favorite",
          value: "isFavorite",
        },
      ],
    };
  },

  methods: {
    toggleIsFavorite: function(id) {
      var value = this.$store.state.assetObject[id].isFavorite;
      this.$store.commit("setIsFavorite", { assetId: id, value: !value });
    },
    clearFilters: function() {
      this.filterByAssetId = "";
      this.filterByName = "";
      this.filterByPrice = "";
      this.filterByLastUpdate = "";
      this.filterByType = "";
    },
  },
});
</script>
