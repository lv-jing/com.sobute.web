
/**
 * 项目考核
 */
import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------项目考核---------------------------------
/**
 * 根据条件获取列表信息 
 * @param  params 
 */
export function getExamineList(params = {}) {
    return service.get('/service/project/examine/list', { params }).then(res => res.data);
}

/**
 * 根据条件删除
 * @param  params 
 */
export function getExamineDelete(params = {}) {
    return service.delete(`/service/project/examine/${params.id}`).then(res => res.data);
}
/**
 * 新增
 * @param  params 
 */
export function addExamineItem(params = {}) {
    return service.post(`/service/project/examine`, params).then(res => res.data);
}
/**
 * 修改
 * @param  params 
 */
export function updateExamineItem(params = {}) {
    return service.put(`/service/project/examine/${params.id}`, params).then(res => res.data);
}
/**
 *  查询详细
 * @param {*} params 
 */
export function getExamineDetails(params = {}) {
    return service.get(`/service/project/examine/details/${params.id}`).then(res => res.data);
}
/**
 *  查询proList 由原来的selectList ====换成list
 * @param {*} params
 */
// export function getProList(params = {}) {
//     return service.get('/service/project/confirm/selectList',{params}).then(res => res.data);
// }
export function getProList(params = {}) {
    return service.get('/service/project/confirm/selectList',{params}).then(res => res.data);
}

/**
 *  查询考核内容
 * @param {*} params
 */
export function getTaskList(params = {}) {
    return service.get('/service/project/task/selectlist',{params}).then(res => res.data);
}
//---------------------------个人考核---------------------------------

/**
 * 根据条件获取列表信息
 * @param  params
 */
export function getPersonList(params = {}) {
    return service.get('/service/person/examine/list', { params }).then(res => res.data);
}

/**
 * 根据条件删除
 * @param  params
 */
export function getPersonDelete(params = {}) {
    return service.delete(`/service/person/examine/${params.id}`).then(res => res.data);
}
/**
 * 新增
 * @param  params
 */
export function addPersonItem(params = {}) {
    return service.post(`/service/person/examine`, params).then(res => res.data);
}
/**
 * 修改
 * @param  params
 */
export function updatePersonItem(params = {}) {
    return service.put(`/service/person/examine/${params.id}`, params).then(res => res.data);
}
/**
 *  查询详细
 * @param {*} params
 */
export function getPersonDetails(params = {}) {
    return service.get(`/service/person/examine/details/${params.id}`).then(res => res.data);
}

/**
 *判断当前用户是否是个人考核管理员（返回true-管理员，false-普通用户）
 * @param {*} params
 */
export function getIsUser(params = {}) {
    return service.get(`/service/person/examine/user-type`, params).then(res => res.data);
}

/**
 *判断当前用户是否是项目考核管理员（返回true-管理员，false-普通用户)
 * @param {*} params
 */
export function getIsUsers(params = {}) {
    return service.get(`/service/project/examine/user-type`, params).then(res => res.data);
}


