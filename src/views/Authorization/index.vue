<template>
  <div class="authorization-main">
    <div v-if="isSuccess">
      <div class="container">
        <span class="girl"></span>
        <div class="boys">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="tc" style="font-size:14px;margin-top:10px;">数据装载中....</div>
    </div>
    <div v-else style="width:30%">
      <img src="../../assets/images/403.jpg" alt srcset />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { projectType } from "@/utils/projectType";

import { createRouter, userLoginWatch,routerJump } from "@/utils/tools";
import Cookies from "js-cookie";
import { mapState } from "vuex";
import { userAuthoLogin } from "@/service/user";
import { allNarmalInterface } from "@/service/common";
import { getProjectParamsItems } from "@/service/project";

export default {
  data() {
    return {
      isSuccess: true,
      message: ""
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState({
      menuList: state => state.menus.authoMenuList
    })
  },
  watch: {
    menuList(n) {
      if (n && n.length === 0) {
        this.isSuccess = false;
        return;
      }
      const { code, username, id = "" } = this.$route.query;
      let p = userLoginWatch(n, null, this);
      setTimeout(() => {
        if (id) {
          this.getAwaitItems({ username, id });
        } else {
          this.$router.push(p);
        }
      }, 2000);
    }
  },
  methods: {
    async init() {
      const { code, username } = this.$route.query,
        { code: isCode, data, message } = await userAuthoLogin({
          username,
          code
        });

      if (isCode === 1 && data) {
        Cookies.set("token", data.tokenHead + " " + data.token);
        Cookies.set("userInfo", data.user);
        this.$store.dispatch("setAuthoMenuList", {
          guid: data.user.guid
        });

        this.$store.dispatch("setUserInfo", data.user);
      } else {
        this.isSuccess = false;
        this.message = message;
      }
    },
    /**
     * 获取代办
     */
    async getAwaitItems({ username, id }) {
      const { code, data } = await allNarmalInterface(
        {
          params: {
            empolyeeNumber: username,
            taskId: id
          }
        },
        "service/project/wf/waiting-details",
        "get"
      );
      if (code === 1) {
        if (data) {
          this.applyRPM(data);
        } else {
          this.$message.error("不存在当前待办项,为您跳转到待办列表！");
          setTimeout(() => {
            this.$router.push({ name: "workbench" });
          }, 2000);
        }
      }
      //
    },
    /**
     * 点击跳转
     */
    applyRPM(item) {
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
        data && routerJump(item, { typeCode: data.typeCode },this.cardName);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.authorization-main {
  height: 100vh;
  width: 100vw;
  //   background: #f1f1f1;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 8em;
    height: 1em;
    font-size: 35px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #ccc;
    padding: 0 30px 10px 30px;
  }

  .container span {
    width: 1em;
    height: 1em;
    --duration: 1.5s;
  }

  .girl {
    animation: slide var(--duration) ease-in-out infinite alternate;
  }

  @keyframes slide {
    from {
      transform: translateX(0);
      filter: brightness(1);
    }

    to {
      transform: translatex(calc(8em - (1em * 1.25)));
      filter: brightness(1.45);
    }
  }

  .boys {
    width: 6em;
    display: flex;
    justify-content: space-between;
  }

  .boys span {
    animation: var(--duration) ease-in-out infinite alternate;
  }

  .boys span:nth-child(1) {
    animation-name: jump-off-1;
  }

  .boys span:nth-child(2) {
    animation-name: jump-off-2;
  }

  .boys span:nth-child(3) {
    animation-name: jump-off-3;
  }

  .boys span:nth-child(4) {
    animation-name: jump-off-4;
  }

  @keyframes jump-off-1 {
    0%,
    15% {
      transform: rotate(0deg);
    }

    35%,
    100% {
      transform-origin: -50% center;
      transform: rotate(-180deg);
    }
  }

  @keyframes jump-off-2 {
    0%,
    30% {
      transform: rotate(0deg);
    }

    50%,
    100% {
      transform-origin: -50% center;
      transform: rotate(-180deg);
    }
  }

  @keyframes jump-off-3 {
    0%,
    45% {
      transform: rotate(0deg);
    }

    65%,
    100% {
      transform-origin: -50% center;
      transform: rotate(-180deg);
    }
  }

  @keyframes jump-off-4 {
    0%,
    60% {
      transform: rotate(0deg);
    }

    80%,
    100% {
      transform-origin: -50% center;
      transform: rotate(-180deg);
    }
  }

  .container span::before {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 15%;
    box-shadow: 0 0 0.1em rgba(0, 0, 0, 0.3);
  }

  .girl::before {
    background-color: hotpink;
  }

  .boys span::before {
    background-color: dodgerblue;
    animation: var(--duration) ease-in-out infinite alternate;
  }

  .boys span:nth-child(1)::before {
    filter: brightness(1);
    animation-name: jump-down-1;
  }

  .boys span:nth-child(2)::before {
    filter: brightness(1.15);
    animation-name: jump-down-2;
  }

  .boys span:nth-child(3)::before {
    filter: brightness(1.3);
    animation-name: jump-down-3;
  }

  .boys span:nth-child(4)::before {
    filter: brightness(1.45);
    animation-name: jump-down-4;
  }

  @keyframes jump-down-1 {
    5% {
      transform: scale(1, 1);
    }

    15% {
      transform-origin: center bottom;
      transform: scale(1.3, 0.7);
    }

    20%,
    25% {
      transform-origin: center bottom;
      transform: scale(0.8, 1.4);
    }

    40% {
      transform-origin: center top;
      transform: scale(1.3, 0.7);
    }

    55%,
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes jump-down-2 {
    20% {
      transform: scale(1, 1);
    }

    30% {
      transform-origin: center bottom;
      transform: scale(1.3, 0.7);
    }

    35%,
    40% {
      transform-origin: center bottom;
      transform: scale(0.8, 1.4);
    }

    55% {
      transform-origin: center top;
      transform: scale(1.3, 0.7);
    }

    70%,
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes jump-down-3 {
    35% {
      transform: scale(1, 1);
    }

    45% {
      transform-origin: center bottom;
      transform: scale(1.3, 0.7);
    }

    50%,
    55% {
      transform-origin: center bottom;
      transform: scale(0.8, 1.4);
    }

    70% {
      transform-origin: center top;
      transform: scale(1.3, 0.7);
    }

    85%,
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes jump-down-4 {
    50% {
      transform: scale(1, 1);
    }

    60% {
      transform-origin: center bottom;
      transform: scale(1.3, 0.7);
    }

    65%,
    70% {
      transform-origin: center bottom;
      transform: scale(0.8, 1.4);
    }

    85% {
      transform-origin: center top;
      transform: scale(1.3, 0.7);
    }

    100%,
    100% {
      transform: scale(1, 1);
    }
  }
}
</style>