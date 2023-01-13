<template>
  <div class="block mt20 flex flex-center-end">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="list.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="list.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.total"
    ></el-pagination>
  </div>
</template>

<script>
    /* eslint-disable */
export default {
  name: "commonPagination",
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    handleSizeChange(val) {
        this.$emit("handler-currentPage", {
        pageSize: val,
        pageNum: 1
      });
    },
    handleCurrentChange(val) {
      this.$emit("handler-currentPage", {
        pageSize:this.list.pageSize,
        pageNum: val
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>