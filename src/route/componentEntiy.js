/* eslint-disable */

/**
 * @author caiyuansheng
 * 
 * @date 2020-04-21
 * 
 *  CONPONENT_ENTIY 此文件为固定文件，请勿更改
 *  此文件为自定义配置菜单对应的功能文件
 * 请注意：
 *
 * 1、文件里面 是对用系统添加的系统菜单，和系统菜单添加的【菜单别名】相对相应，务必仔细
 * 
 * 2、对应的 【别名】对应的是一个数据对象 为固定值 component，meta，params ，单个字段
 * 
 * 3、如果配置的是链接报表，不需要在这里面添加组件，系统会自动进行配置
 * 
 * 对象说明：
 * @param {vue组件类型 必填} component 为应用的文件类型---》业务逻辑层
 * 
 * @param { 数组类型} meta  为面包屑 
 * 
 * @param { 字符串} params 为参数传递 例如 xxx/:id 格式
 * 
 * CONPONENT_ENTIY {
 * 
 * 【系统添加菜单对应别名】:{
 *    component:【组件】,
 *    meta:【数组类型面包屑】
 *    params:【组件参数传递 例如 xxx/:id 】
 * }
 * 
 * 
 * }
 * 
 */


export const HTTP_REPORTS = {
  params: 'guid',
  component: resolve => require(['@/views/Main/ProjectReport/TemplateReport'], resolve),
  meta: [{
    name: 'main',
    title: '首页'
  }, {
    name: '',
    title: '报表管理'
  }]

}


