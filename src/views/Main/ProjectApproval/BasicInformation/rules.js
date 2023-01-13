/**
 * 查询数据表单
 */

/* eslint-disable */
export function searchFormRule(_this, type, isType) {
  let op = [],
    arr = [{value: "0", label: "内部"}];
  if (isType == 0) {
    op = arr;
  } else {
    if (type == 1) {
      op = []
    }
  }
  _this.$store.dispatch('setUserTypeCode',type)
  return [
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '项目基本信息'
      },
    },
    {
      "type": "input", "field": "projectNumber", "title": "项目编号", "value": "",
      props: {
        placeholder: "请输入",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '110px'
      }
    },
    {
      "type": "input", "field": "documentNumber", "title": "申请编号", "value": "",
      props: {
        placeholder: "请输入",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '110px'
      }
    },
    {
      "type": "select", "field": "status", "title": "项目状态", "value": "",
      props: {
        placeholder: "请选择",
        disabled: true,
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      class: 'w-100',
      options: [],
    },
    {
      "type": "select", "field": "applyType", "title": "用户类型", "value": type == 1 ? "1" : "0",
      class: 'w-100',
      props: {
        placeholder: "请选择",
        disabled:true
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [
        ...op,
        {value: "1", label: '外部'}
      ],
      emit: ['change'],
      emitPrefix: 'apply',
      validate: [{required: true, message: '请选择用户类型', trigger: 'blur'},]
    },
    {
      "type": "input", "field": "projectName", "title": "项目名称", "value": "",
      props: {
        placeholder: "请输入",
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      validate: [{required: true, message: '请输入', trigger: 'blur'},]
    },
    {
      "type": "commonSelect", "field": "projectType", "title": "项目类型", "value": "",
      props: {
        placeholder: "请选择",
        typeName:type==0?"PROJECT_TYPE":'PROJECT_TYPE_OUT',
        // (isType==0&&type==0)?"PROJECT_TYPE":
        // (isType==0&&type==1)?'OUT_PROJECT_TYPE':'PROJECT_TYPE_OUT',
        field: "projectType",
        onChanges:(val)=>_this.projectTypeChange(val)
      },
      class: 'w-100',
      options: [],
      col: {
        span: 8,
        labelWidth: '110px'
      },
      validate: [{required: true, message: '请输入', trigger: 'blur'},]
    },
    {
      "type": "commonSelect",
      "field": type == 1 ? "field" : 'fieldList',
      "title": `${type == 1 ? '指南' : '研究'}方向`,
      "value": type == 1 ? '' : [],
      class: 'w-100',
      props: {
        placeholder: "请选择",
        field: type == 1 ? "field" : 'fieldList',
        typeName: type == 1 ? 'COMPASS_DIRECTION' : 'PROJECT_DIRECTION',
        multiple: type == 1 ? false : true,

      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{required: true, message: '请选择所属领域', trigger: 'blur'},]
    },
    {
      "type": "el-col",
      children: [
        {
          "type": "DatePicker",
          "field": "startDate",
          "title": "执行期限",
          "value": '',
          props: {
            placeholder: "开始时间",
            format: 'yyyy-MM-dd'
          },
          col: {
            span: 15,
            labelWidth: '110px'
          },
          class: 'w-97 md0',
          validate: [
            {required: true, message: '请选择执行期限', trigger: 'blur'},
            {
              trigger: 'blur',
              validator: (rule, value, callback)=>{
                let time1 = new Date(_this.searchFormModel.getValue('startDate')).getTime();
                let time2 = new Date(_this.searchFormModel.getValue('endDate')).getTime();
                if(time1-time2>0){
                  callback(new Error('开始日期不能大于结束日期'))
                } else {
                  callback()
                }
              }
            }
          ]
        },
        {
          "type": "DatePicker",
          "field": "endDate",
          "value": '',
          props: {
            placeholder: "结束时间",
            format: 'yyyy-MM-dd'
          },
          col: {
            span: 9,
          },
          class: 'w-100 md0',
          validate: [
            {required: true, message: '请选择执行期限', trigger: 'blur'},
            {
              trigger: 'blur',
              validator: (rule, value, callback)=>{
                let time1 = new Date(_this.searchFormModel.getValue('startDate')).getTime();
                let time2 = new Date(_this.searchFormModel.getValue('endDate')).getTime();
                if(time1-time2>0){
                  callback(new Error('结束日期不能小于开始日期'))
                } else {
                  callback()
                }
              }
            }
          ]
        },
      ],
      col: {
        span: 8,
        labelWidth: '0'
      },
      class: 'md0',
    },
    
    {
      "type": type == 0 ? "hidden":'input', "field": "outRefProjectName", "title": "上级项目/课题", "value": "",
      props: {
        placeholder: "请输入",
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
    },
    {
      "type": type == 1 ? "hidden":"commonSingleSelect", "field": "refProjectId", "title": "上级项目/课题", "value": "",
      props: {
        placeholder: "请选择",
        filterable: true,
        transform: ["projectName", "id"],
        isSplicing:false,
        request: {
          interfaceName: '/service/project/confirm/checkbox',
          method: 'get',
          params: {
            params: {
              projectNumberPrefix:'PM1,PM2',
              statusCode: 2005104,
              pageNum: 1,
              pageSize: -1
            }
          }
        }
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      class: 'w-100',
    },
    {
      "type": type == 1 ? "hidden" : "common-cascader", "field": "sourceList", "title": "项目来源", "value": [],
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "PROJECT_SOURCE",
        "field": "sourceList"
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]

    },
    {
      "type": type == 1 ? "hidden" : "input", "field": "customerName", "title": "来源单位", "value": "",
      props: {
        placeholder: "请输入",
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
    },
    {
      "type": type == 1 ? "hidden" : "input", "field": "extNumber", "title": "合同编号", "value": "",
      props: {
        placeholder: "请输入",
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
    },
    {
      "type": type == 1 ? "hidden" : "commonSelect", "field": "department", "title": "承担部门", "value": "",
      props: {
        placeholder: "请选择",
        typeName: "COMMITMENT_DEPARTMENT",
        field: "department"
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      class: 'w-100',
      options: [],
    },
    {
      "type": "common-cascader",
      "field": "keyWordsList",
      "title": "技术关键词",
      "value": [],
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "KEY_WORDS",
        "field": "keyWordsList",
        multiple: true,
        checkStrictly:true
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
    },
    {
      "type": type == 1 ? 'hidden' : "common-cascader",
      "field": "keyWordsProList",
      "title": "产品关键词",
      "value": [],
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "PRODUCT_CLASSIFICATION",
        "field": "keyWordsProList",
        multiple: true,
        checkStrictly:true
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
    },
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '项目概况/摘要（限500字）',
        isClone: true
      },
    },
    {
      "type": "input", "field": "description", "title": "", "value": "",
      props: {
        placeholder: "请输入项目概况说明",
        type: "textarea",
        autosize:{ minRows: 3},
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
      },
      validate: [{required: true, message: '请输入项目概况说明', trigger: 'blur'},]
    },
  ]
}

