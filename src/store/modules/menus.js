import { getResourceUsersList } from '@/service/system'
/* eslint-disable */
import Cookies from "js-cookie";

const systemMenuModules = {
    // namespaced: true,
    state: {
        authoMenuList: [],
        authObj: {}
    },
    mutations: {
        async mutationAuthoMenuList(state, param) {
            const { code, data } = await getResourceUsersList(param);

            if (code === 1&&data) {
                state.authoMenuList = data;
                const currentGuid = Cookies.get("currentGuid");
                state.authObj = funJurisdiction(data, currentGuid)
            } else {
                state.authoMenuList = []
            }
        },
        mutationFunJurisdiction(state, guid) {
            state.authObj = funJurisdiction(state.authoMenuList, guid)
        }
    },
    getters: {
        getAuthoMenuList(state) {
            return state.authoMenuList;
        },
        getAuthObj(state) {
            return state.authObj;
        }
    },
    actions: {
        setAuthoMenuList({ commit }, item) {
            commit('mutationAuthoMenuList', item)
        },
        setFunJurisdiction({ commit }, item) {
            commit('mutationFunJurisdiction', item)
        }
    },
}

function funJurisdiction(list, guid) {
    let obj = {}
    const authoObj = (arr) => {
        for (let item of arr) {
            if (item.children && item.children.length > 0) {
                authoObj(item.children)
            }
            if (item.guid === guid) {
                obj = item
            }
        }
    }
    authoObj(list)

    return obj
}


export default systemMenuModules;