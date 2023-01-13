import service from '@/utils/request'

// let url='http://192.168.101.40:19090/dtt-project'; // 开发环境ip地址 web登录地址 ip+6060 dev
// let url = 'http://221.226.99.246:9090/dtt-project'; // 测试环境地址web登录地址 ip+8080 tset
// let url = 'http://192.168.101.41/dtt-project'; // 正式环境地址web登录地址
let url = '/dtt-project'; // 测试环境地址web登录地址 ip+8080 tset
// 正式环境地址web登录地址
export const downloadUrl = url;
// import Qs from 'qs'
/* eslint-disable */


//---------------------------公共接口---------------------------------
/**
 * 获取申报列表
 * @param  params
 */
export function getApproveDefaultPerson(params = {}) {
    return service.get('service/project/approve/approve-person', {params}).then(res => res.data);
}

/**
 * 查询审核人信息（同时在用户表中存在）
 * @param  params
 */
export function getHrList(params = {}) {
    return service.get('/service/project/hr/approve-list', {params}).then(res => res.data);
}

/**
 * 上传头像
 * @param  params
 */
export const getAvatarUploadUrl = url + '/service/attachment/avatar'


/**
 * 上传附件
 * @param  params
 */
export const getUploadUrl = url + '/service/attachment';

/**
 * 成果导入
 * @param  params
 */
export const getUpLoadExcel = url + '/service/project/achievement/upLoadExcel';

/**
 * 专利导入
 * @param  params
 */
export const getPatentExcel = url + '/service/project/rpmRtPatentHeaders/upLoadExcel';

/**
 * 相关单位导入
 * @param  params
 */
export const getCustomerExcel = url + '/service/project/customer/upLoadExcel';

/**
 * 个人考核导出
 * @param  params
 */
export const getDownAssExcel = url + '/service/person/examine/downLoadWord';
/**
 * 个人考核导入
 * @param  params
 */
export const getUpLoadAssExcel = url + '/service/person/examine/upLoadExcel';

/**
 *  判断任务是否存在子任务
 * @param {*} params
 */
export function isCheckChildTask(params = {}) {
    return service.get(`service/project/task/check-children/${params.id}`).then(res => res.data);
}

/**
 * 进行审核操作
 * @param {*} params
 */
export function updateAoorove(params = {}) {
    return service.put('/service/project/wf/approve', params).then(res => res.data);
}

/**
 *  判断任务是否存在子任务
 * @param {*} params
 */
export function getDocumentList(params = {}) {
    return service.get('/service/attachment/list', {params}).then(res => res.data);
}


/**
 *  查询责任人（一级任务的责任人只能选择项目成员里的人员。 子级任务的责任人只能选择父级任务里的责任人）
 * @param {*} params
 */
export function getDutyPersonList(params = {}) {
    return service.get('/service/hr/duty-person', {params}).then(res => res.data);
}


/**
 *  建议word导出
 * @param {*} params
 */
export const getDownLoadWord = url + '/service/project/apply/downLoadWord/';

// 项目申请导出
export const getDownApply = url + '/service/project/confirm-apply/downLoadWord/';

// 项目计划导出
export const getDownPlan = url + '/service/project/plan/downLoadWord/'

/**
 *项目立项word导出
 * @param {*} params
 */
export const getDownLoadWords = url + '/service/project/confirm/downLoadWord/'

/**
 *(项目考核)Word导出
 * @param {*} params
 */
export const getAssessUrl = url + '/service/project/examine/downLoadWord/'
/**
 * (个人考核)Word导出
 * @type {string}
 */
export const getDownLoadWordsPersonAssess = url + '/service/person/examine/downWord/'

/**
 *  获取树状层次数据
 * @param {*} params
 */
export function getDictionaryTree(params = {}) {
    return service.get('/service/dictionary/tree', {params}).then(res => res.data);
}


/**
 *  根据项目类型code查询必传附件
 * @param {*} params
 */
export function getTypeUpload(params = {}) {
  return service.get('/service/dictionary/intersection', {params}).then(res => res.data);
}


/**
 *  通用接口
 * @param {*} params
 */
export function allNarmalInterface(params = {}, interfaceName, method = 'post') {
    return service[method](interfaceName, params).then(res => res.data);
}

//上传图片
export function uploadImageService(params) {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: [function (data) {
      return data;
    }],
  }
    return service.post('/service/attachment', params, config).then(res => res.data).catch(error => {
        console.warn(error)
    })

}