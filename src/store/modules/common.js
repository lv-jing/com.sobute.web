/* eslint-disable */
import {STYLE_VALUE} from '@/utils/styles'
const commonModules={
    state:{
        height:0,
        userInfo:{},
        dateList:[],
        selectValue:[]||'',
        styleObj:{},
        uploadTypeCode:'',
        userTypeCode:'',
        searchParams:{},
        saveStatus:{}
    },
    mutations:{
        mutationsHeight(state,height){
            state.height=height
        },
        mutationsUserInfo(state,info){
            state.userInfo=info
        },
        mutationsDateList(state,info){
            state.dateList=info
        },
        mutationsSelectValue(state,info){
            state.selectValue=info
        },
        mutationsStyleObj(state,info){
           const style= STYLE_VALUE[info];
           localStorage.setItem('theme',info)
            state.styleObj=style
        },
        mutationsUploadTypeCode(state,info){
            state.uploadTypeCode=info
        },
        mutationsUserTypeCode(state,code){
            state.userTypeCode=code
        },
        mutationsSearchParam(state,params){
            state.searchParams=params
        },
        mutationsHandlerSave(state,params){
            console.log('9990909',params);
            state.saveStatus=params
        },

    },
    getters:{
        getUserInfo(state) {
            return state.userInfo;
        },
        getTypeCode(state){
            return state.uploadTypeCode;
        },
        getSearchParams(state){
            return state.searchParams;
        },
        getHandlerSave(state){
            return state.saveStatus;
        }
    },
    actions:{
        setHeight({commit},height){
            commit('mutationsHeight',height)
        },
        setUserInfo({commit},info){
            commit('mutationsUserInfo',info)
        },
        setDateList({commit},info){
            commit('mutationsDateList',info)
        },
        setselectValue({commit},info){
            commit('mutationsSelectValue',info)
        },
        setTheme({commit},info){
            commit('mutationsStyleObj',info)
        },
        setUploadTypeCode({commit},info){
            commit('mutationsUploadTypeCode',info)
        },
        setUserTypeCode({commit},info){
            commit('mutationsUserTypeCode',info)
        },
        setSearchParams({commit},params){
            commit('mutationsSearchParam',params)
        },
        setHandlerSave({commit},params){
            commit('mutationsHandlerSave',params)
        },
    }
}
export default commonModules