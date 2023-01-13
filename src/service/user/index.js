
/* eslint-disable */
import service from '@/utils/request'
import Qs from 'qs';
const formDataConfig={
    transformRequest: [function (data) {
        let serizeData = Qs.stringify(data);
        return serizeData;
    }],
    transformResponse: [function (data) {
        let serizeData = Qs.parse(data);
        return serizeData;
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}


/**
 * 获取验证码
 * @param {*} params 
 */
export function getVerifyCode(params = {}) {
    return service.get('verify-code', params, {}).then(res => res.data);
}
/**
 * 用户注册
 * @param {*} params 
 */
export function userRegister(params = {}) {
    return service.post('register', params).then(res => res.data);
}
/**
 * 用户登录
 * @param {*} params 
 */
export function userLogin(params = {}) {
    return service.post('login', params, {
        transformRequest: [function (data) {
            let serizeData = Qs.stringify(data);
            return serizeData;
        }],
        transformResponse: [function (data) {
            let serizeData = Qs.parse(data);
            return serizeData;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.data);
}
/**
 * 用户单点登录
 * @param {*} params 
 */
export function userAuthoLogin(params = {}) {
    return service.post('authorize', params, {
        transformRequest: [function (data) {
            let serizeData = Qs.stringify(data);
            return serizeData;
        }],
        transformResponse: [function (data) {
            let serizeData = Qs.parse(data);
            return serizeData;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.data);
}
/**
 * 获取全部用户（启用用户）
 * @param {*} params 
 */
 export  function getAllUserList(params = {}) {
    return service.get('service/user/list', {params}).then(res => res.data);
}

/**
 * 人员信息获取全部用户
 * @param {*} params
 */
export  function getAllUserInfoList(params = {}) {
    return service.get('service/user/userInfoList', {params}).then(res => res.data);
}

/**
 * 获取外部人员
 * @param {*} params
 */
export  function getAllOutsidersList(params = {}) {
    return service.get('service/outsiders/list', {params}).then(res => res.data);
}

/**
 * 新增用户
 * @param {*} params 
 */
export  function addUserInfo(params = {}) {
    return service.post('service/user', params).then(res => res.data);
}
/**
 * 修改用户
 * @param {*} params 
 */
export  function updateUserInfo(params = {}) {
    return service.put(`service/user/${params.guid}`,params).then(res => res.data);
}

/**
 * 修改外部人员
 * @param {*} params
 */
export  function updateOutsiderInfo(params = {}) {
    return service.put(`service/outsiders/update/${params.id}`,params).then(res => res.data);
}

/**
 * 启用停用系统用户
 * @param {*} params 
 */
export  function openOrStopUserStutas(params = {}) {
    return service.delete(`service/user/status/${params.guid}`,params).then(res => res.data);
}

/**
 * 删除用户
 * @param {*} params 
 */
export  function deleteUserInfo(params = {}) {
    return service.delete(`service/user/${params.guid}`).then(res => res.data);
}


/**
 * 删除外部人员
 * @param {*} params
 */
export  function deleteOutsiderInfo(params = {}) {
    return service.delete(`service/outsiders/delete/${params}`).then(res => res.data);
}
/**
 * 检查用户身份证号码
 * @param {*} params 
 */
export  function getUserIdCardInfo(params = {}) {
    return service.get(`api/check-idCard/${params.idCard}`).then(res => res.data);
}
/**
 * 修改秘密
 * @param {*} params 
 */
export  function updataUserPassword(params = {}) {
    return service.patch(`service/user/pwd/${params.guid}`,params,formDataConfig).then(res => res.data);
}

/**
 * 获取用户邮件信息
 */

export  function getUserEmailInfo(params = {}) {
    return service.post(`email/info`,params,formDataConfig).then(res => res.data);
}


/**
 * 发送邮件信息
 */

export  function getUserSendEmail(params = {}) {
    return service.post(`email/send-code`,params,formDataConfig).then(res => res.data);
}

/**
 * 重置密码
 */

export  function getUserResetPassword(params = {}) {
    return service.post(`email/check-reset`,params,formDataConfig).then(res => res.data);
}

/**
 * 查询详情
 * @param {*} params 
 */
export  function getUserDetails(params = {}) {
    return service.get(`service/user/details/${params.guid}`).then(res => res.data);
}
/**
 * 修改个人信息
 * @param {*} params 
 */
export  function getUpdateSelfInfo(params = {}) {
    return service.put(`service/user/self/${params.guid}`,params.params).then(res => res.data);
}

/**
 * 修改人员信息
 * @param params
 */
export function editPersonInfo(params = {}) {
    return service.put(`service/user/editPersonInfo/${params.guid}`,params).then(res => res.data);
}