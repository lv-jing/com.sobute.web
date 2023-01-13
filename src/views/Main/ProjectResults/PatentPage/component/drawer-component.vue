<template>
  <div>
    <form-create v-model="drawerFormModel" :rule="drawerFormRule" :option="drawerFormOption"></form-create>
  </div>
</template>

<script>
/* eslint-disable */
import {
  decomposeStringToJson,
  getStatus,
  deepCloneClear
} from "@/utils/tools";

import {
  PledgeFormRule,
  TransFormRule,
  PermitFormRule,
  ChangeFormRule,
  ExpenseFormRule,
  AllotteFormRule
} from "./rules";

let obj = {
  Pledge: PledgeFormRule,
  Trans: TransFormRule,
  Permit: PermitFormRule,
  Change: ChangeFormRule,
  Expense: ExpenseFormRule,
  Allotte: AllotteFormRule
};
export default {
  props: {
    ruleType: {
      type: String,
      default: () => ""
    },
    isType: {
      type: String,
      default: () => ""
    },
    editData: {
      type: Object,
      default: () => {}
    },
    allPatentTableList: {
      type: Array,
      default: () => []
    }
  },
  // 质押
  data() {
    return {
      drawerFormModel: {},
      drawerFormRule: [],
      drawerFormOption: {
        form: {
          labelPosition: "top"
        },
        row: {
          gutter: 15
        },
        //表单提交事件
        onSubmit: formData => {
          //按钮进入提交状态
          let status = {},
            entity = {},
            currentItem = {},
            handler = {},stage={},
            allPatentTableList = JSON.parse(
              JSON.stringify(this.allPatentTableList)
            );
          status = decomposeStringToJson(formData.status, [
            "status",
            "statusCode"
          ]);

          entity = decomposeStringToJson(formData.entity, [
            "entity",
            "entityCode"
          ]);

          handler = decomposeStringToJson(formData.handler, [
            "handler",
            "handlerNumber"
          ]);
          stage= decomposeStringToJson(formData.stage, [
            "stage",
            "stageCode"
          ]);

          if (this.isType == "add") {
            currentItem = { ...formData, ...status, ...entity, ...handler,...stage };
            allPatentTableList.push(currentItem);
            this.drawerFormModel.resetFields();
          } else {
            currentItem = {
              ...this.editData,
              ...formData,
              ...status,
              ...entity,
              ...handler,
              ...stage
            };

            let index = allPatentTableList.findIndex(
              item => item.id === currentItem.id
            );
            this.$set(allPatentTableList, index, currentItem);
          }
          this.$emit("drawer-data", {
            type: `patent${this.ruleType}List`,
            list: allPatentTableList
          });
        },
        submitBtn: {
          icon: "",
          col: {
            span: 8,
            offset: 4
          }
        },
        resetBtn: {
          icon: "",
          show: true,
          col: {
            span: 8,
            offset: 4
          }
        }
      }
    };
  },
  watch: {
    deep: true,
    ruleType(val) {
      this.$nextTick(() => {
        this.drawerFormModel.reload(obj[val]);
      });
    },
    editData(val) {
      this.$nextTick(() => {
        const formData = this.drawerFormModel.formData();
        let clearFormData = deepCloneClear(formData);
        let arr = Object.keys(val);
        if (arr.length === 0) {
          this.drawerFormModel.setValue(clearFormData);
        } else {
          this.drawerFormModel.setValue(val);
        }
      });
    }
  },
  created() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
</style>