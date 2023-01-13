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
      v-if="['add','edit'].includes($route.query.type||showType)&& !userShow"
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
        >上传文件格式只能是 pdf, word, excel,doc,图片,ppt文件，且不超过100MB</span>
      </div>
    </el-upload>

    <div class="tl mt10">
      <!-- <ul>
        <template v-for="(file,index) of fileList">
          <li class="flex flex-center-start p5 upload-hover" :key="index">
            <span class="el-icon-tickets"></span>
            <span v-text="file.name" class="ml10"></span>

            <a
              href="javascript:;"
              v-if="['add','edit'].includes($route.query.type||showType)"
              class="ml20 show-hidden"
              @click="handleRemove(index)"
            >
              <i class="el-icon-delete"></i>
            </a>

            <a v-else href="javascript:;" @click="downloadFile(file)" class="ml20 show-hidden">
              <i class="el-icon-download"></i>
            </a>
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
      </ul>-->

      <el-table
        :data="fileList"
        class="mt10"
        stripe
        highlight-current-row
        style="width: 100%"
        :header-cell-style="{background:'#f3f3f3'}"
        size="small"
      >
        <el-table-column label="文件名" prop="name"></el-table-column>
        <el-table-column label="描述">
          <template v-slot="{row}">
            <el-input
              @change="remarkInput($event,row)"
              :disabled="['view','auditing'].includes($route.query.type)"
              v-model="row.remarks"
              placeholder="请输入描述"
            ></el-input>
          </template>
        </el-table-column>

        <el-table-column label="密级">
          <template v-slot="{row}">
            <el-select
              class="w-100"
              :disabled="['view','auditing'].includes($route.query.type)"
              v-model="row.securityLevelCode"
              @change="leavlInput($event,row)"
              placeholder="请选择"
            >
              <el-option
                v-for="item of options"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="120" label="状态" prop="name">
          <template v-slot="{row}">
            <el-progress
              v-if="row.percentage"
              :percentage="row.percentage"
              :stroke-width="3"
              type="circle"
              :width="50"
              class="custom-progress"
              :format="format"
              :color="statusFormat(row.percentage)"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column width="100" label="操作" prop="name">
          <template v-slot="{row,$index}">
            <!-- -->

            <div>
              <a
                href="javascript:;"
                v-if="['add','edit'].includes($route.query.type||showType)"
                class="ml20 show-hidden"
                @click="handleRemove($index)"
              >
                <i class="el-icon-delete"></i>
              </a>

              <a v-else href="javascript:;" @click="downloadFile(row)" class="ml20 show-hidden">
                <i class="el-icon-download"></i>
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getUploadUrl, downloadUrl } from "@/service/common";
import CommonUploadExcel from "@/components/commonUploadExcel";
import Cookies from "js-cookie";
import { exportFile, decomposeStringToJson } from "@/utils/tools";
import { getDictionaryTypeName } from "@/service/system";

export default {
  components: {
    CommonUploadExcel
  },
  props: {
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
            percentage: 100,
            remarks: item.remarks,
            securityLevelCode: item.securityLevelCode,
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
      action: getUploadUrl,
      downloadUrl: downloadUrl,
      fileList: [],
      headers: {
        Authorization: Cookies.get("token")
      },
      options: [],
      status: ""
    };
  },
  created() {
    this.getDictionaryTypeName();
  },
  methods: {
    remarkInput(remarks, row) {
      row.response.data = { ...row.response.data, remarks };
      this.upldateChange(this.fileList);
    },
    leavlInput(ee, row) {
      let { name, code } = this.options.find(item => item.code == ee);
      row.response.data = {
        ...row.response.data,
        securityLevel: name,
        securityLevelCode: code
      };
      this.upldateChange(this.fileList);
    },
    upldateChange(fileList) {
      let uploadList = fileList.map(item => {
        if (item.response) {
          return item.response.data;
        }
      });
      this.$emit("get-file-list", uploadList);
    },
    /**
     * 获取字典库的类型数据
     * @param {*} typeName  数据字典库类型
     *
     */
    async getDictionaryTypeName() {
      const { code, data } = await getDictionaryTypeName({
        typeName: "FILE_SECURITY_CLASSIFICATION"
      });
      if (code === 1) {
        this.options = data;
      }
    },

    //下载附件
    downloadFile(item) {
      console.log(item);
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
      let reg = /^.*(\.doc|\.docx|\.jpg|\.jpeg|\.png|\.pdf|\.xhtml|\.xlsm|\.xlsx|\.xltx|\.xlsb|\.ppt|\.pptx)$/;
      const isJPG = reg.test(file.name.toLowerCase());
      const isLt100M = file.size / 1024 / 1024 < 100;

      if (!isJPG) {
        this.$message.error("上传文件格式只能是 pdf, word, excel,doc,图片");
        return false;
      }
      if (!isLt100M) {
        this.$message.error("上传文件大小不能超过 100MB!");
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
  .show-hidden {
    visibility: hidden;
    cursor: pointer;
  }

  padding: 10px 10px 20px 10px;

  .custom-progress {
    position: absolute;
    bottom: -10px;
    width: 80%;
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