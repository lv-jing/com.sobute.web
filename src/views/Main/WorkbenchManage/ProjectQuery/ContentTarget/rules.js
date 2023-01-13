/**
 * 查询数据表单
 */

/* eslint-disable */
import moment from 'moment'
export const searchFormRule = [
 
  // {
  //   type: 'common-title',
  //   name: 'title',
  //   props: {
  //     title: '项目研究目标（限1000字）'
  //   },
  // },
  // {
  //   "type": "input", "field": "projectTarget", "title": "", "value": "",
  //   props: {
  //     placeholder: "项目总体研究目标，限1000字",
  //     type: "textarea",
  //     autosize:{ minRows: 3},
  //     showWordLimit:true,
  //       maxlength:1333
  //   },
  //   col: {
  //     span: 24,
  //   },
  // },
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
      content:"录入主要验收内容及指标，全部带入项目验收，作为验收对照标准，未完成时需写明原因",
      isClone: true
    },
  },
]
// 里程碑
export function addFormMileRule(_this){
  return [

    {
      "type": "input", "field": "name", "title": "任务名称", "value": "",
      props: {
        placeholder: "请输入任务名称",
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      validate: [{required: true, message: '请输入任务名称', trigger: 'blur'},]
    },
    {
      "type": "DatePicker", "field": "year", "title": "年份", "value": "",
      props: {
        placeholder: "年份",
        type:'year'
      },
      col: {
        span: 24
      },
      class: 'w-100',
      validate: [
        {required: true, message: '请选择年份', trigger: 'blur'},
        
      ]
    },
    {
      "type": "DatePicker", "field": "startDate", "title": "开始时间", "value": "",
      props: {
        placeholder: "开始日期",
        format: 'yyyy-MM-dd',
        valueFormat:'yyyy-MM-dd'
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
            const time=_this.dateList,
            endTime=_this.addEditMileListModel.getValue('endDate'),
            _endTime=moment(endTime).format('YYYY-MM-DD'),
            startTime=moment(value).format('YYYY-MM-DD');
            if(moment(startTime)>moment(time[1])){
              callback(new Error('开始日期不能大于执行结束日期'))
            }else if(moment(startTime)<moment(time[0])){
              callback(new Error('开始日期不能小于执行开始日期'))
            }else if (moment(startTime)>moment(_endTime)) {
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
        format: 'yyyy-MM-dd',
        valueFormat:'yyyy-MM-dd'
      },
      col: {
        span: 12
      },
      class: 'w-100',
      validate: [
        {required: true, message: '请选择结束时间', trigger: 'blur'},
        {
          trigger: 'blur',
          validator: (rule, value, callback) => {
            const time=_this.dateList,
            startTime=_this.addEditMileListModel.getValue('startDate'),
            _startTime=moment(startTime).format('YYYY-MM-DD'),
            endTime=moment(value).format('YYYY-MM-DD');
            if(moment(endTime)<moment(time[0])){
              callback(new Error('结束日期不能小于执行开始日期'))
            }else if(moment(endTime)>moment(time[1])){
              callback(new Error('结束日期不能大于执行结束日期'))
            }else if (moment(endTime)<moment(_startTime)) {
              callback(new Error('结束日期不能小于开始日期'))
            } else {
              callback()
            }
          }
        }
      ]
    },
     {
      "type": "input", "field": "target", "title": "考核指标", "value": "",
      props: {
        placeholder: "请输入考核指标",
        type: "textarea",
        autosize:{ minRows: 5},
        showWordLimit:true,
        maxlength:1333
      },
      col: {
        span: 24,
        labelWidth: '100px'
      },
      // validate: [{required: true, message: '请输入备注', trigger: 'blur'},]
    },
    // {
    //   "type": "input", "field": "comments", "title": "备注", "value": "",
    //   props: {
    //     placeholder: "请输入备注",
    //     type: "textarea",
    //     autosize:{ minRows: 3},
    //     showWordLimit:true,
    //     maxlength:1333
    //   },
    //   col: {
    //     span: 24,
    //     labelWidth: '100px'
    //   },
    //   // validate: [{required: true, message: '请输入备注', trigger: 'blur'},]
    // },
  ]
}
// 验收
export function addFormRule(_this){
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
        {required: true, message: '请选择结束时间', trigger: 'blur'},
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
