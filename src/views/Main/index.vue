<template>
  <el-container class="sobute-main-container" id="sobute-main">
    <el-aside :class="isCollapse?'aside-content-active':'aside-content'" style="overflow:hidden">
      <div class="user-info">
        <div
          class="main-logo flex flex-center-around"
          :style="{background:styles.headerBackgroundColor}"
        >
          <img style="width: 50px" v-show="isCollapse" src="@/assets/images/logo.png" alt />

          <div class="new-logo" :style="{background:styles.backgroundImage}" v-show="!isCollapse"></div>
        </div>
        <div
          class="flex"
          style="padding:20px 10px;"
          :style="{display:'none',backgroundColor:styles.menuBackgroundColor,color:styles.menuTextColor}"
        >
          <el-avatar
            icon="el-icon-user-solid"
            :src="userProfile.avatarUri"
            :size="isCollapse?46:56"
          ></el-avatar>
          <dl class="flex-1 ml10" v-show="!isCollapse">
            <dt class="mt5 fs18">{{userProfile.alias}}</dt>
            <dd class="mt5">{{userProfile.username}}</dd>
          </dl>
        </div>
      </div>
      <div style="height:calc(100vh - 60px)">
        <vue-scroll>
          <menu-component :isCollapse="isCollapse" />
        </vue-scroll>
      </div>
    </el-aside>
    <el-container style="width:calc(100% - 180px)">
      <el-header
        :style="{backgroundColor:styles.headerBackgroundColor,color:styles.headerTextColor}"
        class="sobute-main-header el_header_flxed flex flex-center-between"
        height="58px"
      >
        <div class="flex flex-center-between flex-1">
          <i :class="icon" style="font-size: 22px" @click="toggleCollapse"></i>
          <div class="ml10 flex flex-center-between mr20 flex-1">
            <p style="  color:#f6f6f6;">科研项目管理平台</p>
            <div class="system-time" v-html="date"></div>
          </div>
        </div>

        <ul class="flex flex-center-between">
          <li class="flex flex-center pointer">
            <el-avatar icon="el-icon-user-solid" :src="userProfile.avatarUri" size="small"></el-avatar>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link white">
                <span class="ml5">{{userProfile.alias||userProfile.username}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user" command="info">个人信息</el-dropdown-item>
                <!-- <el-dropdown-item icon="el-icon-unlock" command="password">修改密码</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <!-- <li class="ml20">
            <router-link :to="{name:'home'}" class="color-white">
              <i class="el-icon-s-home"></i> 返回主页
            </router-link>
          </li> -->

          <li class="ml20 flex flex-center pointer">
            <i class="el-icon-magic-stick"></i>
            <el-dropdown @command="handleStyleCommand">
              <span class="el-dropdown-link white">
                系统风格
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-help" command="default">默认模式</el-dropdown-item>

                <el-dropdown-item icon="el-icon-s-help" command="dark">昼夜模式</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>

          <li class="ml20 pointer" @click="userLogout()">
            <i class="sbt_tuichu"></i> 退出登录
          </li>
        </ul>
      </el-header>
      <el-main>
        <!-- <el-row>
        <el-col :span="isShowSpanCount?18:24" style="position:relative">-->
        <div class="sobute-breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
            <template v-for="(item,index) of breadcrumbList">
              <el-breadcrumb-item
                :key="index"
                v-if="item.name!==''"
                :to="{name:item.name}"
              >{{item.title}}</el-breadcrumb-item>
              <el-breadcrumb-item :key="index" v-else>{{item.title}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
        <div class="sobute-main-view" :style="{height:`calc(100vh - ${setHeight||100}px)`}">
          <vue-scroll>
            <div style="padding-right: 20px;" v-loading="loading">
              <router-view></router-view>
            </div>
          </vue-scroll>
        </div>
        <div class="show-right-bar">
          <span class="el-icon-d-arrow-right"></span>
        </div>
        <!-- </el-col>
          <el-col
            :span="6"
            v-if="isShowSpanCount"
            :style="{height:`calc(100vh - 60px)`,position: 'relative',backgroundColor:'#fff',overflow:'auto'}"
          >
            <common-auditing></common-auditing>
          </el-col>
        </el-row>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
import Cookies from "js-cookie";
import menuComponent from "@/components/MenuComponent";
// import commonAuditing from "@/components/CommonAuditing";
import { mapState, mapGetters } from "vuex";
import moment from "moment";
import { resetRouter } from "@/route";
export default {
  data() {
    return {
      date: "",
      loading: false,
      userProfile: {},
      setHeight: 0,
      isCollapse: false,
      icon: "el-icon-s-fold",
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
        scrollButton: {
          enable: false,
          background: "#666"
        },
        scrollPanel: {
          easing: "easeInQuad",
          speed: 300
        }
      },
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      isShowSpanCount: false
    };
  },
  components: {
    menuComponent
    // commonAuditing
  },
  computed: {
    ...mapState({
      height: state => state.common.height,
      styles: state => state.common.styleObj
    }),
    ...mapGetters(["getAuthoMenuList"])
  },
  created() {
    this.breadcrumbList = this.$route.meta;
    this.userProfile = Cookies.getJSON("userInfo");
    this.$store.dispatch("setUserInfo", this.userProfile);
  },
  watch: {
    $route() {
      this.loading = true;
      this.breadcrumbList = this.$route.meta;
      setTimeout(() => {
        this.$nextTick(() => {
          this.loading = false;
        });
      }, 700);
      this.$store.dispatch("setselectValue", "");
      Cookies.set("approvalType", "");

    },
    height(val) {
      this.setHeight = val || 100;
    }
  },
  mounted() {
    const timer = () => {
      setTimeout(() => {
        let d = moment().format("YYYY-MM-DD HH:mm:ss");
        let w = this.weeks[moment().isoWeekday() - 1];
        this.date = `<span>${d}</span><span class="ml20">星期${w}</span>`;

        timer();
      }, 1000);
    };
    timer();

  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.icon =
        this.isCollapse === true ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
    userLogout() {
      this.$confirm("您确定要退出系统吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        lockScroll: false
      })
        .then(() => {
          Cookies.remove("token");
          Cookies.remove("userInfo");
          Cookies.remove("currentGuid");
          this.$store.dispatch("setUserInfo", null);
          resetRouter();
          setTimeout(() => {
            this.$router.push({ name: "login" });
            //  resetRouter()
          }, 700);
        })
        .catch(() => {});
    },
    handleCommand(command) {
      switch (command) {
        case "password":
          this.dialogPassword = true;
          break;
        case "info":
          this.$router.push({ name: "profile" });
          break;
      }
    },
    /**
     * 风格切换
     */
    handleStyleCommand(command) {
      this.$store.dispatch("setTheme", command);
    }
  }
};
</script>

