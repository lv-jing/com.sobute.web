import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------项目任务详细信息---------------------------------
/**
 * 获取项目任务详细信息列表
 * @param  params
 */
export function getList(params = {}) {
    return service.get('/service/permission_report/list', {params});
}
