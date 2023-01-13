<template>
  <el-select
      v-model="optionVal"
      @change="onChange"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :collapse-tags="false"
      :multiple="multiple"
      :filterable="filterable||multiple"
      :filter-method="filterMethod"
      value-key="value"
      clearable
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
/*eslint-disable*/
import {getDictionaryTypeName} from "@/service/system";

import {transformValueAndLabel, selectNotDataOption} from "@/utils/tools";

export default {
  name: "common-select",
  data() {
    return {
      options: [],
      optionVal: this.value,
      isDisabled: this.disabled,
      templateOpt: []
    };
  },
  props: {
    sortIndex: {type: Number, default: () => -1},
    placeholder: {type: String, default: () => "请选择"},
    transform: {type: Array, default: () => ["name", "code"]},
    isSplicing: {type: Boolean, default: () => true},
    typeName: {type: String, default: () => ""},
    disabled: {type: Boolean, default: () => false},
    value: {type: [Array, String], default: () => [] || ""},
    field: {type: String, default: () => ""},
    multiple: {type: Boolean, default: () => false},
    filterable: {type: Boolean, default: () => false},
    clearable: {type: Boolean, default: () => false},
    onChanges: {
      type: Function,
      default: function (val) {
        return val
      }
    }
  },
  watch: {
    deep: true,
    typeName(val) {
      this.getDictionaryTypeName(val);
    },
    value(n) {
      this.optionVal = n;
    },
    disabled(n) {
      this.isDisabled = n;
    }
  },
  created() {

    this.isDisabled = this.disabled;
  },
  mounted() {
    setTimeout(() => {
      this.getDictionaryTypeName(this.typeName);
    }, 500);
  },
  methods: {
    filterMethod(query) {
      this.options = this.templateOpt.filter(item => {
        let queryName = item.value.toLowerCase() + item.label.toLowerCase();
        return queryName.indexOf(query.toLowerCase()) > -1;
      });
    },
    onChange(e) {
      this.$emit("input", e);

      let obj = this.options.find(item => item.value === e)

      this.$emit('obj-value', {...obj, index: this.sortIndex})
      this.onChanges(e)
    },
    /**
     * 获取字典库的类型数据
     * @param {*} typeName  数据字典库类型
     *
     */
    async getDictionaryTypeName(typeName) {
      if (!typeName) return;
      const {code, data} = await getDictionaryTypeName({typeName});
      if (code === 1) {
        const options = await transformValueAndLabel(
            data,
            this.transform,
            this.isSplicing
        );
        const _temp =
            ((this.optionVal && this.optionVal.indexOf('⭐') > -1) && selectNotDataOption(options, this.optionVal)) ||
            options;
        const {type} = this.$route.query;
        if (["detail", "view", "edit", "add"].includes(type)) {
          this.options = [..._temp];
        } else {
          const d = this.multiple ? [] : [{label: "请选择", value: ""}];

          this.options = [...d, ..._temp];
        }
        this.templateOpt = _temp;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
