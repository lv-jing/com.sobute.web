import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------项目成果---------------------------------
/**
 *根据条件获取列表信息
 * @param  params 
 */
export function getProjectList(params = {}) {
    return service.get('/service/project/achievement/list', {params}).then(res => res.data);
}
/**
 *删除记录
 * @param {*} params
 */
export function deleteProList(params = {}) {
    return service.delete(`/service/project/achievement/${params.id}`, params).then(res => res.data);
}

/**
 * 关联项目（状态为已审核） 
 * @param params
 * @returns {Promise<any> | PromiseLike<any>}
 */
export function getProject(params = {}) {
    return service.get('/service/project/confirm/selectList', {params}).then(res => res.data);
}

//---------------------------项目成果 期刊论文---------------------------------

/**
 *新增记录
 * @param {*} params
 */
export function postAddPeriodical(params = {}) {
    return service.post('/service/project/achievement/periodical', params).then(res => res.data);
}

/**
 *期刊论文详情
 * @param {*} params
 */
export function getPeriodicalDetail(params = {}) {
    return service.get(`/service/project/achievement/periodical/details/${params.id}`, params).then(res => res.data);
}

/**
 * 期刊论文修改
 * @param {*} params
 */
export function updatePeriodical(params = {}) {
    return service.put(`/service/project/achievement/periodical/${params.id}`, params).then(res => res.data);
}
//---------------------------项目成果 会议论文---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddMeeting(params = {}) {
    return service.post('/service/project/achievement/meet', params).then(res => res.data);
}

/**
 * 修改
 * @param {*} params
 */
export function updateMeeting(params = {}) {
    return service.put(`/service/project/achievement/meet/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getMeetingDetail(params = {}) {
    return service.get(`/service/project/achievement/meet/details/${params.id}`, params).then(res => res.data);
}

//---------------------------项目成果 成果鉴定---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddVerified(params = {}) {
    return service.post('/service/project/achievement/verified', params).then(res => res.data);
}

/**
 * 修改
 * @param {*} params
 */
export function updateVerified(params = {}) {
    return service.put(`/service/project/achievement/verified/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getVerifiedDetail(params = {}) {
    return service.get(`/service/project/achievement/verified/details/${params.id}`, params).then(res => res.data);
}
//---------------------------项目成果 标准规范---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddStandard(params = {}) {
    return service.post('/service/project/achievement/standard', params).then(res => res.data);
}

/**
 * 修改
 * @param {*} params
 */
export function updateStandard(params = {}) {
    return service.put(`/service/project/achievement/standard/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getStandardDetail(params = {}) {
    return service.get(`/service/project/achievement/standard/details/${params.id}`, params).then(res => res.data);
}
//---------------------------项目成果 学术专著---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddLearning(params = {}) {
    return service.post('/service/project/achievement/learning', params).then(res => res.data);
}

/**
 * 修改
 * @param {*} params
 */
export function updateLearning(params = {}) {
    return service.put(`/service/project/achievement/learning/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getLearningDetail(params = {}) {
    return service.get(`/service/project/achievement/learning/details/${params.id}`, params).then(res => res.data);
}

//---------------------------项目成果 应用证明---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddApp(params = {}) {
    return service.post('/service/project/achievement/app', params).then(res => res.data);
}

/**
 * 修改
 * @param {*} params
 */
export function updateApp(params = {}) {
    return service.put(`/service/project/achievement/app/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getAppDetail(params = {}) {
    return service.get(`/service/project/achievement/app/details/${params.id}`, params).then(res => res.data);
}

//---------------------------项目成果 软件著作---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddSoftware(params = {}) {
    return service.post('/service/project/achievement/software', params).then(res => res.data);
}

/**
 * 修改
 * @param {*} params
 */
export function updateSoftware(params = {}) {
    return service.put(`/service/project/achievement/software/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getSoftwareDetail(params = {}) {
    return service.get(`/service/project/achievement/software/details/${params.id}`, params).then(res => res.data);
}

//---------------------------项目成果 人才/资质/奖励/专利奖---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddReward(params = {}) {
    return service.post('/service/project/achievement/reward', params).then(res => res.data);
}

/**
 * 修改
 * @param {*} params
 */
export function updateReward(params = {}) {
    return service.put(`/service/project/achievement/reward/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getRewardDetail(params = {}) {
    return service.get(`/service/project/achievement/reward/details/${params.id}`, params).then(res => res.data);
}

//---------------------------专利---------------------------------
/**
 *新增
 * @param {*} params
 */
export function postAddPatent(params = {}) {
    return service.post('/service/project/achievement/patent', params).then(res => res.data);
}

// /**
//  * 修改
//  * @param {*} params
//  */
export function updatePatent(params = {}) {
    return service.put(`/service/project/achievement/patent/${params.id}`, params).then(res => res.data);
}

// /**
//  *详情
//  * @param {*} params
//  */
export function getPatentDetail(params = {}) {
    return service.get(`/service/project/achievement/patent/details/${params.id}`, params).then(res => res.data);
}

//---------------------------知识产权---------------------------------
/**
 *根据条件获取列表信息
 * @param  params
 */
export function getRpmList(params = {}) {
    return service.get('/service/project/rpmRtPatentHeaders/list', {params}).then(res => res.data);
}
/**
 *新增
 * @param {*} params
 */
export function postAddRpm(params = {}) {
    return service.post('/service/project/rpmRtPatentHeaders', params).then(res => res.data);
}
/**
 *删除
 * @param {*} params
 */
export function deleteRpm(params = {}) {
    return service.delete(`/service/project/rpmRtPatentHeaders/${params.id}`, params).then(res => res.data);
}
/**
 * 修改
 * @param {*} params
 */
export function updateRpm(params = {}) {
    return service.put(`/service/project/rpmRtPatentHeaders/${params.id}`, params).then(res => res.data);
}

/**
 *详情
 * @param {*} params
 */
export function getRpmDetail(params = {}) {
    return service.get(`/service/project/rpmRtPatentHeaders/details/${params.id}`, params).then(res => res.data);
}

/**
 *判断当前用户是否是专利管理员（返回true-管理员，false-普通用户）
 * @param {*} params
 */
export function getIsUser(params = {}) {
    return service.get(`/service/project/rpmRtPatentHeaders/user-type`, params).then(res => res.data);
}
/**
 *  判断当前用户是否是项目成果管理员（返回true-管理员，false-普通用户）
 * @param {*} params
 */
export function getUserType(params = {}) {
    return service.get(`/service/project/achievement/user-type`,{ params }).then(res => res.data);
}


