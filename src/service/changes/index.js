import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------项目申报---------------------------------
/**
 * 获取变更列表
 * @param  params 
 */
export function getChangesList(params = {}) {
    return service.get('service/project/changes/list', {params}).then(res => res.data);
}

/**
 * 新增变更
 * @param {*} params 
 */
export function addProjectChanges(params = {}) {
    return service.post('service/project/changes', params).then(res => res.data);
}

/**
 * 修改变更
 * @param {*} params 
 */
export function updateProjectChanges({id,params}) {
    return service.put(`service/project/changes/${id}`, params).then(res => res.data);
}

/**
 * 删除变更
 * @param {*} params 
 */
export function deleteProjectChanges(params = {}) {
    return service.delete(`service/project/changes/${params.id}`, params).then(res => res.data);
}

/**
 *  查询详细
 * @param {*} params 
 */
export function getProjectChangesDetails(params = {}) {
    return service.get(`service/project/changes/details/${params.id}`, params).then(res => res.data);
}