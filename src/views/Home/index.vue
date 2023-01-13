<template>
  <el-container>
    <el-aside width="250px" class="home-aside">
      <!-- Aside content -->
      <div class="user-info">
        <div class="main-logo flex flex-center-around">
          <!-- <img style="width: 50px"  src="@/assets/images/logo.png" alt /> -->
          <span class="fs18">苏博特一体化工作平台</span>
        </div>
        <div style="height:50px"></div>

        <dl class="flex-1 ml10 tc color-white">
          <dt @click="handleCommand('info')">
            <el-avatar icon="el-icon-user-solid" :src="userProfile.avatarUri" :size="80"></el-avatar>
          </dt>
          <dt class="mt15 fs20">{{userProfile.alias}}</dt>
          <dd class="mt10">No.{{userProfile.username}}</dd>
        </dl>
        <el-divider />
        <div class="fs12 color-white tc">上次登录时间: {{userProfile.loginTime}}</div>
        <div style="height:30px"></div>
        <div style="padding:0 20px">
          <el-button class="pointer w-100" @click="userLogout()">
            <i class="sbt_tuichu"></i> 退出登录
          </el-button>
        </div>
      </div>
    </el-aside>
    <el-container style="height:100vh;">
      <vue-scroll>


        <el-main height>
          <el-card shadow="never">
            <!-- Header content -->
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <template v-for="(item,index) of systemList">
                  <div
                    @click.stop="clickChangeSystem(item)"
                    class="swiper-slide"
                    :key="index"
                    :class="systemItem.guid===item.guid?'active_system':''"
                  >
                    <div
                      v-if="systemItem.guid===item.guid"
                      class="show-into_system"
                      @click.stop="intoMainPage(item)"
                    >
                      <dl class="color-white">
                        <dt class="is-show-scale">
                          <el-avatar style="background:#5386E9" :size="25" icon="el-icon-s-home"></el-avatar>
                        </dt>
                        <!-- <dd class="fs12">进入系统</dd> -->
                      </dl>
                    </div>
                    <dl class="flex-1">
                      <dt class="mt5">
                        <el-avatar :size="65" :src="item.icon" style="background:transparent">
                          <img
                            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                          />
                        </el-avatar>
                      </dt>
                      <dd class="fs14" style="bheight:30px;line-height:30px">{{item.name}}</dd>
                    </dl>
                  </div>
                </template>
              </div>
              <!-- Add Pagination -->
              <!-- <div class="swiper-pagination"></div> -->
              <!-- Add Arrows -->
              <div class="swiper-button-next" style="font-size:20px!important"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </el-card>
          <!-- Main content -->
          <el-card shadow="never" class="mt20" :body-style="{padding:'20px 0'}">
            <div slot="header">
              <span>待办事项</span>
            </div>
            <!-- card body -->

            <div class="workbench-card flex flex-center-around">
              <template v-for="(item,index) of cardList">
                <dl class="flex-1" :key="index">
                  <dd
                    class="flex flex-center-between pointer"
                    :style="{background:colorsDB[index]}"
                    @click="clickWorks(item,index)"
                  >
                    <span v-text="item.name"></span>
                    <span class="el-icon-arrow-right"></span>
                  </dd>
                  <dt class="flex flex-center-between" :style="{border:'1px solid #eee'}">
                    <img :src="imgUrl[index]" alt height="60" />
                    <div :style="{color:colorsDB[index]}">
                      <p>当前系统</p>
                      <p>
                        <i class="fs30 ml10">{{item.total||0}}</i>
                      </p>
                    </div>
                    <div style="height:40px;width:1px;background:#ddd"></div>
                    <div :style="{color:colorsDB[index]}">
                      <p>总数</p>
                      <i class="fs30 ml10">{{allTotal[item.functionTypeCode]}}</i>
                    </div>
                  </dt>
                </dl>
              </template>
            </div>
          </el-card>
          <div style="height:20px"></div>
          <el-row :gutter="15" class="mt20">
            <el-col :span="14">
              <el-card shadow="never" :body-style="{ padding: '5px' }">
                <div class="flex flex-center-between" slot="header">
                  <div class="color-blue bold">
                    <i class="el-icon-chat-line-round"></i> 我的信息
                  </div>
                  <router-link :to="{name:'workbench'}" class="fs12">
                    更多
                    <i class="el-icon-arrow-right"></i>
                  </router-link>
                </div>
                <el-tabs v-model="cardName" type="card">
                  <el-tab-pane
                    v-for="(list,index) of cardList"
                    :key="index"
                    :label="list.name"
                    :name="list.functionTypeCode"
                    :style="{ padding: '0px',heiight:'415px' }"
                  >
                    <ul class="my-message" style="padding:5px">
                      <template v-if="list.dataList&&list.dataList.length>0">
                        <template v-for="(it,i) of list.dataList">
                          <li class="flex" :key="i" v-if="i<9">
                            <!-- <span>{{i+1}}</span> -->
                            <a
                              v-if="list.functionTypeCode!=='NOTICE_TYPE'"
                              href="javascript:;"
                              @click="applyRPM(it,i)"
                              class="flex-1"
                              :title="it.bizTitle"
                            >
                              <el-tag size="mini">{{i+1}}</el-tag>
                              {{it.bizTitle}}
                            </a>
                            <div v-else class="flex-1">
                              <el-tag size="mini">{{i+1}}</el-tag>
                              {{it.bizTitle}}
                            </div>

                            <span class="text-color-999">{{it.createTime}}</span>
                            <el-tag
                              class="ml10"
                              :type="typeStatusColor[it.bizStatus]"
                            >{{it.bizStatus}}</el-tag>
                          </li>
                        </template>
                      </template>
                      <li v-else style="border-bottom:0">
                        <no-data />
                      </li>
                    </ul>
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </el-col>
            <el-col :span="10">
              <el-card shadow="never" :body-style="{ padding: '0px' }">
                <div slot="header" class="flex flex-center-between">
                  <div class="text-success bold">
                    <i class="el-icon-bell"></i> 我的公告
                  </div>
                  <!-- <router-link :to="{name:'home'}" class="fs12">
                    更多
                    <i class="el-icon-arrow-right"></i>
                  </router-link>-->
                </div>
                <!-- card body -->

                <div class="home-notice mt10" v-if="tableData.length>0">
                  <template v-for="item of tableData">
                    <el-row class="home-notice-item" :key="item.guid">
                      <el-col :span="item.thumbnailUrl?18:24" class="home-notice_content flex-3">
                        <a
                          @click="previewNotice(item)"
                          href="javascript:;"
                          class="home-notice_content_title pointer bold"
                        >{{item.title}}</a>
                        <div
                          class="home-notice_content_desc mt10 text-color-333 fs14"
                        >{{item.summary}}</div>
                        <div class="text-color-999 fs14 mt10">{{item.endDate}}</div>
                      </el-col>
                      <el-col :span="6" class="home-notice-item_image" v-if="item.thumbnailUrl">
                        <el-image fit="scale-down" :src="item.thumbnailUrl"></el-image>
                      </el-col>
                    </el-row>
                  </template>

                  <div class="mt10 md10 tc">
                    <el-pagination
                      @current-change="handlerCurrentPage"
                      background
                      layout="total, prev, pager, next"
                      :page-size="searchForm.pageSize"
                      :current-page.sync="searchForm.pageNum"
                      :total="searchForm.total"
                    ></el-pagination>
                  </div>
                </div>
                <no-data v-else />
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </vue-scroll>
    </el-container>

  </el-container>
