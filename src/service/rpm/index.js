
/**
 * 工作流接口
 */
import service from '@/utils/request'



/**
 * 查询业务的审核历史 
 * @param  params 
 */
export function getApprovedHistoryList(params = {}) {
    return service.get('service/project/wf/approved-his', { params }).then(res => res.data);
}