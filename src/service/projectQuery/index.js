
/**
 * 公共接口地址
 */
import service from '@/utils/request'
/* eslint-disable */
/**
 * 根据条件获取列表信息 
 * @param  params 
 */
export function getProjectQueryList(params = {}) {
    return service.get('/service/project/projectQuery/list', { params }).then(res => res.data);
}

export function getMainPersonInfo(params = {}) {
    return service.get('/service/project/projectQuery/mainPersonInfo', { params }).then(res => res.data);
}

export function getAchievementInfo(params = {}) {
    return service.get('/service/project/projectQuery/achievementInfo', { params }).then(res => res.data);
}


export function getDocumentList(params = {}) {
    return service.get('/service/project/projectQuery/documentInfo', { params }).then(res => res.data);
}

export function getBudgetInfo(params ={}) {
    return service.get('/service/project/projectQuery/budgetInfo', { params }).then(res => res.data);
}

export function getFundsSource(params = {}) {
    return service.get('/service/project/projectQuery/fundsInfo',{ params }).then(res => res.data);
}