import "core-js";
import "regenerator-runtime/runtime";
import Vue from 'vue'
import App from '@/App'
import ElementUI from 'element-ui';
import '@/assets/element-variables.scss'
import '@/assets/css/reset.css'
import '@/assets/icons/iconfont.css'
import router  from '@/route'
import store from '@/store'
import formCreate from '@form-create/element-ui'
import commonPagination from "@/components/CommonPagination/index";
import commonTitle from "@/components/CommonTitle/index";
import commonDesc from "@/components/CommonDesc/index";
import commonOnlyQuery from "@/components/CommonOnlyQuery/index";
import commonFooter from "@/components/CommonFooter/index";
import commonSelect from "@/components/CommonSelect/index";
import commonAuto from "@/components/CommonAutoComplete/index";
import commonOperation from '@/components/CommonOperation/index'
import commonExports from '@/components/CommonExports/index'
import commonCascader from '@/components/CommonCascader/index'
import commonSingleSelect from '@/components/CommonSingleSelect/index'
import commonNotData from '@/components/CommonNotdata/index'
import CommonEditor from '@/components/CommonEditor'
import commonAuditingView from '@/components/CommonAuditingView'
import vuescroll from 'vuescroll';
const uuid = require('uuid/v1');
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)
Vue.use(commonPagination)
Vue.use(commonOperation)
Vue.use(commonTitle)
Vue.use(commonSelect)
Vue.use(commonAuto)
Vue.use(commonExports)
Vue.use(commonCascader)
Vue.use(commonSingleSelect)
Vue.use(commonOnlyQuery)
// 底部固定提交保存按钮
Vue.use(commonFooter)
Vue.use(ElementUI,{size:"small",});
Vue.use(formCreate)
Vue.use(commonDesc)
Vue.component('no-data', commonNotData)
Vue.component('common-auditing-view', commonAuditingView)

Vue.component('common-editor', CommonEditor)
Vue.config.productionTip = false
const $vm=new Vue();
Vue.prototype.$vm = $vm
Vue.prototype.$uuid=uuid;
Vue.prototype.$titleObj={"add":"增加","view":"查看","auditing":"审核","edit":"编辑"};
Vue.prototype.$saveSearchParam=({reset,searchForm})=>{
  const _tempParams = Object.assign({}, reset!=='reset' ?searchForm : {} );
  let params={};
  for (let p in _tempParams){
    if(!['pageNum','pageSize','total'].includes(p)){
      params[p]=_tempParams[p]
    }
  }
  store.dispatch("setSearchParams", params);
}
Vue.prototype.$showDrawerButton=(model,show)=> {
  model.submitBtnProps({
    show
  });
  model.resetBtnProps({
    show
  });
},
// Vue.prototype.$TABLE = {'highlight-current-row':true };
// 你可以在这里设置全局配置
Vue.use(vuescroll, {
  ops: {
    rail: {
      opacity: "0.2",
      background: "#000",
      border: "1px solid #cecece",
      size: "2px"
    },
    bar: {
      background: "#fff",
      keepShow: false,
      size: "1px",
      minSize: 0.1
    },
  }, // 在这里设置全局默认配置

});
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
