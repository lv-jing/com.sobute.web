/* eslint-disable */
import { getUserIdCardInfo } from '@/service/user'
import { allNarmalInterface } from '@/service/common'
import { funType, projectType } from '@/utils/projectType'
import { CONPONENT_ENTIY, HTTP_REPORTS } from "@/route/componentEntiy";
import { mainRouter } from "@/route";

import Sortable from "sortablejs";
import {
  getProjectList,
  getMemberList,
  getNodeList
} from "@/service/project";
import Vue from 'vue'
import Qs from 'qs'
import Cookies from "js-cookie";
const _Component = resolve => require(['@/views/Main/_conponent'], resolve)
const v = new Vue();
import route from '@/route'
/**
 * 动态添加组件
 * @param {*} component
 */
export const AsyncComponent = (component) => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component,
  // 异步组件加载时使用的组件
  loading: {},
  // 加载失败时使用的组件
  error: {},
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})


/**
  * 检查身份证是否正确
  */
export async function idCardValidator(rule, value, callback) {
  if (!value || value.length < 15) {
    return callback(new Error("请输入身份证号码。"));
  } else {
    const { data } = await getUserIdCardInfo({ idCard: value });
    if (!data) {
      return callback(new Error("您的身份证号码错误。"));
    } else {
      return callback();
    }
  }
}
/**
 *  下拉框，多选框，单选框 ，数据组装
 * @param {Array} arr  原始数组
 * @param {Array} transform 需要转换的字符，
 * @param {boolean} isSplicing  是否需要转换
 * @param {char} symbol  需要转换的符号
 */
export function transformValueAndLabel(arr, transform, isSplicing = true, symbol = '⭐') {

  return new Promise((resolve) => {
    const newArr = arr.map(item => {
      let str = ''
      for (let i of transform) {
        str += symbol + item[i]
      }
      return {
        value: isSplicing ? `${str.substr(1)}` : ((item[transform[1]] && item[transform[1]].toString()) || 'null'),
        label: (item[transform[0]] && item[transform[0]].toString()) || 'null'
      }
    })
    resolve(newArr)
  })

}
/**
 *
 * @param {*} str 字符串
 * @param {*} symbol 符号
 * @param {*} arr  需要转成对象的key
 */
export function decomposeStringToJson(str, arr, symbol = '⭐') {
  if (str) {
    let a = str.split(symbol);
    var obj = {};
    a.map((item, index) => {
      obj[arr[index]] = item
    })
  } else {
    var obj = {};
    arr.map(item => {
      obj[item] = ''
    })
  }
  return obj

}



/**
 *
 * @param {*} obj
 * @param {*} callback
 */
export function globalMessage(obj, callback) {
  this.$bus.$confirm(obj.text, '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    callback()
  }).catch(() => {

  });

}

export function deepCloneClear(origin) {
  //target是否存在如果不存在创建空对象
  let target = {},
    //判断是否为引用数据类型
    toStr = Object.prototype.toString,
    arrType = '[object Array]';

  for (let key in origin) {
    //剥离原型链的数据
    if (origin.hasOwnProperty(key)) {
      //判断是否为引用数据类型 对象或数组
      if (typeof (origin[key]) === 'object' && origin[key] !== null) {
        if (toStr.call(origin[key]) === arrType) {
          target[key] = [];
        } else {
          target[key] = {};
        }
        deepCloneClear(origin[key]);
      } else {
        target[key] = '';
      }
    }
  }
  return target;
}

/**
 *  验证手机号
 * @param rule
 * @param value 手机号
 * @param callback 回调
 */
export function checkPhone(rule, value, callback) {
  let reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  if (value && !reg.test(value)) {
    return callback(new Error('手机号码格式错误'))
  } else {
    return callback()
  }
}
/**
 *  验证邮箱
 * @param rule
 * @param value 邮箱号码
 * @param callback 回调
 */
export function checkEmail(rule, value, callback) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value && !reg.test(value)) {
    return callback(new Error('邮箱号码格式错误'))
  } else {
    return callback()
  }
}
/**
 *
 * @param {*} url 下载地址
 * @param {*} params 参数
 * @param {*} filename 文件名称
 */
export function exportFile(url, params, filename) {

  let param = Qs.stringify(params)
  let token = Cookies.get('token');
  var xmlResquest = new XMLHttpRequest();
  xmlResquest.open("GET", url + `?${param}`, true);
  xmlResquest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlResquest.setRequestHeader("Authorization", token);
  xmlResquest.responseType = "blob";
  //下载成功触发的事件
  xmlResquest.onload = function (oEvent) {
    var content = xmlResquest.response;
    var elink = document.createElement('a');
    elink.download = filename;
    elink.style.display = 'none';
    var blob = new Blob([content]);
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
  };
  xmlResquest.send();
}
/**
 *
 * @param {*} target
 * @param {*} name
 */
