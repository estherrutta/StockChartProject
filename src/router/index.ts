import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import assetsTable from "../components/assetsTable.vue";
import Asset from "@/objects/asset";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  
  {
    name: "AssetTable",
    path: "/assetsView",
    component: assetsTable,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
