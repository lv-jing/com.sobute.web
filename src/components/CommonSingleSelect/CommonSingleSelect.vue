<template>
  <el-select
    v-model="optionVal"
    @change="onChange"
    @clear="onClear"
    @visible-change="visibleChange"
    :disabled="isDisabled"
    :placeholder="placeholder"
    :filterable="filterable||multiple"
    :filter-method="filterMethod"
    :collapse-tags="false"
    :multiple="multiple"
    clearable
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
/*eslint-disable*/
import { allNarmalInterface } from "@/service/common";

import { transformValueAndLabel, selectNotDataOption } from "@/utils/tools";

export default {
  name: "common-single-select",
  data() {
    return {
      options: [],
      optionVal: this.value,
      isDisabled: this.disabled,
      templateOpt: [],
      oldSoucre:[]
    };
  },
  props: {
    placeholder: { type: String, default: () => "请选择" },
    transform: { type: Array, default: () => ["name", "code"] },
    isSplicing: { type: Boolean, default: () => true },
    request: { type: Object, default: () => {} },
    disabled: { type: Boolean, default: () => false },
    value: { type: [Array, String], default: () => [] || "" },
    filterable: { type: Boolean, default: () => false },
    multiple: { type: Boolean, default: () => false },
    returnObj:{ type: String, default: () => "_" },
    onChanges: {
      type: Function,
      default: function(val) {
        return val;
      }
    },
    onClears:Function,
  },
  watch: {
    deep: true,
    request(val) {
      this.allNarmalInterface(val);
    },
    value(n) {
      this.optionVal = n;
    },
    disabled(n) {
      this.isDisabled = n;
    }
  },
  created() {
    //
    this.isDisabled = this.disabled;
  },
  mounted() {
    setTimeout(() => {
      this.allNarmalInterface(this.request);
    }, 500);
  },
  methods: {
    filterMethod(val) {
      //判断是否为空
      if (val) {
        //同时筛选Lable与value的值
        this.options = this.templateOpt.filter(item => {
          if (
            !!~item.label.indexOf(val) ||
            !!~item.label.toUpperCase().indexOf(val.toUpperCase()) ||
            !!~item.value.indexOf(val) ||
            !!~item.value.toUpperCase().indexOf(val.toUpperCase())
          ) {
            return true;
          }
        });
      } else {
        //赋值还原
        this.options = this.templateOpt;
      }
    },
    onClear() {
      this.options = this.templateOpt;
      this.onClears()
      this.$store.dispatch("setselectValue", "");
    },
    visibleChange() {
      this.options = this.templateOpt;
    },
    onChange(e) {
      this.$emit("input", e);
      this.$store.dispatch("setselectValue", e);
      this.onChanges(e,{[this.returnObj]:this.oldSoucre});
    },

    /**
     * 获取下拉框不同类型
     * @param {*} method  接口名称
     *
     */
    async allNarmalInterface(request) {
      if (!("interfaceName" in request)) return;
      const { code, data } = await allNarmalInterface(
        request.params,
        request.interfaceName,
        request.method
      ); 
      if (code === 1) {
        for (let i = 1; i < data.length; i++) {
          if (data[i][this.transform[0]] === data[i - 1][this.transform[0]]) {
            data[i][this.transform[0]] =
              data[i][this.transform[0]] +
              `(${data[i][this.transform[1]]})`;
          }
        }
        this.oldSoucre=data;
        
        const options = await transformValueAndLabel(
          data,
          this.transform,
          this.isSplicing
        );
        const _temp =
          ((this.optionVal&&this.optionVal.indexOf('⭐')>-1)&& selectNotDataOption(options, this.optionVal)) ||
          options;
        this.options = _temp;
        this.templateOpt = _temp;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>