</template>

<script>
/* eslint-disable */
import Cookies from "js-cookie";
import { mapState } from "vuex";
import { projectType } from "@/utils/projectType";
import { openTargetWebUrl,routerJump } from "@/utils/tools";

import { getProjectParamsItems } from "@/service/project";
import { allNarmalInterface } from "@/service/common";
import db from "@/assets/images/db.png";
import yb from "@/assets/images/yb.png";
import dy from "@/assets/images/dy.png";
// import yy from "@/assets/images/yy.png";
export default {
  name: "home",
  data() {
    return {
      searchForm: {
        pageNum: 1,
        pageSize: 3,
        total: 0
      },
      typeStatusColor: {
        新建: "default",
        已审批: "success",
        退回: "danger"
      },
      cardName: "",
      userProfile: {},
      systemList: [],
      colorsDB: [
        "#E6A23C",
        "#3282B8",
        "#40BFC1",
        "#55efc4",
        "#81ecec",
        "#74b9ff",
        "#fdcb6e",
        "#a29bfe",
        "#00b894",
        "#00cec9",
        "#0984e3",
        "#6c5ce7",
        "#ffeaa7"
      ],
      imgUrl: [db, yb, dy],
      cardList: [],
      tabsList: [],
      type: 0,
      isIndex: 0,
      systemItem: {
        code: 2001
      },
      allTotal: {},
      tableData: []
    };
  },
  computed: {
    ...mapState({
      menuList: state => state.menus.authoMenuList
    })
  },
  created() {
    this.userProfile = Cookies.getJSON("userInfo") || {};
    if (this.menuList.length === 0) {
      this.$store.dispatch("setAuthoMenuList", { guid: this.userProfile.guid });
    }
    this.initData();
    this.getNoticeList();
  },
  mounted() {},
  methods: {
    /**
     * 分页查询
     */
    handlerCurrentPage(pageNum) {
      this.searchForm = {
        ...this.searchForm,
        pageNum
      };
      this.getNoticeList();
    },
    /**
     * 预览
     */
    async previewNotice(item) {
        openTargetWebUrl({link:`#/default?id=${item.guid}`})
    },
    async initData() {
      const { code, data } = await allNarmalInterface(
        {},
        `service/portal/user/${this.userProfile.guid}`,
        "get"
      );
      if (code === 1) {
        if (!data) {
          this.$message({
            type: "warning",
            message: "暂无数据"
          });
          return;
        }

        this.allTotal = await this.computedAllTotal(data);
        this.systemList = data;
        this.systemItem = data[0];
        this.cardList = data[0].portalNodeList;
        this.cardName = this.cardList[0].functionTypeCode;

        setTimeout(() => {
          new window.Swiper(".swiper-container", {
            slidesPerView: 4,
            spaceBetween: 10,
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        }, 200);
      }
    },
    /**
     * 计算总的代办、已办、通知事项总数
     */
    computedAllTotal(data) {
      return new Promise(resolve => {
        let allTotal = {};
        data.map(item => {
          item.portalNodeList.map(child => {
            if (!(child.functionTypeCode in allTotal)) {
              allTotal[child.functionTypeCode] = 0;
            }
            allTotal[child.functionTypeCode] =
              allTotal[child.functionTypeCode] + parseInt(child.total);
          });
        });
        resolve(allTotal);
      });
    },
    /**
     * 获取 成果code
     */
    async getBizTypeCode(item) {
      const { code, data } = await getProjectParamsItems(
        {
          bizId: item.bizId,
          bizType: "project-achievement"
        },
        "wf/biz"
      );
      if (code === 1) {
        data && this.routerJump(item, { typeCode: data.typeCode },this.cardName);
      }
    },
    /**
     * 点击跳转
     */
    applyRPM(item, index) {
      // if(item.bizStatusCode!=='2005104'){
      if (item.bizType === "project-achievement") {
        this.getBizTypeCode(item);
        return;
      } else if (item.bizType === "register-out-user") {
        this.$router.push({ name: "workbench" });
        return;
      }
      routerJump(item,{},this.cardName);
      // }
    },


    /**
     * 点击进入系统
     */
    clickWorks(item, index) {
      let p = {
        WAITING_TYPE: 0,
        COMPLETE_TYPE: 1,
        NOTICE_TYPE: 2
      };
      // return
      if (item.sysCode === "2000101") {
        this.$router.push({
          name: "workbench",
          query: {
            type: p[item.functionTypeCode],
            activeName: item.functionTypeCode
          }
        });
      } else {
        openTargetWebUrl(item)
      }
    },
    /**
     * 顶部个人信息功能
     */
    handleCommand(command) {
      switch (command) {
        case "info":
          this.$router.push({ name: "profile" });
          break;
      }
    },
    /**
     * 点击切换系统
     */
    clickChangeSystem(item) {
      this.systemItem = item;
      this.cardList = item.portalNodeList;
      this.tabsList = item.portalNodeList;
      this.cardName = this.cardList[0].functionTypeCode;
    },

    intoMainPage(item) {
      if (item.sysCode !== "2000101") {
        openTargetWebUrl(item)
      } else {
        this.$router.push({ path: item.link });
      }
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

          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 700);
        })
        .catch(() => {});
    },
    /**
     * 查询列表
     */
    async getNoticeList() {
      const { code, data, total } = await allNarmalInterface(
        {
          params: this.searchForm
        },
        "service/base/sysNotice/list",
        "get"
      );
      if (code === 1) {
        this.tableData = data;
        this.searchForm.total = total;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-logo {
  height: 57px;
  color: $color-white;
  justify-content: center;
  font-size: 14px;
  border-bottom: 1px solid $color-blue-opacity;
}

.sobute-main-view {
  overflow: auto;
}

.el_header_flxed {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  // background: #f3f3f3;
  // box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
}

.home-aside {
  position: relative;
  z-index: 100;
  height: 100vh;
  background-image: linear-gradient(-90deg, #3571e2 0%, #0070c1 95%);
}
.message-title {
  border-radius: 5px 5px 0 0;
  background-image: linear-gradient(-90deg, #8faff9 0%, #299df5 100%);
}
.notice-title {
  border-radius: 5px 5px 0 0;
  background-image: linear-gradient(-90deg, rgb(112, 240, 176) 0%, #0fc46a 95%);
}
.swiper-container {
  width: 94%;
  padding: 0 3%;
}
.swiper-slide {
  position: relative;
  text-align: center;
  font-size: 18px;
  height: 100px;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 5px;
  // color: #fff;
  border-radius: 5px;
  width: 150px !important;
  cursor: pointer;

  // &:hover {
  //   @extend .active_system;
  // }
  dl {
    position: relative;
  }
  .show-into_system {
    position: absolute;
    // height: 50px;
    right: 10px;
    z-index: 99;
    top: 5px;
    animation: mymove 1s 1;
    // .is-show-scale {
    //   &_1 {
    //      transform: scale(1.3);

    //   }
    // }
  }
}
@keyframes mymove {
  from {
    right: 500px;
    transform: rotate(0deg);

    opacity: 0;
    transform: scale(0.5);
  }
  to {
    right: 10px;
    opacity: 1;
    transform: scale(1);
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    right: 500px;
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    right: 10px;
    opacity: 1;
    transform: scale(1);
  }
}
.active_system {
  border: 1px solid rgb(53, 113, 226);
  box-shadow: 0 2px 10px 0 rgba(0, 112, 193, 0.5);
}

.workbench-card {
  dl {
    margin: 0 1%;
    dt {
      height: 90px;
      border: 1px solid $color-dddddd;
      border-radius: 0px 0px 4px 4px;
      font-family: ASNormal;
      padding: 0 5%;
    }
    dd {
      height: 50px;
      padding: 0 5%;
      color: $color-white;
      border-radius: 4px 4px 0 0;
    }
  }
}
.my-message {
  li {
    padding: 10px 0;
    border-bottom: 1px dashed #ddd;
    a {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    span {
      text-align: right;
    }
  }
}
.border-line_bottom {
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
}

.home-notice {
  &-item {
    border-bottom: 1px solid #dcdfe6;

    &:hover {
      background: #eaebec;
    }

    &_image {
      padding-top: 10px;
    }
  }
  &_content {
    padding: 10px;
    &_title {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.all-day {
  height: 50px;
  width: 90%;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.1);
  span {
    font-family: ASNormal;
  }
}
.all-list_title {
  height: 45px;
  background: rgb(59, 185, 122);
  border-radius: 5px 5px 0 0;
  color: #fff;
}
</style>
