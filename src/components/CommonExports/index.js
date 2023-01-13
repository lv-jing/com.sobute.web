import CommonExports from './CommonExports.vue';

const commonExports = {
    install: function (Vue) {
        Vue.component('commonExports', CommonExports)
    }
}

export default commonExports;