export function cutValue(target) {
  let tHeaderName = [], tHeaderValue = []
  for (let key in target) {
    tHeaderName.push(target[key])
    tHeaderValue.push(key)
  }
  // console.log(target,tHeaderName,tHeaderValue)
  return { tHeaderName, tHeaderValue }
}

/**
 *  当月起始日期
 * @returns {string}
 */
export function getMonthFirst() {
  var date = new Date();
  date.setDate(1);
  var month = parseInt(date.getMonth() + 1);
  var day = date.getDate();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return date.getFullYear() + '-' + month + '-' + day
}

/**
 *  当前日期
 * @returns {string}
 */
export function getMonthLast() {
  var date = new Date();
  var month = parseInt(date.getMonth() + 1);
  var day = date.getDate();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return date.getFullYear() + '-' + month + '-' + day
}

/**
 * 获取当月最后一天
 */
export function getEndMonthLast() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var day = new Date(year, month, 0);
  return year + '-' + month + '-' + day.getDate()
}

/**
 *  构造动态生成router
 */

export function createRouter(v) {
  const router = arr => {
    return arr.map(item => {
      let tempteComponent = CONPONENT_ENTIY[item.nameEn] || {};
      const isHttp = /http/gi.test(item.link);
      if (isHttp && !('component' in tempteComponent)) {
        tempteComponent = {
          ...HTTP_REPORTS,
          meta: [{
            name: 'main',
            title: '首页'
          }, {
            name: '',
            title: item.name
          }]
        }
      }

      let obj = {
        props: true,
        path: (tempteComponent && tempteComponent.params) ? `${item.nameEn}/:${tempteComponent.params}` : item.nameEn,
        name: item.nameEn,
        component: (tempteComponent && tempteComponent.component) || _Component,
        meta: (tempteComponent && tempteComponent.meta) || [],
        children: []
      };
      if (item.children && item.children.length > 0) {
        obj.children = router(item.children);
      }
      return obj;
    });
  };
  const route = router(v);

  return route
}
/**
 * 判断相关附件都上传了
 */
export function getStatus(data) {
  let isOk = true, nameList = [];
  data.filter((item) => {
    if (!item.list || item.list.length === 0) {
      isOk = false
      nameList.push(item.bizSubType)
      return isOk, nameList
    }
  })
  if (!isOk) {
    v.$message.error(nameList.toString() + "类型附件必传");
  }
  return isOk
}
/**
 * 打开新页面地址
 * @param {link} item  url 地址
 */
export function openTargetWebUrl(item) {
  const jumpSystem = document.querySelector("#jumpSystem");
  if (jumpSystem) {
    a.setAttribute("href", item.link);
    jumpSystem.click();
  } else {
    const a = document.createElement("a");
    a.setAttribute("id", "jumpSystem");
    a.setAttribute("target", "_blank");
    a.setAttribute("href", item.link);
    a.click();
  }
}

/**
 * 申请撤回
 */
export async function recallApplyCommon(id, routeName) {

  let _name = await new Promise(resolve => {
    for (let name in projectType) {
      if (projectType[name] === routeName) {
        resolve(name);
      }
    }
  })
  return new Promise(async (resolve) => {
    const { code } = await allNarmalInterface({}, `/service/project/wf/cancel?bizId=${id}&bizType=${_name}`, 'delete');
    if (code === 1) {
      resolve(true)
    } else {
      resolve(false)
    }
  }).catch(e => e)

}

/**
    * 拖动排序
    * @param id  对应节点id dom
    * @param xTable 对应table ref
    * @param source 数据源
    */
export function rowDrop(id, xTable, source, _this) {
  _this.$nextTick(() => {
    const el = xTable.$el.querySelector(`#${id} .el-table__body> tbody`);
    new Sortable(el, {
      handle: '.handler-move-item',
      animation: 350,
      onEnd: ({ newIndex, oldIndex }) => {
        let currRow = source.splice(oldIndex, 1)[0];
        source.splice(newIndex, 0, currRow);
      },
      onStart: (/**Event*/ evt) => {
        evt.oldIndex; // element index within parent
      }
    });
  });
}

/**
 *
 * @param {*} options 下拉框元数据
 * @param {*} str 带有星的字符串
 * @param {*} arr  需要转换的key
 */
export function selectNotDataOption(options, str, arr = ["label", "value"]) {
  if (!Array.isArray(options)) return;
  if (Array.isArray(str)) {
    str.map(it => {
      optionsData(options, it, arr)
    })
  } else {
    optionsData(options, str, arr)
  }
  return options;

}

function optionsData(options, str, arr) {
  let bool = options.some(item => item.value === str);
  if (!bool) {
    const obj = decomposeStringToJson(str, arr)
    options.push({
      [arr[0]]: obj[arr[0]],
      [arr[1]]: str
    })
  }
}

/**
   *获取项目列表.获取
   */
export function findProjectByNumberItem(projectNumber) {

  return new Promise(resolve => {
    getProjectList(
      {
        statusCode: 2005104,
        pageNum: 1,
        pageSize: -1
      },
      "confirm"
    ).then(({ code, data }) => {
      if (code === 1) {
        let obj = data.find(
          item => item.projectNumber === projectNumber
        );
        resolve(obj)
      }
    })

  })

}

