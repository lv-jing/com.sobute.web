<template>
  <el-container>
    <el-header
      class="flex flex-center-start change-header"
    >
      <div
        style="width:70%;margin:0 auto;     align-items: flex-end;color:white;"
        class="flex fs18"
      >
        <el-divider direction="vertical"></el-divider>
        <span class="ml10">账户设置</span>
      </div>
      <div>
        <a href="javascript:;" @click="routerLinkUrl" class="color-white">{{$route.meta.mode!==2?'登录':'返回主页'}}</a>
        <!-- <router-link :to="{name:$route.meta.mode!==2?'login':'main'}" class="color-white">{{$route.meta.mode!==2?'登录':'返回主页'}}</router-link> -->
      </div>
    </el-header>
    <el-container style="width:70%;margin:0 auto;">
      <el-aside style="width:230px;border-right:1px solid #f3f3f3" class="mt20">
        <ul class="sobute-menu">
          <li v-if="$route.meta.mode===2">
            <router-link :to="{name:'profile'}">
              <i class="ml5 el-input__icon sbt_yonghuming"></i>&nbsp;用户信息
            </router-link>
          </li>
          <li v-if="$route.meta.mode===2">
            <router-link :to="{name:'updataPwd'}">
              <i class="ml5 el-input__icon sbt_mima"></i>&nbsp;修改密码
            </router-link>
          </li>
          <li v-if="$route.meta.mode===1">
            <router-link :to="{name:'forgetPwd'}" >
              <i class="ml5 el-input__icon sbt_mima"></i>&nbsp;找回密码
            </router-link>
          </li>
           <li v-if="$route.meta.mode===3">
            <router-link :to="{name:'register'}">
              <i class="ml5 el-input__icon sbt_yonghuming"></i>&nbsp;用户注册
            </router-link>
          </li>
        </ul>
      </el-aside>
      <el-main >
        <div style="height:calc(100vh - 90px);overflow:auto">
         <vue-scroll>
          <router-view></router-view>
         
         </vue-scroll>
         </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
let nameUrl='main'
export default {
  data() {
    return {
    //  ops: {
    //     rail: {
    //       opacity: "0.2",
    //       background: "#000",
    //       border: "1px solid #cecece",
    //       size: "6px"
    //     },
    //     bar: {
    //       background: "#fff",
    //       keepShow: true,
    //       size: "5px",
    //       minSize: 0.1
    //     },
    //     scrollButton: {
    //       enable: false,
    //       background: "#666"
    //     },
    //     scrollPanel: {
    //       easing: "easeInQuad",
    //       speed: 300
    //     }
    //   }
    }
  },
  watch: {
    '$route'(to,from){
      console.log(to,from)
    }
  },
 beforeRouteEnter (to, from, next) {
   nameUrl=from.name||'main'
   next()
   // ...
 },
 methods: {
   routerLinkUrl() {
     this.$router.push({name:this.$route.meta.mode!==2?'login':nameUrl})
   }
 },
}
</script>

<style lang="scss" scoped>
.change-header{
border-bottom:1px solid #f3f3f3;
background:$color-blue;
}
.sobute-password {
  width: 80%;
  margin: 0 auto;
}
.change-step {
  padding: 50px 0;
  width: 55%;
  margin: 20px auto;
}
.sobute-menu {
  li {
    padding-right: 10px;
  }
  a {
    border-bottom: 1px solid #f4f4f4;
    display: block;
    padding: 10px 15px;
    color: #333;
  }

  .router-link-active {
    background: $color-blue;
    color: white;
  }
}
</style>