<style lang="scss" scoped>
.show-right-bar {
  position: absolute;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 15px;
  right: -15px;
  top: 0;
  z-index: 9999999;
  background: #dceffc;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #01518f;
}
.system-time {
  color: rgb(214, 210, 210);
  background: #01518f;
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 12px;
  // border: 1px solid rgb(103, 119, 223);
}

.el-header {
  background: $color-blue;
  color: white;
  height: 58px;
}
.new-logo {
  // background: #0065b3 url("/static/images/logo1.jpg") left center no-repeat;
  // background:#1A2047 url('/static/images/logo2.jpg')left center no-repeat;

  background-size: contain;
  height: 58px;
  width: 100%;
}
.main-logo {
  height: 57px;
  color: #ddd;
  justify-content: center;
  font-size: 18px;
  border-bottom: 1px solid $color-blue-opacity;
}
.user-info {
  // background: #1A2047;
  background: #fff;
}
.sobute-main-view {
  overflow: auto;
}

.el-aside {
  position: relative;
  z-index: 20;
  background: $color-white;
  height: 100vh;
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.1);
}

.white {
  color: white;
}

.el-main {
  position: relative;
  background: #f3f3f3;
  padding: 0px 0px 20px 20px;
  overflow: hidden;

  .sobute-breadcrumb {
    width: 100%;
    height: 40px;
    top: 58px;
    z-index: 10;
    display: flex;
    align-items: center;
  }
}

.el-icon-s-fold {
  font-size: 25px;
  cursor: pointer;
}

.aside-content {
  width: 180px !important;
  transition: width 0.3s;
}

.aside-content-active {
  width: 71px !important;
  transition: width 0.3s;
}
</style>
