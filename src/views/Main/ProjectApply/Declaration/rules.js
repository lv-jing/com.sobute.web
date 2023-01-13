/**
 * 查询数据表单
 */

/* eslint-disable */


/**
 * 查询数据表单
 */

/* eslint-disable */

import {error} from "vuescroll/src/shared/util";

export const searchFormRule = [

  {
    "type": "input", "field": "projectName", "title": "建议名称", "value": "",
    props: {
      placeholder: "请输入建议名称",
    },
    col: {
      span: 8,
      labelWidth: '110px'
    }
  },
  {
    "type": "hidden", "field": "applyType", "title": "用户类型", "value": "",
    props: {
      placeholder: "请输入用户类型",
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
    class: "w-100",
    options: [
      {value: "0", label: "内部"},
      {value: "1", label: "外部"}
    ],
    emit: ['change'],
    emitPrefix: 'apply',
  },
  {
    type: "select",
    title: '项目类型',
    field: 'projectTypeCode',
    value: '',
    props: {
      placeholder: "请选择项目类型"
      //disabled: true
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '110px'
    },
  },
 
  {
    "type": "input", "field": "customerName", "title": "来源单位", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入来源单位",
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
  },
  
  {
    "type": "commonSelect", "field": "statusCode", "title": "状态", "value": "",
    props: {
      placeholder: "请选择",
      typeName: 'APPLY_STATUS',
      isSplicing: false,
      field: 'statusCode',
    },
    class: 'w-100',
    options: [],
    col: {
      span: 8,
      labelWidth: '110px'
    },
  },
  {
    "type": "el-col",
    "title": "执行期限",
    children: [
      {
        "type": "DatePicker",
        "field": "startDate",
        "value": '',
        props: {
          placeholder: "开始时间",
          format: 'yyyy-MM-dd'
        },
        col: {
          span: 12,
        },
        class: 'w-97 md0',
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
          span: 12,
        },
        class: 'w-100',
      },
    ],
    col: {
      span: 8,
      labelWidth: '110px'
    },
    class:'md0'
  },
  {
    "type": "input", "field": "keyWords", "title": "技术关键词", "value": "",
    class: 'w-100',
    props: {
      placeholder: "请输入技术关键词",
    },
    col: {
      span: 8,
      labelWidth: '110px'
    },
  },
  {
    "type": "el-col",
    children: [
      {
      "type": "el-button", "title": "", name: "btn",
      props: {
        type: 'primary',
        icon: 'iconfont sbt_search'
      },
      children: ['查询'],
      col: {
        span: 4,
        labelWidth: '110px'
      },
      emit: [{name: 'click', inject: true}],
      emitPrefix: 'form-search',
    },
      {
      "type": "el-button", "title": "", name: "btn",
      props: {
        type: 'default',
        icon: 'iconfont sbt_reset'
      },
      children: ['重置'],
      col: {
        span: 4,
        labelWidth: '110px'
      },
      emit: [{name: 'click', inject: true}],
      emitPrefix: 'form-reset',
    }
    ],
    col: {
      span: 24,
      labelWidth: '110px'
    },
    class: 'tr',
  },
]

