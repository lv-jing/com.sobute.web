<template>
  <div class="title-content" v-html="content">
    <!--<div class="title-icon"></div>-->
    <!--<div class="text-color-333">{{title}} <span v-if="isClone" style="color: red">*</span>-->
    <!---->
    <!---->
      <!--<el-tooltip v-if="content" class="item" :content="content" placement="top">-->
      <!--<i class="el-icon-info color-blue"></i>-->
    <!--</el-tooltip>-->
     <!--</div>-->

  
  </div>
</template>

<script>
export default {
  name: "setTitle",
  props: {
    title: {
      type: String,
      default: ""
    },
    content:String,
    isClone:{
      type: Boolean,
      default: ()=>false
    }
  }
};
</script>

<style scoped lang="scss">
.title-content {
  display: flex;
  justify-content: flex-start;
  /*align-items: center;*/
  /*font-weight: 600;*/
  /*height: 32px;*/
}
.title-icon {
  width: 2px;
  height: 12px;
  border-radius: 1px;
  margin-right: 4px;
  background: $color-blue;
}
</style>