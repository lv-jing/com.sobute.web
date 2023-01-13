/**
 * 查询数据表单
 */

/* eslint-disable */


/**
 * 查询数据表单
 */
/* eslint-disable */
import {funType} from '@/utils/projectType'
export const searchFormRule = [
  {
    "type": "select", "field": "bizType", "title": "类型", "value": "",
    props: {
      placeholder: "请选择类型",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    options: funType,
    class: 'w-100',
  },
  {
    "type": "input", "field": "bizTitle", "title": "名称", "value": "",
    props: {
      placeholder: "请输入项目名称",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    },
    class: 'w-100'
  },
  {
    "type": "input", "field": "bizDocumentNumber", "title": "单据编号", "value": "",
    props: {
      placeholder: "请输入单据编号",
    },
    col: {
      span: 8,
      labelWidth: '100px'
    }
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
      span: 24,
      labelWidth: '100px'
    },
    class: 'tr',
  },
]
