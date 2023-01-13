<template>
  <div class="bg-white">
    <component :is="choose" ref="changes"></component>
  </div>
</template>

<script>
/* eslint-disable */
import changesList from "./list";
import changesAddAndEdit from "./addAndEdit";
export default {
  name: "changes",
  data() {
    return {
      choose: changesList
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
        case "auditing":
          this.choose = changesAddAndEdit;
          break;

        default:
          this.choose = changesList;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>