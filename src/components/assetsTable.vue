<template>
  <div>
    <v-row
      ><v-col cols="3"> <v-card-title>Assets</v-card-title> </v-col> </v-row
    ><v-row
      ><v-col cols="10"
        ><v-data-table
          :headers="headers"
          :items="assets"
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
            <v-checkbox
              @input="setIsFavorite(item.assetId, Event)"
            ></v-checkbox>
          </template>

          <template v-slot:body.prepend>
            <tr>
              <td>
                <v-text-field
                  v-model="assetId"
                  type="number"
                  label="Id"
                  dense
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="name"
                  type="string"
                  label="Name"
                  dense
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="price"
                  type="number"
                  label="Less than"
                  dense
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="lastUpdate"
                  type="number"
                  label="Less Than"
                  dense
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="type"
                  type="string"
                  label="Type"
                  dense
                ></v-text-field>
              </td>
            </tr> </template></v-data-table></v-col
      ><v-col cols="1"
        ><v-btn outlined class="mt-12" color="indigo" @click="clearFilters"
          >Clear Filters</v-btn
        >
      </v-col></v-row
    >
  </div>
</template>
<script lang="ts">
import { mapGetters, mapState } from "vuex";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      search: "",
      assetId: "",
      name: "",
      price: "",
      lastUpdate: "",
      type: "",
      headers: [
        {
          text: "ID",
          align: "start",
          value: "assetId",
          filter: (value) => {
            if (!this.assetId) return true;
            return value == parseInt(this.assetId);
          },
        },
        {
          text: "Name",
          value: "assetName",
          filter: (value) => {
            return (value + "").toLowerCase().includes(this.name.toLowerCase());
          },
        },
        {
          text: "Price",
          value: "price",
          filter: (value) => {
            if (!this.price) return true;
            return value < parseInt(this.price);
          },
        },
        {
          text: "Last Update",
          value: "lastUpdate",
          filter: (value) => {
            if (!this.lastUpdate) return true;
            return value == parseInt(this.lastUpdate);
          },
        },
        {
          text: "Type",
          value: "assetType",
          filter: (value) => {
            return (value + "").toLowerCase().includes(this.type.toLowerCase());
          },
        },
        {
          text: "Favorite",
          value: "isFavorite",
        },
      ],
    };
  },
  computed: {
    ...mapState(["stockList"]),
    ...mapGetters(["assets"]),
    assetList: function() {
      return Object.values(this.stockList);
    },
  },
  methods: {
    clearFilters: function() {
      this.assetId = "";
      this.name = "";
      this.price = "";
      this.lastUpdate = "";
      this.type = "";
    },
    setIsFavorite: function(id,value) {
      this.$store.commit("setIsFavorite", { assetId: id, value: value });
    },
  },
});
</script>
