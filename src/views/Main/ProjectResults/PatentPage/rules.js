/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule = [
  {
    "type": "input", "field": "patentName", "title": "专利名称", "value": "",
    props: {
      placeholder: "请输入专利名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "commonSelect", "field": "applicationTypeCode", "title": "申请类型", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "APPLICATION_TYPE",
      field: "applicationTypeCode",
      size: 'default',
      isSplicing: false
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "input", "field": "documentNumber", "title": "成果入库单号", "value": "",
    props: {
      placeholder: "请输入成果入库单号"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "inventor", "title": "发明人", "value": "",
    props: {
      placeholder: "请输入发明人"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "applicant", "title": "申请人", "value": "",
    props: {
      placeholder: "请输入申请人",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "el-col",
    "title": "申请日",
    children: [
      {
        "type": "DatePicker",
        "field": "apliDateStart",
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
        "field": "apliDateEnd",
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
      labelWidth: '130px'
    },
    class:'md0'
  },
  {
    "type": "input", "field": "applicationNumber", "title": "申请号", "value": "",
    props: {
      placeholder: "请输入申请号",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "proposalDepartment", "title": "提案部门", "value": "",
    props: {
      placeholder: "请输入提案部门",
    },
    class: 'w-100',
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "el-col",
    "title": "授权日",
    children: [
      {
        "type": "DatePicker",
        "field": "auDateStart",
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
        "field": "auDateEnd",
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
      labelWidth: '130px'
    },
    class:'md0'
  },
  {
    "type": "input", "field": "region", "title": "国家/地区", "value": "",
    props: {
      placeholder: "请输入国家/地区",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "commonSelect", "field": "legalStatusCode", "title": "法律状态", "value": "",
    props: {
      placeholder: "请选择法律状态",
      typeName: "LEGAL_STATUS",
      field: "legalStatusCode",
      size: 'default',
      isSplicing: false
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "input", "field": "projectNameIn", "title": "关联内部项目名称", "value": "",
    props: {
      placeholder: "请输入关联内部项目名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "input", "field": "projectName", "title": "关联外部项目名称", "value": "",
    props: {
      placeholder: "请输入关联外部项目名称",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "el-col",
    class: 'tr',
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
      emit: [{name: 'click', inject: true}],
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
      emit: [{name: 'click', inject: true}],
      emitPrefix: 'form-reset',
    }],
    col: {
      span: 16,
      labelWidth: '100px'
    }
  },
]
export const addFormRule =(_this)=> [
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '申请信息'
    },
  },
  {
    "type": "input", "field": "documentNumber", "title": "成果入库单号", "value": "",
    props: {
      placeholder: "请输入",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "input", "field": "status", "title": "提案状态", "value": "",
    props: {
      placeholder: "请输入",
      disabled: true
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "patentName", "title": "专利名称", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    validate: [{required: true, message: '专利名称不能为空', trigger: 'blur'},]
  },
  {
    "type": "DatePicker", "field": "proposalDate", "title": "提案日期", "value": "",
    props: {
      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    validate: [{required: true, message: '请选择提案日期', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "proposalDepartment", "title": "提案部门", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "COMMITMENT_DEPARTMENT",
      field: "proposalDepartment",
      size: 'default'
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
    validate: [{required: true, message: '请选择提案部门', trigger: 'blur'},]
  },
  {
    "type": "commonAuto", "field": "proposer", "title": "提案人", "value": '',
    props: {
      placeholder: "提案人",
      multiple: false,
      filterable: true,
      collapseTags: false,
      field: 'proposer',
      remote: true,
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    validate: [{required: true, message: '提案人不能为空', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "inventor", "title": "发明人", "value": "",
    props: {
      placeholder: "请输入发明人"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  // {
  //   "type": "commonAuto", "field": "inventorList", "title": "发明人", "value": '',
  //   props: {
  //     placeholder: "发明人",
  //     multiple: true,
  //     filterable: true,
  //     collapseTags: false,
  //     field: 'inventorList',
  //     remote: true,
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '130px'
  //   },
  //   class: 'w-100',
  //   validate: [{required: true, message: '发明人不能为空', trigger: 'blur'},]
  // },
  {
    "type": "commonSelect", "field": "applicantList", "title": "申请人", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "APPLY_PARTY",
      field: "applicantList",
      multiple: true,
      size: 'default'
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
    validate: [{required: true, message: '请选择申请人', trigger: 'blur'},]
  },
  // {
  //     "type": "commonAuto", "field": "applicant", "title": "申请人", "value": '',
  //     props: {
  //         placeholder: "申请人",
  //         multiple: true,
  //         filterable: true,
  //         collapseTags: false,
  //         field: 'applicant',
  //         remote: true,
  //     },
  //     col: {
  //         span: 8,
  //         labelWidth: '130px'
  //     },
  //     class: 'w-100',
  //     validate: [{ required: true, message: '申请人不能为空', trigger: 'blur' },]
  // },
  {
    "type": "commonSelect", "field": "applicationTypeCode", "title": "申请类型", "value": [],
    props: {
      placeholder: "请选择",
      typeName: "APPLICATION_TYPE",
      size: 'default',
      multiple:true,
      isSplicing:false
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
    validate: [{required: true, message: '请选择申请类型', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "region", "title": "申请国家/地区", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请输入', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "relatedCases", "title": "关联案", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "commonSingleSelect", "field": "projectList", "title": "关联外部项目", "value": [],
    props: {
      placeholder: "请选择",
      filterable: true,
      multiple: true,
      transform: ["projectName", "projectNumber", "id"],
      request: {
        interfaceName: '/service/project/confirm/list',
        method: 'get',
        params: {
          params: {
            statusCode: 2005104,
            applyType: 1,
            pageNum: 1,
            pageSize: -1
          }
        }
      }
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    options: [],
    class: 'w-100',
  },
  {
    "type": "commonSingleSelect", "field": "projectInString", "title": "关联内部项目", "value": "",
    props: {
      placeholder: "请选择",
      filterable: true,
      transform: ["projectName", "projectNumber", "id"],
      request: {
        interfaceName: '/service/project/confirm/list',
        method: 'get',
        params: {
          params: {
            statusCode: 2005104,
            applyType: 0,
            pageNum: 1,
            pageSize: -1
          }
        }
      }
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    options: [],
    class: 'w-100',
  },
  
  {
    "type": "common-cascader", "field": "productClassificationList", "title": "产品分类", "value": [],
    props: {
      placeholder: "请选择",
      typeName: "PRODUCT_CLASSIFICATION",
      field: "productClassificationList",
      size: 'default'
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
    validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "patentFlag", "title": "专利包名称", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "PATENT_FLAG",
      field: "patentFlag",
      size: 'default'
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "commonSelect", "field": "patentLevel", "title": "专利类别", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "PATENT_LEVEL",
      field: "patentLevel",
      size: 'default',
      onChanges:(val)=>_this.onChangesLeavel(val)
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
    validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "priorityNumber", "title": "优先权号", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "DatePicker", "field": "priorityDate", "title": "优先权日", "value": "",
    props: {

      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
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
      span: 24  ,
      labelWidth: '130px'
    },
    options: [],
    validate: [{ required: true, message: '请选择技术关键词',  trigger: 'blur' },]

  },
]

export const addFormRule1 = [
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '授权信息'
    },
  },
  {
    "type": "input", "field": "applicationNumber", "title": "申请号", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  {
    "type": "DatePicker", "field": "applicationDate", "title": "申请日", "value": "",
    props: {

      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "publicationNumber", "title": "公开号", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "DatePicker", "field": "publicationDate", "title": "公开日", "value": "",
    props: {

      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "publicationPatentNumber", "title": "公告号", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "DatePicker", "field": "publicationPatentDate", "title": "公告日", "value": "",
    props: {
      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "DatePicker", "field": "authorizationDate", "title": "授权办登日", "value": "",
    props: {
      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "legalStatus", "title": "法律状态", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "LEGAL_STATUS",
      field: "legalStatus"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: []
  },
  {
    "type": "commonSelect", "field": "patentClass", "title": "专利级别", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "PATENT_CLASS",
      field: "patentClass",
      size: 'default'
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
  },
  {
    "type": "DatePicker", "field": "commissionDate", "title": "委托日期", "value": "",
    props: {

      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "commonSelect", "field": "agency", "title": "代理机构", "value": "",
    props: {
      placeholder: "请选择",
      typeName: "AGENCY_COM",
      isSplicing:false
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    options: [],
  },


  {
    "type": "input", "field": "awardType", "title": "获奖类别", "value": "",
    props: {
      placeholder: "请输入",
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
  },
  {
    "type": "DatePicker", "field": "awardYear", "title": "获奖年份", "value": "",
    props: {
      type: "year",
      placeholder: "请选择"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    class: 'w-100',
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "others", "title": "其他", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    },
    // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  },
  {
    "type": "input", "field": "description", "title": "备注", "value": "",
    props: {
      placeholder: "请输入"
    },
    col: {
      span: 8,
      labelWidth: '130px'
    }
  },
  // {
  //   type: 'common-title',
  //   name: 'title',
  //   props: {
  //     title: '专利运营信息'
  //   },
  // },
  // {
  //   "type": "input", "field": "patentAssignee", "title": "专利受让人", "value": "",
  //   props: {
  //     placeholder: "请输入"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "input", "field": "patentPledgee", "title": "专利质权人", "value": "",
  //   props: {
  //     placeholder: "请输入"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "input", "field": "patentLicensee", "title": "专利被许可人", "value": "",
  //   props: {
  //     placeholder: "请输入"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "DatePicker", "field": "assignmentDate", "title": "专利受让日", "value": "",
  //   props: {
  //     placeholder: "请选择"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   class: 'w-100',
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "DatePicker", "field": "contractDate", "title": "质押合同登记日", "value": "",
  //   props: {
  //     placeholder: "请选择"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   class: 'w-100',
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "DatePicker", "field": "licenseContractDate", "title": "专利许可合同备案日期", "value": "",
  //   props: {
  //     placeholder: "请选择"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   class: 'w-100',
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "input", "field": "assignedAmount", "title": "受让金额", "value": "",
  //   props: {
  //     placeholder: "请输入",
  //     type: "number"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "input", "field": "pledgeAmount", "title": "质押金额", "value": "",
  //   props: {
  //     placeholder: "请输入",
  //     type: "number"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "input", "field": "licenseAmount", "title": "许可金额", "value": "",
  //   props: {
  //     placeholder: "请输入",
  //     type: "number"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
  // {
  //   "type": "input", "field": "patentLicenseType", "title": "专利许可类型", "value": "",
  //   props: {
  //     placeholder: "请输入"
  //   },
  //   col: {
  //     span: 8,
  //     labelWidth: '165px'
  //   },
  //   // validate: [{required: true, message: '请选择', trigger: 'blur'},]
  // },
]
