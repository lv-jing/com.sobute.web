<template>
  <el-cascader
    :options="options"
    @change="onChange"
    :disabled="disabled"
    v-model="optionVal"
    :clearable="clearable"
    :props="{
      multiple:multiple,
      checkStrictly:checkStrictly
      }"
  >
    <!-- <template slot-scope="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
    </template>-->
  </el-cascader>
</template>

<script>
/*eslint-disable*/
import { getDictionaryTree } from "@/service/common";
import { transformValueAndLabel } from "@/utils/tools";

export default {
  name: "common-cascader",
  data() {
    return {
      options: [],
      optionVal: this.value
    };
  },
  props: {
    placeholder: { type: String, default: () => "请选择" },
    disabled: { type: Boolean, default: () => false },
    value: { type: Array, default: () => [] }, // 不多选的时候type为String
    field: String,
    typeName: String,
    multiple: { type: Boolean, default: () => false },
    clearable: { type: Boolean, default: () => true },
    checkStrictly: { type: Boolean, default: () => false },
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
    this.getDictionaryTree();
  },
  methods: {
    onChange(e) {
      this.$emit("input", e);
    },
    /**
     * 获取数据字典树
     */
    async getDictionaryTree(name = "") {
      let { code, data } = await getDictionaryTree({
        type: this.typeName
      });
      if (code === 1) {
        const treeData = arr => {
          let params = [];
          return arr.map(item => {
            let obj = {};
            obj["label"] = item.name;
            obj["value"] = `${item.name}⭐${item.code}`;

            if (Array.isArray(item.children)) {
              obj["children"] = [];
              obj.children = treeData(item.children) || null;
            }
            return obj;
          });
        };
        const options = treeData(data);
        this.options = options;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>