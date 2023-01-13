<template>
  <el-card class="box-card" shadow="never" :body-style="{padding:'10px 20px'}">
    <div slot="header" class="clearfix flex flex-center-between">
      <span>{{guidItem.name}}报表</span>
    </div>
    <iframe id="mainiframe" :src="`${guidItem.link}&p_emp_num=${userInfo.username}`" class="ifram-content" frameborder="0"></iframe>
  </el-card>
</template>

<script>
import { getResourceFindMenuItem } from '@/service/system'
import { mapState } from 'vuex'
export default {
  props: ["guid"],
  data() {
    return {
      guidItem: {}
    };
  },
  created() {
    this.getResourceFindMenuItem(this.guid)
  },
  watch: {
    guid(val) {
      this.getResourceFindMenuItem(val)
    }
  },
   computed: {
    ...mapState({
      userInfo: state => state.common.userInfo
    })
  },
  methods: {
   
    async getResourceFindMenuItem(guid) {
      const {code,data}=await getResourceFindMenuItem({guid})
      if(code==1){
        this.guidItem=data
      }else{
        this.$message({
          type:'error',
          message:'报表不存在'
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ifram-content {
  width: 100%;
  height: calc(100vh - 210px);
}
</style>