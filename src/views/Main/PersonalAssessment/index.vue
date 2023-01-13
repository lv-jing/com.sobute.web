<template>
  <div class="bg-white">
    <component :is="choose" ref="declaration"></component>
  </div>
</template>

<script>
/* eslint-disable */
import declarationList from "./list";
import declarationAddAndEdit from "./addAndEdit";
export default {
  data() {
    return {
      choose: declarationList
    };
  },
  watch: {
    $route(to, from) {
      const { type } = to.query;
      this.changeComponent(type);
    }
  },
  created() {
    const { type } = this.$route.query;
    this.changeComponent(type);
  },
  methods: {
    changeComponent(type) {
      switch (type) {
        case "add":
        case "edit":
        case "view":
          this.choose = declarationAddAndEdit;
          break;
        default:
          this.choose = declarationList;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>