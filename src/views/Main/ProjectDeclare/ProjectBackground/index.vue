<!-- 项目背景 -->
<template>
  <form-create v-model="searchFormModel" :rule="searchFormRule" :option="searchOption"></form-create>
</template>

<script>
  /* eslint-disable */
  import {searchFormRule} from "./rules";

  export default {
    name: "index",
    props: {
      baseObj: {
        type: Object,
        default: () => {
        }
      }
    },
    watch: {
      baseObj(obj) {
        this.searchFormModel.setValue(obj)
      }
    },
    data() {
      return {
        searchFormModel: {},
        searchFormRule: searchFormRule,
        base:{},
        // 隐藏按钮form提交按钮
        searchOption: {
          resetBtn: false,
          submitBtn: false,
          form: {
            size: "small"
          }
        }
      }
    },
    mounted() {

      let type = this.$route.query.type;
      if (type === 'view' || type === 'auditing') {
        this.searchFormModel.disabled(true);
      } else {
        this.searchFormModel.disabled(false);
        if (type === 'add') {
          this.searchFormModel.setValue({
            necNote: "",
            intNote: ""
          })
        }
      }
    },
    methods: {
      /**
       * 初始化表单数据
       */
      initData(type) {
        const formData = this.searchFormModel.formData();
        for (let item in formData) {
          if (Array.isArray(formData[item])) {
            formData[item] = [];
          } else {
            formData[item] = "";
          }
        }
        this.$nextTick(() => {
          this.searchFormModel.setValue(formData);
        })
      },
    }
  }
</script>

<style scoped>

</style>