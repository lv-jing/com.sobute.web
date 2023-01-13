/**
 * @fileName: request.js
 * @author: charlecai@deloitte.com.cn
 * @time: 2019/12/24
 * @disc: axios 全局配置
 */
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios';
import router from '@/route';
import Cookies from "js-cookie";
import { downloadUrl } from "@/service/common";
const index = 0;
const v = new Vue();
let loading = null;
let instance = axios.create({
    url: '',
    method: 'post',
    baseURL: 'downloadUrl',

    headers: {
        'Content-Type': 'application/json'
    },
    data: {},
    withCredentials: true,
    responseType: 'json',
    timeout: 100000
});
/**
 * 添加Cookie请求头信息
 */

instance.interceptors.request.use(config => {
    console.log(config)
    // console.log(config)
    //配置header 公共token
    // let main = document.querySelector('#sobute-main')
    // if (main) {
    //     loading = v.$loading({
    //         lock: true,
    //         background: 'rgba(0,0,0,0.2)'
    //     })
    // }
    let token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = token;
    }


    return config;
}, e => {
    return Promise.reject(e);
});
/**
 * 添加拦截器响应
 */
instance.interceptors.response.use(res => {
    const { data } = res;

    switch (data.code) {
        case 0:
        case 401:
        case 403:
            v.$message({
                type: 'error',
                message: data.message
            });
            break;
        case 1:
            // v.$message({
            //     type: 'success',
            //     message: data.message
            // });
            break;
    }

    // let main = document.querySelector('#sobute-main')
    // if (main) {
    //     setTimeout(() => {
    //         v.$nextTick(() => {
    //             loading.close()
    //         })
    //     }, 500);
    //
    // }
    var userAgent = window.navigator.userAgent;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        v.$message({
            type: 'warning',
            message: '不支持ie11以下浏览器，请升级浏览器或者使用谷歌、火狐等浏览器'
        })
        return { data: { code: 0 } }
    }
    if (isIE11) {
        if (res.config.method === 'post') {
            let tep1 = {}, tep = res['data']
            tep1 = Object.keys(tep)[0]
            return { data: JSON.parse(tep1) }
        } else {
            return res

        }
    }
    return res


}, e => {
    if (e.response) {
        switch (e.response.status) {
            case 401:
            case 403:
                Cookies.remove("token");
                Cookies.remove("userInfo");
                Cookies.remove("currentGuid");
                if (index === 0) {
                    v.$message({
                        type: 'warning',
                        message: '登录已经过期,请重新登录'
                    })
                    setTimeout(() => {
                        router.replace({ name: 'login' });
                    }, 1500);
                }
                index++;
                break;
                case 500:
                    v.$message({
                        type: 'error',
                        message: '服务器异常'
                    })
                // alert('未授权')
                break;
        }
    }
    return Promise.reject(e);
});

// function isIE() {
//     if (window.navigator.userAgent.indexOf("MSIE") >= 1)
//         return true;
//     else
//         return false;
// }

export default instance;