export const CONPONENT_ENTIY = {
  system: {
    component: resolve => require(['@/views/Main/SystemManage'], resolve),
    meta: []
  },
  menus: {
    component: resolve => require(['@/views/Main/SystemManage/MenusManage'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '菜单管理'
    }]
  },
  userInfo: {
    component: resolve => require(['@/views/Main/SystemManage/UserInfo'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '人员信息'
    }]
  },
  outsiders: {
    component: resolve => require(['@/views/Main/SystemManage/Outsiders'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '外部人员'
    }]
  },
  users: {
    component: resolve => require(['@/views/Main/SystemManage/UsersManage'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '用户管理'
    }]
  },
  roles: {
    component: resolve => require(['@/views/Main/SystemManage/RolesManage'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '角色管理'
    }]
  },
  dictionary: {
    component: resolve => require(['@/views/Main/SystemManage/DictionaryManage'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '字典管理'
    }]
  },
  config: {
    component: resolve => require(['@/views/Main/SystemManage/SystemConfig'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '系统参数'
    }]
  },

  //工作台
  mywork: {
    
    component: resolve => require(['@/views/Main/WorkbenchManage'], resolve),
    meta: []
  },
  workbench: {
    component: resolve => require(['@/views/Main/WorkbenchManage/Workbench'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '工作台'
    }]
  },
  //项目查询
  projectQuery:{
    component: resolve => require(['@/views/Main/WorkbenchManage/ProjectQuery'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目查询'
    }]
  },
  //报表
  report: {
    component: resolve => require(['@/views/Main/ProjectReport'], resolve),
    meta: []
  },

  PermissionReport: {
    component: resolve => require(['@/views/Main/Report/PermissionReport'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '报表管理'
    }, {
      name: '',
      title: '用户权限报表'
    }]
  },
  REPRpmPjProjectTasksV: {
    component: resolve => require(['@/views/Main/Report/REPRpmPjProjectTasksV'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '报表管理'
    }, {
      name: '',
      title: '项目任务列表'
    }]
  },
  AllotteReport: {
    component: resolve => require(['@/views/Main/Report/AllotteReport'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '报表管理'
    }, {
      name: '',
      title: '专利期限信息报表'
    }]
  },
  ExpenseReport: {
    component: resolve => require(['@/views/Main/Report/ExpenseReport'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '报表管理'
    }, {
      name: '',
      title: '专利费用信息报表'
    }]
  },
  PJProjectReport: {
    component: resolve => require(['@/views/Main/Report/PJProjectReport'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '报表管理'
    }, {
      name: '',
      title: '项目立项报表'
    }]
  },

  //申报
  apply: {
    component: resolve => require(['@/views/Main/ProjectApply'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目建议'
    }]
  },
  declaration: {
    component: resolve => require(['@/views/Main/ProjectApply/Declaration'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目建议'
    }]
  },
  projectdeclare: {
    component: resolve => require(['@/views/Main/ProjectDeclare'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目申请'
    }]
  },
  //立项
  approval: {
    component: resolve => require(['@/views/Main/ProjectApproval'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目立项'
    }]
  },
  document: {
    component: resolve => require(['@/views/Main/ProjectDocumentation'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目文档'
    }]
  },
  exportExcel: {
    component: resolve => require(['@/views/Main/Report/ExportExcel'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: 'ExportExcel'
    }]
  },

  //产品实施
  productImplementation:{
    component: resolve => require(['@/views/Main/ProductImplementation'], resolve),
    meta: []
  },
  //中试
  pilotTest:{
    component: resolve => require(['@/views/Main/ProductImplementation/PilotTest'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '产品实施'
    }, {
      name: '',
      title: '中试'
    }]
  },
  //试生产
  pilotProduction:{
    component: resolve => require(['@/views/Main/ProductImplementation/PilotProduction'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '产品实施'
    }, {
      name: '',
      title: '试生产'
    }]
  },
  //新产品评价
  newProductEvaluation:{
    component: resolve => require(['@/views/Main/ProductImplementation/NewProductEvaluation'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '产品实施'
    }, {
      name: '',
      title: '新产品评价'
    }]
  },
  //工艺管理
  processManagement:{
    component: resolve => require(['@/views/Main/ProductImplementation/ProcessManagement'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '产品实施'
    }, {
      name: '',
      title: '工艺管理'
    }]
  },


  noticeManage: {
    component: resolve => require(['@/views/Main/ProjectNotice/index.vue'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '公告'
    }]
  },
  notice: {
    component: resolve => require(['@/views/Main/ProjectNotice/notice'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '发布公告'
    }]
  },
  relatedunits: {
    component: resolve => require(['@/views/Main/BasicDataUnit'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '相关单位'
    }]
  },
  production: {
    component: resolve => require(['@/views/Main/ProjectImplementation/PilotProduction'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目实施'
    }, {
      name: '',
      title: '中试/试生产'
    }]
  },
  implementation: {
    component: resolve => require(['@/views/Main/ProjectImplementation'], resolve),
    meta: [],
  },
  plan: {
    component: resolve => require(['@/views/Main/ProjectImplementation/AnnualPlan'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目实施'
    }, {
      name: '',
      title: '项目计划'
    }]
  },
  decomposition: {
    component: resolve => require(['@/views/Main/ProjectImplementation/TaskDecomposition'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目实施'
    }, {
      name: '',
      title: '任务分解'
    }]
  },

  taskDecomposition: {
    component: resolve => require(['@/views/Main/ProjectImplementation/TaskLeaDecomposition'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目实施'
    }, {
      name: '',
      title: '任务分解'
    }]
  },


  



  changes: {
    component: resolve => require(['@/views/Main/PGChanges'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目实施'
    }, {
      name: '',
      title: '项目变更'
    }]
  },
  summary: {
    component: resolve => require(['@/views/Main/ProjectImplementation/Summary'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目实施'
    }, {
      name: '',
      title: '项目总结-内部'
    }]
  },
  SummaryOutside: {
    component: resolve => require(['@/views/Main/ProjectImplementation/SummaryOutside'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目实施'
    }, {
      name: '',
      title: '项目总结-外部'
    }]
  },
  results: {
    component: resolve => require(['@/views/Main/ProjectResults'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目成果'
    }]
  },
  patentpage: {
    component: resolve => require(['@/views/Main/ProjectResults/PatentPage'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '知识产权'
    }]
  },
  assessment: {
    component: resolve => require(['@/views/Main/ProjectAssessment'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目考核'
    }]
  },
  personal: {
    component: resolve => require(['@/views/Main/PersonalAssessment'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '个人考核'
    }]
  },
  PersonalSummary: {
    component: resolve => require(['@/views/Main/PersonalAssessment/PersonalSummary'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '个人总结'
    }]
  },
  acceptManage: {
    component: resolve => require(['@/views/Main/ProjectAcceptance'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '项目验收'
    }, {
      name: '',
      title: '验收管理'
    }]
  },
  developmentApproval:{
    component: resolve => require(['@/views/Main/SystemManage/DevelopmentApproval'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '审批层次结构-开发'
    }]
  }, 
  businessApproval:{
    component: resolve => require(['@/views/Main/SystemManage/BusinessApproval'], resolve),
    meta: [{
      name: 'main',
      title: '首页'
    }, {
      name: '',
      title: '系统管理'
    }, {
      name: '',
      title: '审批层次结构-业务'
    }]
  }

}