export function addFormRule(_this,type, isType) {
  let op = [],
    arr = [{value: "0", label: "内部"}];
  if (isType == 0) {
    op = arr;
  } else {
    if (type == 1) {
      op = []
    }
  }
  return [
    {
      type: 'common-title',
      name: 'title',
      props: {
        title: '项目基本信息'
      },
    },
    {
      "type": "input", "field": "documentNumber", "title": "建议编号", "value": "",
      props: {
        placeholder: "请输入建议编号",
        disabled: true
      },
      col: {
        span: 8,
        labelWidth: '110px'
      }
    },
    {
      "type": "select", "field": "applyType", "title": "用户类型", "value": type == 1 ? '1' : '0',
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
      validate: [{required: true, message: '请选择申报类型', whitespace: true, trigger: 'blur'},]
    },
    {
      "type": "input", "field": "projectName", "title": "建议名称", "value": "",
      props: {
        placeholder: "请输入"
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      validate: [{required: true, message: '建议名称不能为空', whitespace: true, trigger: 'blur'},]
    },
    {
      "type": "commonSelect",
      "field": "projectType",
      "title": "项目类型",
      "value": "",
      class: 'w-100',
      props: {
        placeholder: "请选择",
        "field": "projectType",
        typeName:type==0?"PROJECT_TYPE":'PROJECT_TYPE_OUT',
        onChanges:(val)=>_this.projectTypeChange(val)
        // (isType==0&&type==0)?"PROJECT_TYPE":
        // (isType==0&&type==1)?'OUT_PROJECT_TYPE':'PROJECT_TYPE_OUT',
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      validate: [{required: true, message: '请选择所属领域', whitespace: true, trigger: 'blur'},]

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
                  let time1 = new Date(_this.addEditFormModel.getValue('startDate')).getTime();
                  let time2 = new Date(_this.addEditFormModel.getValue('endDate')).getTime();
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
                let time1 = new Date(_this.addEditFormModel.getValue('startDate')).getTime();
                let time2 = new Date(_this.addEditFormModel.getValue('endDate')).getTime();
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
      "type": "commonSelect",
      "field": type == 0 ? "fieldList" : 'field',
      "title": `${type == 1 ? '指南' : '研究'}方向`,
      "value": type == 0 ? [] : '',
      class: 'w-100',
      props: {
        placeholder: "请选择",
        field: type == 0 ? "fieldList" : 'field',
        typeName: type == 0 ? 'PROJECT_DIRECTION' : 'COMPASS_DIRECTION',
        multiple: type == 0 ? true : false,

      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      validate: [{required: true, message: '请选择所属领域', trigger: 'blur'},]

    },
    {
      "type": type == 1 ? 'hidden' : "input",
      "field": "sugPerson",
      "title": "建议项目负责人",
      "value": "",
      class: 'w-100',
      props: {
        placeholder: "请输入",
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      // validate: [{ required: true, message: '建议项目负责人不能为空', whitespace: true, trigger: 'blur' },]

    },
    {
      "type": type == 1 ? 'hidden' : "common-cascader",
      "field": "sourceList",
      "title": "项目来源",
      "value": [],
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "PROJECT_SOURCE",
        "field": "sourceList",
        // multiple:true,
        // checkStrictly:true
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]

    },

   
   
    {
      "type": type == 1 ? 'hidden' : "commonSelect",
      "field": "roleName",
      "title": "承担角色",
      "value": "",
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "APPLY_ROLE",
        "field": "roleName"
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]

    },
    {
      "type": type == 1 ? 'hidden' : "commonSelect",
      "field": "partyName",
      "title": "单位名称",
      "value": "",
      class: 'w-100',
      props: {
        placeholder: "请选择",
        typeName: "APPLY_PARTY",
        "field": "partyName"
      },
      col: {
        span: 8,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]

    },
    
    {
      "type": type == 1 ? 'hidden' : "input",
      "field": "customerName",
      "title": "来源单位",
      "value": "",
      class: 'w-100',
      props: {
        placeholder: "请输入",
      },
      col: {
        span: 16,
        labelWidth: '110px'
      },
      //validate: [{ required: true, message: '来源单位不能为空', whitespace: true, trigger: 'blur' },]

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
        span: 12,
        labelWidth: '110px'
      },
      options: [],
      validate: [{ required: true, message: '请选择技术关键词',  trigger: 'blur' },]

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
        span: 12,
        labelWidth: '110px'
      },
      options: [],
      // validate: [{ required: true, message: '请选择项目来源', whitespace: true, trigger: 'blur' },]
    },
    {
      type: 'common-title',
      name: 'title',
      field: "desc",
      props: {
        title: '项目概况/摘要 (限500字)',
        isClone: true
      },
    },
    {
      "type": 'input',
      "field": "description", "title": "", "value": "",
      props: {
        type: 'textarea',
        placeholder: "请输入项目概况说明",
        rows: 10,
        maxlength: 1333,
        showWordLimit:true

      },
      col: {
        span: 24,
        labelWidth: '0px'
      },
      validate: [{required: true, message: '请输入项目概况说明', trigger: 'blur'},]
    },
    {
      type: type == 1 ? 'hidden' : 'common-title',
      name: 'title',
      field: "analysis",
      props: {
        title: '立项依据（限1000字）'
      }
    },
    {
      "type": type == 1 ? 'hidden' : 'input',
      "field": "currAnalysis", "title": "", "value": "",
      props: {
        type: 'textarea',
        placeholder: "请输入立项依据",
        rows: 5,
        maxlength: 1333,
        showWordLimit:true
      },
      col: {
        span: 24,
        labelWidth: '0px'
      },

    },
    {
      type: type == 1 ? 'hidden' : 'common-title',
      name: 'title',
      field: "proj",
      props: {
        title: '与公司现有研究方向、在研项目的关系（限500字）'
      }
    },
    {
      "type": type == 1 ? 'hidden' : "input", "field": "projAnalysis", "title": "", "value": "",
      props: {
        type: 'textarea',
        placeholder: "请输入与公司现有研究方向、在研项目的关系",
        rows: 5,
        maxlength: 1333,
        showWordLimit:true

      },
      col: {
        span: 24,
        labelWidth: '0px'
      }
    }
  ]
}

