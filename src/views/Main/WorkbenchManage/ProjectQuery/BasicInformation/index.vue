<!-- 基本信息 -->
<template>
  <div class="basic-page">
    <form-create v-model="searchFormModel"
                 :rule="searchFormRule"
                 :option="searchOption"
                 @apply-change="applyChange"
                 ref="information"></form-create>
  </div>
</template>

<script>
  /* eslint-disable */
  import {searchFormRule} from "./rules";
  import {mapState} from "vuex";
  import {getDictList} from "@/service/pilot";
  import {getMainPersonInfo} from "@/service/projectQuery";
  export default {
    name: "index",
    props:{
      baseObj:{
        type:Object,
        default:()=>{}
      }
    },
    watch:{
      baseObj(val){
          this.getProDetail(val)
          this.getMainPerson(val.id);
      }
    },
    data() {
      return {
        base:{},
        searchFormModel: {},
        searchFormRule: [],
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
    computed: {
      ...mapState({
        userInfo: state => state.common.userInfo
      })
    },
    mounted() {
        this.searchFormModel.disabled(false);
        this.searchFormModel.disabled(true, ['projectNumber', 'status', "documentNumber"]);

    },
    methods: {
      async getMainPerson(val){
        const { code, data } = await getMainPersonInfo({ id: val });
        this.searchFormModel.setValue("mainPerson", data);
      },
      /**
       *改变项目类型下拉框，展示界面
       */
      projectTypeChange(val){
        if(val){
          let typeCode = val.split('⭐')[1];
          this.$store.dispatch('setUploadTypeCode',typeCode)
        }
      },
      /**
       * 改变下拉框，展示界面
       */
      applyChange(val) {
        this.searchFormModel.reload(searchFormRule(this, val, this.userInfo.type));
      },
      /**
       * 初始化表单数据
       */
      initData() {
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
      /**
       *  获取详情数据
       * @returns {Promise<void>}
       */
      async getProDetail(val) {
        let {type} = this.$route.query;
        // console.log("获取详情")
        // console.log(val)
        if (val) {
          let base = val;
          this.searchFormModel.reload(
            searchFormRule(this, base.applyType, this.userInfo.type)
          );
          if (type === 'view' || type === 'auditing') {
            this.searchFormModel.disabled(true);
          }
          if (type === 'edit') {
            this.searchFormModel.disabled(true, ['applyType', 'projectType']);
          }
          // 管理员 可以编辑项目状态
          if (type === 'edit' && base.statusCode === '2005104' || base.statusCode === '2005106') {
            this.$nextTick(() => {
              this.searchFormModel.disabled(false, 'status');
              this.searchFormModel.updateRule("status", {
                  options: [
                    {value: "已审批", label: "已审批"},
                    {value: "关闭", label: "关闭"},
                  ]
                },
                true
              )
            })
          } else {
            this.searchFormModel.disabled(true, ['status']);
          }
          base.refProjectId = (base.refProjectId && base.refProjectId.toString()) || ''
          base.projectType = (base.projectType && base.projectType + '⭐' + base.projectTypeCode) || '';
          base.field = (base.field && base.field + '⭐' + base.fieldCode) || '';
          base.source = (base.source && base.source + '⭐' + base.sourceCode) || '';
          base.department = (base.department && base.department + '⭐' + base.departmentCode) || '';
          this.searchFormModel.setValue(base)
        }
      }
    }
  }
</script>

<style scoped>

</style>