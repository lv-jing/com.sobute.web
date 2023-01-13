<template>
  <router-view v-if="isActiveLayout"></router-view>
</template>

<script>
/* eslint-disable */
import  '@/assets/common.scss'

export default {
  name: 'app',
data() {
  return {
    isActiveLayout: false
  }
},
created(){
 const theme= localStorage.getItem('theme')||'default';
  this.$store.dispatch('setTheme',theme)
 const loading= document.querySelector('#Loading');
 if(loading){
   this.isActiveLayout=true;
   document.body.removeChild(loading)
 }
},


}
</script>

<style lang="scss">
.el-dialog__body{
  padding: 5px 20px!important;
}
.user-form-search{
  background: #f3f3f3;
  padding: 15px 5px 0 5px;
  // border-bottom: 2px solid #ddd;
  // box-shadow: 1px 1px 5px #ccc;
}
.bg-white{
  background: $color-white
}
.el-drawer__header{
  margin-bottom: 0!important
}

.notice-summary {
  background: #f2f2f2;
  border-radius: 10px;
  padding: 10px;
  line-height: 22px;
}
.el_header_flxed {
  // position: fixed;
  z-index: 99;
  left: 0;
  top:0;
  width: 100%;
  // background: #f3f3f3;
  // box-shadow: rgba(0, 0, 0, 0.12) 50px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
}
// .el-submenu.is-active.is-opened{
//   background: rgb(1, 34, 64)!important;
// }
.el-submenu.is-active .el-menu-item {
 // background: $color-menu-bg;
  // background:rgb(0, 17, 32)!important
}
.vxe-table .vxe-tree--node-btn{
  font-size: 14px;
  color: $color-blue!important;
}
</style>
