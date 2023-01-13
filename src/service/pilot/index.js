
/**
 * 中试/试生产接口
 */
import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------中试/试生产---------------------------------
/**
 * 根据条件获取列表信息 
 * @param  params 
 */
export function getPilotList(params = {}) {
    return service.get('/service/project/pilot-run/list', { params }).then(res => res.data);
}

/**
 * 根据条件获取中试列表信息
 * @param  params
 */
export function getPilotTestList(params = {}) {
    return service.get('/service/project/pilotTest/list', { params }).then(res => res.data);
}

/**
 * 根据条件获取新产品评价列表信息
 * @param  params
 */
export function getEvaluationList(params = {}) {
    return service.get('/service/project/evaluation/list', { params }).then(res => res.data);
}
/**
 * 根据条件获取工艺管理列表信息
 * @param  params
 */
export function getProcessList(params = {}) {
    return service.get('/service/project/processManagement/list', { params }).then(res => res.data);
}
/**
 * 根据条件获取试生产列表信息
 * @param  params
 */
export function getPilotProductionList(params = {}) {
    return service.get('/service/project/pilotProduction/list', { params }).then(res => res.data);
}

/**
 * 根据条件删除
 * @param  params 
 */
export function getPilotDelete(params = {}) {
    return service.delete(`/service/project/pilot-run/${params.id}`).then(res => res.data);
}

/**
 * 根据条件删除中试
 * @param  params
 */
export function getPilotTestDelete(params = {}) {
    return service.delete(`/service/project/pilotTest/${params.id}`).then(res => res.data);
}

/**
 * 根据条件删除试生产
 * @param  params
 */
export function getPilotProductionDelete(params = {}) {
    return service.delete(`/service/project/pilotProduction/${params.id}`).then(res => res.data);
}

/**
 * 根据条件删除工艺管理
 * @param  params
 */
export function getProcessDelete(params = {}) {
    return service.delete(`/service/project/processManagement/${params.id}`).then(res => res.data);
}


/**
 * 根据条件删除新产品评价
 * @param  params
 */
export function getEvaluationDelete(params = {}) {
    return service.delete(`/service/project/evaluation/${params.id}`).then(res => res.data);
}
/**
 * 新增
 * @param  params 
 */
export function addPilotItem(params = {}) {
    return service.post(`/service/project/pilot-run`, params).then(res => res.data);
}

/**
 * 新增中试
 * @param  params
 */
export function addPilotTestItem(params = {}) {
    return service.post(`/service/project/pilotTest`, params).then(res => res.data);
}

/**
 * 新增试生产
 * @param  params
 */
export function addPilotProductionItem(params = {}) {
    return service.post(`/service/project/pilotProduction`, params).then(res => res.data);
}


/**
 * 新增新产品评价
 * @param  params
 */
export function addEvaluationItem(params = {}) {
    return service.post(`/service/project/evaluation`, params).then(res => res.data);
}
/**
 * 新增工艺管理
 * @param  params
 */
export function addProcessItem(params = {}) {
    return service.post(`/service/project/processManagement`, params).then(res => res.data);
}
/**
 * 修改
 * @param  params 
 */
export function updatePilotItem(params = {}) {
    return service.put(`/service/project/pilot-run/${params.id}`, params).then(res => res.data);
}

/**
 * 修改中试
 * @param  params
 */
export function updatePilotTestItem(params = {}) {
    return service.put(`/service/project/pilotTest/${params.id}`, params).then(res => res.data);
}


/**
 * 修改试生产
 * @param  params
 */
export function updatePilotProductionItem(params = {}) {
    return service.put(`/service/project/pilotProduction/${params.id}`, params).then(res => res.data);
}

/**
 * 修改新产品评价
 * @param  params
 */
export function updateEvaluationItem(params = {}) {
    return service.put(`/service/project/evaluation/${params.id}`, params).then(res => res.data);
}
/**
 * 修改工艺管理
 * @param  params
 */
export function updateProcessItem(params = {}) {
    return service.put(`/service/project/processManagement/${params.id}`, params).then(res => res.data);
}
/**
 *  查询详细
 * @param {*} params 
 */
export function getPilotDetails(params = {}) {
    return service.get(`/service/project/pilot-run/details/${params.id}`).then(res => res.data);
}

/**
 *  查询中试详细
 * @param {*} params
 */
export function getPilotTestDetails(params = {}) {
    return service.get(`/service/project/pilotTest/details/${params.id}`).then(res => res.data);
}

/**
 *  查询新产品评价详细
 * @param {*} params
 */
export function getEvaluationDetails(params = {}) {
    return service.get(`/service/project/evaluation/details/${params.id}`).then(res => res.data);
}
/**
 *  查询工艺管理详细
 * @param {*} params
 */
export function getProcessDetails(params = {}) {
    return service.get(`/service/project/processManagement/details/${params.id}`).then(res => res.data);
}
/**
 *  查询试生产详细
 * @param {*} params
 */
export function getPilotProductionDetails(params = {}) {
    return service.get(`/service/project/pilotProduction/details/${params.id}`).then(res => res.data);
}

/**
 *  基地
 * @param {*} params
 */
export function getOrganList(params = {}) {
    return service.get(`/service/project/organization/list`,{ params }).then(res => res.data);
}
/**
 *  相关任务
 * @param {*} params
 */
export function getTaskList(params = {}) {
    return service.get(`/service/project/task/selectlist`,{ params }).then(res => res.data);
}
/**
 *  查询子附件类型
 * @param {*} params
 */
export function getDictList(params = {}) {
    return service.get(`/service/dictionary/child`,{ params }).then(res => res.data);
}
/**
 *  判断当前用户是否是中试变更考核管理员（返回true-管理员，false-普通用户）
 * @param {*} params
 */
export function getUserType(params = {}) {
    return service.get(`/service/project/pilot-run/user-type`,{ params }).then(res => res.data);
}
