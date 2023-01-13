<template>
  <div style="height:calc(100vh - 4px);overflow:auto">
    <vue-scroll>
      <div style="padding:20px;">
        <h2 class="tc">{{details.title}}</h2>
        <el-divider content-position="left"></el-divider>
        <div class="flex flex-center p10" style="background:#f3f3f3">
          <span>创建人:&nbsp;&nbsp;{{details.createdByName}}</span>
          <span class="ml20">创建时间:&nbsp;&nbsp;{{details.creationDate}}</span>
        </div>
        <div class="mt10 fs12 notice-summary" v-if="details.summary">【摘要】: {{details.summary}}</div>
        <div class="mt20 ql-container ql-snow ql-editor" style="border:0" v-html="details.content"></div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import { allNarmalInterface } from "@/service/common";

export default {
  data() {
    return {
      details: {}
    };
  },

  created() {
    const { id } = this.$route.query;
    this.sysNoticeTargetDetails(id);
  },

  methods: {
    async sysNoticeTargetDetails(id) {
      const { code, data } = await allNarmalInterface(
        {},
        `service/base/sysNotice/details/${id}`,
        "get"
      );
      if (code === 1) {
        this.details = data.sysNotice || {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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