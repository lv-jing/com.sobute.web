import CommonAutoComplete from './CommonAutoComplete.vue';

const commonAuto = {
    install: function (Vue) {
        Vue.component('commonAuto', CommonAutoComplete)
    }
}

export default commonAuto;