export function findProjectMembersByNumberItem(projectId) {
  return new Promise(resolve => {
    getMemberList(
      {
        projectId: projectId,
      },
      "confirm/members"
    ).then(({ code, data }) => {
      if (code === 1) {
        let obj = data.find(
          item => item.approveFlag === 1
        );
        resolve(obj)
      }
    })

  })
}


export function findNodeByNumberItem(projectId) {
  return new Promise(resolve => {
    getNodeList(
      {
        projectId: projectId,
      },
      "confirm/node"
    ).then(({ code, data }) => {
      if (code === 1) {
        resolve(data)
      }
    })
  })
}

export function userLoginWatch(n, home, _this) {
  const menu = (n && n[0]) || "";
  if (!menu) {
    _this.$message({
      type: "error",
      message: "您未申请相关权限，请联系管理员"
    });
    _this.loading = false;
    return;
  }
  const item = (menu.children && menu.children[0]) || menu;
  const isHttp = /http/gi.test(item.link);

  // const p = home ? { name: 'home' } : {
  //   name: isHttp ? "tempReport" : item.nameEn,
  //   params: isHttp ? { guid: item.guid } : {}
  // };
  const p = {
    name: isHttp ? "tempReport" : item.nameEn,
    params: isHttp ? { guid: item.guid } : {}
  };
  const route = createRouter(n);
  mainRouter.children = route;
  _this.$router.options.isAdd = true;
  _this.$router.addRoutes([mainRouter]);
  //  _this.$router.push(p);
  //调取当前路由下的地址权限
  Cookies.set("currentGuid", item.guid);
  _this.$store.dispatch("setFunJurisdiction", item.guid);
  _this.loading = false;
  return p;
}
function killCodeAndName(list, keys) {
  let _temp = {};
  keys.map(key => {
    _temp[key] = [];
  })
  list.map(item => {
    const _split = item.split("⭐");
    _split.map((i, index) => {
      _temp[keys[index]].push(i)
    })
  })
  return _temp;
}
export const changeMoreListWord = (formData) => {

  // 关键字
  let _tempKeyWordList = [...new Set((formData?.keyWordsList || '').toString().split(','))]
  const { keyWords, keyWordsCode } = killCodeAndName(
    _tempKeyWordList || [],
    ["keyWords", "keyWordsCode"]
  );

  //产品关键词
  let _tempKeyWordsProList = [...new Set((formData?.keyWordsProList || '').toString().split(','))]
  const { keyWordsPro, keyWordsCodePro } = killCodeAndName(
    _tempKeyWordsProList || [],
    ["keyWordsPro", "keyWordsCodePro"]
  );


  //关联外部项目
  const { projectNumber, projectId } = killCodeAndName(
    formData.projectList || [],
    ["projectName", "projectNumber", "projectId"]
  );





  // let { field = '', fieldCode = '' } = decomposeStringToJson(formData?.field || '', [
  //   "field",
  //   "fieldCode"
  // ]);

  const { field, fieldCode } = killCodeAndName(
    formData?.fieldList || [],
    ["field", "fieldCode"]
  );


  //关联内部项目
  let projectNameIn = decomposeStringToJson(formData?.projectInString || '', [
    "projectNameIn",
    "projectNumberIn",
    "projectIdIn"
  ]);

  //关联外部项目
  formData.projectId = projectId.toString();
  formData.projectNumber = projectNumber.toString();
  // 技术关键词
  formData.keyWords = keyWords.toString();
  formData.keyWordsCode = keyWordsCode.toString();
  //产品关键词
  formData.keyWordsPro = keyWordsPro.toString();
  formData.keyWordsCodePro = keyWordsCodePro.toString();

  //研究方向
  formData.field = field.toString();
  formData.fieldCode = fieldCode.toString();


  return { ...formData, ...projectNameIn };

}

/**
    * 审核 跳转
    */
export function routerJump(item, code = {}, cardName) {
  console.log(item,'---',cardName)
  let type = "";

  if (["NOTICE_TYPE", "MESSAGE_TYPE"].includes(cardName)) {
    type = item.operateFlag.charAt()==='W' ? 'edit' : 'view'
  } else {

    if (item.bizStatusCode === "2005103" && item.taskId) {
      type = "auditing";
    } else if (item.bizStatusCode === "2005105") {
      type = "edit";
    } else {
      type = "view";
    }
  }

  route.push({
    name: projectType[item.bizType],
    query: {
      approveIndex: item.approveIndex,
      type,
      id: item.bizId,
      taskId: item.taskId,
      bizType: item.bizType,
      codeType: item.bizStatusCode,
      ...code
    }
  });
}

// function clone(origin){
//   let originProto=Object.getPrototypeOf(origin);
//   return Object.assign(Object.create(originProto),origin);
// }
