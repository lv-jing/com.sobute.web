/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { getResourceUsersList } from '@/service/system'
import { createRouter } from "@/utils/tools";
import Cookies from "js-cookie";
Vue.use(Router);
const $vm = new Vue();
const Login = resolve => require(['@/views/Login'], resolve);
const Home = resolve => require(['@/views/Home'], resolve);
const ErrorComponent = resolve => require(['@/views/404'], resolve);
const FindPassword = resolve => require(['@/views/UpdataUserInfo/FindPassword'], resolve);
const ChangePassword = resolve => require(['@/views/UpdataUserInfo/ChangePassword'], resolve);
const UpdataUserInfo = resolve => require(['@/views/UpdataUserInfo'], resolve);
const Profile = resolve => require(['@/views/UpdataUserInfo/Profile'], resolve);
const Register = resolve => require(['@/views/UpdataUserInfo/Resister'], resolve);
const NoticeDetails= resolve => require(['@/views/Others/NoticeDetails'], resolve);
const Authorization= resolve => require(['@/views/Authorization'], resolve);
/**
 * 基础路由文件
 */
export const baseRoute = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: Authorization
  },
  {
    path: '/default',
    name: 'default',
    component: NoticeDetails
  },
  {
    path: '/user',
    name: 'user',
    component: UpdataUserInfo,
    children: [{
      path: 'forgetPwd',
      name: 'forgetPwd',
      meta: {
        mode: 1
      },
      component: FindPassword,
    }, {
      meta: {
        mode: 2
      },
      path: 'profile',
      name: 'profile',
      component: Profile,
    }, {
      meta: {
        mode: 2
      },
      path: 'updataPwd',
      name: 'updataPwd',
      component: ChangePassword,
    }, {
      meta: {
        mode: 3
      },
      path: 'register',
      name: 'register',
      component: Register,
    }]
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    icon: 'el-icon-s-tools',
  },
  // {
  //   path: '*',
  //   name: '404',
  //   component: ErrorComponent,
  //   icon: 'el-icon-s-tools',
  // },

]

/**
 * 授权路由文件，需要从服务器获取
 */
export const mainRouter = {
  path: '/main',
  name: 'main',
  component: resolve => require(['@/views/Main'], resolve),
  children: []
}
const createRouters = () => new Router({
  mode: 'hash',
  routes: baseRoute.concat(mainRouter),
  isAdd: false,
});


const router = createRouters();

export function resetRouter () {
  const newRouter = new Router({
    mode: 'hash',
    routes: baseRoute.concat({
      path: '/main',
      name: 'main',
      component: resolve => require(['@/views/Main'], resolve),
      children: []
    }),
    isAdd: false,
  })
  router.matcher = newRouter.matcher
 }

let _index = 0;
// 接口白名单,不受限路由
const whiteList = ['login','default','authorization', 'register', 'forgetPwd', 'profile', 'updataPwd','home']
const isInWhiteList = function (url) {
  return whiteList.includes(url)
};
//全局守卫
router.beforeEach(async (to, from, next) => {
  if (!isInWhiteList(to.name)) {
    let userInfo = Cookies.getJSON("userInfo")
    if (!userInfo) {
      next({ name: 'login' })
    }
    const { data } = await getResourceUsersList({ guid: userInfo.guid });

    const d = createRouter(data);
    if (!router.options.isAdd) {
      addDynamicMenu(d);
      next({ ...to, replace: true })
    }
    _index++;

    const bool = await new Promise(resolve => {
      let bool = false;
      const newData = (arr) => {
        arr.map(item => {
          if (item.children && item.children.length > 0) {
            newData(item.children)
          }
          if (to.name === item.nameEn) {
            bool = true
          }
        })
      };
      newData(data);
      resolve(bool)
    })


    // console.log(bool, _index)
    if (bool) {
      _index = 0;
      next()
    } else {
      if (_index === 2) {
        next({ name: data[0].children[0].nameEn })
      }
    }

  } else {
    next()
  }
})
/**
 * 
 * @param {数据列表}} menu 
 */
function addDynamicMenu(menu = []) {
  mainRouter.children = menu
  router.addRoutes([
    mainRouter,
  ])
  router.options.isAdd = true
}

export default router;

