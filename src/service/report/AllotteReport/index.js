import service from '@/utils/request'
// import Qs from 'qs'
/* eslint-disable */
//---------------------------项目任务详细信息---------------------------------
/**
 *
 * @param  params
 */
export function getList(params = {}) {
    return service.get('/service/allotte_report/list', {params});
}
