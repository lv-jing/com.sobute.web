<template>
  <div class="my-upload" style="float: right" v-if="!getAuthObj.flagAdd">
    <a v-if="url" :href="url||'javascript:;'" target="_blank">
      <el-button size="small" icon="iconfont sbt_download" style="margin-right: 10px;">模板下载
      </el-button>
    </a>
      <el-button v-else @click="handleDownload" icon="iconfont sbt_download" style="margin-right: 10px;">模板下载
      </el-button>

    <el-upload
      :action="action"
      name="excelFile"
      :on-success="handleSuccess"
      :show-file-list="false"
      :file-list="fileList"
      :headers="headers"
    >
      <div class="tl" v-show="isShowUpload">
        <el-button size="small" type="primary" icon="iconfont sbt_uploading">Excel导入</el-button>
      </div>
    </el-upload>
    <el-dialog
      :modal="false"
      title="附件模板下载"
      :visible.sync="visible"
      width="30%"
      :before-close="handleClose">
      <ul>
        <li class="docx-list" v-for="(item,index) in urlList" :key="index">
          <a :href="item.url||'javascript:;'" target="_blank">{{item.name}}</a>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>
</template>

<script>
    /* eslint-disable */
    import Cookies from "js-cookie";
    import {mapGetters} from "vuex";

    export default {
        props:{
            action:{
                type: String,
                default:()=> ''
            },
            url:{
                type: String,
                default:()=> ''
            },
            isShowUpload:{
                type:Boolean,
                default:()=> true
            },
            urlList:{
                type:Array,
                default:()=>[]
            }
        },
        data() {
            return {
                fileList:[],
                visible: false,
                headers:{
                    Authorization:Cookies.get('token')
                }
            };
        },
        computed: {
            ...mapGetters(['getAuthObj'])
        },
        methods: {
            /**
             * 文件列表上传成功时的钩子
             * @param file
             */
            handleSuccess(response, file, fileList) {
                if (response.code===1){
                    this.$message({
                        type: 'success',
                        message: '导入成功'
                    });
                    this.$emit("get-file-list", true);
                } else {
                    this.$message({
                        type: 'error',
                        message: response.message
                    });
                }
            },
            /**
             * 模板下载
             *
             */
            handleDownload(){
                this.visible = true
            },
            /**
             * 关闭弹窗
             *
             */
            handleClose(){
                this.visible = false
            }
        }
    };
</script>

<style lang="scss">
.my-upload{
  float: right;
  display: flex;
}
  .docx-list{
    padding: 5px;
  }
</style>