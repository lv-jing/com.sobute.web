<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :default-active="defaultKey"
    :router="true"
    :unique-opened="true"
    :background-color="styles.menuBackgroundColor"
    :text-color="styles.menuTextColor"
    :active-text-color="styles.menuActiveColor"
    :default-openeds="openeds"
  >
    <!--

  background-color="#1A2047"
    text-color="#ddd"
      active-text-color="#fff"

    -->
    <!-- <menu-items v-for="item of menuList" :item="item" :key="item.guid"></menu-items> -->

    <template v-for="item of menuList">
      <el-submenu
        v-if="item.children && item.children.length>0"
        :key="item.guid"
        :index="item.link"
      >
        <template slot="title">
          <i :class="[item.icon]" :style="{color:item.color}"></i>
          <span slot="title" class="title-size">{{item.name}}</span>
        </template>
        <template v-for="subItem of item.children">
          <menu-items :key="subItem.guid" :item="subItem"></menu-items>
        </template>
      </el-submenu>
      <el-menu-item
        v-else
        :key="item.guid"
        :index="item.nameEn"
         :route="item|filterUrl"
        @click="clickMenuItem(item)"
      >
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
</style>
<script>
/* eslint-disable */
import menuItems from "./NavComponent.vue";
import { mapState } from "vuex";
import Cookies from "js-cookie";

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menus.authoMenuList,
      styles:state => state.common.styleObj
    }),
    defaultKey() {
      return this.$route.name;
    },

  },
  filters:{
     filterUrl(item) {
        const isHttp =(/http/gi).test(item.link);
       return {
          name: item.nameEn,
          params: isHttp ? { guid: item.guid } : {}
        };

    }
  },
  data() {
    return {
      quickMenu: [],
      openeds: []
    };
  },
  created() {
    if (this.menuList.length === 0) {
      const usrInfo = Cookies.getJSON("userInfo");
      this.$store.dispatch("setAuthoMenuList", { guid: usrInfo.guid });
    }
  },
  methods: {
    clickMenuItem(item) {
      Cookies.set("currentGuid", item.guid);
      this.$store.dispatch("setFunJurisdiction", item.guid);
    },

  },
  components: {
    menuItems
  }
};
</script>

<style lang="scss">
  .title-size{
    font-weight: 600;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 173px;
  min-height: 400px;
}
.horizontal-collapse-transition {
  transition: width 0.3s;
}
</style>
