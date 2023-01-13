/**
 * 查询数据表单
 */

/* eslint-disable */
export const searchFormRule = [
  
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '项目研究目标（限1000字）'
    },
  },
  {
    "type": "input", "field": "projectTarget", "title": "", "value": "",
    props: {
      placeholder: "项目总体研究目标，限1000字",
      type: "textarea",
      autosize:{ minRows: 3},
      showWordLimit:true,
        maxlength:1333
    },
    col: {
      span: 24,
    },
  },
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '项目研究内容（限1000字）'
    },
  },
  {
    "type": "input", "field": "researchContents", "title": "", "value": "",
    props: {
      placeholder: "项目总体研究内容，限1000字",
      type: "textarea",
      autosize:{ minRows: 3},
      showWordLimit:true,
        maxlength:1333
    },
    col: {
      span: 24,
    },
  },
  {
    type: 'common-title',
    name: 'title',
    props: {
      title: '项目验收指标（逐条输入研究内容与对应的考核指标）',
      isClone: true
    },
  },
]

export function addFormRule(_this) {
  return [
    {
      "type": "hidden", "field": "index", "title": "", "value": "",
      props: {
        placeholder: "",
      },
    },
    {
      "type": "input", "field": "taskName", "title": "研究内容", "value": "",
      props: {
        placeholder: "请输入研究内容",
        type: "textarea",
        autosize:{ minRows: 3},
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      validate: [{required: true, message: '请输入研究内容', trigger: 'blur'},]
    },
    {
      "type": "input", "field": "exam", "title": "考核指标", "value": "",
      props: {
        placeholder: "请输入考核指标",
        type: "textarea",
        autosize:{ minRows: 3},
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      validate: [{required: true, message: '请输入考核指标', trigger: 'blur'},]
    },
    {
      "type": "DatePicker", "field": "startDate", "title": "开始时间", "value": "",
      props: {
        placeholder: "开始日期",
        format: 'yyyy-MM-dd'
      },
      col: {
        span: 12
      },
      class: 'w-100',
      validate: [
        {required: true, message: '请选择开始时间', trigger: 'blur'},
        {
          trigger: 'blur',
          validator: (rule, value, callback) => {
            let time1 = new Date(_this.addEditFormModel.getValue('startDate')).getTime();
            let time2 = new Date(_this.addEditFormModel.getValue('endDate')).getTime();
            if (time1 - time2 > 0) {
              callback(new Error('开始日期不能大于结束日期'))
            } else {
              callback()
            }
          }
        }
      ]
    },
    {
      "type": "DatePicker", "field": "endDate", "title": "结束时间", "value": "",
      props: {
        placeholder: "结束日期",
        format: 'yyyy-MM-dd'
      },
      col: {
        span: 12
      },
      class: 'w-100',
      validate: [
        {required: true, message: '请选收结束时间', trigger: 'blur'},
        {
          trigger: 'blur',
          validator: (rule, value, callback) => {
            let time1 = new Date(_this.addEditFormModel.getValue('startDate')).getTime();
            let time2 = new Date(_this.addEditFormModel.getValue('endDate')).getTime();
            if (time1 - time2 > 0) {
              callback(new Error('结束日期不能小于开始日期'))
            } else {
              callback()
            }
          }
        }
      ]
    },
  ]
}

