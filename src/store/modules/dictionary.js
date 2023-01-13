
import {getApproveDefaultPerson} from '@/service/common'
import Cookies from 'js-cookie'
/*eslint-disable*/

const dictionaryModules = {
    state: {
        approvePerson: [],//审批人员
    },
    getters: {
        getApprovePserson: state => state.approvePerson,

    },
    mutations: {
      
        async mutationApproveDefaultPerson(state,obj) {
            const {code, data} = await getApproveDefaultPerson({
                ...obj
            })
            if (code === 1) {
                state.approvePerson = data;
            }
        }
    },
    actions: {
     
        /**
         * 设置审批列表commit
         */
        setApproveDefaultPerson({commit}) {
            const {username} = Cookies.getJSON("userInfo")||{};
            const type = Cookies.getJSON("approvalType")||'';
            let obj= {
                empolyeeNumber:username,
                type
            }
            commit('mutationApproveDefaultPerson',obj)
        }


    }


}

export default dictionaryModules;