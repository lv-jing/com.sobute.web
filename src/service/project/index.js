
/**
 * 公共接口地址
 */
import service from '@/utils/request'
/* eslint-disable */
/**
 * 根据条件获取列表信息 
 * @param  params 
 */
export function getProjectList(params = {},interfaceName,dir="project/") {
    return service.get(`service/${dir}${interfaceName}/list`, { params }).then(res => res.data);
}

/**
 * 根据条件获取项目成员信息
 * @param  params
 */
export function getMemberList(params = {},interfaceName,dir="project/") {
    return service.get(`service/${dir}${interfaceName}/${params.projectId}`).then(res => res.data);
}

/**
 * 根据条件获取项目里程碑
 * @param  params
 */
export function getNodeList(params = {},interfaceName,dir="project/") {
    return service.get(`service/${dir}${interfaceName}/${params.projectId}`).then(res => res.data);
}
/**
 * 根据条件删除
 * @param  params 
 */
export function deleteProjectItem(params = {},interfaceName,dir="project/") {
    return service.delete(`service/${dir}${interfaceName}/${params.id}`).then(res => res.data);
}
/**
 * 新增
 * @param  params 
 */
export function createProjectItem(params = {},interfaceName,dir="project/") {
    return service.post(`service/${dir}${interfaceName}`, params).then(res => res.data);
}


/**
 * 生成试生产
 * @param  params
 */
export function createPilotProductionItem(params = {},interfaceName,dir="project/") {
    return service.post(`service/${dir}${interfaceName}`, params).then(res => res.data);
}
/**
 * 修改
 * @param  params 
 */
export function updateProjectItem({ id, params },interfaceName,dir="project/") {
    return service.put(`service/${dir}${interfaceName}${id?'/'+id:''}`, params).then(res => res.data);
}
/**
 *  查询详细
 * @param {*} params 
 */
export function getProjectDetails(params = {},interfaceName,dir="project/") {
    return service.get(`service/${dir}${interfaceName}/details/${params.id}`).then(res => res.data);
}
/**
 *  查询详细
 * @param {*} params 
 */
export function getProjectParamsItems(params={},interfaceName,dir="project/") {
    return service.get(`service/${dir}${interfaceName}`,{ params }).then(res => res.data);
}
/**
 *  判断当前用户是否是项目计划变更考核管理员（返回true-管理员，false-普通用户）
 * @param {*} params
 */
export function getUserType(params = {}) {
    return service.get(`/service/project/plan/user-type`,{ params }).then(res => res.data);
}

