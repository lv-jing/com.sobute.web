<template>
  <div class="login-index">
    <dl class="tc header-title">
      <dt>
        <h2 class="fs24 text-00FFF0">苏博特研究院科研管理系统</h2>
      </dt>
      <dd>
        <img src="/static/images/title_bg_left.png" style="height:42px" alt />
        <img src="/static/images/title_bg_right.png" style="height:42px" alt />
      </dd>
    </dl>

    <div class="sobute-login">
      <div class="flex login-conent mt20">
        <div class="login-left">
          <img src="/static/images/img.png" alt srcset class="sobute-logo" />
        </div>
        <div class="login-right bg-white">
          <el-form :model="loginForm" ref="loginForm" size="large" class="login-form">
            <div class="fs24 color-white">您好！欢迎登录</div>
            <el-form-item label prop="username" class="mt30">
              <el-input
                class="input-style"
                v-model="loginForm.username"
                clearable
                autofocus
                placeholder="请输入账号"
                @keyup.enter.native="userLogin('loginForm')"
              >
                <i slot="prefix" class="ml5 el-input__icon sbt_yonghuming text-00FFF0"></i>
              </el-input>
            </el-form-item>
            <el-form-item label prop="password">
              <el-input
                class="input-style"
                v-model="loginForm.password"
                clearable
                type="password"
                placeholder="请输入密码"
                @keyup.enter.native="userLogin('loginForm')"
              >
                <i slot="prefix" class="ml5 el-input__icon sbt_mima text-00FFF0"></i>
              </el-input>
            </el-form-item>
            <div class="flex flex-center-between">
              <router-link :to="{name:'register'}" style="color:#5EBBFF">立即注册</router-link>
              <router-link :to="{name:'forgetPwd'}" style="color:#5EBBFF">忘记密码</router-link>
            </div>
            <el-form-item class="mt20">
              <el-button
                type="primary"
                :loading="loading"
                class="w-100"
                @click="userLogin('loginForm')"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getVerifyCode, userLogin } from "@/service/user";
import { createRouter ,userLoginWatch } from "@/utils/tools";
import Cookies from "js-cookie";
import { mapState } from "vuex";
import { baseRoute, mainRouter ,resetRouter} from "@/route";
export default {
  name: "login",
  data() {
    return {
      loading: false,
      codeImg: "",
      loginForm: {
        username: "",
        password: "",
        inputCode: "",
        flag: ""
      },
      rules: {}
    };
  },
  created() {
    // this.getVerifyCode();
  },
  mounted() {},
  computed: {
    ...mapState({
      menuList: state => state.menus.authoMenuList
    })
  },
  watch: {
    menuList(n) {
      let p= userLoginWatch(n,'home',this);
      this.$router.push(p);
      // const menu = (n && n[0]) || "";
      // if (!menu) {
      //   this.$message({
      //     type: "error",
      //     message: "您未申请相关权限，请联系管理员"
      //   });
      //   this.loading = false;
      //   return;
      // }
      // const item = (menu.children && menu.children[0]) || menu;
      // const isHttp = /http/gi.test(item.link);

      // const p = {
      //   name: isHttp ? "tempReport" : item.nameEn,
      //   params: isHttp ? { guid: item.guid } : {}
      // };
     
 
      // const route = createRouter(n);
      // mainRouter.children = route;
      // this.$router.options.isAdd = true;
      // this.$router.addRoutes([mainRouter]);
      //  this.$router.push({name:'home'});
      // //调取当前路由下的地址权限
      // Cookies.set("currentGuid", item.guid);
      // this.$store.dispatch("setFunJurisdiction", item.guid);
      // this.loading = false;
    }
  },
  methods: {
    /**
     * 获取验证码
     */
    async getVerifyCode() {
      const { code, data } = await getVerifyCode({ flag: this.loginForm.flag });
      if (code === 1) {
        this.$set(this.loginForm, "flag", data.flag);
        this.codeImg = data.img;
      }
    },
    /**
     * 用户登录
     */
    async userLogin() {
      this.loading = true;
      Cookies.remove("token");
      Cookies.remove("userInfo");
      Cookies.remove("currentGuid");
      const { code, data } = await userLogin(this.loginForm);
      if (code === 1) {
        Cookies.set("token", data.tokenHead + " " + data.token);
        Cookies.set("userInfo", data.user);
        this.$store.dispatch("setAuthoMenuList", {
          guid: data.user.guid
        });

        this.$store.dispatch("setUserInfo", data.user);

      
      } else {
        //this.getVerifyCode();
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-title {
  position: absolute;
  width: 100%;
  left: 0;

  top: 30px;
}
.login-index {
  height: 100vh;
  background: url("/static/images/bg.png") center no-repeat;
  background-size: cover;
}
.sobute-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  overflow: auto;
  .login-conent {
    position: relative;
    z-index: 10;
  }
  .login-left {
    width: 540px;
    border-radius: 6px 0px 0px 6px;
    border-right: 0;
    z-index: 100;
    position: relative;
    .sobute-logo {
      max-width: 95%;
    }
  }
  .login-right {
    margin-left: 100px;
    background: url("/static/images/dl_bg.png") no-repeat;
    // background: rgba(0, 0, 0, 0.2);
    background-size: contain;
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
}
.login-form {
  width: 70%;
}
</style>