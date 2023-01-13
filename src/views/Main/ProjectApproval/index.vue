<template>
  <div class="bg-white">
    <component :is="choose"></component>
  </div>
</template>

<script>
  /* eslint-disable */
  import approvalList from "./list";
  import approvalAdd from "./add";

  export default {
    name: "projectapproval",
    data() {
      return {
        choose: approvalList
      };
    },
    watch: {
      $route(to) {
        const {type} = to.query;
        this.changeComponent(type);
      }
    },
    created() {
      const {type} = this.$route.query;
      this.changeComponent(type);
    },
    methods: {
      /**
       *  根据不同类型 显示不同页面内容
       * @param type
       */
      changeComponent(type) {
        switch (type) {
          case "add":
          case "edit":
          case "view":
          case "auditing":
            this.choose = approvalAdd;
            break;
          default:
            this.choose = approvalList;
            break;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>