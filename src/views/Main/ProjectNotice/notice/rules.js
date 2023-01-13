/**
 * 查询数据表单
 */

/* eslint-disable */


/**
 * 查询数据表单
 */

/* eslint-disable */
import { getUploadUrl } from "@/service/common";
export const searchFormRule = [

  {
    "type": "input", "field": "title", "title": "公告标题", "value": "",
    props: {
      placeholder: "请输入公告标题",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
  },

  {
    type: "select",
    title: '公告状态',
    field: 'status',
    value: '',
    props: {
      placeholder: "请选择项目类型"
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '100px'
    },
    options: [
      { "value": '', 'label': "全部" },
      { "value": 1, 'label': "启用" },
      { "value": 0, 'label': "停用" }
    ],
  },
  {
    col: {
      span: 8,
      labelWidth: '100px'
    },
    type: 'el-col',
    title: '发布时间',
    children: [
      {
        "type": "DatePicker",
        "field": "startDate",
        "value": "",
        props: {
          placeholder: "开始时间",
          format: 'yyyy-MM-dd'
        },
        col: {
          span: 12,
        },
        class: 'w-100',
      },
      {
        "type": "DatePicker",
        "field": "endDate",
        "title": "",
        "value": "",
        props: {
          placeholder: "结束时间",
          format: 'yyyy-MM-dd'
        },
        col: {
          span: 12,
        },
        class: 'w-100 ml5',
      },
    ]
  },
  {
    "type": "el-col",
    children: [{
      "type": "el-button", "title": "", name: "btn",
      props: {
        type: 'primary',
        icon: 'iconfont sbt_search'
      },
      children: ['查询'],
      col: {
        span: 4,
        labelWidth: '100px'
      },
      emit: [{ name: 'click', inject: true }],
      emitPrefix: 'form-search',
    }, {
      "type": "el-button", "title": "", name: "btn",
      props: {
        type: 'default',
        icon: 'iconfont sbt_reset'
      },
      children: ['重置'],
      col: {
        span: 4,
        labelWidth: '100px'
      },
      emit: [{ name: 'click', inject: true }],
      emitPrefix: 'form-reset',
    }],
    col: {
      span: 24,
      labelWidth: '100px'
    },
    class: 'tr',
  },
]

export const addFormRule = [

  {
    "type": "input", "field": "title", "title": "公告标题", "value": "",
    props: {
      placeholder: "请输入公告标题",
      // showWordLimit: true,
      maxlength: "100",
    },
    col: {
      span: 19,
      labelWidth: '150px'
    },
    validate: [{ required: true, message: '请输入公告标题', trigger: 'blur' },]

  },
  {
    "type": "input", "field": "summary", "title": "公告摘要", "value": "",
    props: {
      type: 'textarea',
      placeholder: "请输入公告摘要",
      // showWordLimit: true,
      rows: 4,
      maxlength: 1333,
      showWordLimit:true
    },
    col: {
      span: 19,
      labelWidth: '150px'
    },
    //  validate: [{ required: true, message: '请输入公告标题', trigger: 'blur' },]

  },
  {
    type: "upload",
    field: "thumbnailUrl",
    title: "公告封面",
    value: '',
    props: {
      "type": "select",
      "uploadType": "image",
      "action": getUploadUrl,
      "name": "upfile",
      "multiple": false,
      "accept": "image\/*",
      "format": ["jpg", "jpeg", "png", "gif"],
      "limit": 1,
      data: {
        bizType: "公告封面", //业务分类
        bizTypeCode: "2013130" //业务类型编码
      }
    },
    col: {
      span: 19,
      labelWidth: '150px'
    }
  },
  {
    type: "radio",
    title: "发送对象",
    field: "type",
    value: 1,
    options: [
      { "value": 1, 'label': "全部" },
      { "value": 2, 'label': "内部" },
      { "value": 3, 'label': "外部" },
      { "value": 4, 'label': "指定用户" },

    ],
    col: {
      span: 19,
      labelWidth: '150px'
    },
    control: [{
      handle(val) {
        return val === 4;
      },
      rule: [{
        type: "commonSelect",
        field: "groupCodeList",
        title: "指定分组",
        value: [],
        options: [
        ],
        props: {
          multiple: true,
          typeName: 'NOTICE_PERSON',
          isSplicing: false,
        },
        class: 'w-100',
        col: {
          // span: 8,
          labelWidth: '150px'
        },
        validate: [{ required: true, message: '选择指定分组', trigger: 'blur' },]

      },
      ]
    }],
    validate: [{ required: true, message: '请选择发送对象', trigger: 'blur' },]
    // emit: ['change'],
    // emitPrefix: 'send'
  },
  {
    type: "radio",
    title: "公告状态",
    field: "status",
    value: 1,
    options: [
      { "value": 1, 'label': "启用" },
      { "value": 0, 'label': "停用" }
    ],
    col: {
      span: 19,
      labelWidth: '150px'
    },
    validate: [{ required: true, message: '请选择公告状态', trigger: 'blur' },]

  },
  {
    col: {
      span: 19,
      labelWidth: '0'
    },
    type: 'el-col',
    title: '',
    children: [
      {
        "type": "DatePicker",
        "field": "startDate",
        title: "发布时间",
        "value": "",
        props: {
          placeholder: "开始时间",
          format: 'yyyy-MM-dd'
        },
        col: {
          span: 12,
          labelWidth: '150px'
        },
        class: 'w-100',
        validate: [{ required: true, message: '开始时间', trigger: 'blur' },]

      },
      {
        "type": "DatePicker",
        "field": "endDate",
        "title": "",
        "value": "",
        props: {
          placeholder: "结束时间",
          format: 'yyyy-MM-dd'
        },
        col: {
          span: 12,
        },
        class: 'w-100 ml5',
        validate: [{ required: true, message: '结束时间', trigger: 'blur' },]

      },

    ]
  },
  {
    type: "common-editor",
    field: "content",
    title: "公告内容",
    value: '',
    class: 'w-100',
    props:{
      
    },
    col: {
      span: 19,
      labelWidth: '150px'
    }
  },

]


