<!--  操作组件 -->
<template>
  <div class="tc">

    <el-button type="text" size="mini" circle @click="handleDetails(row)">查看</el-button>

  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";

export default {
  name: "common-only-query",
  props: {
    // 表格数据
    row: {
      type: Object,
      default: () => {}
    },
    // 详情接口封装name
    urlName: {
      type: String,
      default: () => ""
    },
    // 页面跳转路由名称
    pageUrlName: {
      type: String,
      default: () => ""
    },
    // 列表请求数据接口方法
    getPageList: {
      type: Function,
      default: res => {
        return res;
      }
    },
  },
  data() {
    return {
      userProfile: {},
    };
  },
  // computed: {
  //   ...mapGetters(["getAuthObj","getUserInfo"])
  // },
  methods: {
    /**
     *  查看
     * @param row
     */
    handleDetails(row) {
      // console.log("查看");
      // console.log(row);
      if (this.typeCode) {
        this.$router.push({
          name: this.pageUrlName,
          query: { type: "view", id: row.id, typeCode: row.typeCode }
        });
      } else {
        this.$router.push({
          name: this.pageUrlName,
          query: { type: "view", id: row.id }
        });
      }
    }
  }
};
</script>

<style scoped>
</style>