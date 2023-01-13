<template>
  <el-submenu v-if="item.children && item.children.length>0" :key="item.guid" :index="item.link">
    <template slot="title">
      <i :class="[item.icon]"></i>
      <span slot="title">{{item.name}}</span>
    </template>
    <template v-for="subItem of item.children">
      <nav-components :key="subItem.guid" :item="subItem"></nav-components>
    </template>
  </el-submenu>
  <el-menu-item
    v-else
    :key="item.guid"
    :index="item.nameEn"
    :route="item|filterUrl"
    @click="clickMenuItem(item)"
  >
    <!-- <el-menu-item v-else :key="item.guid" :index="item.link" :route="{name:item.link}"> -->
    <span>{{item.name}}</span>
  </el-menu-item>
</template>

<style lang="scss" scoped>
.el-menu-item.is-active {
  background: $color-blue !important;
  color: #fff;
}

.el-submenu .el-menu-item {
  min-width: 80px !important;
}
</style>

<script>
/* eslint-disable */
import Cookies from "js-cookie";

export default {
  name: "navComponents",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    filterUrl(item) {
      const isHttp = /http/gi.test(item.link);
      return {
        name: item.nameEn,
        params: isHttp ? { guid: item.guid } : {}
      };
    }
  },
  methods: {
    clickMenuItem(item) {
      Cookies.set("currentGuid", item.guid);
      this.$store.dispatch("setSearchParams", {});
      this.$store.dispatch("setFunJurisdiction", item.guid);
    }
  }
};
</script>