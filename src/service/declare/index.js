import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------项目申报---------------------------------
/**
 * 根据条件获取列表信息
 * @param  params 
 */
export function getProjectList(params = {}) {
    return service.get('/service/project/confirm-apply/list', {params}).then(res => res.data);
}


/**
 *根据条件获取列表信息
 * @param {*} params
 */
export function getHrList(params = {}) {
    return service.get('/service/project/hr/list', {params}).then(res => res.data);
}
/**
 *根据条件获取相关单位列表信息
 * @param {*} params
 */
export function getcCooprateList(params = {}) {
    return service.get('/service/project/customer/list', {params}).then(res => res.data);
}
/**
 *新增记录
 * @param {*} params
 */
export function postAdddProject(params = {}) {
    return service.post('/service/project/confirm-apply', params).then(res => res.data);
}
/**
 *查询记录详情
 * @param {*} params
 */
export function getProDetail(params = {}) {
    return service.get(`/service/project/confirm-apply/details/${params.id}`, params).then(res => res.data);
}
/**
 *修改记录
 * @param {*} params
 */
export function updateProject(params = {}) {
    return service.put(`/service/project/confirm-apply/${params.id}`, params).then(res => res.data);
}
/**
 *删除记录
 * @param {*} params
 */
export function deleteProList(params = {}) {
    return service.delete(`/service/project/confirm-apply/${params.id}`, params).then(res => res.data);
}



/**
 * 判断当前用户是否是立项变更考核管理员（返回true-管理员，false-普通用户）
 * @param {*} params
 */
export function getUserType(params = {}) {
    return service.get('/service/project/confirm-apply/user-type', {params}).then(res => res.data);
}

 //  相关单位接口
/**
 *新增记录
 * @param {*} params
 */
export function postAddUnit(params = {}) {
    return service.post('/service/project/customer', params).then(res => res.data);
}
/**
 *修改记录
 * @param {*} params
 */
export function updateUnit(params = {}) {
    return service.put(`/service/project/customer/${params.id}`, params).then(res => res.data);
}

/**
 *删除记录
 * @param {*} params
 */
export function deleteUnit(params = {}) {
    return service.delete(`/service/project/customer/${params.id}`, params).then(res => res.data);
}

/**
 *根据条件参与人员
 * @param {*} params
 */
export function getHrListName(params = {}) {
    return service.get('/service/project/view-members/list', {params}).then(res => res.data);
}