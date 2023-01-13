
import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------菜单管理---------------------------------
/**
 * 获取全部菜单无层级关系
 * @param  params 
 */
export function getMenuAllList(params = {}) {
    return service.get('service/resource/original-list', params).then(res => res.data);
}
/**
 * 获取全部菜单
 * @param {sysNameEn:系统英文名称} params 
 */
export function getResourceMenuAllList(params = {}) {
    return service.get('service/resource/all', params).then(res => res.data);
}
/**
 * 新增菜单
 * @param {*} params 
 */
export function addResourceMenu(params = {}) {
    return service.post('service/resource', params).then(res => res.data);
}
/**
 * 修改菜单
 * @param {*} params 
 */
export function updateResourceMenu(params = {}) {
    return service.put(`service/resource/${params.guid}`, params).then(res => res.data);
}
/**
 * 删除菜单
 * @param {*} params 
 */
export function deleteResourceMenu(params = {}) {
    return service.delete(`service/resource/${params.guid}`).then(res => res.data);
}

/**
 * 根据角色获取权限点
 * @param {*} params 
 */
export function getResourceRolesList(params = {}) {
    return service.get(`service/resource/role/${params.guid}`).then(res => res.data);
}
/**
 * 根据用户获取权限点
 * @param {*} params 
 */
export function getResourceUsersList(params = {}) {

    return service.get(`service/resource/user/${params.guid}`).then(res => res.data);
}

/**
 * 根据菜单 guid 查找数据
 * @param {*} params 
 */
export function getResourceFindMenuItem(params = {}) {

    return service.get(`service/resource/auth`,{params}).then(res => res.data);
}

//******************系统参数************************************ */

/**
 * 查询列表
 * @param {*} params 
 */
export function getParamConfigList(params = {}) {
    return service.get(`service/param/list`, {params}).then(res => res.data);
}

/**
 * 新增
 * @param {*} params 
 */
export function addParamConfig(params = {}) {
    return service.post(`service/param`, params).then(res => res.data);
}
/**
 * 编辑
 * @param {*} params 
 */
export function updateParamConfig(params = {}) {
    return service.put(`service/param/${params.guid}`, params).then(res => res.data);
}
/**
 * 删除
 * @param {*} params 
 */
export function deleteParamConfig(params = {}) {
    return service.delete(`service/param/${params.guid}`, params).then(res => res.data);
}

//******************数据字典************************************ */

/**
 * 查询列表
 * @param {*} params 
 */
export function getDictionaryList(params = {}) {
    return service.get(`service/dictionary/list`, {params}).then(res => res.data);
}

/**
 * 新增
 * @param {*} params 
 */
export function addDictionary(params = {}) {
    return service.post(`service/dictionary`, params).then(res => res.data);
}
/**
 * 编辑
 * @param {*} params 
 */
export function updateDdictionary(params = {}) {
    return service.put(`service/dictionary/${params.guid}`, params).then(res => res.data);
}
/**
 * 删除
 * @param {*} params 
 */
export function deleteDdictionary(params = {}) {
    return service.delete(`service/dictionary/${params.guid}`, params).then(res => res.data);
}
/**
 * 根据字典类型编码查询
 * @param {*} params 
 */
export function getDictionaryTypeCode(params = {}) {
    return service.get(`service/dictionary/type-code`,{params}).then(res => res.data);
}

/**
 * 根据字典名称编询
 * @param {*} params 
 */
export function getDictionaryTypeName(params = {}) {
    return service.get(`service/dictionary/type-name`,{params}).then(res => res.data);
}

//******************角色管理************************************ */

/**
 * 查询列表
 * @param {*} params 
 */
export function getRolesList(params = {}) {
    return service.get(`service/role/list`, {params}).then(res => res.data);
}

/**
 * 新增
 * @param {*} params 
 */
export function addRoles(params = {}) {
    return service.post(`service/role`, params).then(res => res.data);
}
/**
 * 配置权限
 * @param {*} params 
 */
export function addRolesConfig(params = {}) {
    return service.post(`service/role/${params.guid}`, {list:params.resList}).then(res => res.data);
}
/**
 * 获取角色权限
 * @param {*} params 
 */
export function getResourceRoleConfig(params = {}) {
    return service.get(`service/resource/role/${params.guid}`, {resGuids:params.resGuids}).then(res => res.data);
}
/**
 * 编辑
 * @param {*} params 
 */
export function updateRoles(params = {}) {
    return service.put(`service/role/${params.guid}`, params).then(res => res.data);
}
/**
 * 删除
 * @param {*} params 
 */
export function deleteRoles(params = {}) {
    return service.delete(`service/role/${params.guid}`).then(res => res.data);
}
/**
 * 查询用户角色
 */
export function getUserRoles(params = {}) {
    return service.get(`service/role/user/${params.guid}`).then(res => res.data);
}

/**
 *  获取所有数据字典类型
 */
export function getDictType(params={}) {
    return service.get(`/service/dictionary/type`).then(res => res.data);
}