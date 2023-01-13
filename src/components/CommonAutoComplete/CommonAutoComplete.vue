<template>
  <el-select
    v-model="optionVal"
    :multiple="multiple"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :multiple-limit="multipleLimit"
    :remote="remote"
    :disabled="isDisabled"
    :placeholder="placeholder"
    :remote-method="getHrList"
    @change="onChange"
    :clearable="clearable"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
/*eslint-disable*/
import { getHrList } from "@/service/approval";
import { transformValueAndLabel,selectNotDataOption } from "@/utils/tools";

export default {
  name: "common-auto",
  data() {
    return {
      options: [],
      optionVal: this.value,
      isDisabled: this.disabled
    };
  },
  props: {
    placeholder: { type: String, default: () => "请选择" },
    multiple: { type: Boolean, default: () => false },
    collapseTags: { type: Boolean, default: () => false },
    disabled: { type: Boolean, default: () => false },
    value: { type: [Array, String], default: () => [] || "" }, // 不多选的时候type为String
    field: String,
    multipleLimit: { type: Number, default: () => 0 },
    type: { type: Number, default: () => null }, // 内部外部
    filterable: { type: Boolean, default: () => false },
    remote: { type: Boolean, default: () => false },
    clearable: { type: Boolean, default: () => false },
    transform: {
      type: Array,
      default: () => ["empolyeeName", "empolyeeNumber"]
    }
  },
  watch: {
    value(n) {
      this.optionVal = n;
    },
    disabled(n) {
      this.isDisabled = n;
    }
  },
  created() {
    this.getHrList();
    this.isDisabled = this.disabled;
  },
  methods: {
    onChange(e) {
      this.$emit("input", e);
    },
    /**
     * 获取责任人列表
     */
    async getHrList(name = "") {
      const { code, data } = await getHrList({
        pageSize: -1,
        name,
        type:this.type
      });
      if (code === 1) {
        const options = await transformValueAndLabel(data, this.transform);
         const _temp =
          (this.optionVal && selectNotDataOption(options, this.optionVal)) ||
          options;
        this.options = _temp;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>