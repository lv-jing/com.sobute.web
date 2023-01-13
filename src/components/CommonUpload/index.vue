<template>
  <div class="mt10">
    <common-title :title="title" />
    <common-upload-excel
      class="mt10"
      style="float: none"
      v-show="isShowDownload"
      :isShowUpload="isShowUpload"
      :urlList="urlList"
    />
    <el-upload
      v-if="isReplenish||['add','edit'].includes($route.query.type||showType) && !userShow"
      class="mt10"
      :action="action"
      name="upfile"
      :before-upload="beforeFileUpload"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :show-file-list="false"
      :file-list="fileList"
      :on-progress="onProgress"
      multiple
      :data="uploadParams"
      :on-exceed="handleExceed"
      :headers="headers"
    >
      <div class="tl">
        <el-button size="small" type="primary" icon="iconfont sbt_uploading">点击上传</el-button>
        <span
          slot="tip"
          class="el-upload__tip ml10"
        >上传文件格式只能是 pdf, word, excel,doc,图片,ppt文件，且不超过200MB</span>
      </div>
    </el-upload>
    <div class="tl mt10">
      <ul>
          <li class="flex flex-center-start p5 fs12"  style="background:#f4f4f4">
             <div class="flex flex-2">文件名称</div>
              <div class="flex-1">创建人</div>
              <div class="flex-1">操作 </div>
          </li>
        <template v-for="(file,index) of fileList">
          <li class="flex flex-center-start p5 upload-hover" :key="index">
            <div class="flex flex-1">
              <div class="flex-2">
                <span class="el-icon-tickets"></span>
                <!-- 附件查看，点击名称 pdf在线打开，其他类型下载  -->
                <a
                  v-if="!isReplenish&&['view','auditing'].includes($route.query.type)"
                  :href="file.response.data.fileUrl|hrefUrl($route.query.type)"
                  v-text="file.name"
                  :target="file.response.data.fileUrl|targetBlank"
                ></a>
                <span v-else v-text="file.name" class="ml10"></span>
              </div>
              <div class="flex-1">{{file.createdByName}}</div>
              <div class="flex-1">
                <a
                  v-if="!['view'].includes($route.query.type||showType)"
                  href="javascript:;"
                  class="show-hidden"
                  @click="handleRemove(index)"
                >
                  <i class="el-icon-delete"></i>
                </a>
                <a href="javascript:;" @click="downloadFile(file)" class="ml20 show-hidden">
                  <i class="el-icon-download"></i>
                </a>
              </div>
            </div>

            <el-progress
              v-if="file.percentage"
              :percentage="file.percentage"
              :stroke-width="3"
              class="custom-progress"
              :format="format"
              :color="statusFormat(file.percentage)"
            ></el-progress>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getUploadUrl, downloadUrl } from "@/service/common";
import CommonUploadExcel from "@/components/commonUploadExcel";
import Cookies from "js-cookie";
import { exportFile } from "@/utils/tools";

export default {
  components: {
    CommonUploadExcel
  },
  props: {
    isReplenish: {
      type: Boolean,
      default: () => false
    },
    showType: {
      type: String,
      default: () => ""
    },
    userShow: {
      // 是否是管理员
      type: Boolean,
      default: () => false
    },
    isShowDownload: {
      // 是否下载模板按钮
      type: Boolean,
      default: () => false
    },
    isShowUpload: {
      // 是否显示导入模板按钮
      type: Boolean,
      default: () => false
    },
    uploadParams: {
      type: Object,
      default: () => {}
    },
    showAttachedList: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => "相关附件"
    },
    urlList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    showAttachedList(lists) {
      // 用于重置上传列表
      if (lists && lists.length > 0) {
        lists.map(item => {
          let list = {
            name: item.fileName,
            status: "success",
            createdByName:item.createdByName,
            percentage: 100,
            size: item.fileSize,
            response: {
              data: item
            }
          };
          this.fileList.push(list);
        });
      } else {
        this.fileList = [];
      }
    }
  },
  computed: {
    statusFormat() {
      return val => {
        let p = parseInt((val + "").split(".")[0]);
        return p === 100 ? "#6f7ad3" : "#0070C1";
      };
    }
  },
  data() {
    return {
      target: "",
      action: getUploadUrl,
      downloadUrl: downloadUrl,
      fileList: [],
      headers: {
        Authorization: Cookies.get("token")
      },
      status: ""
    };
  },
  filters: {
    hrefUrl(val) {
      let reg = /^.*(\.jpg|\.jpeg|\.png|\.pdf)$/;
      let bool = reg.test(val.toLowerCase());
      return bool ? downloadUrl + val : "javascript:;";
    },
    targetBlank(val) {
      let reg = /^.*(\.jpg|\.jpeg|\.png|\.pdf)$/;
      let bool = reg.test(val.toLowerCase());
      return bool ? "_blank" : "";
    }
  },
  methods: {
    //下载附件
    downloadFile(item) {
      const { response } = item;
      const { data } = response || {};
      exportFile(
        `${downloadUrl}/service/attachment/download/${data.guid}`,
        {},
        data.fileName
      );
    },

    format(percentage) {
      let p = parseInt((percentage + "").split(".")[0]);
      return percentage === 100 ? "完成" : `${p}%`;
    },
    onProgress(event, file, fileList) {
      this.fileList = fileList;
    },
    /**
     * 文件列表上传成功时的钩子
     * @param file
     */
    handleSuccess(response, file, fileList) {
      if (response.code === 1) {
        let uploadList = fileList.map(item => {
          if (item.response) {
            item.createdByName=item?.response?.data?.createdByName||''
            return item.response.data;
          }
        });

        this.fileList = fileList;
        this.$emit("get-file-list", uploadList);
      } else {
        this.$emit("get-file-list", []);
        this.fileList = [];
        this.$message({
          type: "error",
          message: "上传" + response.message
        });
      }
    },
    /**
     * 文件列表移除文件时的钩子
     * @param file
     */
    handleRemove(index) {
      this.fileList.splice(index, 1);
      let uploadList = this.fileList.map(item => {
        if (item.response) {
          return item.response.data;
        }
      });
      this.$emit("get-file-list", uploadList);
    },
    /**
     * 点击文件列表中已上传的文件时的钩子
     * @param file
     */
    handlePreview(file) {},
    /**
     * 文件超出个数限制时的钩子
     * @param files
     * @param fileList
     */
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    /**上传类型判断 */
    beforeFileUpload(file) {
      let reg = /^.*(\.doc|\.docx|\.jpg|\.jpeg|\.png|\.pdf|\.xhtml|\.xls|\.xlsm|\.xlsx|\.xltx|\.xlsb|\.ppt|\.pptx)$/;
      const isJPG = reg.test(file.name.toLowerCase());
      const isLt100M = file.size / 1024 / 1024 < 200;

      if (!isJPG) {
        this.$message.error("上传文件格式只能是 pdf, word, excel,doc,图片");
        return false;
      }
      if (!isLt100M) {
        this.$message.error("上传文件大小不能超过 200MB!");
        return false;
      }
      return isJPG && isLt100M;
    },
    /**
     * 删除文件之前的钩子
     * @param file
     * @param fileList
     * @returns {Promise<MessageBoxData> | *}
     */
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="scss">
.upload-content {
  margin-top: 20px;
}

.upload-hover {
  position: relative;
  // .show-hidden {
  //   visibility: hidden;
  //   cursor: pointer;
  // }

  padding: 10px 10px 20px 10px;

  .custom-progress {
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 25px;
  }

  &:hover {
    background: $color-dddddd;

    .show-hidden {
      visibility: visible;
    }
  }
}
</style>